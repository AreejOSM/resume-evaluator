import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import EvaluatorPage from './pages/EvaluatorPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { ProtectedRoute } from './context/AuthContext';

export default function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', background: '#0a0a16', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={
              <ProtectedRoute>
                <EvaluatorPage />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}