import { Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import EvaluatorPage from './pages/EvaluatorPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <>
      <Header />
      
      <Routes>
        {/* الصفحة الرئيسية تعرض جهاز التقييم */}
        <Route path="/" element={<EvaluatorPage />} />
        
        {/* صفحة تسجيل الدخول */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* صفحة إنشاء الحساب */}
        <Route path="/register" element={<RegisterPage />} />
        
        {/* مسار Catch-All في حال كتب المستخدم رابط خاطئ */}
        <Route path="*" element={
          <div style={{ textAlign: 'center', padding: '100px 20px', color: 'var(--text-muted)' }}>
            <h2>404 - Page Not Found</h2>
            <p style={{ marginTop: '12px' }}>Oops! The page you are looking for doesn't exist.</p>
            <Link to="/" style={{ color: 'var(--primary)', textDecoration: 'none', display: 'inline-block', marginTop: '20px' }}>Return to Evaluator</Link>
          </div>
        } />
      </Routes>
    </>
  );
}

export default App;