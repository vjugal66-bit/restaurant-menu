export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image?: string;
  badge?: string;
  badgeColor?: string;
}

export interface Category {
  id: string;
  name: string;
  items: MenuItem[];
}

export type LayoutType = 'list' | 'grid' | 'cols-2';
export type FontStyle = 'modern' | 'elegant' | 'playful' | 'minimal';
export type BorderStyle = 'none' | 'solid' | 'dashed' | 'elegant-line';
export type BackgroundTexture = 'none' | 'grain' | 'mesh' | 'dots';

export interface MenuTheme {
  themeId: string;
  templateId: string; // New field for pre-set artistic templates
  primaryColor: string;
  accentColor: string;
  mode: 'dark' | 'light';
  viewType: '3d-card' | 'classic' | 'grid';
  layoutType: LayoutType;
  fontStyle: FontStyle;
  borderStyle: BorderStyle;
  isPremium: boolean;
  
  // Pro Customizations
  cardBlur: number;
  cardOpacity: number;
  cardRadius: number;
  backgroundTexture: BackgroundTexture;
  headerAlign: 'left' | 'center' | 'right';
  dividerIcon: 'utensils' | 'leaf' | 'star' | 'none';
}

export interface MenuData {
  restaurantName: string;
  description: string;
  currencySymbol: string;
  logo?: string;
  categories: Category[];
  theme: MenuTheme;
}
