import React from 'react';
import { useMenu } from '../../context/MenuContext';
import { TEMPLATE_REGISTRY } from '../templates/TemplateRegistry';
import ClassicViewer from './ClassicViewer';

interface MenuViewerProps {
  isPublic?: boolean;
}

export const MenuViewer: React.FC<MenuViewerProps> = ({ isPublic = false }) => {
  const { menu } = useMenu();

  if (!menu) return null;

  // Shell for Switching Templates
  const templateId = menu.theme.templateId || 'classic';
  const SelectedTemplate = TEMPLATE_REGISTRY[templateId];

  // If classic or template not found, use our original advanced viewer
  if (templateId === 'classic' || !SelectedTemplate) {
    return <ClassicViewer menu={menu} isPublic={isPublic} />;
  }

  // Render selected pre-set template
  return (
    <div style={{ marginLeft: isPublic ? '0' : '400px', transition: 'margin-left 0.4s ease' }}>
      <SelectedTemplate data={menu} />
    </div>
  );
};
