import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const { register, error } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user',
    });

    const [localError, setLocalError] = useState('');
    const [loading, setLoading] = useState(false);

    const { name, email, password, role } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setLocalError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validations
        if (!name.trim() || !email.trim() || !password.trim()) {
            setLocalError('Please fill out all fields');
            return;
        }

        if (password.length < 6) {
            setLocalError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        setLocalError('');

        try {
            const result = await register(name, email, password, role);
            if (result.success) {
                navigate('/dashboard');
            } else {
                setLocalError(result.error || 'Registration failed');
            }
        } catch (err) {
            setLocalError('An unexpected error occurred. Please try again.');
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
                    <p className="auth-subtitle">Create an account to plan your sacred pilgrimage</p>
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
                            <label className="form-label" htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-input"
                                placeholder="Enter your name"
                                value={name}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>

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
                                placeholder="Min. 6 characters"
                                value={password}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="role">I am registering as a</label>
                            <select
                                id="role"
                                name="role"
                                className="form-select"
                                value={role}
                                onChange={handleChange}
                                disabled={loading}
                            >
                                <option value="user">Pilgrim (Standard User)</option>
                                <option value="guide">Guide (Temple Navigator)</option>
                            </select>
                        </div>

                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Creating Account...' : 'Register'}
                        </button>
                    </form>

                    <div className="auth-footer">
                        Already have an account? <Link to="/login">Login here</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
