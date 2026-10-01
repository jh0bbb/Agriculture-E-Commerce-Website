export interface Product {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  farmer: string;
  farmerId: string;
  location: string;
  price: number;
  unit: string;
  stock: number;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  featured: boolean;
  tags: string[];
}

export interface Farmer {
  id: string;
  name: string;
  location: string;
  image: string;
  productCount: number;
  rating: number;
  completedOrders: number;
  joinedDate: string;
  description: string;
}

export interface Order {
  id: string;
  date: string;
  items: { product: Product; quantity: number }[];
  total: number;
  payment: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  trackingSteps: { label: string; done: boolean; active: boolean; date?: string }[];
  deliveryAddress: string;
  estimatedDelivery: string;
}

export interface Notification {
  id: string;
  icon: string;
  message: string;
  time: string;
  read: boolean;
  type: 'order' | 'delivery' | 'wishlist' | 'sale';
}

export const categories = [
  { slug: 'grains', name: 'Grains', icon: '🌾', count: 42, image: 'https://images.unsplash.com/photo-1651981350249-6173caeeb660?w=400&h=300&fit=crop&auto=format' },
  { slug: 'vegetables', name: 'Vegetables', icon: '🥬', count: 128, image: 'https://images.unsplash.com/photo-1591586116988-62fe65164f8d?w=400&h=300&fit=crop&auto=format' },
  { slug: 'fruits', name: 'Fruits', icon: '🍎', count: 86, image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=400&h=300&fit=crop&auto=format' },
  { slug: 'seeds', name: 'Seeds', icon: '🌱', count: 34, image: 'https://images.unsplash.com/photo-1573605954553-a39394846cfc?w=400&h=300&fit=crop&auto=format' },
  { slug: 'fertilizers', name: 'Fertilizers', icon: '🧪', count: 29, image: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=400&h=300&fit=crop&auto=format' },
  { slug: 'supplies', name: 'Agricultural Supplies', icon: '🚜', count: 57, image: 'https://images.unsplash.com/photo-1708955029891-98738cd0361f?w=400&h=300&fit=crop&auto=format' },
];

export const farmers: Farmer[] = [
  {
    id: 'f1',
    name: 'Mang Rolando Cruz',
    location: 'Nueva Ecija, Luzon',
    image: 'https://images.unsplash.com/photo-1743585497049-7f7cd13daf78?w=200&h=200&fit=crop&auto=format',
    productCount: 14,
    rating: 4.9,
    completedOrders: 328,
    joinedDate: 'March 2023',
    description: 'Third-generation rice farmer from Nueva Ecija with 20+ years of experience growing premium varieties.',
  },
  {
    id: 'f2',
    name: 'Aling Nena Reyes',
    location: 'Benguet, Cordillera',
    image: 'https://images.unsplash.com/photo-1545830790-68595959c491?w=200&h=200&fit=crop&auto=format',
    productCount: 22,
    rating: 4.8,
    completedOrders: 512,
    joinedDate: 'January 2022',
    description: 'Highland vegetable grower specializing in organic produce from the cool mountains of Benguet.',
  },
  {
    id: 'f3',
    name: 'Tatay Ben Villanueva',
    location: 'Davao, Mindanao',
    image: 'https://images.unsplash.com/photo-1614074662813-25f956a0b9aa?w=200&h=200&fit=crop&auto=format',
    productCount: 18,
    rating: 4.7,
    completedOrders: 241,
    joinedDate: 'June 2023',
    description: 'Tropical fruit farmer from Davao, known for premium mangoes, bananas, and durian.',
  },
];

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Premium Sinandomeng Rice',
    category: 'Grains',
    categorySlug: 'grains',
    farmer: 'Mang Rolando Cruz',
    farmerId: 'f1',
    location: 'Nueva Ecija, Luzon',
    price: 55,
    unit: 'kg',
    stock: 250,
    rating: 4.8,
    reviewCount: 124,
    image: 'https://images.unsplash.com/photo-1728895604559-a4e16081504e?w=600&h=500&fit=crop&auto=format',
    description: 'Premium quality Sinandomeng rice, freshly harvested from the fertile plains of Nueva Ecija. Known for its excellent aroma, long grains, and superior taste. Perfect for everyday meals.',
    featured: true,
    tags: ['organic', 'premium', 'local'],
  },
  {
    id: 'p2',
    name: 'Organic Mountain Cabbage',
    category: 'Vegetables',
    categorySlug: 'vegetables',
    farmer: 'Aling Nena Reyes',
    farmerId: 'f2',
    location: 'Benguet, Cordillera',
    price: 45,
    unit: 'kg',
    stock: 80,
    rating: 4.7,
    reviewCount: 89,
    image: 'https://images.unsplash.com/photo-1591586116988-62fe65164f8d?w=600&h=500&fit=crop&auto=format',
    description: 'Crisp, fresh cabbage grown in the cool highlands of Benguet. Organically cultivated without synthetic pesticides. Rich in nutrients and perfect for sautéed dishes, soups, and salads.',
    featured: true,
    tags: ['organic', 'highland', 'fresh'],
  },
  {
    id: 'p3',
    name: 'Carabao Mango — Premium',
    category: 'Fruits',
    categorySlug: 'fruits',
    farmer: 'Tatay Ben Villanueva',
    farmerId: 'f3',
    location: 'Davao, Mindanao',
    price: 120,
    unit: 'kg',
    stock: 60,
    rating: 4.9,
    reviewCount: 203,
    image: 'https://images.unsplash.com/photo-1757281096599-b9165ba74008?w=600&h=500&fit=crop&auto=format',
    description: 'World-renowned Philippine Carabao mangoes, considered among the sweetest in the world. Harvested at peak ripeness from Davao farms. Ideal for fresh eating, juices, and desserts.',
    featured: true,
    tags: ['premium', 'sweet', 'export-quality'],
  },
  {
    id: 'p4',
    name: 'Red Tomatoes — Market Grade',
    category: 'Vegetables',
    categorySlug: 'vegetables',
    farmer: 'Aling Nena Reyes',
    farmerId: 'f2',
    location: 'Benguet, Cordillera',
    price: 60,
    unit: 'kg',
    stock: 120,
    rating: 4.6,
    reviewCount: 67,
    image: 'https://images.unsplash.com/photo-1485637701894-09ad422f6de6?w=600&h=500&fit=crop&auto=format',
    description: 'Fresh, ripe red tomatoes grown in the highlands of Benguet. Firm, juicy, and ideal for cooking or fresh salads. Pesticide-free and harvested daily for maximum freshness.',
    featured: true,
    tags: ['fresh', 'highland', 'market-grade'],
  },
  {
    id: 'p5',
    name: 'Yellow Corn — Sweet Variety',
    category: 'Grains',
    categorySlug: 'grains',
    farmer: 'Mang Rolando Cruz',
    farmerId: 'f1',
    location: 'Nueva Ecija, Luzon',
    price: 35,
    unit: 'kg',
    stock: 180,
    rating: 4.5,
    reviewCount: 45,
    image: 'https://images.unsplash.com/photo-1573605954553-a39394846cfc?w=600&h=500&fit=crop&auto=format',
    description: 'Fresh sweet yellow corn, harvested at peak sweetness. Perfect for boiling, grilling, or processing. Locally grown and carefully selected for quality.',
    featured: false,
    tags: ['sweet', 'fresh', 'local'],
  },
  {
    id: 'p6',
    name: 'Assorted Fresh Vegetables',
    category: 'Vegetables',
    categorySlug: 'vegetables',
    farmer: 'Aling Nena Reyes',
    farmerId: 'f2',
    location: 'Benguet, Cordillera',
    price: 280,
    unit: 'box',
    stock: 40,
    rating: 4.8,
    reviewCount: 156,
    image: 'https://images.unsplash.com/photo-1557844352-761f2565b576?w=600&h=500&fit=crop&auto=format',
    description: 'Seasonal assortment of fresh highland vegetables. Each box contains a curated selection of what\'s freshly harvested — typically includes carrots, beans, sayote, pechay, and lettuce.',
    featured: true,
    tags: ['assorted', 'seasonal', 'highland'],
  },
  {
    id: 'p7',
    name: 'Mixed Tropical Fruits Basket',
    category: 'Fruits',
    categorySlug: 'fruits',
    farmer: 'Tatay Ben Villanueva',
    farmerId: 'f3',
    location: 'Davao, Mindanao',
    price: 350,
    unit: 'basket',
    stock: 25,
    rating: 4.7,
    reviewCount: 78,
    image: 'https://images.unsplash.com/photo-1605027990121-cbae9e0642df?w=600&h=500&fit=crop&auto=format',
    description: 'A vibrant selection of tropical fruits from Mindanao. Each basket includes mangoes, bananas, papaya, pineapple, and seasonal additions. Perfect for gifting or family consumption.',
    featured: false,
    tags: ['tropical', 'assorted', 'gift'],
  },
  {
    id: 'p8',
    name: 'Organic Palay Seeds — NSIC RC 222',
    category: 'Seeds',
    categorySlug: 'seeds',
    farmer: 'Mang Rolando Cruz',
    farmerId: 'f1',
    location: 'Nueva Ecija, Luzon',
    price: 180,
    unit: 'bag (5kg)',
    stock: 90,
    rating: 4.6,
    reviewCount: 34,
    image: 'https://images.unsplash.com/photo-1635562985686-4f8bb9c0d3bf?w=600&h=500&fit=crop&auto=format',
    description: 'Certified NSIC RC 222 palay seeds, ideal for lowland irrigated conditions. High-yielding variety with excellent milling recovery and good eating quality.',
    featured: false,
    tags: ['certified', 'high-yield', 'NSIC'],
  },
];

