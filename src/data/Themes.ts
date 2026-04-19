import type { LayoutType, FontStyle, BorderStyle, BackgroundTexture } from '../types/Menu';

export interface ThemeConfig {
  themeId: string;
  name: string;
  description: string;
  templateId: string;
  primaryColor: string;
  accentColor: string;
  mode: 'light' | 'dark';
  viewType: '3d-card' | 'classic' | 'grid';
  layoutType: LayoutType;
  fontStyle: FontStyle;
  borderStyle: BorderStyle;
  isPremium: boolean;
  status: 'free' | 'paid' | 'offer';
  price?: number;
  previewColor: string;
  
  // Pro fields
  cardBlur?: number;
  cardOpacity?: number;
  cardRadius?: number;
  backgroundTexture?: BackgroundTexture;
  headerAlign?: 'left' | 'center' | 'right';
  dividerIcon?: 'utensils' | 'leaf' | 'star' | 'none';
}

export const THEME_CATALOG: ThemeConfig[] = [
  {
    themeId: 'onyx-gold',
    name: 'Onyx & Gold',
    description: 'Ultra-premium dark aesthetic with glassmorphism.',
    templateId: 'classic',
    primaryColor: '#ffd700',
    accentColor: '#000000',
    mode: 'dark',
    viewType: '3d-card',
    layoutType: 'grid',
    fontStyle: 'modern',
    borderStyle: 'none',
    isPremium: false,
    status: 'free',
    previewColor: '#1a1a1a',
    cardBlur: 10,
    cardOpacity: 0.1,
    cardRadius: 24,
    backgroundTexture: 'none',
    headerAlign: 'center',
    dividerIcon: 'utensils'
  },
  {
    themeId: 'minimal-snow',
    name: 'Minimal Snow',
    description: 'Clean, light, and focused on your content.',
    templateId: 'classic',
    primaryColor: '#000000',
    accentColor: '#ffffff',
    mode: 'light',
    viewType: '3d-card',
    layoutType: 'list',
    fontStyle: 'minimal',
    borderStyle: 'solid',
    isPremium: false,
    status: 'free',
    previewColor: '#f5f5f7',
    cardBlur: 5,
    cardOpacity: 0.05,
    cardRadius: 16,
    headerAlign: 'left',
    dividerIcon: 'none'
  },
  {
    themeId: 'royal-velvet',
    name: 'Royal Velvet',
    description: 'Deep purple and white for a regal feel.',
    templateId: 'classic',
    primaryColor: '#6366f1',
    accentColor: '#ffffff',
    mode: 'dark',
    viewType: '3d-card',
    layoutType: 'grid',
    fontStyle: 'elegant',
    borderStyle: 'elegant-line',
    isPremium: true,
    status: 'paid',
    price: 499,
    previewColor: '#4338ca',
    dividerIcon: 'star'
  },
  {
    themeId: 'matcha-eco',
    name: 'Matcha Eco',
    description: 'Organic greens and soft earth tones.',
    templateId: 'classic',
    primaryColor: '#4ade80',
    accentColor: '#000000',
    mode: 'light',
    viewType: '3d-card',
    layoutType: 'grid',
    fontStyle: 'modern',
    borderStyle: 'none',
    isPremium: true,
    status: 'offer',
    price: 199,
    previewColor: '#dcfce7',
    dividerIcon: 'leaf'
  }
];
