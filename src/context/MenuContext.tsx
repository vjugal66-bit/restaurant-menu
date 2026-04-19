import React, { createContext, useContext, useState, useEffect } from 'react';
import { StorageService } from '../services/StorageService';
import { useAuth } from './AuthContext';

import type { MenuItem, Category, MenuData } from '../types/Menu';

interface MenuContextType {
  menu: MenuData | null;
  loading: boolean;
  loadMenu: (username: string) => void;
  updateMenu: (menu: Partial<MenuData>) => void;
  addCategory: (name: string) => void;
  addItem: (categoryId: string, item: Omit<MenuItem, 'id'>) => void;
  removeItem: (categoryId: string, itemId: string) => void;
  removeCategory: (categoryId: string) => void;
  reorderCategory: (categoryId: string, direction: 'up' | 'down') => void;
  reorderItem: (categoryId: string, itemId: string, direction: 'up' | 'down') => void;
  saveMenu: () => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [menu, setMenu] = useState<MenuData | null>(null);
  const [loading, setLoading] = useState(true);

  const loadMenu = (username: string) => {
    setLoading(true);
    const data = StorageService.getMenuForUser(username);
    if (data && !data.theme.primaryColor) {
      // Migrate old menus to include theme defaults
      data.theme = {
        ...data.theme,
        templateId: 'classic',
        primaryColor: '#ffd700',
        accentColor: '#000000',
        borderStyle: 'solid',
        fontStyle: 'elegant',
        cardBlur: 10,
        cardOpacity: 0.1,
        cardRadius: 24,
        backgroundTexture: 'none',
        headerAlign: 'center',
        dividerIcon: 'utensils'
      };
    } else if (data && data.theme && data.theme.templateId === undefined) {
      // Add templateId to themes that have pro features but missing template selection
      data.theme = {
        ...data.theme,
        templateId: 'classic'
      };
    }
    setMenu(data);
    setLoading(false);
  };

  const updateMenu = (newData: Partial<MenuData>) => {
    if (!menu) return;
    setMenu(prev => {
      if (!prev) return null;
      return { ...prev, ...newData, currencySymbol: newData.currencySymbol || prev.currencySymbol || '₹' };
    });
  };

  const addCategory = (name: string) => {
    if (!menu) return;
    const newCategory: Category = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      items: []
    };
    setMenu(prev => prev ? ({ ...prev, categories: [...prev.categories, newCategory] }) : null);
  };

  const addItem = (categoryId: string, item: Omit<MenuItem, 'id'>) => {
    if (!menu) return;
    const newItem = { ...item, id: Math.random().toString(36).substr(2, 9) };
    setMenu(prev => prev ? ({
      ...prev,
      categories: prev.categories.map(cat => 
        cat.id === categoryId ? { ...cat, items: [...cat.items, newItem] } : cat
      )
    }) : null);
  };

  const removeItem = (categoryId: string, itemId: string) => {
    if (!menu) return;
    setMenu(prev => prev ? ({
      ...prev,
      categories: prev.categories.map(cat => 
        cat.id === categoryId ? { ...cat, items: cat.items.filter(i => i.id !== itemId) } : cat
      )
    }) : null);
  };

  const removeCategory = (categoryId: string) => {
    if (!menu) return;
    setMenu(prev => prev ? ({
      ...prev,
      categories: prev.categories.filter(cat => cat.id !== categoryId)
    }) : null);
  };

  const reorderCategory = (categoryId: string, direction: 'up' | 'down') => {
    if (!menu) return;
    const index = menu.categories.findIndex(c => c.id === categoryId);
    if (index === -1) return;
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === menu.categories.length - 1) return;

    const newCategories = [...menu.categories];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newCategories[index], newCategories[targetIndex]] = [newCategories[targetIndex], newCategories[index]];
    
    updateMenu({ categories: newCategories });
  };

  const reorderItem = (categoryId: string, itemId: string, direction: 'up' | 'down') => {
    if (!menu) return;
    const categoryIndex = menu.categories.findIndex(c => c.id === categoryId);
    if (categoryIndex === -1) return;

    const items = [...menu.categories[categoryIndex].items];
    const itemIndex = items.findIndex(i => i.id === itemId);
    if (itemIndex === -1) return;
    if (direction === 'up' && itemIndex === 0) return;
    if (direction === 'down' && itemIndex === items.length - 1) return;

    const targetIndex = direction === 'up' ? itemIndex - 1 : itemIndex + 1;
    [items[itemIndex], items[targetIndex]] = [items[targetIndex], items[itemIndex]];

    const newCategories = [...menu.categories];
    newCategories[categoryIndex] = { ...newCategories[categoryIndex], items };
    updateMenu({ categories: newCategories });
  };

  const saveMenu = () => {
    if (menu && user) {
      StorageService.saveMenuForUser(user.username, menu);
    }
  };

  // Auto-save when menu changes for logged in user
  useEffect(() => {
    if (menu && user) {
      saveMenu();
    }
  }, [menu]);

  return (
    <MenuContext.Provider value={{ 
      menu, 
      loading, 
      loadMenu, 
      updateMenu, 
      addCategory, 
      addItem, 
      removeItem, 
      removeCategory,
      reorderCategory,
      reorderItem,
      saveMenu 
    }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) throw new Error('useMenu must be used within a MenuProvider');
  return context;
};