export const mockOrders: Order[] = [
  {
    id: 'AG-2026-00125',
    date: 'September 28, 2026',
    items: [{ product: products[0], quantity: 10 }],
    total: 550,
    payment: 'GCash',
    status: 'Processing',
    deliveryAddress: '123 Magsaysay St., Barangay San Jose, Quezon City, Metro Manila',
    estimatedDelivery: 'October 3–5, 2026',
    trackingSteps: [
      { label: 'Order Placed', done: true, active: false, date: 'Sep 28, 2026 2:14 PM' },
      { label: 'Order Confirmed', done: true, active: false, date: 'Sep 28, 2026 4:30 PM' },
      { label: 'Preparing', done: false, active: true, date: '' },
      { label: 'Shipped', done: false, active: false, date: '' },
      { label: 'Delivered', done: false, active: false, date: '' },
    ],
  },
  {
    id: 'AG-2026-00098',
    date: 'September 15, 2026',
    items: [
      { product: products[1], quantity: 3 },
      { product: products[3], quantity: 2 },
    ],
    total: 255,
    payment: 'Cash on Delivery',
    status: 'Delivered',
    deliveryAddress: '123 Magsaysay St., Barangay San Jose, Quezon City, Metro Manila',
    estimatedDelivery: 'September 20, 2026',
    trackingSteps: [
      { label: 'Order Placed', done: true, active: false, date: 'Sep 15, 2026 10:02 AM' },
      { label: 'Order Confirmed', done: true, active: false, date: 'Sep 15, 2026 11:45 AM' },
      { label: 'Preparing', done: true, active: false, date: 'Sep 16, 2026 8:00 AM' },
      { label: 'Shipped', done: true, active: false, date: 'Sep 17, 2026 7:30 AM' },
      { label: 'Delivered', done: true, active: false, date: 'Sep 20, 2026 3:15 PM' },
    ],
  },
  {
    id: 'AG-2026-00077',
    date: 'August 30, 2026',
    items: [{ product: products[2], quantity: 2 }],
    total: 240,
    payment: 'Maya',
    status: 'Delivered',
    deliveryAddress: '123 Magsaysay St., Barangay San Jose, Quezon City, Metro Manila',
    estimatedDelivery: 'September 5, 2026',
    trackingSteps: [
      { label: 'Order Placed', done: true, active: false, date: 'Aug 30, 2026' },
      { label: 'Order Confirmed', done: true, active: false, date: 'Aug 30, 2026' },
      { label: 'Preparing', done: true, active: false, date: 'Aug 31, 2026' },
      { label: 'Shipped', done: true, active: false, date: 'Sep 1, 2026' },
      { label: 'Delivered', done: true, active: false, date: 'Sep 5, 2026' },
    ],
  },
];

