import { useState, useEffect } from 'react';
import { Wine, Purchase, StorageLocation, DashboardStats } from '../types/wine';

// Generic API hook
function useAPI<T>(url: string, dependencies: any[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  return { data, loading, error, refetch: () => setData(null) };
}

// Wines API hooks
export function useWines(filters?: { search?: string; color?: string[]; region?: string[] }, extraDeps: any[] = []) {
  const queryParams = new URLSearchParams();
  
  if (filters?.search) queryParams.append('search', filters.search);
  if (filters?.color && filters.color.length > 0) queryParams.append('color', filters.color.join(','));
  if (filters?.region && filters.region.length > 0) queryParams.append('region', filters.region.join(','));
  
  const url = `/api/wines${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  
  return useAPI<Wine[]>(url, [filters?.search, filters?.color?.join(','), filters?.region?.join(','), ...extraDeps]);
}

export function useWine(id: string) {
  return useAPI<Wine>(`/api/wines/${id}`, [id]);
}

export async function createWine(wine: Omit<Wine, 'id' | 'createdAt' | 'updatedAt'>): Promise<Wine> {
  const response = await fetch('/api/wines', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(wine),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create wine');
  }
  
  return response.json();
}

// Purchases API hooks
export function usePurchases() {
  return useAPI<Purchase[]>('/api/purchases');
}

export async function createPurchase(purchase: Omit<Purchase, 'id' | 'createdAt' | 'updatedAt'>): Promise<Purchase> {
  const response = await fetch('/api/purchases', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(purchase),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create purchase');
  }
  
  return response.json();
}

// Storage Locations API hooks
export function useStorageLocations() {
  return useAPI<StorageLocation[]>('/api/storage-locations');
}

// Dashboard API hooks
export function useDashboard() {
  return useAPI<DashboardStats>('/api/dashboard');
}