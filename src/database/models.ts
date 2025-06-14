import db from './init';
import { Wine, WineStock, Purchase, PurchaseItem, StorageLocation, ConsumptionLog, WineValuation, DashboardStats } from '../types/wine';

// Wine model
export class WineModel {
  static getAll(filters?: any): Wine[] {
    let query = `
      SELECT w.*, 
             COALESCE(SUM(CASE WHEN ws.status = 'in_stock' THEN ws.quantity ELSE 0 END), 0) as stock_quantity
      FROM wines w
      LEFT JOIN wine_stock ws ON w.id = ws.wine_id
      WHERE 1=1
    `;
    
    const params: any[] = [];
    
    if (filters?.search) {
      query += ` AND (w.name LIKE ? OR w.producer LIKE ? OR w.region LIKE ?)`;
      const searchTerm = `%${filters.search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }
    
    if (filters?.color && filters.color.length > 0) {
      const placeholders = filters.color.map(() => '?').join(',');
      query += ` AND w.color IN (${placeholders})`;
      params.push(...filters.color);
    }
    
    if (filters?.region && filters.region.length > 0) {
      const placeholders = filters.region.map(() => '?').join(',');
      query += ` AND w.region IN (${placeholders})`;
      params.push(...filters.region);
    }
    
    if (filters?.vintage) {
      if (filters.vintage.min) {
        query += ` AND w.vintage >= ?`;
        params.push(filters.vintage.min);
      }
      if (filters.vintage.max) {
        query += ` AND w.vintage <= ?`;
        params.push(filters.vintage.max);
      }
    }
    
    query += ` GROUP BY w.id ORDER BY w.name`;
    
    const stmt = db.prepare(query);
    const rows = stmt.all(params);
    
    return rows.map(row => ({
      ...row,
      grapeVarietals: JSON.parse(row.grape_varietals || '[]'),
      drinkingWindow: {
        start: row.drinking_window_start,
        end: row.drinking_window_end
      },
      rating: row.rating_score ? {
        score: row.rating_score,
        critic: row.rating_critic
      } : undefined,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at)
    }));
  }
  
  static getById(id: string): Wine | undefined {
    const stmt = db.prepare(`
      SELECT w.*, 
             COALESCE(SUM(CASE WHEN ws.status = 'in_stock' THEN ws.quantity ELSE 0 END), 0) as stock_quantity
      FROM wines w
      LEFT JOIN wine_stock ws ON w.id = ws.wine_id
      WHERE w.id = ?
      GROUP BY w.id
    `);
    
    const row = stmt.get([id]);
    if (!row) return undefined;
    
    return {
      ...row,
      grapeVarietals: JSON.parse(row.grape_varietals || '[]'),
      drinkingWindow: {
        start: row.drinking_window_start,
        end: row.drinking_window_end
      },
      rating: row.rating_score ? {
        score: row.rating_score,
        critic: row.rating_critic
      } : undefined,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at)
    };
  }
  
  static create(wine: Omit<Wine, 'createdAt' | 'updatedAt'>): Wine {
    const stmt = db.prepare(`
      INSERT INTO wines (
        id, name, producer, vintage, region, country, type, color,
        alcohol_content, bottle_size, description, grape_varietals,
        drinking_window_start, drinking_window_end, rating_score, rating_critic
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    stmt.run([
      wine.id, wine.name, wine.producer, wine.vintage, wine.region,
      wine.country, wine.type, wine.color, wine.alcoholContent,
      wine.bottleSize, wine.description, JSON.stringify(wine.grapeVarietals),
      wine.drinkingWindow.start, wine.drinkingWindow.end,
      wine.rating?.score, wine.rating?.critic
    ]);
    
    return this.getById(wine.id)!;
  }
  
  static update(id: string, updates: Partial<Wine>): Wine | undefined {
    const fields = [];
    const values = [];
    
    Object.entries(updates).forEach(([key, value]) => {
      if (key === 'grapeVarietals') {
        fields.push('grape_varietals = ?');
        values.push(JSON.stringify(value));
      } else if (key === 'drinkingWindow') {
        fields.push('drinking_window_start = ?', 'drinking_window_end = ?');
        values.push(value.start, value.end);
      } else if (key === 'rating') {
        fields.push('rating_score = ?', 'rating_critic = ?');
        values.push(value?.score, value?.critic);
      } else if (key !== 'createdAt' && key !== 'updatedAt' && key !== 'id') {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    });
    
    if (fields.length === 0) return this.getById(id);
    
    values.push(id);
    const stmt = db.prepare(`UPDATE wines SET ${fields.join(', ')} WHERE id = ?`);
    stmt.run(values);
    
    return this.getById(id);
  }
  
  static delete(id: string): boolean {
    const stmt = db.prepare('DELETE FROM wines WHERE id = ?');
    const result = stmt.run([id]);
    return result.changes > 0;
  }
}

// Purchase model
export class PurchaseModel {
  static getAll(): Purchase[] {
    const stmt = db.prepare(`
      SELECT p.*,
             json_group_array(
               json_object(
                 'id', pi.id,
                 'wineId', pi.wine_id,
                 'quantity', pi.quantity,
                 'unitPrice', pi.unit_price,
                 'totalPrice', pi.total_price,
                 'discount', pi.discount
               )
             ) as items
      FROM purchases p
      LEFT JOIN purchase_items pi ON p.id = pi.purchase_id
      GROUP BY p.id
      ORDER BY p.date DESC
    `);
    
    const rows = stmt.all();
    
    return rows.map(row => ({
      ...row,
      date: new Date(row.date),
      items: JSON.parse(row.items).filter((item: any) => item.id !== null),
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at)
    }));
  }
  
  static getById(id: string): Purchase | undefined {
    const stmt = db.prepare(`
      SELECT p.*,
             json_group_array(
               json_object(
                 'id', pi.id,
                 'wineId', pi.wine_id,
                 'quantity', pi.quantity,
                 'unitPrice', pi.unit_price,
                 'totalPrice', pi.total_price,
                 'discount', pi.discount
               )
             ) as items
      FROM purchases p
      LEFT JOIN purchase_items pi ON p.id = pi.purchase_id
      WHERE p.id = ?
      GROUP BY p.id
    `);
    
    const row = stmt.get(id);
    if (!row) return undefined;
    
    return {
      ...row,
      date: new Date(row.date),
      items: JSON.parse(row.items).filter((item: any) => item.id !== null),
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at)
    };
  }
  
  static create(purchase: Omit<Purchase, 'createdAt' | 'updatedAt'>): Purchase {
    const transaction = db.transaction(() => {
      // Insert purchase
      const purchaseStmt = db.prepare(`
        INSERT INTO purchases (
          id, date, supplier, invoice_number, invoice_file,
          subtotal, taxes, shipping_cost, storage_fees, total_cost, currency, notes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      
      purchaseStmt.run(
        purchase.id, purchase.date.toISOString().split('T')[0], purchase.supplier,
        purchase.invoiceNumber, purchase.invoiceFile, purchase.subtotal,
        purchase.taxes, purchase.shippingCost, purchase.storageFees,
        purchase.totalCost, purchase.currency, purchase.notes
      );
      
      // Insert purchase items
      const itemStmt = db.prepare(`
        INSERT INTO purchase_items (
          id, purchase_id, wine_id, quantity, unit_price, total_price, discount
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
      
      purchase.items.forEach(item => {
        itemStmt.run(
          item.id, purchase.id, item.wineId, item.quantity,
          item.unitPrice, item.totalPrice, item.discount
        );
      });
    });
    
    transaction();
    return this.getById(purchase.id)!;
  }
}

// Storage Location model
export class StorageLocationModel {
  static getAll(): StorageLocation[] {
    const stmt = db.prepare(`
      SELECT * FROM storage_locations 
      WHERE is_active = 1 
      ORDER BY name
    `);
    
    const rows = stmt.all();
    
    return rows.map(row => ({
      ...row,
      isActive: Boolean(row.is_active),
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at)
    }));
  }
  
  static getById(id: string): StorageLocation | undefined {
    const stmt = db.prepare('SELECT * FROM storage_locations WHERE id = ?');
    const row = stmt.get(id);
    
    if (!row) return undefined;
    
    return {
      ...row,
      isActive: Boolean(row.is_active),
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at)
    };
  }
  
  static create(location: Omit<StorageLocation, 'createdAt' | 'updatedAt'>): StorageLocation {
    const stmt = db.prepare(`
      INSERT INTO storage_locations (
        id, name, type, address, temperature, humidity, capacity,
        current_occupancy, monthly_fee, currency, notes, is_active
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    stmt.run(
      location.id, location.name, location.type, location.address,
      location.temperature, location.humidity, location.capacity,
      location.currentOccupancy, location.monthlyFee, location.currency,
      location.notes, location.isActive ? 1 : 0
    );
    
    return this.getById(location.id)!;
  }
}

// Dashboard statistics
export class DashboardModel {
  static getStats(): DashboardStats {
    // Total bottles and value
    const totalStats = db.prepare(`
      SELECT 
        COALESCE(SUM(CASE WHEN ws.status = 'in_stock' THEN ws.quantity ELSE 0 END), 0) as total_bottles,
        COALESCE(SUM(CASE WHEN ws.status = 'in_stock' THEN pi.unit_price * ws.quantity ELSE 0 END), 0) as total_investment
      FROM wine_stock ws
      JOIN purchase_items pi ON ws.purchase_item_id = pi.id
    `).get([]);
    
    // Ready to drink wines (current year within drinking window)
    const currentYear = new Date().getFullYear();
    const readyToDrink = db.prepare(`
      SELECT COALESCE(SUM(ws.quantity), 0) as ready_count
      FROM wines w
      JOIN wine_stock ws ON w.id = ws.wine_id
      WHERE ws.status = 'in_stock' 
        AND w.drinking_window_start <= ? 
        AND w.drinking_window_end >= ?
    `).get([currentYear, currentYear]);
    
    // Aging wines
    const aging = db.prepare(`
      SELECT COALESCE(SUM(ws.quantity), 0) as aging_count
      FROM wines w
      JOIN wine_stock ws ON w.id = ws.wine_id
      WHERE ws.status = 'in_stock' 
        AND w.drinking_window_start > ?
    `).get([currentYear]);
    
    // Recent purchases (last 30 days)
    const recentPurchases = db.prepare(`
      SELECT COUNT(*) as recent_count
      FROM purchases
      WHERE date >= date('now', '-30 days')
    `).get([]);
    
    // Top regions
    const topRegions = db.prepare(`
      SELECT 
        w.region,
        COALESCE(SUM(ws.quantity), 0) as count,
        COALESCE(SUM(pi.unit_price * ws.quantity), 0) as value
      FROM wines w
      JOIN wine_stock ws ON w.id = ws.wine_id
      JOIN purchase_items pi ON ws.purchase_item_id = pi.id
      WHERE ws.status = 'in_stock'
      GROUP BY w.region
      ORDER BY count DESC
      LIMIT 5
    `).all([]);
    
    // Top producers
    const topProducers = db.prepare(`
      SELECT 
        w.producer,
        COALESCE(SUM(ws.quantity), 0) as count,
        COALESCE(SUM(pi.unit_price * ws.quantity), 0) as value
      FROM wines w
      JOIN wine_stock ws ON w.id = ws.wine_id
      JOIN purchase_items pi ON ws.purchase_item_id = pi.id
      WHERE ws.status = 'in_stock'
      GROUP BY w.producer
      ORDER BY count DESC
      LIMIT 5
    `).all([]);
    
    // Vintage distribution
    const vintageDistribution = db.prepare(`
      SELECT 
        w.vintage,
        COALESCE(SUM(ws.quantity), 0) as count
      FROM wines w
      JOIN wine_stock ws ON w.id = ws.wine_id
      WHERE ws.status = 'in_stock'
      GROUP BY w.vintage
      ORDER BY w.vintage DESC
      LIMIT 10
    `).all([]);
    
    return {
      totalBottles: totalStats.total_bottles,
      totalValue: totalStats.total_investment * 1.15, // Estimated appreciation
      totalInvestment: totalStats.total_investment,
      readyToDrink: readyToDrink.ready_count,
      aging: aging.aging_count,
      recentPurchases: recentPurchases.recent_count,
      topRegions: topRegions.map(r => ({ region: r.region, count: r.count, value: r.value })),
      topProducers: topProducers.map(p => ({ producer: p.producer, count: p.count, value: p.value })),
      vintageDistribution: vintageDistribution.map(v => ({ vintage: v.vintage, count: v.count }))
    };
  }
}