export const notifications: Notification[] = [
  { id: 'n1', icon: '🛒', message: 'Your order #AG-2026-00125 has been confirmed.', time: '2 hours ago', read: false, type: 'order' },
  { id: 'n2', icon: '🚚', message: 'Your order #AG-2026-00098 has been shipped by LBC Express.', time: '3 days ago', read: false, type: 'delivery' },
  { id: 'n3', icon: '📦', message: 'Your order #AG-2026-00077 has been delivered. Rate your purchase!', time: '1 week ago', read: true, type: 'delivery' },
  { id: 'n4', icon: '🌾', message: 'Premium Sinandomeng Rice is back in stock — 250 kg available now.', time: '2 weeks ago', read: true, type: 'wishlist' },
  { id: 'n5', icon: '💰', message: 'Carabao Mango on your wishlist is now 10% off until Oct 5.', time: '3 weeks ago', read: true, type: 'sale' },
];

export const messages = [
  {
    id: 'm1',
    farmer: 'Mang Rolando Cruz',
    product: 'Premium Sinandomeng Rice',
    lastMessage: 'Your order will be packed and ready for pickup by tomorrow morning.',
    time: '1 hour ago',
    unread: 2,
    avatar: 'https://images.unsplash.com/photo-1743585497049-7f7cd13daf78?w=60&h=60&fit=crop&auto=format',
    conversation: [
      { from: 'me', text: 'Hello! I ordered 10kg of your Sinandomeng rice. When will it be ready?', time: '2 hours ago' },
      { from: 'farmer', text: 'Good day! Thank you for your order. I am packing it now.', time: '1.5 hours ago' },
      { from: 'farmer', text: 'Your order will be packed and ready for pickup by tomorrow morning.', time: '1 hour ago' },
    ],
  },
  {
    id: 'm2',
    farmer: 'Aling Nena Reyes',
    product: 'Organic Mountain Cabbage',
    lastMessage: 'Yes, all vegetables are freshly harvested today.',
    time: '3 days ago',
    unread: 0,
    avatar: 'https://images.unsplash.com/photo-1545830790-68595959c491?w=60&h=60&fit=crop&auto=format',
    conversation: [
      { from: 'me', text: 'Are the vegetables fresh?', time: '3 days ago' },
      { from: 'farmer', text: 'Yes, all vegetables are freshly harvested today.', time: '3 days ago' },
    ],
  },
];
