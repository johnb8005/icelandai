-- Wine Collection Management Database Schema

-- Storage Locations Table
CREATE TABLE IF NOT EXISTS storage_locations (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('home_cellar', 'professional_storage', 'wine_fridge', 'restaurant', 'other')),
    address TEXT,
    temperature REAL,
    humidity REAL,
    capacity INTEGER NOT NULL,
    current_occupancy INTEGER DEFAULT 0,
    monthly_fee REAL NOT NULL DEFAULT 0,
    currency TEXT NOT NULL DEFAULT 'EUR',
    notes TEXT,
    is_active BOOLEAN NOT NULL DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Wines Table
CREATE TABLE IF NOT EXISTS wines (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    producer TEXT NOT NULL,
    vintage INTEGER NOT NULL,
    region TEXT NOT NULL,
    country TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('still', 'sparkling', 'fortified', 'dessert')),
    color TEXT NOT NULL CHECK (color IN ('red', 'white', 'rose', 'orange')),
    alcohol_content REAL,
    bottle_size INTEGER NOT NULL DEFAULT 750,
    description TEXT,
    grape_varietals TEXT, -- JSON array as text
    drinking_window_start INTEGER,
    drinking_window_end INTEGER,
    rating_score REAL,
    rating_critic TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Purchases Table
CREATE TABLE IF NOT EXISTS purchases (
    id TEXT PRIMARY KEY,
    date DATE NOT NULL,
    supplier TEXT NOT NULL,
    invoice_number TEXT,
    invoice_file TEXT, -- file path or URL
    subtotal REAL NOT NULL,
    taxes REAL NOT NULL DEFAULT 0,
    shipping_cost REAL NOT NULL DEFAULT 0,
    storage_fees REAL NOT NULL DEFAULT 0,
    total_cost REAL NOT NULL,
    currency TEXT NOT NULL DEFAULT 'EUR',
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Purchase Items Table
CREATE TABLE IF NOT EXISTS purchase_items (
    id TEXT PRIMARY KEY,
    purchase_id TEXT NOT NULL,
    wine_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price REAL NOT NULL,
    total_price REAL NOT NULL,
    discount REAL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id) ON DELETE CASCADE,
    FOREIGN KEY (wine_id) REFERENCES wines(id) ON DELETE CASCADE
);

-- Wine Stock Table
CREATE TABLE IF NOT EXISTS wine_stock (
    id TEXT PRIMARY KEY,
    wine_id TEXT NOT NULL,
    purchase_item_id TEXT NOT NULL,
    storage_location_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'in_stock' CHECK (status IN ('in_stock', 'reserved', 'consumed', 'sold', 'lost')),
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (wine_id) REFERENCES wines(id) ON DELETE CASCADE,
    FOREIGN KEY (purchase_item_id) REFERENCES purchase_items(id) ON DELETE CASCADE,
    FOREIGN KEY (storage_location_id) REFERENCES storage_locations(id) ON DELETE RESTRICT
);

-- Consumption Log Table
CREATE TABLE IF NOT EXISTS consumption_log (
    id TEXT PRIMARY KEY,
    wine_id TEXT NOT NULL,
    stock_id TEXT NOT NULL,
    date DATE NOT NULL,
    quantity INTEGER NOT NULL,
    occasion TEXT,
    rating REAL CHECK (rating >= 0 AND rating <= 10),
    notes TEXT,
    photo TEXT, -- file path or URL
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (wine_id) REFERENCES wines(id) ON DELETE CASCADE,
    FOREIGN KEY (stock_id) REFERENCES wine_stock(id) ON DELETE CASCADE
);

