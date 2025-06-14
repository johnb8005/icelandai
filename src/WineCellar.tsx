import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Wine, 
  BarChart3, 
  Package, 
  Euro, 
  Calendar, 
  MapPin, 
  TrendingUp, 
  Plus,
  Search,
  Filter,
  AlertCircle,
  Clock,
  Loader2
} from 'lucide-react';
import { DashboardStats, Wine as WineType, WineStock, StorageLocation } from './types/wine';
import { useWines, useDashboard } from './hooks/useAPI';
import AddWineModal from './components/AddWineModal';

const WineCellar = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'inventory' | 'purchases' | 'locations'>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddWineModalOpen, setIsAddWineModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  
  // API hooks
  const { data: dashboardStats, loading: dashboardLoading, error: dashboardError } = useDashboard();
  const { data: wines, loading: winesLoading, error: winesError } = useWines({ 
    search: searchTerm || undefined 
  }, [refreshKey]);

  const handleWineAdded = () => {
    // Force refresh of wine data
    setRefreshKey(prev => prev + 1);
    // You could also call a refetch function here if your useWines hook supports it
  };

  const StatCard = ({ title, value, icon, subtitle, trend }: {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    subtitle?: string;
    trend?: 'up' | 'down' | 'neutral';
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {subtitle && (
          <p className={`text-xs flex items-center gap-1 ${
            trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-muted-foreground'
          }`}>
            {trend === 'up' && <TrendingUp className="w-3 h-3" />}
            {subtitle}
          </p>
        )}
      </CardContent>
    </Card>
  );

  const Navigation = () => (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Wine className="w-8 h-8 text-purple-600" />
            <h1 className="text-2xl font-bold">Cave à Vin</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant={currentView === 'dashboard' ? 'default' : 'ghost'}
              onClick={() => setCurrentView('dashboard')}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Tableau de bord
            </Button>
            <Button
              variant={currentView === 'inventory' ? 'default' : 'ghost'}
              onClick={() => setCurrentView('inventory')}
            >
              <Package className="w-4 h-4 mr-2" />
              Inventaire
            </Button>
            <Button
              variant={currentView === 'purchases' ? 'default' : 'ghost'}
              onClick={() => setCurrentView('purchases')}
            >
              <Euro className="w-4 h-4 mr-2" />
              Achats
            </Button>
            <Button
              variant={currentView === 'locations' ? 'default' : 'ghost'}
              onClick={() => setCurrentView('locations')}
            >
              <MapPin className="w-4 h-4 mr-2" />
              Entrepôts
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );

  const Dashboard = () => {
    if (dashboardLoading) {
      return (
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="ml-2">Chargement des statistiques...</span>
          </div>
        </div>
      );
    }
    
    if (dashboardError || !dashboardStats) {
      return (
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-red-600">
            Erreur lors du chargement des données: {dashboardError}
          </div>
        </div>
      );
    }

    return (
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Tableau de bord</h2>
          <p className="text-muted-foreground">Vue d'ensemble de votre collection de vins</p>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Bouteilles"
            value={dashboardStats.totalBottles}
            icon={<Package className="w-4 h-4" />}
            subtitle={`+${dashboardStats.recentPurchases} ce mois`}
            trend="up"
          />
          <StatCard
            title="Valeur Estimée"
            value={`€${dashboardStats.totalValue.toLocaleString()}`}
            icon={<TrendingUp className="w-4 h-4" />}
            subtitle={`+€${(dashboardStats.totalValue - dashboardStats.totalInvestment).toLocaleString()} vs achat`}
            trend="up"
          />
          <StatCard
            title="Investissement Total"
            value={`€${dashboardStats.totalInvestment.toLocaleString()}`}
            icon={<Euro className="w-4 h-4" />}
            subtitle="Coût d'acquisition"
          />
          <StatCard
            title="Prêts à Boire"
            value={dashboardStats.readyToDrink}
            icon={<Clock className="w-4 h-4" />}
            subtitle="Dans la fenêtre optimale"
          />
        </div>

        {/* Charts and Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Regions */}
          <Card>
            <CardHeader>
              <CardTitle>Régions Principales</CardTitle>
              <CardDescription>Répartition par région viticole</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardStats.topRegions.map((region, index) => (
                  <div key={region.region} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{region.region}</p>
                        <p className="text-sm text-muted-foreground">{region.count} bouteilles</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">€{region.value.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Producers */}
          <Card>
            <CardHeader>
              <CardTitle>Producteurs Principaux</CardTitle>
              <CardDescription>Top producteurs par valeur</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardStats.topProducers.map((producer, index) => (
                  <div key={producer.producer} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{producer.producer}</p>
                        <p className="text-sm text-muted-foreground">{producer.count} bouteilles</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">€{producer.value.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const Inventory = () => {
    if (winesLoading) {
      return (
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="ml-2">Chargement des vins...</span>
          </div>
        </div>
      );
    }
    
    if (winesError || !wines) {
      return (
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-red-600">
            Erreur lors du chargement des vins: {winesError}
          </div>
        </div>
      );
    }

    return (
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold mb-2">Inventaire</h2>
            <p className="text-muted-foreground">Gérez votre collection de vins ({wines.length} vins)</p>
          </div>
          <Button onClick={() => setIsAddWineModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un vin
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Rechercher par nom, producteur, région..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filtres
          </Button>
        </div>

        {/* Wine List */}
        <div className="grid gap-4">
          {wines.map((wine) => {
            const currentYear = new Date().getFullYear();
            const isReadyToDrink = wine.drinkingWindow.start <= currentYear && wine.drinkingWindow.end >= currentYear;
            const stockQuantity = (wine as any).stock_quantity || 0;
            
            return (
              <Card key={wine.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold">{wine.name}</h3>
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                          {wine.vintage}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          wine.color === 'red' ? 'bg-red-100 text-red-800' : 
                          wine.color === 'white' ? 'bg-yellow-100 text-yellow-800' : 
                          wine.color === 'rose' ? 'bg-pink-100 text-pink-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {wine.color === 'red' ? 'Rouge' : 
                           wine.color === 'white' ? 'Blanc' : 
                           wine.color === 'rose' ? 'Rosé' : 'Orange'}
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-1">{wine.producer}</p>
                      <p className="text-sm text-muted-foreground mb-3">{wine.region}, {wine.country}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span>📍 Cave principale</span>
                        <span>🍾 {stockQuantity} bouteille{stockQuantity > 1 ? 's' : ''}</span>
                        <span className={isReadyToDrink ? "text-green-600" : "text-orange-600"}>
                          {isReadyToDrink ? 
                            `✓ Prêt à boire (${wine.drinkingWindow.start}-${wine.drinkingWindow.end})` :
                            `⏳ En vieillissement (${wine.drinkingWindow.start}-${wine.drinkingWindow.end})`
                          }
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold">Stock: {stockQuantity}</p>
                      <p className="text-sm text-muted-foreground">{wine.grapeVarietals.join(', ')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'inventory':
        return <Inventory />;
      case 'purchases':
        return (
          <div className="container mx-auto px-6 py-8">
            <h2 className="text-3xl font-bold mb-8">Achats</h2>
            <p className="text-muted-foreground">Gestion des achats et factures - En développement</p>
          </div>
        );
      case 'locations':
        return (
          <div className="container mx-auto px-6 py-8">
            <h2 className="text-3xl font-bold mb-8">Entrepôts</h2>
            <p className="text-muted-foreground">Gestion des lieux de stockage - En développement</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {renderCurrentView()}
      
      <AddWineModal
        isOpen={isAddWineModalOpen}
        onClose={() => setIsAddWineModalOpen(false)}
        onWineAdded={handleWineAdded}
      />
    </div>
  );
};

export default WineCellar;