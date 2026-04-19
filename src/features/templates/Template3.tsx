import React from 'react';
import { motion } from 'framer-motion';
import type { MenuData } from '../../types/Menu';

interface TemplateProps {
  data: MenuData;
}

const Template3: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: window.innerWidth < 768 ? 'column' : 'row',
      fontFamily: "'Inter', sans-serif",
      overflow: 'hidden'
    }}>
      {/* Left Partition: Data */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as any }}
        style={{ 
          flex: '1.4', background: '#3db2ce', color: '#fff', padding: 'clamp(2rem, 6vw, 5rem)',
          display: 'flex', flexDirection: 'column', position: 'relative'
        }}>
        <div className="grain-overlay" style={{ opacity: 0.05 }}></div>
        
        <header style={{ marginBottom: 'clamp(4rem, 10vh, 6rem)', position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ width: 0 }} animate={{ width: 60 }} transition={{ delay: 0.5, duration: 1 }}
            style={{ background: '#fff', height: '6px', width: '60px', borderRadius: '3px', marginBottom: '1.5rem' }}></motion.div>
          <h1 style={{ 
            fontSize: 'clamp(3rem, 8vw, 5rem)', fontWeight: 900, lineHeight: 0.85, marginBottom: '1rem',
            letterSpacing: '-0.03em'
          }}>
            {data.restaurantName}
          </h1>
          <p style={{ fontSize: '1.1rem', fontWeight: 300, opacity: 0.9, letterSpacing: '0.02em' }}>{data.description}</p>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem', position: 'relative', zIndex: 1 }}>
          {data.categories.map((cat, idx) => (
            <motion.div 
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 style={{ fontSize: '1rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.4em', marginBottom: '2.5rem', opacity: 0.5 }}>
                {cat.name}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {cat.items.map(item => (
                  <motion.div 
                    key={item.id} 
                    whileHover={{ x: 10 }}
                    style={{ 
                      display: 'flex', justifyContent: 'space-between', alignItems: 'flex-baseline',
                      background: 'rgba(255,255,255,0.06)', padding: '1rem 1.5rem', borderRadius: '12px',
                      border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer'
                    }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: 700, fontSize: '1.1rem', letterSpacing: '0.01em' }}>{item.name}</span>
                      <span style={{ fontSize: '0.8rem', opacity: 0.6, marginTop: '0.2rem', fontWeight: 400 }}>{item.description}</span>
                    </div>
                    <span style={{ fontWeight: 900, fontSize: '1.2rem', color: '#fff' }}>{data.currencySymbol}{item.price}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ marginTop: 'auto', paddingTop: '6rem', fontSize: '0.7rem', opacity: 0.4, letterSpacing: '0.4em', fontWeight: 700 }}>
          EST. {new Date().getFullYear()} • THE FUSION EXPERIENCE
        </div>
      </motion.div>

      {/* Right Partition: Visuals */}
      <motion.div 
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as any }}
        style={{ 
          flex: '1', background: '#ff7096', position: 'relative', overflow: 'hidden',
          display: 'flex', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center', gap: '2rem', padding: '2rem'
        }}>
        <div style={{ 
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
          backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.2) 0%, transparent 70%)' 
        }}></div>

        {data.categories.flatMap(c => c.items).filter(i => i.image).slice(0, 4).map((item, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.2, duration: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, rotate: idx % 2 === 0 ? 2 : -2 }}
            style={{ 
              width: '45%', aspectRatio: '0.9', borderRadius: '30px', overflow: 'hidden', 
              boxShadow: '0 30px 60px rgba(0,0,0,0.2)', position: 'relative', zIndex: 2
            }}>
            <img src={item.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </motion.div>
        ))}

        {/* Floating Abstract Shapes */}
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{ position: 'absolute', top: '5%', right: '10%', width: '100px', height: '100px', border: '2px solid rgba(255,255,255,0.2)', borderRadius: '40% 60% 70% 30% / 40% 50% 60% 70%' }}></motion.div>
        <motion.div 
          animate={{ y: [0, 20, 0] }} transition={{ duration: 8, repeat: Infinity }}
          style={{ position: 'absolute', bottom: '10%', left: '5%', width: '60px', height: '60px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}></motion.div>
      </motion.div>
    </div>
  );
};

export default Template3;
