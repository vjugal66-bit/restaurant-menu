import Template1 from './Template1';
import Template2 from './Template2';
import Template3 from './Template3';
import Template4 from './Template4';

export const TEMPLATE_REGISTRY: Record<string, any> = {
  'classic': null, // Marker for our original advanced layout
  'temp1': Template1,
  'temp2': Template2,
  'temp3': Template3,
  'temp4': Template4
};

export const MOCK_MENU = {
  restaurantName: "Poster Café",
  description: "Specialized in artisanal recipes & designer beverages.",
  currencySymbol: "₹",
  categories: [
    {
      id: 'mock1',
      name: 'Specialties',
      items: [
        { id: 'mi1', name: 'Signature Dish', description: 'Handcrafted seasonal ingredients', price: '450', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c' },
        { id: 'mi2', name: 'Premium Platter', description: 'Slow cooked organic herbs', price: '890', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836' }
      ]
    }
  ],
  theme: { templateId: 'classic' }
};

export const TEMPLATES_METADATA = [
  {
    id: 'classic',
    name: 'Pro Glass (Classic)',
    description: 'Our advanced 3D glassmorphism layout with full customization.',
    preview: '#1a1a1a'
  },
  {
    id: 'temp1',
    name: 'Botanical Forest',
    description: 'Deep olive greens and elegant serif typography.',
    preview: '#4A6741'
  },
  {
    id: 'temp2',
    name: 'Midnight Diner',
    description: 'Dark textured chalkboard style with golden accents.',
    preview: '#121212'
  },
  {
    id: 'temp3',
    name: 'Tropical Fusion',
    description: 'Vibrant split-screen layout with dynamic image grids.',
    preview: '#45b7d1'
  },
  {
    id: 'temp4',
    name: 'Carrara Luxe',
    description: 'Marble textures and premium minimalist typography.',
    preview: '#f8f5f0'
  }
];
