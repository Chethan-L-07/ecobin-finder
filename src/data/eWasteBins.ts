// E-Waste Bin Data - Sample locations across India
export interface EWasteBin {
  id: string;
  name: string;
  area: string;
  city: string;
  pincode: string;
  address: string;
  lat: number;
  lng: number;
  acceptedItems: string[];
  operatingHours: string;
  contact: string;
  status: 'active' | 'pending' | 'inactive';
}

export const eWasteBins: EWasteBin[] = [
  {
    id: '1',
    name: 'Green Tech Recyclers',
    area: 'Koramangala',
    city: 'Bangalore',
    pincode: '560034',
    address: '123 HSR Layout, Koramangala, Bangalore',
    lat: 12.9352,
    lng: 77.6245,
    acceptedItems: ['Laptops', 'Mobile Phones', 'Tablets', 'Chargers', 'Batteries'],
    operatingHours: 'Mon-Sat: 9AM - 6PM',
    contact: '+91 98765 43210',
    status: 'active'
  },
  {
    id: '2',
    name: 'EcoWaste Hub',
    area: 'Indiranagar',
    city: 'Bangalore',
    pincode: '560038',
    address: '456 100 Feet Road, Indiranagar, Bangalore',
    lat: 12.9784,
    lng: 77.6408,
    acceptedItems: ['Computers', 'Monitors', 'Printers', 'Keyboards', 'Mouse'],
    operatingHours: 'Mon-Fri: 10AM - 7PM',
    contact: '+91 98765 43211',
    status: 'active'
  },
  {
    id: '3',
    name: 'RecycleIT Mumbai',
    area: 'Andheri West',
    city: 'Mumbai',
    pincode: '400053',
    address: '789 Link Road, Andheri West, Mumbai',
    lat: 19.1362,
    lng: 72.8296,
    acceptedItems: ['TVs', 'Refrigerators', 'Air Conditioners', 'Washing Machines'],
    operatingHours: 'Daily: 8AM - 8PM',
    contact: '+91 98765 43212',
    status: 'active'
  },
  {
    id: '4',
    name: 'Digital Dispose',
    area: 'Bandra',
    city: 'Mumbai',
    pincode: '400050',
    address: '321 Hill Road, Bandra, Mumbai',
    lat: 19.0596,
    lng: 72.8295,
    acceptedItems: ['Mobile Phones', 'Tablets', 'Smartwatches', 'Earphones'],
    operatingHours: 'Mon-Sat: 9AM - 5PM',
    contact: '+91 98765 43213',
    status: 'active'
  },
  {
    id: '5',
    name: 'E-Cycle Delhi',
    area: 'Connaught Place',
    city: 'Delhi',
    pincode: '110001',
    address: '555 Janpath, Connaught Place, Delhi',
    lat: 28.6315,
    lng: 77.2167,
    acceptedItems: ['All Electronics', 'Batteries', 'Cables', 'Adapters'],
    operatingHours: 'Daily: 10AM - 9PM',
    contact: '+91 98765 43214',
    status: 'active'
  },
  {
    id: '6',
    name: 'GreenBytes',
    area: 'Nehru Place',
    city: 'Delhi',
    pincode: '110019',
    address: '888 Nehru Place Market, Delhi',
    lat: 28.5494,
    lng: 77.2529,
    acceptedItems: ['Computers', 'Laptops', 'Hard Drives', 'RAM', 'Graphics Cards'],
    operatingHours: 'Mon-Sat: 11AM - 8PM',
    contact: '+91 98765 43215',
    status: 'active'
  },
  {
    id: '7',
    name: 'TechRecycle Chennai',
    area: 'T Nagar',
    city: 'Chennai',
    pincode: '600017',
    address: '222 Pondy Bazaar, T Nagar, Chennai',
    lat: 13.0418,
    lng: 80.2341,
    acceptedItems: ['Mobile Phones', 'Laptops', 'Cameras', 'Gaming Consoles'],
    operatingHours: 'Daily: 9AM - 7PM',
    contact: '+91 98765 43216',
    status: 'active'
  },
  {
    id: '8',
    name: 'EcoElectronics Pune',
    area: 'Koregaon Park',
    city: 'Pune',
    pincode: '411001',
    address: '444 North Main Road, Koregaon Park, Pune',
    lat: 18.5362,
    lng: 73.8940,
    acceptedItems: ['All Electronics', 'Appliances', 'Batteries'],
    operatingHours: 'Mon-Fri: 9AM - 6PM',
    contact: '+91 98765 43217',
    status: 'active'
  },
  {
    id: '9',
    name: 'Smart Waste Hyderabad',
    area: 'Hitech City',
    city: 'Hyderabad',
    pincode: '500081',
    address: '666 Cyber Towers, Hitech City, Hyderabad',
    lat: 17.4474,
    lng: 78.3762,
    acceptedItems: ['Servers', 'Networking Equipment', 'UPS', 'Printers'],
    operatingHours: 'Mon-Sat: 10AM - 7PM',
    contact: '+91 98765 43218',
    status: 'active'
  },
  {
    id: '10',
    name: 'RecycleZone Kolkata',
    area: 'Salt Lake',
    city: 'Kolkata',
    pincode: '700091',
    address: '999 Sector V, Salt Lake, Kolkata',
    lat: 22.5726,
    lng: 88.4344,
    acceptedItems: ['Computers', 'Monitors', 'Keyboards', 'Speakers'],
    operatingHours: 'Daily: 8AM - 6PM',
    contact: '+91 98765 43219',
    status: 'active'
  }
];

export const eWasteCategories = [
  { id: 'phones', label: 'Mobile Phones', icon: '📱' },
  { id: 'laptops', label: 'Laptops & Computers', icon: '💻' },
  { id: 'appliances', label: 'Home Appliances', icon: '🔌' },
  { id: 'batteries', label: 'Batteries', icon: '🔋' },
  { id: 'accessories', label: 'Accessories', icon: '🎧' },
  { id: 'all', label: 'All Electronics', icon: '♻️' },
];

export const cities = [...new Set(eWasteBins.map(bin => bin.city))];
