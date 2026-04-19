import React, { useState, useEffect } from 'react';
import { StorageService } from '../../services/StorageService';
import type { GlobalThemeSettings } from '../../services/StorageService';
import { THEME_CATALOG } from '../../data/Themes';
import { Layout, Settings, DollarSign, Tag, CheckCircle } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [settings, setSettings] = useState<GlobalThemeSettings[]>([]);
  const [activeTab, setActiveTab] = useState<'themes' | 'users'>('themes');

  useEffect(() => {
    setSettings(StorageService.getThemeSettings());
  }, []);

  const handleUpdate = (themeId: string, status: 'free' | 'paid' | 'offer', price: number) => {
    const newSetting: GlobalThemeSettings = { themeId, status, price };
    StorageService.updateThemeSetting(newSetting);
    setSettings(StorageService.getThemeSettings());
  };

  return (
    <div style={{ padding: '4rem', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Admin Control Center</h1>
          <p style={{ opacity: 0.6 }}>Manage themes, pricing, and global platform settings.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            className={`btn ${activeTab === 'themes' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('themes')}
          >
            <Layout size={20} /> Themes
          </button>
          <button 
            className={`btn ${activeTab === 'users' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('users')}
          >
            <Settings size={20} /> System
          </button>
        </div>
      </header>

      {activeTab === 'themes' && (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {THEME_CATALOG.map(theme => {
            const current = settings.find(s => s.themeId === theme.themeId) || { status: theme.status, price: theme.price || 0 };
            return (
              <div key={theme.themeId} className="glass" style={{ padding: '2rem', borderRadius: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: theme.previewColor, border: '1px solid var(--glass-border)' }}></div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>{theme.name}</h3>
                    <p style={{ fontSize: '0.9rem', opacity: 0.5 }}>{theme.description}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.7rem', opacity: 0.5 }}>STATUS</label>
                    <select 
                      value={current.status}
                      onChange={(e) => handleUpdate(theme.themeId, e.target.value as any, current.price)}
                      className="glass"
                      style={{ padding: '0.5rem 1rem', borderRadius: '8px', color: 'white', border: '1px solid var(--glass-border)', background: 'transparent' }}
                    >
                      <option value="free">Free</option>
                      <option value="paid">Paid</option>
                      <option value="offer">Special Offer</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.7rem', opacity: 0.5 }}>PRICE (₹)</label>
                    <input 
                      type="number"
                      value={current.price}
                      onChange={(e) => handleUpdate(theme.themeId, current.status, parseInt(e.target.value) || 0)}
                      className="glass"
                      style={{ width: '100px', padding: '0.5rem', borderRadius: '8px', color: 'white', border: '1px solid var(--glass-border)' }}
                      disabled={current.status === 'free'}
                    />
                  </div>
                  
                  <div style={{ color: current.status === 'free' ? '#4ade80' : '#818cf8' }}>
                    {current.status === 'free' ? <CheckCircle size={24} /> : <DollarSign size={24} />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'users' && (
        <div className="glass" style={{ padding: '4rem', textAlign: 'center', borderRadius: '24px' }}>
          <Tag size={48} style={{ marginBottom: '1.5rem', opacity: 0.2 }} />
          <h3>System Analytics & Global Offers</h3>
          <p style={{ opacity: 0.5, maxWidth: '400px', margin: '1rem auto' }}>
            Analytics and bulk user management will be available in the next system update.
          </p>
        </div>
      )}
    </div>
  );
};
