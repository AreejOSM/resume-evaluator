import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <div className="header-content">
        {/* عند الضغط على العنوان يعود للصفحة الرئيسية / */}
        <h1>
          <Link to="/" style={{ textDecoration: 'none', background: 'linear-gradient(to right, #6366f1, #a855f7, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Resume Evaluator
          </Link>
        </h1>
        <nav>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;