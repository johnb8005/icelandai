import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Plus, Loader2 } from 'lucide-react';
import { WineType, WineColor } from '../types/wine';
import { createWine } from '../hooks/useAPI';

interface AddWineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWineAdded: () => void;
}

const AddWineModal: React.FC<AddWineModalProps> = ({ isOpen, onClose, onWineAdded }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    producer: '',
    vintage: new Date().getFullYear(),
    region: '',
    country: '',
    type: 'still' as WineType,
    color: 'red' as WineColor,
    alcoholContent: '',
    bottleSize: 750,
    description: '',
    grapeVarietals: [''],
    drinkingWindowStart: new Date().getFullYear() + 2,
    drinkingWindowEnd: new Date().getFullYear() + 15,
    ratingScore: '',
    ratingCritic: ''
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGrapeVarietalChange = (index: number, value: string) => {
    const newVarietals = [...formData.grapeVarietals];
    newVarietals[index] = value;
    setFormData(prev => ({
      ...prev,
      grapeVarietals: newVarietals
    }));
  };

  const addGrapeVarietal = () => {
    setFormData(prev => ({
      ...prev,
      grapeVarietals: [...prev.grapeVarietals, '']
    }));
  };

  const removeGrapeVarietal = (index: number) => {
    if (formData.grapeVarietals.length > 1) {
      const newVarietals = formData.grapeVarietals.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        grapeVarietals: newVarietals
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const wineData = {
        name: formData.name,
        producer: formData.producer,
        vintage: formData.vintage,
        region: formData.region,
        country: formData.country,
        type: formData.type,
        color: formData.color,
        alcoholContent: formData.alcoholContent ? parseFloat(formData.alcoholContent) : undefined,
        bottleSize: formData.bottleSize,
        description: formData.description || undefined,
        grapeVarietals: formData.grapeVarietals.filter(v => v.trim() !== ''),
        drinkingWindow: {
          start: formData.drinkingWindowStart,
          end: formData.drinkingWindowEnd
        },
        rating: formData.ratingScore ? {
          score: parseFloat(formData.ratingScore),
          critic: formData.ratingCritic || undefined
        } : undefined
      };

      await createWine(wineData);
      onWineAdded();
      onClose();
      
      // Reset form
      setFormData({
        name: '',
        producer: '',
        vintage: new Date().getFullYear(),
        region: '',
        country: '',
        type: 'still' as WineType,
        color: 'red' as WineColor,
        alcoholContent: '',
        bottleSize: 750,
        description: '',
        grapeVarietals: [''],
        drinkingWindowStart: new Date().getFullYear() + 2,
        drinkingWindowEnd: new Date().getFullYear() + 15,
        ratingScore: '',
        ratingCritic: ''
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'ajout du vin');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Ajouter un nouveau vin</CardTitle>
            <CardDescription>Remplissez les informations du vin à ajouter à votre collection</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Informations de base</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nom du vin *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Château Margaux"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="producer">Producteur *</Label>
                  <Input
                    id="producer"
                    value={formData.producer}
                    onChange={(e) => handleInputChange('producer', e.target.value)}
                    placeholder="Château Margaux"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="vintage">Millésime *</Label>
                  <Input
                    id="vintage"
                    type="number"
                    min="1800"
                    max={new Date().getFullYear()}
                    value={formData.vintage}
                    onChange={(e) => handleInputChange('vintage', parseInt(e.target.value))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="region">Région *</Label>
                  <Input
                    id="region"
                    value={formData.region}
                    onChange={(e) => handleInputChange('region', e.target.value)}
                    placeholder="Margaux"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="country">Pays *</Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    placeholder="France"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="bottleSize">Taille (ml)</Label>
                  <Input
                    id="bottleSize"
                    type="number"
                    min="100"
                    max="3000"
                    value={formData.bottleSize}
                    onChange={(e) => handleInputChange('bottleSize', parseInt(e.target.value))}
                  />
                </div>
              </div>
            </div>

            {/* Wine Type and Color */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Type et couleur</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Type de vin</Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner le type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="still">Tranquille</SelectItem>
                      <SelectItem value="sparkling">Effervescent</SelectItem>
                      <SelectItem value="fortified">Fortifié</SelectItem>
                      <SelectItem value="dessert">Dessert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="color">Couleur</Label>
                  <Select value={formData.color} onValueChange={(value) => handleInputChange('color', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner la couleur" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="red">Rouge</SelectItem>
                      <SelectItem value="white">Blanc</SelectItem>
                      <SelectItem value="rose">Rosé</SelectItem>
                      <SelectItem value="orange">Orange</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Grape Varietals */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Cépages</h3>
              
              {formData.grapeVarietals.map((varietal, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={varietal}
                    onChange={(e) => handleGrapeVarietalChange(index, e.target.value)}
                    placeholder="Cabernet Sauvignon"
                    className="flex-1"
                  />
                  {formData.grapeVarietals.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeGrapeVarietal(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addGrapeVarietal}
              >
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un cépage
              </Button>
            </div>

            {/* Drinking Window */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Fenêtre de dégustation</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="drinkingWindowStart">Début</Label>
                  <Input
                    id="drinkingWindowStart"
                    type="number"
                    min={new Date().getFullYear()}
                    max="2100"
                    value={formData.drinkingWindowStart}
                    onChange={(e) => handleInputChange('drinkingWindowStart', parseInt(e.target.value))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="drinkingWindowEnd">Fin</Label>
                  <Input
                    id="drinkingWindowEnd"
                    type="number"
                    min={formData.drinkingWindowStart}
                    max="2100"
                    value={formData.drinkingWindowEnd}
                    onChange={(e) => handleInputChange('drinkingWindowEnd', parseInt(e.target.value))}
                  />
                </div>
              </div>
            </div>

            {/* Optional Fields */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Informations optionnelles</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="alcoholContent">Degré d'alcool (%)</Label>
                  <Input
                    id="alcoholContent"
                    type="number"
                    min="0"
                    max="50"
                    step="0.1"
                    value={formData.alcoholContent}
                    onChange={(e) => handleInputChange('alcoholContent', e.target.value)}
                    placeholder="13.5"
                  />
                </div>
                
                <div>
                  <Label htmlFor="ratingScore">Note (/10)</Label>
                  <Input
                    id="ratingScore"
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={formData.ratingScore}
                    onChange={(e) => handleInputChange('ratingScore', e.target.value)}
                    placeholder="9.5"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="ratingCritic">Critique</Label>
                <Input
                  id="ratingCritic"
                  value={formData.ratingCritic}
                  onChange={(e) => handleInputChange('ratingCritic', e.target.value)}
                  placeholder="Robert Parker"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  className="w-full p-3 border border-gray-300 rounded-md resize-none"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Description du vin, notes de dégustation..."
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
                Annuler
              </Button>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Ajouter le vin
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddWineModal;