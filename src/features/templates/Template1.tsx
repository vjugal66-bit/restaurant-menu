import React from 'react';
import { motion } from 'framer-motion';
import type { MenuData } from '../../types/Menu';

interface TemplateProps {
  data: MenuData;
}

const Template1: React.FC<TemplateProps> = ({ data }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] as any } }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#4A6741',
      color: '#fff',
      padding: 'clamp(2rem, 8vw, 6rem) clamp(1rem, 5vw, 4rem)',
      fontFamily: "'Playfair Display', serif",
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Texture Overlay */}
      <div className="grain-overlay" style={{ opacity: 0.08 }}></div>

      {/* Decorative Botanical Hero */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, x: 100 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{ 
          position: 'absolute', top: '-100px', right: '-100px', width: 'clamp(300px, 40vw, 600px)', height: 'clamp(300px, 40vw, 600px)',
          borderRadius: '50%', overflow: 'hidden', border: '25px solid rgba(255,255,255,0.05)',
          boxShadow: '0 50px 100px rgba(0,0,0,0.3)'
        }}>
        {data.categories[0]?.items[0]?.image && (
          <img src={data.categories[0].items[0].image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        )}
      </motion.div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <motion.header 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ marginBottom: 'clamp(4rem, 10vh, 8rem)', maxWidth: '600px' }}
        >
          <div style={{ width: '60px', height: '3px', background: '#ffd700', marginBottom: '1.5rem', borderRadius: '2px' }}></div>
          <h1 style={{ 
            fontSize: 'clamp(3rem, 10vw, 5.5rem)', fontWeight: 900, lineHeight: 0.9, marginBottom: '1.5rem',
            textWrap: 'balance'
          }}>
            {data.restaurantName}
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', opacity: 0.8, fontWeight: 300, letterSpacing: '0.08em', fontFamily: "'Lora', serif" }}>
            {data.description}
          </p>
        </motion.header>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '5rem 8rem' }}
        >
          {data.categories.map((cat) => (
            <motion.div key={cat.id} variants={itemVariants}>
              <h2 style={{ 
                fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', textTransform: 'uppercase', letterSpacing: '0.25em', 
                marginBottom: '2.5rem', color: '#ffd700', borderBottom: '1px solid rgba(255,255,255,0.15)',
                paddingBottom: '0.75rem', fontWeight: 700
              }}>
                {cat.name}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                {cat.items.map(item => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', gap: '1.5rem', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.4rem', color: '#fff' }}>{item.name}</h3>
                      <p style={{ 
                        fontSize: '0.9rem', opacity: 0.6, fontStyle: 'italic', fontFamily: "'Lora', serif",
                        lineHeight: 1.5
                      }}>{item.description}</p>
                    </div>
                    <span style={{ fontSize: '1.3rem', fontWeight: 300, color: '#ffd700' }}>{data.currencySymbol}{item.price}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.footer 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.4 }}
          style={{ marginTop: '10rem', textAlign: 'center', fontSize: '0.75rem', letterSpacing: '0.4em', fontWeight: 400 }}>
          CURATED EXPERIENCE • {new Date().getFullYear()}
        </motion.footer>
      </div>
    </div>
  );
};

export default Template1;
