import React from 'react';
import type { MenuData } from '../../types/Menu';

interface TemplateProps {
  data: MenuData;
}

const Template2: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#121212',
      color: '#fff',
      padding: '4rem 1rem',
      fontFamily: "'Inter', sans-serif",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      backgroundImage: 'radial-gradient(circle at 50% 50%, #222 0%, #121212 100%)'
    }}>
      {/* Decorative Accents */}
      <div style={{ position: 'absolute', top: '20px', left: '20px', width: '100px', height: '100px', borderLeft: '4px solid #ffd700', borderTop: '4px solid #ffd700' }}></div>
      <div style={{ position: 'absolute', bottom: '20px', right: '20px', width: '100px', height: '100px', borderRight: '4px solid #ffd700', borderBottom: '4px solid #ffd700' }}></div>

      <header style={{ textAlign: 'center', marginBottom: '4rem', position: 'relative' }}>
        <h1 style={{ 
          fontSize: '5rem', 
          fontWeight: 900, 
          color: '#ffd700', 
          textTransform: 'uppercase',
          letterSpacing: '-0.02em',
          margin: 0,
          transform: 'rotate(-2deg)'
        }}>
          {data.restaurantName}
        </h1>
        <div style={{ 
          background: '#ffd700', color: '#000', padding: '0.2rem 1rem', 
          display: 'inline-block', fontWeight: 800, fontSize: '0.8rem',
          marginTop: '-1rem', borderRadius: '4px'
        }}>
          OPEN 24/7 • WE DELIVER
        </div>
      </header>

      {/* Main Image Hub */}
      {data.categories[0]?.items[0]?.image && (
        <div style={{ 
          width: '300px', height: '300px', borderRadius: '50%', border: '8px solid #fff', 
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)', overflow: 'hidden', marginBottom: '4rem'
        }}>
          <img src={data.categories[0].items[0].image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}

      <div style={{ maxWidth: '800px', width: '100%', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
        {data.categories.map((cat) => (
          <div key={cat.id}>
             <h2 style={{ fontSize: '1.2rem', color: '#ffd700', letterSpacing: '0.3em', textAlign: 'center', marginBottom: '2rem', textTransform: 'uppercase' }}>
               {cat.name}
             </h2>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {cat.items.map(item => (
                  <div key={item.id} style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, whiteSpace: 'nowrap' }}>{item.name}</h3>
                    <div style={{ flex: 1, borderBottom: '2px dotted rgba(255,255,255,0.2)', marginBottom: '4px' }}></div>
                    <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#ffd700' }}>{data.currencySymbol}{item.price}</span>
                  </div>
                ))}
             </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '6rem', textAlign: 'center', opacity: 0.5 }}>
        <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em' }}>PHONE | EMAIL | WEBSITE</p>
      </div>
    </div>
  );
};

export default Template2;
