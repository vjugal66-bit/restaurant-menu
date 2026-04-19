import React, { useState } from 'react';
import { useMenu } from '../../context/MenuContext';
import { useAuth } from '../../context/AuthContext';
import { Plus, Trash2, Save, Image as ImageIcon, ChevronDown, ChevronUp, Edit3, Palette, Type, Lock, Droplet, Layers, Box, AlignCenter, Tag, Layout } from 'lucide-react';
import { THEME_CATALOG } from '../../data/Themes';
import { TEMPLATES_METADATA } from '../templates/TemplateRegistry';
import { TemplateThumbnail } from './TemplateThumbnail';
import type { ThemeConfig } from '../../data/Themes';
import confetti from 'canvas-confetti';

export const MenuEditor: React.FC = () => {
  const { menu, updateMenu, addCategory, addItem, removeCategory, removeItem, reorderCategory, reorderItem } = useMenu();
  const { user, updateUser } = useAuth();
  const [newCatName, setNewCatName] = useState('');
  const [expandedCat, setExpandedCat] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'content' | 'templates' | 'design'>('content');

  const handleSave = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: [menu?.theme.primaryColor || '#ffd700', '#ffffff', '#000000']
    });
  };

  const handleTemplateSelect = (tempId: string) => {
    if (!menu || !menu.theme) return;
    updateMenu({
      theme: {
        ...menu.theme,
        templateId: tempId
      }
    });
  };

  const handleThemeSelect = (theme: ThemeConfig) => {
    if (!menu || !menu.theme) return;
    const isOwned = !theme.isPremium || (user?.purchasedThemes || []).includes(theme.themeId);
    
    if (!isOwned) {
      if (confirm(`This is a Premium Theme (${theme.price ? '₹' + theme.price : 'Paid'}). Would you like to unlock it? (Mock Purchase)`)) {
        updateUser({ purchasedThemes: [...(user?.purchasedThemes || []), theme.themeId] });
      } else {
        return;
      }
    }

    updateMenu({
      theme: {
        ...menu.theme,
        templateId: menu?.theme?.templateId || 'classic',
        themeId: theme.themeId,
        primaryColor: theme.primaryColor,
        accentColor: theme.accentColor,
        mode: theme.mode,
        viewType: theme.viewType,
        layoutType: theme.layoutType,
        fontStyle: theme.fontStyle,
        borderStyle: theme.borderStyle,
        isPremium: theme.isPremium,
        cardBlur: theme.cardBlur ?? 10,
        cardOpacity: theme.cardOpacity ?? 0.1,
        cardRadius: theme.cardRadius ?? 24,
        backgroundTexture: theme.backgroundTexture ?? 'none',
        headerAlign: theme.headerAlign ?? 'center',
        dividerIcon: theme.dividerIcon ?? 'utensils'
      }
    });
  };

  const updateItem = (catId: string, itemId: string, updates: any) => {
    if (!menu) return;
    const newCategories = menu.categories.map(cat => {
      if (cat.id === catId) {
        return {
          ...cat,
          items: cat.items.map(item => item.id === itemId ? { ...item, ...updates } : item)
        };
      }
      return cat;
    });
    updateMenu({ categories: newCategories });
  };

  if (!menu || !menu.theme) return null;

  return (
    <div className="editor-container glass" style={{
      width: '400px',
      height: '100vh',
      borderRight: '1px solid var(--glass-border)',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 10,
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Tab Header */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--glass-border)' }}>
        <button 
          onClick={() => setActiveTab('content')}
          style={{ 
            flex: 1, padding: '1rem 0.5rem', background: 'none', border: 'none', color: activeTab === 'content' ? 'hsl(var(--primary))' : 'white',
            borderBottom: activeTab === 'content' ? '2px solid hsl(var(--primary))' : 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem'
          }}
        >
          <Edit3 size={16} /> Content
        </button>
        <button 
          onClick={() => setActiveTab('templates')}
          style={{ 
            flex: 1, padding: '1rem 0.5rem', background: 'none', border: 'none', color: activeTab === 'templates' ? 'hsl(var(--primary))' : 'white',
            borderBottom: activeTab === 'templates' ? '2px solid hsl(var(--primary))' : 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem'
          }}
        >
          <Layout size={16} /> Templates
        </button>
        <button 
          onClick={() => setActiveTab('design')}
          style={{ 
            flex: 1, padding: '1rem 0.5rem', background: 'none', border: 'none', color: activeTab === 'design' ? 'hsl(var(--primary))' : 'white',
            borderBottom: activeTab === 'design' ? '2px solid hsl(var(--primary))' : 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem'
          }}
        >
          <Palette size={16} /> Design
        </button>
      </div>

      {/* Scrollable Content Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
        {activeTab === 'content' && (
          <>
            <section style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '0.9rem', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Branding</h3>
              <label style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.7, fontSize: '0.8rem' }}>Café Name</label>
              <input 
                type="text" 
                className="glass"
                value={menu.restaurantName}
                onChange={(e) => updateMenu({ restaurantName: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', color: 'white', border: '1px solid var(--glass-border)', marginBottom: '1rem' }}
              />
              
              <label style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.7, fontSize: '0.8rem' }}>Slogan / Description</label>
              <textarea 
                className="glass"
                value={menu.description}
                onChange={(e) => updateMenu({ description: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', color: 'white', border: '1px solid var(--glass-border)', minHeight: '80px', marginBottom: '1rem' }}
              />

              <label style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.7, fontSize: '0.8rem' }}>Currency</label>
              <select 
                className="glass"
                value={menu.currencySymbol}
                onChange={(e) => updateMenu({ currencySymbol: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', color: 'white', border: '1px solid var(--glass-border)', background: 'transparent' }}
              >
                <option value="₹" style={{ background: '#1a1a1a', color: 'white' }}>Rupees (₹)</option>
                <option value="$" style={{ background: '#1a1a1a', color: 'white' }}>Dollars ($)</option>
                <option value="€" style={{ background: '#1a1a1a', color: 'white' }}>Euros (€)</option>
                <option value="£" style={{ background: '#1a1a1a', color: 'white' }}>Pounds (£)</option>
              </select>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '0.9rem', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Menu Sections</h3>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <input 
                  type="text" 
                  placeholder="Category Name" 
                  className="glass"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  style={{ flex: 1, padding: '0.6rem', borderRadius: '8px', color: 'white', border: '1px solid var(--glass-border)', fontSize: '0.9rem' }}
                />
                <button 
                  className="btn btn-primary" 
                  onClick={() => { if(newCatName) { addCategory(newCatName); setNewCatName(''); } }}
                  style={{ padding: '0.5rem' }}
                >
                  <Plus size={20} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {menu.categories.map((cat, index) => (
                  <div key={cat.id} className="glass" style={{ borderRadius: '12px', overflow: 'hidden' }}>
                    <div 
                      style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', background: expandedCat === cat.id ? 'rgba(255,215,0,0.05)' : 'transparent' }}
                      onClick={() => setExpandedCat(expandedCat === cat.id ? null : cat.id)}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '70%' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <button onClick={(e) => { e.stopPropagation(); reorderCategory(cat.id, 'up'); }} disabled={index === 0} style={{ background: 'none', border: 'none', color: 'white', cursor: index === 0 ? 'default' : 'pointer', opacity: index === 0 ? 0.2 : 0.5, padding: 0 }}><ChevronUp size={14} /></button>
                          <button onClick={(e) => { e.stopPropagation(); reorderCategory(cat.id, 'down'); }} disabled={index === menu.categories.length - 1} style={{ background: 'none', border: 'none', color: 'white', cursor: index === menu.categories.length - 1 ? 'default' : 'pointer', opacity: index === menu.categories.length - 1 ? 0.2 : 0.5, padding: 0 }}><ChevronDown size={14} /></button>
                        </div>
                        <input type="text" value={cat.name} onClick={(e) => e.stopPropagation()} onChange={(e) => {
                          const newCats = menu.categories.map(c => c.id === cat.id ? { ...c, name: e.target.value } : c);
                          updateMenu({ categories: newCats });
                        }}
                          style={{ background: 'none', border: 'none', color: 'white', fontWeight: 600, fontSize: '1rem', width: '100%' }}
                        />
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={(e) => { e.stopPropagation(); removeCategory(cat.id); }} style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer' }}>
                          <Trash2 size={16} />
                        </button>
                        {expandedCat === cat.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                    </div>

                    {expandedCat === cat.id && (
                      <div style={{ padding: '1rem', borderTop: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {cat.items.map((item, iIndex) => (
                          <div key={item.id} className="glass" style={{ padding: '1rem', borderRadius: '12px', position: 'relative' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '70%' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                  <button onClick={() => reorderItem(cat.id, item.id, 'up')} disabled={iIndex === 0} style={{ background: 'none', border: 'none', color: 'white', cursor: iIndex === 0 ? 'default' : 'pointer', opacity: iIndex === 0 ? 0.2 : 0.5, padding: 0 }}><ChevronUp size={12} /></button>
                                  <button onClick={() => reorderItem(cat.id, item.id, 'down')} disabled={iIndex === cat.items.length - 1} style={{ background: 'none', border: 'none', color: 'white', cursor: iIndex === cat.items.length - 1 ? 'default' : 'pointer', opacity: iIndex === cat.items.length - 1 ? 0.2 : 0.5, padding: 0 }}><ChevronDown size={12} /></button>
                                </div>
                                <input type="text" value={item.name} placeholder="Item Name" onChange={(e) => updateItem(cat.id, item.id, { name: e.target.value })}
                                  style={{ background: 'none', border: 'none', color: 'white', fontWeight: 500, fontSize: '0.9rem', width: '100%' }} />
                              </div>
                              <input type="text" value={item.price} placeholder="0.00" onChange={(e) => updateItem(cat.id, item.id, { price: e.target.value })}
                                style={{ background: 'none', border: 'none', color: 'hsl(var(--primary))', fontWeight: 600, fontSize: '0.9rem', width: '25%', textAlign: 'right' }} />
                            </div>
                            <textarea value={item.description} placeholder="Description" onChange={(e) => updateItem(cat.id, item.id, { description: e.target.value })}
                              style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', width: '100%', minHeight: '40px', resize: 'none', marginLeft: '1.25rem' }} />
                            
                            {/* Pro Item Fields */}
                            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', alignItems: 'center', marginLeft: '1.25rem' }}>
                              <Tag size={12} style={{ opacity: 0.5 }} />
                              <input type="text" placeholder="Badge (Hot, New...)" value={item.badge || ''} onChange={(e) => updateItem(cat.id, item.id, { badge: e.target.value })}
                                style={{ background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '4px', color: 'white', fontSize: '0.7rem', padding: '0.3rem 0.5rem', flex: 1 }} />
                              <input type="color" value={item.badgeColor || '#ffd700'} onChange={(e) => updateItem(cat.id, item.id, { badgeColor: e.target.value })}
                                style={{ width: '20px', height: '20px', border: 'none', background: 'none', cursor: 'pointer' }} />
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', marginLeft: '1.25rem' }}>
                              <ImageIcon size={14} style={{ opacity: 0.5 }} />
                              <input type="text" placeholder="Image URL" value={item.image || ''} onChange={(e) => updateItem(cat.id, item.id, { image: e.target.value })}
                                style={{ background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '4px', color: 'white', fontSize: '0.7rem', padding: '0.3rem 0.5rem', flex: 1 }} />
                              <button onClick={() => removeItem(cat.id, item.id)} style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer' }}>
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        ))}
                        <button className="btn btn-secondary" style={{ width: '100%', fontSize: '0.8rem', padding: '0.5rem' }}
                          onClick={() => addItem(cat.id, { name: 'New Item', description: 'Freshly prepared...', price: '0.00' })}>
                          <Plus size={14} /> Add Menu Item
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {activeTab === 'templates' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <section>
              <h3 style={{ fontSize: '0.9rem', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>Artistic Templates</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
                {TEMPLATES_METADATA.map(temp => {
                  const isSelected = (menu.theme?.templateId || 'classic') === temp.id;
                  return (
                    <div 
                      key={temp.id}
                      onClick={() => handleTemplateSelect(temp.id)}
                      style={{ 
                        borderRadius: '20px', background: 'rgba(255,255,255,0.03)', 
                        border: isSelected ? `2px solid hsl(var(--primary))` : '1px solid var(--glass-border)',
                        cursor: 'pointer', overflow: 'hidden', padding: '1rem',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', 
                        transform: isSelected ? 'scale(1.02)' : 'none',
                        boxShadow: isSelected ? '0 10px 30px rgba(0,0,0,0.3)' : 'none'
                      }}
                    >
                      <div style={{ height: '180px', borderRadius: '12px', marginBottom: '1.25rem', position: 'relative' }}>
                        <TemplateThumbnail templateId={temp.id} />
                      </div>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'white', marginBottom: '0.25rem' }}>{temp.name}</h4>
                      <p style={{ fontSize: '0.75rem', opacity: 0.5 }}>{temp.description}</p>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'design' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <section>
              <h3 style={{ fontSize: '0.9rem', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>Presets & Themes</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                {THEME_CATALOG.map(theme => {
                  const isOwned = !theme.isPremium || (user?.purchasedThemes || []).includes(theme.themeId);
                  const isSelected = menu.theme?.themeId === theme.themeId;
                  
                  return (
                    <div 
                      key={theme.themeId}
                      onClick={() => handleThemeSelect(theme)}
                      style={{ 
                        aspectRatio: '1', borderRadius: '16px', background: theme.previewColor, 
                        border: isSelected ? `2px solid hsl(var(--primary))` : '1px solid var(--glass-border)',
                        cursor: 'pointer', position: 'relative', overflow: 'hidden',
                        display: 'flex', flexDirection: 'column', padding: '1rem', justifyContent: 'flex-end'
                      }}
                    >
                      {theme.isPremium && !isOwned && (
                        <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', color: '#ffd700' }}>
                          <Lock size={16} />
                        </div>
                      )}
                      {theme.status === 'offer' && (
                        <div style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', background: '#ff4444', color: 'white', fontSize: '0.6rem', padding: '0.2rem 0.4rem', borderRadius: '4px', fontWeight: 800 }}>
                          OFFER
                        </div>
                      )}
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: theme.mode === 'light' ? '#000' : '#fff' }}>{theme.name}</span>
                    </div>
                  );
                })}
              </div>
            </section>

            <section>
              <h3 style={{ fontSize: '0.9rem', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>Fine Tuning</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Branding Colors */}
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', opacity: 0.7, fontSize: '0.8rem' }}>
                    <Droplet size={16} /> Brand Colors
                  </label>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.65rem', opacity: 0.5, marginBottom: '0.2rem' }}>PRIMARY</div>
                      <input 
                        type="color" 
                        value={menu.theme?.primaryColor || '#ffd700'}
                        onChange={(e) => updateMenu({ theme: { ...menu.theme, primaryColor: e.target.value }})}
                        style={{ width: '100%', height: '35px', background: 'none', border: '1px solid var(--glass-border)', borderRadius: '4px', cursor: 'pointer' }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.65rem', opacity: 0.5, marginBottom: '0.2rem' }}>ACCENT</div>
                      <input 
                        type="color" 
                        value={menu.theme?.accentColor || '#000000'}
                        onChange={(e) => updateMenu({ theme: { ...menu.theme, accentColor: e.target.value }})}
                        style={{ width: '100%', height: '35px', background: 'none', border: '1px solid var(--glass-border)', borderRadius: '4px', cursor: 'pointer' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Card Aesthetics */}
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', opacity: 0.7, fontSize: '0.8rem' }}>
                    <Box size={16} /> Card Finishing
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', opacity: 0.5, marginBottom: '0.2rem' }}>
                        <span>BLUR</span><span>{menu.theme?.cardBlur}px</span>
                      </div>
                      <input type="range" min="0" max="25" value={menu.theme?.cardBlur || 10} 
                        onChange={(e) => updateMenu({ theme: { ...menu.theme, cardBlur: parseInt(e.target.value)}})} 
                        style={{ width: '100%' }} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', opacity: 0.5, marginBottom: '0.2rem' }}>
                        <span>GLASS OPACITY</span><span>{Math.round((menu.theme?.cardOpacity || 0.1) * 100)}%</span>
                      </div>
                      <input type="range" min="0" max="0.5" step="0.05" value={menu.theme?.cardOpacity || 0.1} 
                        onChange={(e) => updateMenu({ theme: { ...menu.theme, cardOpacity: parseFloat(e.target.value)}})} 
                        style={{ width: '100%' }} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', opacity: 0.5, marginBottom: '0.2rem' }}>
                        <span>CORNER RADIUS</span><span>{menu.theme?.cardRadius}px</span>
                      </div>
                      <input type="range" min="0" max="50" value={menu.theme?.cardRadius || 24} 
                        onChange={(e) => updateMenu({ theme: { ...menu.theme, cardRadius: parseInt(e.target.value)}})} 
                        style={{ width: '100%' }} />
                    </div>
                  </div>
                </div>

                {/* Header Align */}
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', opacity: 0.7, fontSize: '0.8rem' }}>
                    <AlignCenter size={16} /> Header Alignment
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                    {['left', 'center', 'right'].map(a => (
                      <button 
                        key={a}
                        onClick={() => updateMenu({ theme: { ...menu.theme, headerAlign: a as any }})}
                        className={menu.theme?.headerAlign === a ? 'btn-primary' : 'glass'}
                        style={{ padding: '0.5rem', fontSize: '0.7rem', borderRadius: '8px', border: menu.theme?.headerAlign === a ? 'none' : '1px solid var(--glass-border)', color: 'white', background: menu.theme?.headerAlign === a ? 'hsl(var(--primary))' : 'transparent', cursor: 'pointer' }}
                      >
                        {a.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Background Texture */}
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', opacity: 0.7, fontSize: '0.8rem' }}>
                    <Layers size={16} /> Background Texture
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                    {['none', 'grain', 'mesh', 'dots'].map(t => (
                      <button 
                        key={t}
                        onClick={() => updateMenu({ theme: { ...menu.theme, backgroundTexture: t as any }})}
                        className={menu.theme?.backgroundTexture === t ? 'btn-primary' : 'glass'}
                        style={{ padding: '0.5rem', fontSize: '0.7rem', borderRadius: '8px', border: menu.theme?.backgroundTexture === t ? 'none' : '1px solid var(--glass-border)', color: 'white', background: menu.theme?.backgroundTexture === t ? 'hsl(var(--primary))' : 'transparent', cursor: 'pointer' }}
                      >
                        {t.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Typography */}
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', opacity: 0.7, fontSize: '0.8rem' }}>
                    <Type size={16} /> Typography
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                    {['modern', 'elegant', 'playful', 'minimal'].map(f => (
                      <button 
                        key={f}
                        onClick={() => updateMenu({ theme: { ...menu.theme, fontStyle: f as any }})}
                        className={menu.theme?.fontStyle === f ? 'btn-primary' : 'glass'}
                        style={{ padding: '0.5rem', fontSize: '0.7rem', borderRadius: '8px', border: menu.theme?.fontStyle === f ? 'none' : '1px solid var(--glass-border)', color: 'white', background: menu.theme?.fontStyle === f ? 'hsl(var(--primary))' : 'transparent', cursor: 'pointer' }}
                      >
                        {f.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>

      {/* Sticky Footer Area */}
      <div style={{ padding: '1.5rem 2rem', borderTop: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(10px)' }}>
        <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleSave}>
          <Save size={20} /> Save Changes
        </button>
      </div>
    </div>
  );
};