-- Wine Valuations Table
CREATE TABLE IF NOT EXISTS wine_valuations (
    id TEXT PRIMARY KEY,
    wine_id TEXT NOT NULL,
    date DATE NOT NULL,
    estimated_value REAL NOT NULL,
    source TEXT NOT NULL,
    currency TEXT NOT NULL DEFAULT 'EUR',
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (wine_id) REFERENCES wines(id) ON DELETE CASCADE
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_wines_producer ON wines(producer);
CREATE INDEX IF NOT EXISTS idx_wines_region ON wines(region);
CREATE INDEX IF NOT EXISTS idx_wines_vintage ON wines(vintage);
CREATE INDEX IF NOT EXISTS idx_wines_color ON wines(color);
CREATE INDEX IF NOT EXISTS idx_wines_type ON wines(type);
CREATE INDEX IF NOT EXISTS idx_wines_drinking_window ON wines(drinking_window_start, drinking_window_end);

CREATE INDEX IF NOT EXISTS idx_purchases_date ON purchases(date);
CREATE INDEX IF NOT EXISTS idx_purchases_supplier ON purchases(supplier);

CREATE INDEX IF NOT EXISTS idx_wine_stock_wine_id ON wine_stock(wine_id);
CREATE INDEX IF NOT EXISTS idx_wine_stock_location ON wine_stock(storage_location_id);
CREATE INDEX IF NOT EXISTS idx_wine_stock_status ON wine_stock(status);

CREATE INDEX IF NOT EXISTS idx_consumption_date ON consumption_log(date);
CREATE INDEX IF NOT EXISTS idx_consumption_wine_id ON consumption_log(wine_id);

CREATE INDEX IF NOT EXISTS idx_valuations_wine_id ON wine_valuations(wine_id);
CREATE INDEX IF NOT EXISTS idx_valuations_date ON wine_valuations(date);

-- Triggers to update updated_at timestamps
CREATE TRIGGER IF NOT EXISTS update_wines_updated_at 
    AFTER UPDATE ON wines
    BEGIN
        UPDATE wines SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

CREATE TRIGGER IF NOT EXISTS update_purchases_updated_at 
    AFTER UPDATE ON purchases
    BEGIN
        UPDATE purchases SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

CREATE TRIGGER IF NOT EXISTS update_wine_stock_updated_at 
    AFTER UPDATE ON wine_stock
    BEGIN
        UPDATE wine_stock SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

CREATE TRIGGER IF NOT EXISTS update_storage_locations_updated_at 
    AFTER UPDATE ON storage_locations
    BEGIN
        UPDATE storage_locations SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

-- Trigger to update storage location occupancy when stock changes
CREATE TRIGGER IF NOT EXISTS update_storage_occupancy_on_insert
    AFTER INSERT ON wine_stock
    WHEN NEW.status = 'in_stock'
    BEGIN
        UPDATE storage_locations 
        SET current_occupancy = current_occupancy + NEW.quantity
        WHERE id = NEW.storage_location_id;
    END;

CREATE TRIGGER IF NOT EXISTS update_storage_occupancy_on_update
    AFTER UPDATE ON wine_stock
    WHEN (OLD.status = 'in_stock' AND NEW.status != 'in_stock') OR 
         (OLD.status != 'in_stock' AND NEW.status = 'in_stock') OR
         (OLD.quantity != NEW.quantity AND NEW.status = 'in_stock')
    BEGIN
        -- Remove old quantity if it was in stock
        UPDATE storage_locations 
        SET current_occupancy = current_occupancy - 
            CASE WHEN OLD.status = 'in_stock' THEN OLD.quantity ELSE 0 END
        WHERE id = OLD.storage_location_id;
        
        -- Add new quantity if it's in stock
        UPDATE storage_locations 
        SET current_occupancy = current_occupancy + 
            CASE WHEN NEW.status = 'in_stock' THEN NEW.quantity ELSE 0 END
        WHERE id = NEW.storage_location_id;
    END;

CREATE TRIGGER IF NOT EXISTS update_storage_occupancy_on_delete
    AFTER DELETE ON wine_stock
    WHEN OLD.status = 'in_stock'
    BEGIN
        UPDATE storage_locations 
        SET current_occupancy = current_occupancy - OLD.quantity
        WHERE id = OLD.storage_location_id;
    END;