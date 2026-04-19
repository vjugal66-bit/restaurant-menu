import React from 'react';
import type { MenuData } from '../../types/Menu';

interface TemplateProps {
  data: MenuData;
}

const Template4: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8f5f0',
      backgroundImage: 'url("https://www.transparenttextures.com/patterns/marble-similar.png")',
      color: '#333',
      padding: '6rem 4rem',
      fontFamily: "'Playfair Display', serif",
      display: 'flex',
      gap: '4rem',
      justifyContent: 'center'
    }}>
      {/* Vertical Title Bar */}
      <div style={{ 
        writingMode: 'vertical-rl', transform: 'rotate(180deg)',
        fontSize: '6rem', fontWeight: 900, color: '#222', borderRight: '1px solid #ddd',
        paddingLeft: '2rem', display: 'flex', alignItems: 'center', opacity: 0.15
      }}>
        {data.restaurantName}
      </div>

      <div style={{ maxWidth: '800px', flex: 1, border: '1px solid rgba(0,0,0,0.05)', padding: '4rem', background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(10px)' }}>
        <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ fontSize: '0.8rem', letterSpacing: '0.5em', textTransform: 'uppercase', marginBottom: '1.5rem', opacity: 0.5 }}>Fine Dining Selection</h2>
          <div style={{ width: '30px', height: '1px', background: '#333', margin: '0 auto 1.5rem' }}></div>
          <p style={{ fontSize: '1.1rem', fontStyle: 'italic', opacity: 0.7 }}>{data.description}</p>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          {data.categories.map((cat) => (
            <div key={cat.id}>
              <h3 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.3em', textAlign: 'center', marginBottom: '2.5rem', opacity: 0.4 }}>
                {cat.name}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {cat.items.map(item => (
                  <div key={item.id} style={{ textAlign: 'center' }}>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.25rem' }}>{item.name}</h4>
                    <p style={{ fontSize: '0.8rem', opacity: 0.5, marginBottom: '0.5rem' }}>{item.description}</p>
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: '#999' }}>{data.currencySymbol}{item.price}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <footer style={{ marginTop: '6rem', textAlign: 'center', opacity: 0.4, fontSize: '0.7rem', letterSpacing: '0.4em' }}>
          RESERVATIONS • 2026
        </footer>
      </div>
    </div>
  );
};

export default Template4;
