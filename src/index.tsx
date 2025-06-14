import { serve } from "bun";
import index from "./index.html";
import { initializeDatabase, insertSampleData } from './database/init';
import { WineModel, PurchaseModel, StorageLocationModel, DashboardModel } from './database/models';

// Initialize database on server start
initializeDatabase();

// Insert sample data if database is empty
try {
  const wines = WineModel.getAll();
  if (wines.length === 0) {
    insertSampleData();
    console.log('Sample data loaded');
  }
} catch (error) {
  console.error('Error checking/loading sample data:', error);
}

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,

    "/api/wines": {
      async GET(req) {
        try {
          const url = new URL(req.url);
          const search = url.searchParams.get('search') || undefined;
          const color = url.searchParams.get('color')?.split(',') || undefined;
          const region = url.searchParams.get('region')?.split(',') || undefined;
          
          const filters = { search, color, region };
          const wines = WineModel.getAll(filters);
          
          return Response.json(wines);
        } catch (error) {
          return Response.json({ error: error.message }, { status: 500 });
        }
      },
      
      async POST(req) {
        try {
          const wine = await req.json();
          wine.id = `wine-${Date.now()}`;
          const createdWine = WineModel.create(wine);
          
          return Response.json(createdWine, { status: 201 });
        } catch (error) {
          return Response.json({ error: error.message }, { status: 400 });
        }
      }
    },

    "/api/wines/:id": {
      async GET(req) {
        try {
          const wine = WineModel.getById(req.params.id);
          if (!wine) {
            return Response.json({ error: 'Wine not found' }, { status: 404 });
          }
          
          return Response.json(wine);
        } catch (error) {
          return Response.json({ error: error.message }, { status: 500 });
        }
      }
    },

    "/api/purchases": {
      async GET(req) {
        try {
          const purchases = PurchaseModel.getAll();
          return Response.json(purchases);
        } catch (error) {
          return Response.json({ error: error.message }, { status: 500 });
        }
      },
      
      async POST(req) {
        try {
          const purchase = await req.json();
          purchase.id = `purchase-${Date.now()}`;
          purchase.date = new Date(purchase.date);
          
          // Generate IDs for items
          purchase.items = purchase.items.map((item: any, index: number) => ({
            ...item,
            id: `item-${Date.now()}-${index}`
          }));
          
          const createdPurchase = PurchaseModel.create(purchase);
          
          return Response.json(createdPurchase, { status: 201 });
        } catch (error) {
          return Response.json({ error: error.message }, { status: 400 });
        }
      }
    },

    "/api/storage-locations": {
      async GET(req) {
        try {
          const locations = StorageLocationModel.getAll();
          return Response.json(locations);
        } catch (error) {
          return Response.json({ error: error.message }, { status: 500 });
        }
      }
    },

    "/api/dashboard": {
      async GET(req) {
        try {
          const stats = DashboardModel.getStats();
          return Response.json(stats);
        } catch (error) {
          return Response.json({ error: error.message }, { status: 500 });
        }
      }
    }
  },

  development: process.env.NODE_ENV !== "production",
});

console.log(`🍷 Wine Cellar Management Server running at ${server.url}`);
