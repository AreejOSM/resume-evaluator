import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext';
import client from '../api/client';
import '../styles.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const formData = new FormData();
      formData.append('username', email);
      formData.append('password', password);

      const response = await client.post('/auth/login', formData);
      
      
      login(email, response.data.access_token, response.data.role);
      
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-wrapper" style={{ 
      width: '100%', 
      display: 'flex', 
      justifyContent: 'center', 
      paddingTop: '60px', 
      paddingBottom: '40px', 
      boxSizing: 'border-box' 
    }}>
      <div className="form-panel" style={{ 
        width: '100%', 
        maxWidth: '450px', 
        flex: 'none', 
        minHeight: 'auto' 
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '800', background: 'linear-gradient(to right, #6366f1, #a855f7, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '8px' }}>
            Welcome Back
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Sign in to access your dashboard</p>
        </div>

        {error && (
          <div className="vibrant-alert" style={{ marginBottom: '24px' }}>
            <div className="error-alert">
              <h4>Authentication Error</h4>
              <p>{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="name@example.com"
              required 
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••"
              required 
            />
          </div>

          <button type="submit">
            Sign In
          </button>
        </form>

        
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', textAlign: 'center', marginTop: '24px' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}>Register here</Link>
        </p>
      </div>
    </div>
  );
}