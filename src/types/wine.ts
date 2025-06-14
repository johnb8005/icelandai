export interface Wine {
  id: string;
  name: string;
  producer: string;
  vintage: number;
  region: string;
  country: string;
  type: WineType;
  color: WineColor;
  alcoholContent?: number;
  bottleSize: number; // in ml
  description?: string;
  grapeVarietals: string[];
  drinkingWindow: {
    start: number; // year
    end: number; // year
  };
  rating?: {
    score: number;
    critic?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface WineStock {
  id: string;
  wineId: string;
  quantity: number;
  location: StorageLocation;
  purchaseId: string;
  status: StockStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Purchase {
  id: string;
  date: Date;
  supplier: string;
  invoiceNumber?: string;
  invoiceFile?: string; // file path or URL
  items: PurchaseItem[];
  subtotal: number;
  taxes: number;
  shippingCost: number;
  storageFees: number;
  totalCost: number;
  currency: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PurchaseItem {
  id: string;
  wineId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  discount?: number;
}

export interface StorageLocation {
  id: string;
  name: string;
  type: StorageType;
  address?: string;
  temperature?: number;
  humidity?: number;
  capacity: number;
  currentOccupancy: number;
  monthlyFee: number;
  currency: string;
  notes?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ConsumptionLog {
  id: string;
  wineId: string;
  stockId: string;
  date: Date;
  quantity: number;
  occasion?: string;
  rating?: number;
  notes?: string;
  photo?: string;
  createdAt: Date;
}

export interface WineValuation {
  id: string;
  wineId: string;
  date: Date;
  estimatedValue: number;
  source: string; // auction house, wine merchant, etc.
  currency: string;
  notes?: string;
  createdAt: Date;
}

// Enums
export enum WineType {
  STILL = 'still',
  SPARKLING = 'sparkling',
  FORTIFIED = 'fortified',
  DESSERT = 'dessert'
}

export enum WineColor {
  RED = 'red',
  WHITE = 'white',
  ROSE = 'rose',
  ORANGE = 'orange'
}

export enum StorageType {
  HOME_CELLAR = 'home_cellar',
  PROFESSIONAL_STORAGE = 'professional_storage',
  WINE_FRIDGE = 'wine_fridge',
  RESTAURANT = 'restaurant',
  OTHER = 'other'
}

export enum StockStatus {
  IN_STOCK = 'in_stock',
  RESERVED = 'reserved',
  CONSUMED = 'consumed',
  SOLD = 'sold',
  LOST = 'lost'
}

// Dashboard Types
export interface DashboardStats {
  totalBottles: number;
  totalValue: number;
  totalInvestment: number;
  readyToDrink: number;
  aging: number;
  recentPurchases: number;
  topRegions: { region: string; count: number; value: number }[];
  topProducers: { producer: string; count: number; value: number }[];
  vintageDistribution: { vintage: number; count: number }[];
}

// Filter Types
export interface WineFilters {
  search?: string;
  color?: WineColor[];
  type?: WineType[];
  region?: string[];
  country?: string[];
  producer?: string[];
  vintage?: { min: number; max: number };
  price?: { min: number; max: number };
  drinkingWindow?: 'ready' | 'aging' | 'past';
  location?: string[];
  inStock?: boolean;
}