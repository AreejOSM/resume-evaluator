import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header style={{ 
      width: '100%', 
      height: '70px', 
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '0 40px', 
      boxSizing: 'border-box', 
      background: '#0a0a16' 
    }}>
      
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link 
          to="/" 
          style={{ 
            fontSize: '22px', 
            fontWeight: '800', 
            textDecoration: 'none', 
            background: 'linear-gradient(to right, #6366f1, #a855f7, #ec4899)', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent' 
          }}
        >
          Resume Evaluator
        </Link>
      </div>

      <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        {user ? (
          <>
            
            {user.role === 'admin' && (
              <Link 
                to="/admin" 
                style={{ color: '#a855f7', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}
              >
                Admin Panel
              </Link>
            )}

            <span style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '14px' }}>
              {user.email}
            </span>

            <button 
              onClick={handleLogout} 
              style={{ 
                background: 'transparent', 
                border: '1px solid #ef4444', 
                color: '#ef4444', 
                padding: '8px 16px', 
                borderRadius: '8px', 
                cursor: 'pointer', 
                fontSize: '14px', 
                fontWeight: '600', 
                transition: 'all 0.2s' 
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: '#fff', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>Login</Link>
            <Link to="/register" style={{ background: 'linear-gradient(to right, #6366f1, #a855f7)', color: '#fff', textDecoration: 'none', padding: '8px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: '600' }}>Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}