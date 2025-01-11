import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Building2, PlusCircle, Search, UserCircle, LogOut, LayoutDashboard } from 'lucide-react';
import { ApplicationForm } from './components/ApplicationForm';
import { AdminDashboard } from './pages/AdminDashboard';
import { StartupListings } from './pages/StartupListings';
import { StartupProfile } from './pages/StartupProfile';
import { StartupAnalytics } from './pages/StartupAnalytics';
import { NewsPage } from './pages/NewsPage';
import { HeroSection } from './components/home/HeroSection';
import { FeaturedStartups } from './components/home/FeaturedStartups';
import { ProgramBenefits } from './components/home/ProgramBenefits';
import { NewsSection } from './components/home/NewsSection';
import { InboxDialog } from './components/messages/InboxDialog';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { logout } from './features/auth/authSlice';

// Protected Route Component
const ProtectedRoute = ({ children, adminRequired = false }) => {
  const { token, isAdmin } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (adminRequired && !isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

// Header Component
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token, isAdmin } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <Building2 className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              Y Combinator Middle East
            </h1>
          </Link>
          
          {/* Navigation and User Section */}
          <nav className="flex items-center space-x-6">
            {isAdmin ? (
              <Link
                to="/admin/dashboard"
                className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600"
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Admin Dashboard</span>
              </Link>
            ) : (
              <Link
                to="/startups"
                className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600"
              >
                <Search className="w-5 h-5" />
                <span>Browse Startups</span>
              </Link>
            )}
            
            {token ? (
              // Logged In State
              <div className="flex items-center space-x-4">
                {!isAdmin && <InboxDialog />}
                {!isAdmin && (
                  <Link
                    to="/apply"
                    className="flex items-center space-x-2 text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md transition-colors"
                  >
                    <PlusCircle className="w-5 h-5" />
                    <span>Apply Now</span>
                  </Link>
                )}
                
                {/* User Profile Dropdown */}
                <div className="relative group">
                  <div className="flex items-center space-x-2 cursor-pointer group">
                    <UserCircle className="h-8 w-8 text-indigo-600 group-hover:text-indigo-700" />
                    <span className="font-medium text-gray-700 group-hover:text-gray-900">
                      {isAdmin ? 'Admin' : user?.name || 'Profile'}
                    </span>
                  </div>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out z-50">
                    <div className="py-1">
                      {!isAdmin && (
                        <>
                          <Link
                            to="/profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            My Profile
                          </Link>
                          <Link
                            to="/startups"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            My Startups
                          </Link>
                        </>
                      )}
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Not Logged In State
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-indigo-600"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="flex items-center space-x-2 text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md transition-colors"
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>Get Started</span>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="/news" element={<NewsPage />} />
          
          {/* Protected Routes */}
          <Route
            path="/apply"
            element={
              <ProtectedRoute>
                <ApplicationForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/startups"
            element={
              <ProtectedRoute>
                <StartupListings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/startups/:id"
            element={
              <ProtectedRoute>
                <StartupProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/startups/:id/analytics"
            element={
              <ProtectedRoute>
                <StartupAnalytics />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute adminRequired={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Home Page */}
          <Route
            path="/"
            element={
              <main>
                <HeroSection />
                <FeaturedStartups />
                <ProgramBenefits />
                <NewsSection />
              </main>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;