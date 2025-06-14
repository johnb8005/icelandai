import { Database } from 'bun:sqlite';
import { readFileSync } from 'fs';
import { join } from 'path';

// Initialize database connection
const db = new Database(join(process.cwd(), 'wine_cellar.db'));

// Enable foreign keys and WAL mode
db.exec('PRAGMA foreign_keys = ON');
db.exec('PRAGMA journal_mode = WAL');

// Function to initialize database schema
export function initializeDatabase() {
  try {
    const schemaSQL = readFileSync(join(__dirname, 'schema.sql'), 'utf-8');
    
    // Execute schema directly (bun:sqlite handles transactions automatically)
    db.exec(schemaSQL);
    
    console.log('Database schema initialized successfully');
    
    // Insert default storage location if none exists
    const defaultLocationStmt = db.prepare(`
      INSERT OR IGNORE INTO storage_locations (id, name, type, capacity, monthly_fee, currency)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    
    defaultLocationStmt.run([
      'default-cellar',
      'Cave Principale',
      'home_cellar',
      500,
      0,
      'EUR'
    ]);
    
    console.log('Default storage location created');
    
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
}

// Sample data insertion for testing
export function insertSampleData() {
  try {
    console.log('Inserting sample data...');
    
    // Sample wines
    const insertWine = db.prepare(`
      INSERT OR IGNORE INTO wines (
        id, name, producer, vintage, region, country, type, color, 
        bottle_size, grape_varietals, drinking_window_start, drinking_window_end
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const sampleWines = [
      {
        id: 'wine-1',
        name: 'Château Margaux',
        producer: 'Château Margaux',
        vintage: 2015,
        region: 'Margaux',
        country: 'France',
        type: 'still',
        color: 'red',
        bottle_size: 750,
        grape_varietals: JSON.stringify(['Cabernet Sauvignon', 'Merlot', 'Petit Verdot', 'Cabernet Franc']),
        drinking_window_start: 2025,
        drinking_window_end: 2045
      },
      {
        id: 'wine-2',
        name: 'Dom Pérignon',
        producer: 'Moët & Chandon',
        vintage: 2012,
        region: 'Champagne',
        country: 'France',
        type: 'sparkling',
        color: 'white',
        bottle_size: 750,
        grape_varietals: JSON.stringify(['Chardonnay', 'Pinot Noir']),
        drinking_window_start: 2022,
        drinking_window_end: 2032
      },
      {
        id: 'wine-3',
        name: 'Chablis Grand Cru Les Clos',
        producer: 'Domaine William Fèvre',
        vintage: 2019,
        region: 'Chablis',
        country: 'France',
        type: 'still',
        color: 'white',
        bottle_size: 750,
        grape_varietals: JSON.stringify(['Chardonnay']),
        drinking_window_start: 2023,
        drinking_window_end: 2030
      },
      {
        id: 'wine-4',
        name: 'Barolo Brunate',
        producer: 'Giuseppe Rinaldi',
        vintage: 2018,
        region: 'Piemonte',
        country: 'Italy',
        type: 'still',
        color: 'red',
        bottle_size: 750,
        grape_varietals: JSON.stringify(['Nebbiolo']),
        drinking_window_start: 2028,
        drinking_window_end: 2040
      }
    ];
    
    for (const wine of sampleWines) {
      insertWine.run([
        wine.id, wine.name, wine.producer, wine.vintage, wine.region, 
        wine.country, wine.type, wine.color, wine.bottle_size, 
        wine.grape_varietals, wine.drinking_window_start, wine.drinking_window_end
      ]);
    }
    
    // Sample purchases
    const insertPurchase = db.prepare(`
      INSERT OR IGNORE INTO purchases (
        id, date, supplier, subtotal, taxes, shipping_cost, total_cost, currency
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const samplePurchases = [
      {
        id: 'purchase-1',
        date: '2024-01-15',
        supplier: 'Millésimes Bordeaux',
        subtotal: 800.00,
        taxes: 160.00,
        shipping_cost: 25.00,
        total_cost: 985.00,
        currency: 'EUR'
      },
      {
        id: 'purchase-2',
        date: '2024-02-20',
        supplier: 'Champagne & Co',
        subtotal: 150.00,
        taxes: 30.00,
        shipping_cost: 15.00,
        total_cost: 195.00,
        currency: 'EUR'
      }
    ];
    
    for (const purchase of samplePurchases) {
      insertPurchase.run([
        purchase.id, purchase.date, purchase.supplier, purchase.subtotal,
        purchase.taxes, purchase.shipping_cost, purchase.total_cost, purchase.currency
      ]);
    }
    
    // Sample purchase items
    const insertPurchaseItem = db.prepare(`
      INSERT OR IGNORE INTO purchase_items (
        id, purchase_id, wine_id, quantity, unit_price, total_price
      ) VALUES (?, ?, ?, ?, ?, ?)
    `);
    
    const samplePurchaseItems = [
      { id: 'item-1', purchase_id: 'purchase-1', wine_id: 'wine-1', quantity: 2, unit_price: 400.00, total_price: 800.00 },
      { id: 'item-2', purchase_id: 'purchase-2', wine_id: 'wine-2', quantity: 1, unit_price: 150.00, total_price: 150.00 },
      { id: 'item-3', purchase_id: 'purchase-1', wine_id: 'wine-3', quantity: 3, unit_price: 45.00, total_price: 135.00 },
      { id: 'item-4', purchase_id: 'purchase-1', wine_id: 'wine-4', quantity: 1, unit_price: 85.00, total_price: 85.00 }
    ];
    
    for (const item of samplePurchaseItems) {
      insertPurchaseItem.run([
        item.id, item.purchase_id, item.wine_id, item.quantity, item.unit_price, item.total_price
      ]);
    }
    
    // Sample stock
    const insertStock = db.prepare(`
      INSERT OR IGNORE INTO wine_stock (
        id, wine_id, purchase_item_id, storage_location_id, quantity, status
      ) VALUES (?, ?, ?, ?, ?, ?)
    `);
    
    const sampleStock = [
      { id: 'stock-1', wine_id: 'wine-1', purchase_item_id: 'item-1', storage_location_id: 'default-cellar', quantity: 2, status: 'in_stock' },
      { id: 'stock-2', wine_id: 'wine-2', purchase_item_id: 'item-2', storage_location_id: 'default-cellar', quantity: 1, status: 'in_stock' },
      { id: 'stock-3', wine_id: 'wine-3', purchase_item_id: 'item-3', storage_location_id: 'default-cellar', quantity: 3, status: 'in_stock' },
      { id: 'stock-4', wine_id: 'wine-4', purchase_item_id: 'item-4', storage_location_id: 'default-cellar', quantity: 1, status: 'in_stock' }
    ];
    
    for (const stock of sampleStock) {
      insertStock.run([
        stock.id, stock.wine_id, stock.purchase_item_id, stock.storage_location_id, 
        stock.quantity, stock.status
      ]);
    }
    
    console.log('Sample data inserted successfully');
    
  } catch (error) {
    console.error('Failed to insert sample data:', error);
    throw error;
  }
}

// Export database instance
export default db;