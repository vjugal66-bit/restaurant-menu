import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Share2, X } from 'lucide-react';

interface QRGeneratorProps {
  url: string;
  isOpen: boolean;
  onClose: () => void;
  restaurantName: string;
}

export const QRGenerator: React.FC<QRGeneratorProps> = ({ url, isOpen, onClose, restaurantName }) => {
  const qrRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const downloadQR = () => {
    const svg = qrRef.current?.querySelector('svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = 500;
      canvas.height = 500;
      ctx?.fillRect(0, 0, 500, 500); // White background
      ctx?.drawImage(img, 50, 50, 400, 400);
      
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `${restaurantName.replace(/\s+/g, '_')}_QR.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      backdropFilter: 'blur(8px)'
    }}>
      <div className="glass" style={{
        padding: '3rem',
        borderRadius: '24px',
        textAlign: 'center',
        maxWidth: '500px',
        width: '90%',
        position: 'relative'
      }}>
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
        >
          <X size={24} />
        </button>

        <h2 style={{ marginBottom: '1.5rem', color: 'hsl(var(--primary))' }}>Menu Published!</h2>
        <p style={{ opacity: 0.7, marginBottom: '2rem' }}>Scan this QR code or share the link below to access your digital menu.</p>
        
        <div ref={qrRef} style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', display: 'inline-block', marginBottom: '2rem' }}>
          <QRCodeSVG value={url} size={250} level="H" includeMargin={false} />
        </div>

        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <code style={{ flex: 1, fontSize: '0.8rem', color: 'hsl(var(--primary))' }}>{url}</code>
          <button style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
            <Share2 size={18} />
          </button>
        </div>

        <button className="btn btn-primary" style={{ width: '100%' }} onClick={downloadQR}>
          <Download size={20} /> Download QR Code
        </button>
      </div>
    </div>
  );
};
