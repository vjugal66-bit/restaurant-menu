import React from 'react';
import { TEMPLATE_REGISTRY, MOCK_MENU } from '../templates/TemplateRegistry';
import ClassicViewer from '../viewer/ClassicViewer';

interface TemplateThumbnailProps {
  templateId: string;
}

export const TemplateThumbnail: React.FC<TemplateThumbnailProps> = ({ templateId }) => {
  const TemplateComponent = TEMPLATE_REGISTRY[templateId];
  
  // Use mock data for the thumbnail to ensure it looks like a professional poster
  const mockData = {
    ...MOCK_MENU,
    theme: { ...MOCK_MENU.theme, templateId }
  } as any;

  return (
    <div style={{
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      position: 'relative',
      borderRadius: '8px',
      background: '#000'
    }}>
      <div style={{
        width: '1000px', // Original width
        height: '1400px', // Tall poster aspect ratio
        transform: 'scale(0.18)', // Scale down to fit 400x120 container approx
        transformOrigin: 'top left',
        pointerEvents: 'none',
        position: 'absolute',
        left: '10%', // Center horizontally after scaling
        top: '0'
      }}>
        {templateId === 'classic' ? (
          <ClassicViewer menu={mockData} isPublic={true} />
        ) : (
          TemplateComponent && <TemplateComponent data={mockData} />
        )}
      </div>
    </div>
  );
};
