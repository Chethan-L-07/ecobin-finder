import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { eWasteCategories, cities } from '@/data/eWasteBins';

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCity: string;
  onCityChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
}

const SearchFilter = ({
  searchQuery,
  onSearchChange,
  selectedCity,
  onCityChange,
  selectedCategory,
  onCategoryChange,
}: SearchFilterProps) => {
  return (
    <div className="glass rounded-xl p-4 shadow-eco-sm">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by area, city, or pincode..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-background/50 border-border/50 focus:border-primary"
          />
        </div>

        {/* City Filter */}
        <Select value={selectedCity} onValueChange={onCityChange}>
          <SelectTrigger className="w-full md:w-48 bg-background/50 border-border/50">
            <SelectValue placeholder="All Cities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cities</SelectItem>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Category Filter */}
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-full md:w-56 bg-background/50 border-border/50">
            <SelectValue placeholder="All E-Waste Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All E-Waste Types</SelectItem>
            {eWasteCategories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                <span className="flex items-center gap-2">
                  <span>{category.icon}</span>
                  <span>{category.label}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SearchFilter;
