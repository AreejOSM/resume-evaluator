import { useState } from 'react';
import { Link } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login Submitted:', { email, password });
    alert(`Welcome back! Login simulated for: ${email}`);
  };

  return (
    <main style={{ display: 'block', maxWidth: '500px', margin: '80px auto' }}>
      <section className="form-panel">
        <h2 style={{ marginBottom: '24px', textAlign: 'center' }}>Account Login</h2>
        <form onSubmit={handleSubmit}>
          
          <div className="input-group">
            <label htmlFor="login-email">Email Address</label>
            <input 
              type="email" 
              id="login-email" 
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="login-password">Password</label>
            <input 
              type="password" 
              id="login-password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" style={{ marginTop: '12px' }}>Sign In</button>
        </form>

        <p style={{ color: 'var(--text-muted)', fontSize: '14px', textAlign: 'center', marginTop: '24px' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}>Register here</Link>
        </p>
      </section>
    </main>
  );
}

export default LoginPage;