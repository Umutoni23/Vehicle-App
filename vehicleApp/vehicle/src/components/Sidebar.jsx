import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="p-4 bg-slate-800 text-white flex gap-4">
      <Link to="/" className="text-white">Home</Link>
      {isAuthenticated && <Link to="/dashboard" className="text-white">Dashboard</Link>}
      {isAuthenticated && <Link to="/vehicle/new" className="text-white">Register Vehicle</Link>}
      {isAuthenticated ? (
        <button onClick={handleLogout} className="text-white bg-transparent border-none cursor-pointer">Logout</button>
      ) : (
        <Link to="/login" className="text-white">Login</Link>
      )}
    </nav>
  );
}