import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Clock, Phone, CheckCircle, Navigation } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { EWasteBin } from '@/data/eWasteBins';

// Fix for default marker icons in Leaflet with React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom eco-themed marker icon
const createCustomIcon = () => {
  return L.divIcon({
    html: `
      <div style="
        width: 36px;
        height: 36px;
        background: linear-gradient(135deg, #16a34a 0%, #0d9488 100%);
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(22, 163, 74, 0.4);
        border: 2px solid white;
      ">
        <svg style="transform: rotate(45deg); width: 18px; height: 18px; color: white;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
        </svg>
      </div>
    `,
    className: 'custom-marker-icon',
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  });
};

interface MapCenterProps {
  center: [number, number];
  zoom?: number;
}

const MapCenter = ({ center, zoom = 12 }: MapCenterProps) => {
  const map = useMap();
  
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.5 });
  }, [center, zoom, map]);
  
  return null;
};

interface EWasteMapProps {
  bins: EWasteBin[];
  center?: [number, number];
  zoom?: number;
  className?: string;
  selectedBinId?: string;
}

const EWasteMap = ({ 
  bins, 
  center = [20.5937, 78.9629], // Center of India
  zoom = 5,
  className = '',
  selectedBinId
}: EWasteMapProps) => {
  const customIcon = createCustomIcon();
  const mapRef = useRef<L.Map | null>(null);

  const openDirections = (lat: number, lng: number) => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
  };

  return (
    <div className={`rounded-xl overflow-hidden shadow-eco-lg border border-border/50 ${className}`}>
      <MapContainer
        center={center}
        zoom={zoom}
        className="w-full h-full min-h-[400px]"
        ref={mapRef}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {selectedBinId && bins.find(b => b.id === selectedBinId) && (
          <MapCenter 
            center={[
              bins.find(b => b.id === selectedBinId)!.lat,
              bins.find(b => b.id === selectedBinId)!.lng
            ]} 
            zoom={14}
          />
        )}

        {bins.map((bin) => (
          <Marker
            key={bin.id}
            position={[bin.lat, bin.lng]}
            icon={customIcon}
          >
            <Popup className="custom-popup" maxWidth={320}>
              <div className="p-1">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-base text-foreground">{bin.name}</h3>
                  <Badge className="bg-eco-light text-eco-dark border-0 text-xs shrink-0">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Active
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  {bin.address}
                </p>

                <div className="mb-3">
                  <p className="text-xs font-medium mb-1.5">Accepts:</p>
                  <div className="flex flex-wrap gap-1">
                    {bin.acceptedItems.slice(0, 3).map((item) => (
                      <span 
                        key={item}
                        className="text-xs bg-secondary px-2 py-0.5 rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                    {bin.acceptedItems.length > 3 && (
                      <span className="text-xs bg-secondary px-2 py-0.5 rounded-full">
                        +{bin.acceptedItems.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {bin.operatingHours}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" />
                    {bin.contact}
                  </span>
                </div>

                <Button 
                  size="sm" 
                  className="w-full eco-gradient text-primary-foreground"
                  onClick={() => openDirections(bin.lat, bin.lng)}
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Get Directions
                </Button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default EWasteMap;
