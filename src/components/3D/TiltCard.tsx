import React, { useState, useRef } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  blur?: number;
  opacity?: number;
  radius?: number;
  borderStyle?: string;
  borderColor?: string;
}

export const TiltCard: React.FC<TiltCardProps> = ({ 
  children, 
  className = '', 
  intensity = 15,
  blur = 10,
  opacity = 0.1,
  radius = 24,
  borderStyle = 'solid',
  borderColor = 'rgba(255,215,0,0.2)'
}) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -intensity;
    const rotateY = ((x - centerX) / centerX) * intensity;
    
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div 
      ref={cardRef}
      className={`perspective-container ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        display: 'inline-block',
        width: '100%',
        perspective: '1000px'
      }}
    >
      <div 
        className="tilt-element"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: rotate.x === 0 ? 'transform 0.5s ease' : 'none',
          backdropFilter: `blur(${blur}px)`,
          WebkitBackdropFilter: `blur(${blur}px)`,
          background: `rgba(255, 255, 255, ${opacity})`,
          borderRadius: `${radius}px`,
          border: borderStyle === 'none' ? 'none' : `1px ${borderStyle} ${borderColor}`,
          height: '100%',
          overflow: 'hidden'
        }}
      >
        {children}
      </div>
    </div>
  );
};
