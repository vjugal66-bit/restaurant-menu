import React from 'react';
import { motion } from 'framer-motion';
import type { MenuData } from '../../types/Menu';

interface TemplateProps {
  data: MenuData;
}

const Template2: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      color: '#fff',
      padding: 'clamp(3rem, 10vh, 6rem) 1rem',
      fontFamily: "'Inter', sans-serif",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Chalkboard Texture Layer */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        backgroundImage: 'url("https://www.transparenttextures.com/patterns/asfalt-dark.png"), radial-gradient(circle at 50% 40%, #1a1a1a 0%, #0a0a0a 100%)',
        opacity: 0.8,
        pointerEvents: 'none'
      }}></div>

      <div className="grain-overlay" style={{ opacity: 0.1 }}></div>

      {/* Industrial Accents */}
      <motion.div 
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1 }}
        style={{ position: 'absolute', top: '30px', left: '30px', width: '120px', height: '120px', borderLeft: '2px solid #ffd700', borderTop: '2px solid #ffd700', opacity: 0.3 }}></motion.div>
      <motion.div 
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1 }}
        style={{ position: 'absolute', bottom: '30px', right: '30px', width: '120px', height: '120px', borderRight: '2px solid #ffd700', borderBottom: '2px solid #ffd700', opacity: 0.3 }}></motion.div>

      <motion.header 
        initial={{ opacity: 0, scale: 0.9, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ textAlign: 'center', marginBottom: 'clamp(4rem, 12vh, 6rem)', position: 'relative', zIndex: 1 }}
      >
        <h1 style={{ 
          fontSize: 'clamp(3rem, 12vw, 6.5rem)', 
          fontWeight: 900, 
          color: '#ffd700', 
          textTransform: 'uppercase',
          letterSpacing: '-0.04em',
          margin: 0,
          transform: 'rotate(-1deg)',
          fontFamily: "'Inter', sans-serif",
          lineHeight: 0.85
        }} className="golden-text">
          {data.restaurantName}
        </h1>
        <div style={{ 
          background: '#ffd700', color: '#000', padding: '0.4rem 1.5rem', 
          display: 'inline-block', fontWeight: 900, fontSize: '0.75rem',
          marginTop: '0.5rem', borderRadius: '4px', letterSpacing: '0.2em'
        }}>
          EST. 2026 • PREMIUM DINING
        </div>
      </motion.header>

      {/* Spotlight Image */}
      {data.categories[0]?.items[0]?.image && (
        <motion.div 
          initial={{ opacity: 0, filter: 'grayscale(1) brightness(0.5)' }}
          whileInView={{ opacity: 1, filter: 'grayscale(0) brightness(1)' }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          style={{ 
            width: 'clamp(260px, 35vw, 400px)', height: 'clamp(260px, 35vw, 400px)', 
            borderRadius: '50%', border: '12px solid #fff', 
            boxShadow: '0 30px 60px rgba(0,0,0,0.6), 0 0 40px rgba(255,215,0,0.1)', 
            overflow: 'hidden', marginBottom: '5rem', position: 'relative', zIndex: 2
          }}>
          <img src={data.categories[0].items[0].image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </motion.div>
      )}

      <div style={{ maxWidth: '900px', width: '100%', display: 'flex', flexDirection: 'column', gap: '5rem', position: 'relative', zIndex: 1 }}>
        {data.categories.map((cat, catIdx) => (
          <motion.div 
            key={cat.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: catIdx * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          >
             <h2 style={{ fontSize: '1rem', color: '#ffd700', letterSpacing: '0.5em', textAlign: 'center', marginBottom: '3rem', textTransform: 'uppercase', opacity: 0.6, fontWeight: 300 }}>
               {cat.name}
             </h2>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {cat.items.map(item => (
                  <div key={item.id} style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem' }}>
                    <div style={{ flex: '0 0 auto' }}>
                      <h3 style={{ fontSize: 'clamp(1rem, 1.5vw, 1.3rem)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.02em' }}>{item.name}</h3>
                      <p style={{ fontSize: '0.8rem', opacity: 0.4, fontWeight: 400, marginTop: '0.2rem' }}>{item.description}</p>
                    </div>
                    <div style={{ flex: 1, borderBottom: '2px dashed rgba(255,255,255,0.1)', marginBottom: '6px' }}></div>
                    <span style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', fontWeight: 900, color: '#ffd700', fontFamily: "'Inter', sans-serif" }} className="golden-text">
                      {data.currencySymbol}{item.price}
                    </span>
                  </div>
                ))}
             </div>
          </motion.div>
        ))}
      </div>

      <motion.footer 
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 0.3 }}
        style={{ marginTop: '8rem', textAlign: 'center', padding: '2rem' }}>
        <p style={{ fontSize: '0.65rem', letterSpacing: '0.5em', textTransform: 'uppercase' }}>AUTHENTIC • FLAVOR • EXCELLENCE</p>
      </motion.footer>
    </div>
  );
};

export default Template2;
