import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const { login, error } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [localError, setLocalError] = useState('');
    const [loading, setLoading] = useState(false);

    const { email, password } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setLocalError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim() || !password.trim()) {
            setLocalError('Please enter both email and password');
            return;
        }

        setLoading(true);
        setLocalError('');

        try {
            const result = await login(email, password);
            if (result.success) {
                navigate('/dashboard');
            } else {
                setLocalError(result.error || 'Invalid credentials');
            }
        } catch (err) {
            setLocalError('An error occurred during sign in. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-container">
                <div className="logo-section">
                    <div className="logo-badge">🛕</div>
                    <h1 className="auth-title">Darshan Ease</h1>
                    <p className="auth-subtitle">Sign in to manage your spiritual checkpoints</p>
                </div>

                <div className="glass-card">
                    {(localError || error) && (
                        <div className="alert alert-error">
                            <span>⚠️</span>
                            <p>{localError || error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label" htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-input"
                                placeholder="you@example.com"
                                value={email}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="form-input"
                                placeholder="Enter password"
                                value={password}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Verifying Account...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="auth-footer">
                        Don't have an account yet? <Link to="/register">Register here</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
