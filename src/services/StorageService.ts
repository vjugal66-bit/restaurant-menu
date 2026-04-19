import type { MenuData } from '../types/Menu';

export interface User {
  id: string;
  username: string;
  password?: string;
  role: 'admin' | 'user';
  name: string;
  purchasedThemes?: string[];
}

export interface GlobalThemeSettings {
  themeId: string;
  status: 'free' | 'paid' | 'offer';
  price: number;
}

export class StorageService {
  private static STORAGE_KEY = 'menu_platform_data';
  private static USERS_KEY = 'menu_platform_users';
  private static GLOBAL_CONFIG_KEY = 'menu_platform_config';

  static getMenuForUser(username: string): MenuData | null {
    const allData = localStorage.getItem(`${this.STORAGE_KEY}_${username}`);
    return allData ? JSON.parse(allData) : null;
  }

  static saveMenuForUser(username: string, data: MenuData): void {
    localStorage.setItem(`${this.STORAGE_KEY}_${username}`, JSON.stringify(data));
  }

  static getUsers(): User[] {
    const users = localStorage.getItem(this.USERS_KEY);
    return users ? JSON.parse(users) : [];
  }

  static saveUsers(users: User[]): void {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  static getThemeSettings(): GlobalThemeSettings[] {
    const config = this.getGlobalConfig();
    return Object.entries(config.themeSettings || {}).map(([themeId, data]: [string, any]) => ({
      themeId,
      ...data
    }));
  }

  static updateThemeSetting(setting: GlobalThemeSettings): void {
    const config = this.getGlobalConfig();
    config.themeSettings = {
      ...config.themeSettings,
      [setting.themeId]: { status: setting.status, price: setting.price }
    };
    this.saveGlobalConfig(config);
  }

  static getGlobalConfig(): any {
    const config = localStorage.getItem(this.GLOBAL_CONFIG_KEY);
    return config ? JSON.parse(config) : { themeSettings: {} };
  }

  static saveGlobalConfig(config: any): void {
    localStorage.setItem(this.GLOBAL_CONFIG_KEY, JSON.stringify(config));
  }

  static initDefaultMenu = this.initUser;
  static getUserByUsername(username: string): User | undefined {
    return this.getUsers().find(u => u.username === username);
  }
  static saveUser(user: User): void {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.username === user.username);
    if (idx !== -1) {
      users[idx] = user;
    } else {
      users.push(user);
    }
    this.saveUsers(users);
  }

  static initUser(username: string, name: string): void {
    const existing = this.getMenuForUser(username);
    if (existing) return;

    const defaultMenu: MenuData = {
      restaurantName: name,
      description: 'Welcome to our digital menu!',
      currencySymbol: '₹',
      categories: [
        {
          id: '1',
          name: 'Signature Dishes',
          items: [
            { id: 'item1', name: 'Premium Special', description: "Our chef's finest creation", price: '25.00' }
          ]
        }
      ],
      theme: {
        themeId: 'onyx-gold',
        templateId: 'classic',
        primaryColor: '#ffd700',
        accentColor: '#000000',
        mode: 'dark',
        viewType: '3d-card',
        layoutType: 'list',
        fontStyle: 'elegant',
        borderStyle: 'solid',
        isPremium: false,
        cardBlur: 10,
        cardOpacity: 0.1,
        cardRadius: 24,
        backgroundTexture: 'none',
        headerAlign: 'center',
        dividerIcon: 'utensils'
      }
    };
    this.saveMenuForUser(username, defaultMenu);
  }
}
