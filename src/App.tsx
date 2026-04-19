import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { MenuProvider, useMenu } from './context/MenuContext';
import { Login, Signup } from './features/auth/AuthPages';
import { MenuEditor } from './features/builder/MenuEditor';
import { MenuViewer } from './features/viewer/MenuViewer';
import { QRGenerator } from './features/share/QRGenerator';
import { AdminDashboard } from './features/admin/AdminDashboard';

// Dashboard component for authenticated user
const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { menu, loadMenu } = useMenu();
  const [isQRModalOpen, setQRModalOpen] = React.useState(false);

  useEffect(() => {
    if (user) {
      loadMenu(user.username);
    }
  }, [user]);

  if (!user || !menu) return null;

  return (
    <div style={{ position: 'relative' }}>
      <MenuEditor />
      <div 
        style={{ 
          position: 'fixed', 
          bottom: '2rem', 
          right: '2rem', 
          zIndex: 20,
          display: 'flex',
          gap: '1rem'
        }}
      >
        <button 
          className="btn btn-secondary" 
          onClick={logout}
        >
          Logout
        </button>
        <button 
          className="btn btn-primary" 
          onClick={() => setQRModalOpen(true)}
          style={{ 
            boxShadow: '0 10px 40px hsla(var(--primary), 0.5)'
          }}
        >
          Share & QR Code
        </button>
      </div>

      <MenuViewer isPublic={false} />
      
      <QRGenerator 
        url={`${window.location.origin}/${user.username}`} 
        isOpen={isQRModalOpen} 
        onClose={() => setQRModalOpen(false)} 
        restaurantName={menu.restaurantName}
      />
    </div>
  );
};

// Public View component for anyone with the link
const PublicMenu: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { menu, loadMenu, loading } = useMenu();

  useEffect(() => {
    if (username) {
      loadMenu(username);
    }
  }, [username]);

  if (loading) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading 3D Experience...</div>;
  if (!menu) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Café not found.</div>;

  return <MenuViewer isPublic={true} />;
};

// Simple Landing redirection
const Landing: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  if (isAuthenticated) {
    return isAdmin ? <Navigate to="/admin" /> : <Navigate to="/dashboard" />;
  }
  return <Navigate to="/login" />;
};

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAdmin } = useAuth();
  if (!user || !isAdmin) return <Navigate to="/login" />;
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <MenuProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/:username" element={<PublicMenu />} />
          </Routes>
        </BrowserRouter>
      </MenuProvider>
    </AuthProvider>
  );
}

export default App;
