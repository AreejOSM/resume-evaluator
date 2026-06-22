import { useState } from 'react';
import { Link } from 'react-router-dom';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    console.log('Register Submitted:', { email, password });
    alert(`Account created successfully for: ${email}`);
  };

  return (
    <main style={{ display: 'block', maxWidth: '500px', margin: '80px auto' }}>
      <section className="form-panel">
        <h2 style={{ marginBottom: '24px', textAlign: 'center' }}>Create Account</h2>
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

          <button type="submit" style={{ marginTop: '12px' }}>Register</button>
        </form>

        <p style={{ color: 'var(--text-muted)', fontSize: '14px', textAlign: 'center', marginTop: '24px' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}>Login here</Link>
        </p>
      </section>
    </main>
  );
}

export default RegisterPage;