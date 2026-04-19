import React from 'react';
import { motion } from 'framer-motion';
import type { MenuData } from '../../types/Menu';

interface TemplateProps {
  data: MenuData;
}

const Template4: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#fdfdfd',
      backgroundColor: '#f8f5f0',
      backgroundImage: 'url("https://www.transparenttextures.com/patterns/marble-similar.png")',
      color: '#333',
      padding: 'clamp(2rem, 10vw, 8rem) clamp(1rem, 5vw, 4rem)',
      fontFamily: "'Playfair Display', serif",
      display: 'flex',
      flexDirection: window.innerWidth < 1024 ? 'column' : 'row',
      gap: 'clamp(2rem, 5vw, 6rem)',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="grain-overlay" style={{ opacity: 0.04 }}></div>

      {/* Vertical Title Bar - Luxury Aesthetic */}
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 0.1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{ 
          writingMode: 'vertical-rl', transform: 'rotate(180deg)',
          fontSize: 'clamp(4rem, 15vw, 9rem)', fontWeight: 900, color: '#000', 
          borderRight: '1px solid rgba(0,0,0,0.1)',
          paddingLeft: '2rem', display: 'flex', alignItems: 'center',
          pointerEvents: 'none', position: window.innerWidth < 1024 ? 'relative' : 'sticky',
          top: '4rem', height: 'fit-content'
        }}>
        {data.restaurantName}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        style={{ 
          maxWidth: '850px', flex: 1, position: 'relative', zIndex: 1,
          border: '1px solid rgba(0,0,0,0.06)', padding: 'clamp(2rem, 8vw, 6rem)', 
          background: 'rgba(255,255,255,0.45)', backdropFilter: 'blur(20px)',
          boxShadow: '0 40px 80px rgba(0,0,0,0.05)', borderRadius: '4px'
        }}>
        
        {/* Decorative Gold Frame Corner */}
        <div style={{ position: 'absolute', top: '20px', left: '20px', width: '40px', height: '40px', borderTop: '1px solid #c5a059', borderLeft: '1px solid #c5a059' }}></div>
        <div style={{ position: 'absolute', bottom: '20px', right: '20px', width: '40px', height: '40px', borderBottom: '1px solid #c5a059', borderRight: '1px solid #c5a059' }}></div>

        <header style={{ textAlign: 'center', marginBottom: 'clamp(4rem, 8vh, 6rem)' }}>
          <motion.h2 
            initial={{ opacity: 0 }} whileInView={{ opacity: 0.4 }}
            style={{ fontSize: '0.75rem', letterSpacing: '0.6em', textTransform: 'uppercase', marginBottom: '2rem', fontWeight: 400 }}>
            Fine Dining Curator
          </motion.h2>
          <div style={{ width: '40px', height: '1px', background: '#c5a059', margin: '0 auto 2.5rem' }}></div>
          <p style={{ fontSize: '1.25rem', fontStyle: 'italic', opacity: 0.8, fontFamily: "'Lora', serif", textWrap: 'balance' }}>
            {data.description}
          </p>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
          {data.categories.map((cat, catIdx) => (
            <motion.div 
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: catIdx * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.4em', textAlign: 'center', marginBottom: '3rem', opacity: 0.5, fontWeight: 700 }}>
                {cat.name}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                {cat.items.map(item => (
                  <motion.div key={item.id} style={{ textAlign: 'center' }} whileHover={{ y: -5 }}>
                    <h4 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '0.5rem', letterSpacing: '0.02em', color: '#1a1a1a' }}>{item.name}</h4>
                    <p style={{ fontSize: '0.9rem', opacity: 0.6, marginBottom: '1rem', fontFamily: "'Lora', serif", fontStyle: 'italic', maxWidth: '400px', margin: '0 auto 1.25rem' }}>
                      {item.description}
                    </p>
                    <div style={{ 
                      fontSize: '1.1rem', fontWeight: 700, color: '#c5a059', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' 
                    }}>
                      <div style={{ width: '20px', height: '1px', background: 'rgba(197, 160, 89, 0.3)' }}></div>
                      {data.currencySymbol}{item.price}
                      <div style={{ width: '20px', height: '1px', background: 'rgba(197, 160, 89, 0.3)' }}></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.footer 
          initial={{ opacity: 0 }} whileInView={{ opacity: 0.3 }}
          style={{ marginTop: '8rem', textAlign: 'center', fontSize: '0.65rem', letterSpacing: '0.5em', fontWeight: 700 }}>
          CURAVIA • SINCE 2026
        </motion.footer>
      </motion.div>
    </div>
  );
};

export default Template4;
