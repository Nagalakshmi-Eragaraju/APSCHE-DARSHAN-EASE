import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import TempleDetails from './pages/TempleDetails';
import Home from './pages/Home';
import Profile from './pages/Profile';


// Route helper to protect dashboard page
const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#0a0e17',
                color: '#f8fafc',
                fontFamily: "'Outfit', sans-serif"
            }}>
                <div style={{
                    fontSize: '3.5rem',
                    marginBottom: '16px',
                    animation: 'spin 2s linear infinite'
                }}>🛕</div>
                <h2 style={{ fontWeight: '500', fontSize: '1.2rem', color: '#fbbf24', letterSpacing: '0.05em' }}>
                    CONNECTING TO DARSHAN EASE...
                </h2>
                <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

// Route wrapper to redirect auth screens if already logged in
const PublicRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return null;

    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    {/* Root Landing Route */}
                    <Route path="/" element={<Home />} />

                    {/* Public Auth Routes */}
                    <Route
                        path="/login"
                        element={
                            <PublicRoute>
                                <Login />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <PublicRoute>
                                <Register />
                            </PublicRoute>
                        }
                    />

                    {/* Secure Private Dashboard Route */}
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />

                    {/* Secure User Profile Route */}
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />

                    {/* Secure Temple Details Route */}
                    <Route
                        path="/temples/:id"
                        element={
                            <ProtectedRoute>
                                <TempleDetails />
                            </ProtectedRoute>
                        }
                    />

                    {/* Fallback routing */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}
export default App;
