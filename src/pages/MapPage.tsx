import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, List, Grid, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/Layout';
import EWasteMap from '@/components/EWasteMap';
import BinCard from '@/components/BinCard';
import SearchFilter from '@/components/SearchFilter';
import { eWasteBins, eWasteCategories } from '@/data/eWasteBins';

const MapPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBinId, setSelectedBinId] = useState<string | undefined>();
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

  // Filter bins based on search and filters
  const filteredBins = useMemo(() => {
    return eWasteBins.filter((bin) => {
      // Search filter
      const searchMatch = 
        searchQuery === '' ||
        bin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bin.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bin.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bin.pincode.includes(searchQuery);

      // City filter
      const cityMatch = selectedCity === 'all' || bin.city === selectedCity;

      // Category filter
      const categoryMatch = 
        selectedCategory === 'all' ||
        selectedCategory === 'all-electronics' ||
        bin.acceptedItems.some((item) => {
          const category = eWasteCategories.find((c) => c.id === selectedCategory);
          if (!category) return false;
          return item.toLowerCase().includes(category.label.toLowerCase()) ||
                 category.label.toLowerCase().includes(item.toLowerCase());
        });

      return searchMatch && cityMatch && categoryMatch;
    });
  }, [searchQuery, selectedCity, selectedCategory]);

  // Calculate map center based on filtered results
  const mapCenter = useMemo<[number, number]>(() => {
    if (selectedBinId) {
      const bin = filteredBins.find(b => b.id === selectedBinId);
      if (bin) return [bin.lat, bin.lng];
    }
    if (filteredBins.length > 0) {
      const avgLat = filteredBins.reduce((sum, bin) => sum + bin.lat, 0) / filteredBins.length;
      const avgLng = filteredBins.reduce((sum, bin) => sum + bin.lng, 0) / filteredBins.length;
      return [avgLat, avgLng];
    }
    return [20.5937, 78.9629]; // Center of India
  }, [filteredBins, selectedBinId]);

  const handleViewOnMap = (binId: string) => {
    setSelectedBinId(binId);
    setViewMode('map');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Link to="/">
                <Button variant="ghost" size="icon" className="shrink-0">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <h1 className="text-2xl md:text-3xl font-bold">
                <MapPin className="inline w-7 h-7 text-primary mr-2" />
                E-Waste Collection Points
              </h1>
            </div>
            <p className="text-muted-foreground ml-12">
              Found {filteredBins.length} collection points
            </p>
          </div>

          {/* View Toggle */}
          <div className="flex gap-2 ml-12 sm:ml-0">
            <Button
              variant={viewMode === 'map' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('map')}
              className={viewMode === 'map' ? 'eco-gradient text-primary-foreground' : ''}
            >
              <MapPin className="w-4 h-4 mr-2" />
              Map
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'eco-gradient text-primary-foreground' : ''}
            >
              <Grid className="w-4 h-4 mr-2" />
              List
            </Button>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="mb-6">
          <SearchFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCity={selectedCity}
            onCityChange={setSelectedCity}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Content */}
        {viewMode === 'map' ? (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Map */}
            <div className="lg:col-span-2">
              <EWasteMap 
                bins={filteredBins} 
                center={mapCenter}
                zoom={selectedBinId ? 14 : filteredBins.length === 1 ? 12 : 5}
                className="h-[500px] lg:h-[600px]"
                selectedBinId={selectedBinId}
              />
            </div>

            {/* Bin List Sidebar */}
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              <h2 className="font-semibold text-lg sticky top-0 bg-background py-2 z-10">
                Nearby Bins ({filteredBins.length})
              </h2>
              {filteredBins.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No bins found matching your criteria.</p>
                  <p className="text-sm">Try adjusting your search or filters.</p>
                </div>
              ) : (
                filteredBins.map((bin) => (
                  <BinCard 
                    key={bin.id} 
                    bin={bin} 
                    onViewOnMap={() => handleViewOnMap(bin.id)}
                  />
                ))
              )}
            </div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBins.length === 0 ? (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No bins found matching your criteria.</p>
                <p className="text-sm">Try adjusting your search or filters.</p>
              </div>
            ) : (
              filteredBins.map((bin) => (
                <BinCard 
                  key={bin.id} 
                  bin={bin}
                  onViewOnMap={() => handleViewOnMap(bin.id)}
                />
              ))
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MapPage;
