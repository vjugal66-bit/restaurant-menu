import React from 'react';
import { TiltCard } from '../../components/3D/TiltCard';
import { Utensils, Star, Leaf, Flame } from 'lucide-react';
import type { MenuData } from '../../types/Menu';

interface ClassicViewerProps {
  menu: MenuData;
  isPublic?: boolean;
}

const FONT_MAP: Record<string, string> = {
  modern: "'Montserrat', sans-serif",
  elegant: "'Playfair Display', serif",
  playful: "'Caveat', cursive",
  minimal: "'Inter', sans-serif"
};

const ICON_MAP = {
  utensils: Utensils,
  star: Star,
  leaf: Leaf,
  none: () => null
};

export const ClassicViewer: React.FC<ClassicViewerProps> = ({ menu, isPublic = false }) => {
  const fontStyle = FONT_MAP[menu.theme.fontStyle || 'minimal'];
  const DividerIcon = ICON_MAP[menu.theme.dividerIcon as keyof typeof ICON_MAP] || ICON_MAP.none;

  const getBackgroundStyle = () => {
    const base = menu.theme.mode === 'light' 
      ? 'radial-gradient(circle at center, hsla(var(--primary), 0.05) 0%, #ffffff 70%)'
      : 'radial-gradient(circle at center, hsla(var(--primary), 0.05) 0%, #000000 70%)';
    
    if (menu.theme.backgroundTexture === 'grain') {
      return `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E"), ${base}`;
    }
    if (menu.theme.backgroundTexture === 'dots') {
      return `radial-gradient(hsla(var(--primary), 0.1) 1px, transparent 1px), ${base}`;
    }
    return base;
  };

  return (
    <div className="viewer-container" style={{
      marginLeft: isPublic ? '0' : '400px',
      padding: '4rem 2rem',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: getBackgroundStyle(),
      backgroundSize: menu.theme.backgroundTexture === 'dots' ? '30px 30px' : 'auto',
      transition: 'margin-left 0.4s ease',
      fontFamily: fontStyle,
      color: menu.theme.mode === 'light' ? '#1a1a1a' : '#fff'
    }}>
      <style>{`
        .categories-masonry {
          column-count: 3;
          column-gap: 2.5rem;
          width: 100%;
          max-width: 1400px;
        }
        @media (max-width: 1600px) { .categories-masonry { column-count: 2; } }
        @media (max-width: 1000px) { .categories-masonry { column-count: 1; } }
        
        .category-block {
          break-inside: avoid-column;
          margin-bottom: 2.5rem;
          display: inline-block;
          width: 100%;
        }

        .items-grid {
          display: grid;
          gap: 1.5rem;
          grid-template-columns: 1fr;
        }

        @media (max-width: 600px) {
          .items-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
          .item-card-content { padding: 1rem !important; }
          .item-title { font-size: 0.9rem !important; }
          .item-price { font-size: 0.8rem !important; padding: 0.1rem 0.4rem !important; }
          .item-desc { font-size: 0.75rem !important; line-height: 1.2 !important; }
          .item-image { height: 120px !important; }
        }
      `}</style>

      <div style={{ textAlign: menu.theme.headerAlign || 'center', marginBottom: '4rem', width: '100%', maxWidth: '1200px' }} className="animate-fade-in">
        <div style={{ 
          width: '80px', height: '80px', borderRadius: '20px', 
          background: 'hsl(var(--primary))', display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: menu.theme.headerAlign === 'center' ? '0 auto 1.5rem' : '0 0 1.5rem',
          boxShadow: `0 10px 30px hsla(var(--primary), 0.3)`
        }}>
          <Utensils size={40} color="black" />
        </div>
        <h1 
          key={`${menu.theme.themeId}-${menu.theme.primaryColor}`}
          style={{ 
            fontSize: '3.5rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.5rem', 
            color: menu.theme.primaryColor || 'white',
            background: `linear-gradient(to bottom, ${menu.theme.primaryColor || '#fff'}, #888)`, 
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' 
          }}
        >
          {menu.restaurantName}
        </h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.6, maxWidth: '600px', margin: menu.theme.headerAlign === 'center' ? '0 auto' : '0' }}>
          {menu.description}
        </p>
      </div>

      <div className="categories-masonry">
        {menu.categories.map((category) => (
          <div key={category.id} className="category-block animate-fade-in shadow-pro">
            <h2 style={{ 
              fontSize: '1.8rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem',
              color: 'hsl(var(--primary))', fontStyle: menu.theme.fontStyle === 'elegant' ? 'italic' : 'normal'
            }}>
              <DividerIcon size={24} style={{ opacity: 0.5 }} />
              {category.name}
              <span style={{ flex: 1, height: '1px', background: 'currentColor', opacity: 0.2 }}></span>
            </h2>
            
            <div className="items-grid">
              {category.items.map((item) => (
                <TiltCard 
                  key={item.id} 
                  intensity={10}
                  blur={menu.theme.cardBlur}
                  opacity={menu.theme.cardOpacity}
                  radius={menu.theme.cardRadius}
                  borderStyle={menu.theme.borderStyle}
                  borderColor={`hsla(var(--primary), 0.2)`}
                >
                  <div style={{ position: 'relative', overflow: 'hidden', height: '100%' }}>
                    {item.badge && (
                      <div style={{ 
                        position: 'absolute', top: '0.5rem', right: '0.5rem', 
                        background: item.badgeColor || 'hsl(var(--primary))', 
                        color: 'black', padding: '0.2rem 0.5rem', borderRadius: '100px',
                        fontSize: '0.6rem', fontWeight: 800, zIndex: 1, display: 'flex', alignItems: 'center', gap: '0.25rem'
                      }}>
                        <Flame size={10} /> {item.badge.toUpperCase()}
                      </div>
                    )}
                    {item.image && (
                      <div className="item-image" style={{ width: '100%', height: '220px', overflow: 'hidden' }}>
                        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    )}
                    <div className="item-card-content" style={{ padding: '1.5rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.75rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <h3 className="item-title" style={{ fontSize: '1.25rem', fontWeight: 600 }}>{item.name}</h3>
                        </div>
                        <span className="item-price" style={{ 
                          color: 'hsl(var(--primary))', fontWeight: 700, fontSize: '1.1rem',
                          background: 'hsla(var(--primary), 0.1)', padding: '0.2rem 0.6rem',
                          borderRadius: '8px', display: 'inline-block', width: 'fit-content'
                        }}>
                          {menu.currencySymbol}{item.price}
                        </span>
                      </div>
                      <p className="item-desc" style={{ fontSize: '0.95rem', opacity: 0.7, lineHeight: 1.6 }}>{item.description}</p>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '8rem', opacity: 0.3, fontSize: '0.85rem', textAlign: 'center' }}>
        Digital Menu Pro © 2026 • Powered by Verma Ai Driven Tech
      </div>
    </div>
  );
};

export default ClassicViewer;
