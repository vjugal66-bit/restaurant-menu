import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, UserPlus, Utensils } from 'lucide-react';

export const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate('/dashboard');
    } else {
      setError('Invalid credentials or user not found.');
    }
  };

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at top right, hsla(var(--primary), 0.1), transparent 50%), radial-gradient(circle at bottom left, hsla(var(--primary), 0.05), transparent 50%)'
    }}>
      <div className="glass animate-fade-in" style={{ padding: '3rem', borderRadius: '24px', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <div style={{ width: '60px', height: '60px', background: 'hsl(var(--primary))', borderRadius: '15px', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <Utensils color="black" size={30} />
        </div>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Welcome Back</h1>
        <p style={{ opacity: 0.6, marginBottom: '2rem' }}>Login to manage your digital menu</p>

        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.7, fontSize: '0.9rem' }}>Username (Café URL Name)</label>
            <input 
              type="text" 
              className="glass"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. croencafe"
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', color: 'white', border: '1px solid var(--glass-border)' }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.7, fontSize: '0.9rem' }}>Password</label>
            <input 
              type="password" 
              className="glass"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', color: 'white', border: '1px solid var(--glass-border)' }}
            />
          </div>

          {error && <p style={{ color: '#ff4444', fontSize: '0.8rem', marginBottom: '1rem' }}>{error}</p>}

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '1rem' }}>
            <LogIn size={20} /> Login
          </button>
        </form>

        <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>
          Don't have an account? <Link to="/signup" style={{ color: 'hsl(var(--primary))', fontWeight: 600, textDecoration: 'none' }}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [cafeName, setCafeName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (signup(username, cafeName, password)) {
      navigate('/dashboard');
    } else {
      setError('Username already taken!');
    }
  };

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at top right, hsla(var(--primary), 0.1), transparent 50%), radial-gradient(circle at bottom left, hsla(var(--primary), 0.05), transparent 50%)'
    }}>
      <div className="glass animate-fade-in" style={{ padding: '3rem', borderRadius: '24px', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <div style={{ width: '60px', height: '60px', background: 'hsl(var(--primary))', borderRadius: '15px', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <UserPlus color="black" size={30} />
        </div>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Create Account</h1>
        <p style={{ opacity: 0.6, marginBottom: '2rem' }}>Start your digital menu journey</p>

        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.7, fontSize: '0.9rem' }}>Café Name</label>
            <input 
              type="text" 
              className="glass"
              required
              value={cafeName}
              onChange={(e) => setCafeName(e.target.value)}
              placeholder="e.g. Croen Café"
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', color: 'white', border: '1px solid var(--glass-border)' }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.7, fontSize: '0.9rem' }}>Username (for your URL)</label>
            <input 
              type="text" 
              className="glass"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s+/g, ''))}
              placeholder="e.g. croencafe"
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', color: 'white', border: '1px solid var(--glass-border)' }}
            />
            <p style={{ fontSize: '0.7rem', opacity: 0.5, marginTop: '0.4rem' }}>Your URL: localhost:5173/{username || 'username'}</p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.7, fontSize: '0.9rem' }}>Password</label>
            <input 
              type="password" 
              className="glass"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', color: 'white', border: '1px solid var(--glass-border)' }}
            />
          </div>

          {error && <p style={{ color: '#ff4444', fontSize: '0.8rem', marginBottom: '1rem' }}>{error}</p>}

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '1rem' }}>
            <UserPlus size={20} /> Create Account
          </button>
        </form>

        <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>
          Already have an account? <Link to="/login" style={{ color: 'hsl(var(--primary))', fontWeight: 600, textDecoration: 'none' }}>Login</Link>
        </p>
      </div>
    </div>
  );
};
