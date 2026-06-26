import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import client from '../api/client';
import '../styles.css';

function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    try {
      await client.post('/auth/register', {
        email: email,
        password: password,
      });

      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed. Please try again.');
    }
  };

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 100px)', padding: '20px', boxSizing: 'border-box' }}>
      <div className="form-panel" style={{ width: '100%', maxWidth: '450px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '800', background: 'linear-gradient(to right, #6366f1, #a855f7, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '8px' }}>
            Create Account
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Join us to evaluate your resume</p>
        </div>

        {error && (
          <div className="vibrant-alert" style={{ marginBottom: '24px' }}>
            <div className="error-alert">
              <h4>Registration Error</h4>
              <p>{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="vibrant-success-card" style={{ marginBottom: '24px' }}>
            <div className="card-header-vibrant">
              <div className="pulse-ring"><div className="inner-dot"></div></div>
              <h3>Success!</h3>
            </div>
            <p className="processing-text">Account created successfully. Redirecting to login...</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="reg-email">Email Address</label>
            <input 
              type="email" 
              id="reg-email" 
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="reg-password">Password</label>
            <input 
              type="password" 
              id="reg-password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="reg-confirm">Confirm Password</label>
            <input 
              type="password" 
              id="reg-confirm" 
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Register</button>
        </form>

        <p style={{ color: 'var(--text-muted)', fontSize: '14px', textAlign: 'center', marginTop: '24px' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}>Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;