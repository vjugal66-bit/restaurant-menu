import React from 'react';
import type { MenuData } from '../../types/Menu';

interface TemplateProps {
  data: MenuData;
}

const Template3: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Left Partition: Data */}
      <div style={{ 
        flex: '1.2', background: '#45b7d1', color: '#fff', padding: '4rem 3rem',
        display: 'flex', flexDirection: 'column'
      }}>
        <header style={{ marginBottom: '5rem' }}>
          <h1 style={{ fontSize: '4rem', fontWeight: 900, lineHeight: 0.9, marginBottom: '1rem' }}>
            {data.restaurantName}
          </h1>
          <div style={{ background: '#fff', height: '4px', width: '60px', borderRadius: '2px' }}></div>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          {data.categories.map((cat) => (
            <div key={cat.id}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1.5rem', opacity: 0.8 }}>
                {cat.name}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {cat.items.map(item => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '0.5rem' }}>
                    <span style={{ fontWeight: 600 }}>{item.name}</span>
                    <span style={{ fontWeight: 800 }}>{data.currencySymbol}{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 'auto', paddingTop: '4rem', fontSize: '0.8rem', opacity: 0.6 }}>
          DRINK MODERATELY • WEBSITE.COM
        </div>
      </div>

      {/* Right Partition: Visuals */}
      <div style={{ 
        flex: '1', background: '#ff85a2', position: 'relative', overflow: 'hidden',
        display: 'flex', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center', gap: '1rem', padding: '1rem'
      }}>
        {data.categories.flatMap(c => c.items).filter(i => i.image).slice(0, 4).map((item, idx) => (
          <div key={idx} style={{ 
            width: '45%', aspectRatio: '1', borderRadius: '20px', overflow: 'hidden', 
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)', transform: idx % 2 === 0 ? 'translateY(-20px)' : 'translateY(20px)'
          }}>
            <img src={item.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ))}

        {/* Floating shapes or accents */}
        <div style={{ position: 'absolute', top: '10%', right: '10%', width: '40px', height: '40px', border: '2px solid #fff', borderRadius: '50%' }}></div>
        <div style={{ position: 'absolute', bottom: '15%', left: '10%', width: '20px', height: '20px', background: '#fff', borderRadius: '50%' }}></div>
      </div>
    </div>
  );
};

export default Template3;
