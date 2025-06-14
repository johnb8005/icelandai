# Cave à Vin - Wine Cellar Management

A comprehensive wine collection management application built with Bun, React 19, and SQLite.

## Features

- **Wine Inventory**: Track your wine collection with detailed information
- **Purchase Management**: Record wine purchases with costs and invoices
- **Storage Locations**: Manage multiple storage locations and capacity
- **Dashboard Analytics**: View collection statistics and insights
- **Drinking Windows**: Track optimal consumption periods
- **Search & Filters**: Find wines by name, producer, region, and more
- **SQLite Database**: Persistent data storage with full CRUD operations

## Technology Stack

- **Runtime**: Bun (SQLite integration)
- **Frontend**: React 19 + TypeScript
- **Database**: SQLite with bun:sqlite
- **Styling**: Tailwind CSS v4 + shadcn/ui components
- **API**: RESTful endpoints with Bun server

## Getting Started

1. **Install dependencies**:
   ```bash
   bun install
   ```

2. **Start development server**:
   ```bash
   bun dev
   ```
   This will automatically:
   - Initialize the SQLite database
   - Create tables and indexes
   - Load sample wine data

3. **Build for production**:
   ```bash
   bun run build
   ```

4. **Run production server**:
   ```bash
   bun start
   ```

## API Endpoints

- `GET/POST /api/wines` - Wine collection management
- `GET /api/wines/:id` - Individual wine details
- `GET/POST /api/purchases` - Purchase tracking
- `GET /api/storage-locations` - Storage management
- `GET /api/dashboard` - Analytics and statistics

## Database Schema

The app uses SQLite with tables for:
- Wines (details, varietals, drinking windows)
- Purchases (costs, invoices, suppliers)
- Stock (quantities, locations, status)
- Storage Locations (capacity, fees)
- Consumption Logs (tasting notes, ratings)

## Wine Collection Features

- **Add Wines**: Comprehensive form with all wine details
- **Track Costs**: Purchase price + storage + shipping = total cost
- **Location Management**: Multiple storage locations with capacity tracking
- **Drinking Windows**: Automatic ready-to-drink vs aging status
- **Financial Tracking**: Investment value and appreciation
- **Search**: Full-text search across names, producers, regions

## Project Structure

- `src/`
  - `WineCellar.tsx` - Main application component
  - `components/` - UI components (AddWineModal, etc.)
  - `database/` - SQLite schema, models, and initialization
  - `hooks/` - API hooks and data fetching
  - `types/` - TypeScript interfaces

This project was created using Bun v1.2.10. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
