import React from 'react';
import type { MenuData } from '../../types/Menu';

interface TemplateProps {
  data: MenuData;
}

const Template1: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#4A6741',
      color: '#fff',
      padding: '4rem 2rem',
      fontFamily: "'Playfair Display', serif",
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative botanical element or image */}
      <div style={{ 
        position: 'absolute', top: '-50px', right: '-50px', width: '400px', height: '400px',
        opacity: 0.8, borderRadius: '50%', overflow: 'hidden', border: '15px solid rgba(255,255,255,0.1)'
      }}>
        {data.categories[0]?.items[0]?.image && (
          <img src={data.categories[0].items[0].image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        )}
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <header style={{ marginBottom: '6rem', maxWidth: '500px' }}>
          <div style={{ width: '40px', height: '2px', background: '#ffd700', marginBottom: '1rem' }}></div>
          <h1 style={{ fontSize: '4.5rem', fontWeight: 700, lineHeight: 1, marginBottom: '1rem' }}>
            {data.restaurantName}
          </h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.8, fontWeight: 300, letterSpacing: '0.05em' }}>
            {data.description}
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4rem 6rem' }}>
          {data.categories.map((cat) => (
            <div key={cat.id}>
              <h2 style={{ 
                fontSize: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.2em', 
                marginBottom: '2rem', color: '#ffd700', borderBottom: '1px solid rgba(255,255,255,0.2)',
                paddingBottom: '0.5rem'
              }}>
                {cat.name}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {cat.items.map(item => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.25rem' }}>{item.name}</h3>
                      <p style={{ fontSize: '0.85rem', opacity: 0.6, fontStyle: 'italic' }}>{item.description}</p>
                    </div>
                    <span style={{ fontSize: '1.2rem', fontWeight: 300 }}>{data.currencySymbol}{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <footer style={{ marginTop: '8rem', textAlign: 'center', opacity: 0.4, fontSize: '0.8rem', letterSpacing: '0.3em' }}>
          WWW.RESTUARANTMENU.COM
        </footer>
      </div>
    </div>
  );
};

export default Template1;
