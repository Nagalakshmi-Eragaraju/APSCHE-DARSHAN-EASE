import React, { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Initialize: Load user details using saved token on application mount
    useEffect(() => {
        const initializeAuth = async () => {
            const token = localStorage.getItem('darshan_ease_token');
            if (token) {
                try {
                    const res = await authService.getMe();
                    if (res.success) {
                        setUser(res.data);
                    } else {
                        // Invalid Token cleanup
                        localStorage.removeItem('darshan_ease_token');
                    }
                } catch (err) {
                    console.error('Error restoring session:', err.message);
                    localStorage.removeItem('darshan_ease_token');
                }
            }
            setLoading(false);
        };

        initializeAuth();
    }, []);

    // Login handler
    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const res = await authService.login(email, password);
            if (res.success && res.data.token) {
                localStorage.setItem('darshan_ease_token', res.data.token);
                setUser({
                    _id: res.data._id,
                    name: res.data.name,
                    email: res.data.email,
                    role: res.data.role
                });
                return { success: true };
            } else {
                throw new Error(res.message || 'Authorization failed');
            }
        } catch (err) {
            const message = err.response?.data?.message || err.message || 'Login failed';
            setError(message);
            setLoading(false);
            return { success: false, error: message };
        } finally {
            setLoading(false);
        }
    };

    // Register handler
    const register = async (name, email, password, role) => {
        setLoading(true);
        setError(null);
        try {
            const res = await authService.register(name, email, password, role);
            if (res.success && res.data.token) {
                localStorage.setItem('darshan_ease_token', res.data.token);
                setUser({
                    _id: res.data._id,
                    name: res.data.name,
                    email: res.data.email,
                    role: res.data.role
                });
                return { success: true };
            } else {
                throw new Error(res.message || 'Failed to complete registration');
            }
        } catch (err) {
            const message = err.response?.data?.message || err.message || 'Registration failed';
            setError(message);
            setLoading(false);
            return { success: false, error: message };
        } finally {
            setLoading(false);
        }
    };

    // Logout handler
    const logout = () => {
        localStorage.removeItem('darshan_ease_token');
        setUser(null);
        setError(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                error,
                login,
                register,
                logout,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be consumed within an AuthProvider root');
    }
    return context;
};
