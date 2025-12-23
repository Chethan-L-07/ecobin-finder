import { MapPin, Clock, Phone, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { EWasteBin } from '@/data/eWasteBins';

interface BinCardProps {
  bin: EWasteBin;
  onViewOnMap?: () => void;
}

const BinCard = ({ bin, onViewOnMap }: BinCardProps) => {
  return (
    <Card className="group overflow-hidden border-border/50 shadow-eco-sm hover:shadow-eco-md transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
              {bin.name}
            </CardTitle>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
              <MapPin className="w-3.5 h-3.5" />
              {bin.area}, {bin.city}
            </p>
          </div>
          <Badge 
            variant="outline" 
            className="bg-eco-light text-eco-dark border-eco shrink-0"
          >
            <CheckCircle className="w-3 h-3 mr-1" />
            Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{bin.address}</p>
        
        <div className="space-y-2">
          <p className="text-xs font-medium text-foreground">Accepts:</p>
          <div className="flex flex-wrap gap-1.5">
            {bin.acceptedItems.slice(0, 4).map((item) => (
              <Badge key={item} variant="secondary" className="text-xs font-normal">
                {item}
              </Badge>
            ))}
            {bin.acceptedItems.length > 4 && (
              <Badge variant="secondary" className="text-xs font-normal">
                +{bin.acceptedItems.length - 4} more
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {bin.operatingHours}
          </span>
          <span className="flex items-center gap-1">
            <Phone className="w-3.5 h-3.5" />
            {bin.contact}
          </span>
        </div>

        {onViewOnMap && (
          <Button 
            onClick={onViewOnMap} 
            className="w-full eco-gradient text-primary-foreground shadow-eco-sm hover:shadow-eco-md"
          >
            <MapPin className="w-4 h-4 mr-2" />
            View on Map
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default BinCard;
