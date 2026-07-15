import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="navbar">
            <Link to="/" className="nav-brand">
                <span className="nav-logo">🛕</span>
                <span>Darshan Ease</span>
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                {/* Common Navigation Links */}
                <Link
                    to="/"
                    style={{
                        color: isActive('/') ? 'var(--accent-gold)' : 'var(--text-secondary)',
                        fontWeight: isActive('/') ? '600' : '400',
                        fontSize: '0.95rem'
                    }}
                >
                    Home
                </Link>

                {isAuthenticated ? (
                    <>
                        <Link
                            to="/dashboard"
                            style={{
                                color: isActive('/dashboard') ? 'var(--accent-gold)' : 'var(--text-secondary)',
                                fontWeight: isActive('/dashboard') ? '600' : '400',
                                fontSize: '0.95rem'
                            }}
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="/profile"
                            style={{
                                color: isActive('/profile') ? 'var(--accent-gold)' : 'var(--text-secondary)',
                                fontWeight: isActive('/profile') ? '600' : '400',
                                fontSize: '0.95rem'
                            }}
                        >
                            My Profile
                        </Link>

                        <div className="nav-user" style={{ borderLeft: '1px solid rgba(255,255,255,0.08)', paddingLeft: '20px' }}>
                            <div className="user-status" style={{ marginRight: '8px' }}>
                                <div className="user-name">{user?.name}</div>
                                <div className="user-role">{user?.role}</div>
                            </div>
                            <button onClick={logout} className="btn-nav-logout">
                                Sign Out
                            </button>
                        </div>
                    </>
                ) : (
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <Link
                            to="/login"
                            className={`btn btn-secondary ${isActive('/login') ? 'active' : ''}`}
                            style={{ padding: '8px 18px', fontSize: '0.88rem', width: 'auto' }}
                        >
                            Sign In
                        </Link>
                        <Link
                            to="/register"
                            className="btn btn-primary"
                            style={{ padding: '8px 18px', fontSize: '0.88rem', width: 'auto', color: 'black' }}
                        >
                            Register
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
