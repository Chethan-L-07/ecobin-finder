import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Clock, Phone, CheckCircle, Navigation } from 'lucide-react';
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
        <svg style="transform: rotate(45deg); width: 18px; height: 18px;" fill="none" stroke="white" viewBox="0 0 24 24">
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

// User location marker icon
const createUserLocationIcon = () => {
  return L.divIcon({
    html: `
      <div style="
        width: 20px;
        height: 20px;
        background: #3b82f6;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 0 0 2px #3b82f6, 0 4px 12px rgba(59, 130, 246, 0.5);
        position: relative;
      ">
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 6px;
          height: 6px;
          background: white;
          border-radius: 50%;
        "></div>
      </div>
    `,
    className: 'user-location-icon',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

interface EWasteMapProps {
  bins: EWasteBin[];
  center?: [number, number];
  zoom?: number;
  className?: string;
  selectedBinId?: string;
  userLocation?: { latitude: number; longitude: number } | null;
  centerOnUser?: boolean;
  onCenterComplete?: () => void;
}

function EWasteMap({ 
  bins, 
  center = [20.5937, 78.9629],
  zoom = 5,
  className = '',
  selectedBinId,
  userLocation,
  centerOnUser,
  onCenterComplete
}: EWasteMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const userMarkerRef = useRef<L.Marker | null>(null);
  const userCirclesRef = useRef<L.Circle[]>([]);

  const openDirections = (lat: number, lng: number) => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
  };

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView(center, zoom);
    mapInstanceRef.current = map;

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update markers when bins change
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const map = mapInstanceRef.current;
    const customIcon = createCustomIcon();

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers
    bins.forEach((bin) => {
      const marker = L.marker([bin.lat, bin.lng], { icon: customIcon })
        .addTo(map)
        .bindPopup(`
          <div style="padding: 4px; min-width: 250px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
              <h3 style="font-weight: bold; font-size: 14px; color: #1a1a1a; margin: 0;">${bin.name}</h3>
              <span style="font-size: 11px; padding: 2px 8px; border-radius: 999px; background: #dcfce7; color: #166534;">Active</span>
            </div>
            <p style="font-size: 13px; color: #666; margin: 0 0 8px 0;">📍 ${bin.address}</p>
            <div style="margin-bottom: 8px;">
              <p style="font-size: 11px; font-weight: 500; color: #333; margin: 0 0 4px 0;">Accepts:</p>
              <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                ${bin.acceptedItems.slice(0, 3).map(item => 
                  `<span style="font-size: 11px; padding: 2px 8px; border-radius: 999px; background: #f0f0f0; color: #333;">${item}</span>`
                ).join('')}
                ${bin.acceptedItems.length > 3 ? `<span style="font-size: 11px; padding: 2px 8px; border-radius: 999px; background: #f0f0f0; color: #333;">+${bin.acceptedItems.length - 3}</span>` : ''}
              </div>
            </div>
            <p style="font-size: 12px; color: #666; margin: 0 0 4px 0;">🕐 ${bin.operatingHours}</p>
            <p style="font-size: 12px; color: #666; margin: 0 0 12px 0;">📞 ${bin.contact}</p>
            <button 
              onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${bin.lat},${bin.lng}', '_blank')"
              style="
                width: 100%;
                padding: 8px 16px;
                border: none;
                border-radius: 8px;
                font-size: 13px;
                font-weight: 500;
                color: white;
                background: linear-gradient(135deg, #16a34a 0%, #0d9488 100%);
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
              "
            >
              🧭 Get Directions
            </button>
          </div>
        `, { maxWidth: 320 });

      markersRef.current.push(marker);
    });
  }, [bins]);

  // Handle selected bin
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedBinId) return;

    const selectedBin = bins.find(b => b.id === selectedBinId);
    if (selectedBin) {
      mapInstanceRef.current.flyTo([selectedBin.lat, selectedBin.lng], 14, { duration: 1.5 });
    }
  }, [selectedBinId, bins]);

  // Handle user location marker and radius circles
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Remove existing user marker and circles
    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
      userMarkerRef.current = null;
    }
    userCirclesRef.current.forEach(circle => circle.remove());
    userCirclesRef.current = [];

    // Add new user marker and circles if location exists
    if (userLocation) {
      const map = mapInstanceRef.current;
      const userIcon = createUserLocationIcon();
      
      // Add radius circles (walking ~1km, driving ~5km)
      const walkingCircle = L.circle(
        [userLocation.latitude, userLocation.longitude],
        {
          radius: 1000, // 1km in meters
          color: '#3b82f6',
          fillColor: '#3b82f6',
          fillOpacity: 0.08,
          weight: 2,
          dashArray: '5, 5',
        }
      ).addTo(map).bindTooltip('~15 min walk', { permanent: false, direction: 'top' });

      const drivingCircle = L.circle(
        [userLocation.latitude, userLocation.longitude],
        {
          radius: 5000, // 5km in meters
          color: '#8b5cf6',
          fillColor: '#8b5cf6',
          fillOpacity: 0.04,
          weight: 2,
          dashArray: '10, 6',
        }
      ).addTo(map).bindTooltip('~10 min drive', { permanent: false, direction: 'top' });

      userCirclesRef.current = [walkingCircle, drivingCircle];

      // Add user marker on top
      userMarkerRef.current = L.marker(
        [userLocation.latitude, userLocation.longitude],
        { icon: userIcon, zIndexOffset: 1000 }
      )
        .addTo(map)
        .bindPopup(`
          <div style="padding: 8px; text-align: center;">
            <strong style="color: #3b82f6;">📍 Your Location</strong>
            <p style="font-size: 11px; color: #666; margin: 4px 0 0 0;">
              Blue: ~1km walking<br/>Purple: ~5km driving
            </p>
          </div>
        `);
    }
  }, [userLocation]);

  // Handle center on user request
  useEffect(() => {
    if (!mapInstanceRef.current || !centerOnUser || !userLocation) return;

    mapInstanceRef.current.flyTo(
      [userLocation.latitude, userLocation.longitude],
      14,
      { duration: 1 }
    );
    onCenterComplete?.();
  }, [centerOnUser, userLocation, onCenterComplete]);

  return (
    <div className={`rounded-xl overflow-hidden shadow-eco-lg border border-border/50 ${className}`}>
      <div ref={mapRef} className="w-full h-full min-h-[400px]" />
    </div>
  );
}

export default EWasteMap;