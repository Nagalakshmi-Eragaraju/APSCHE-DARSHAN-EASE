import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/api';
import TempleList from './TempleList';
import Navbar from '../components/Navbar';

const Dashboard = () => {
    const { user } = useAuth();
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [statusMsg, setStatusMsg] = useState('');

    // Call the protected route endpoint /api/auth/me to prove JWT works
    const fetchFreshProfile = async () => {
        setLoading(true);
        setStatusMsg('');
        try {
            const res = await authService.getMe();
            if (res.success) {
                setProfileData(res.data);
                setStatusMsg('Success: Secure JWT endpoint returned data successfully!');
            } else {
                setStatusMsg('Failed to authorize via JWT');
            }
        } catch (error) {
            console.error(error);
            setStatusMsg(`Unauthorized check: ${error.response?.data?.message || error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            <main className="dashboard-main">
                <div className="welcome-banner" style={{ marginBottom: '40px' }}>
                    <h1 className="welcome-title">Welcome back, {user?.name}!</h1>
                    <p className="welcome-sub">Your spiritual workspace is successfully authorized.</p>
                </div>

                {/* Directory Listing Section */}
                <TempleList />

                {/* Developer Utilities Section */}
                <div style={{ marginTop: '60px', borderTop: '1px solid var(--border-color)', paddingTop: '40px' }}>
                    <h2 style={{ fontSize: '1.6rem', color: 'var(--accent-gold)', marginBottom: '24px' }}>
                        🛠️ Developer Verification Tools
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                        {/* Section 1: Security Profile Info */}
                        <div className="glass-card">
                            <h3 style={{ fontSize: '1.2rem', color: 'var(--accent-gold)', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                                Authentication Status
                            </h3>
                            <p style={{ margin: '8px 0', fontSize: '0.92rem' }}><strong style={{ color: 'var(--text-secondary)' }}>ID:</strong> {user?._id}</p>
                            <p style={{ margin: '8px 0', fontSize: '0.92rem' }}><strong style={{ color: 'var(--text-secondary)' }}>Email:</strong> {user?.email}</p>
                            <p style={{ margin: '8px 0', fontSize: '0.92rem' }}><strong style={{ color: 'var(--text-secondary)' }}>Account Role:</strong> <span style={{ textTransform: 'capitalize', color: 'var(--accent-gold-light)', fontWeight: '600' }}>{user?.role}</span></p>
                            <p style={{ margin: '8px 0', fontSize: '0.92rem' }}><strong style={{ color: 'var(--text-secondary)' }}>JWT Token:</strong> <span style={{ color: '#10b981', fontFamily: 'monospace', fontSize: '0.85rem' }}>Active & Saved</span></p>
                        </div>

                        {/* Section 2: Test Protected Route */}
                        <div className="glass-card">
                            <h3 style={{ fontSize: '1.2rem', color: 'var(--accent-gold)', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                                Test Protected Endpoint
                            </h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '0.88rem', lineHeight: '1.5' }}>
                                Press the button below to execute an authenticated Axios call to the backend. This API call transmits your JWT token via the authorization header.
                            </p>

                            <button onClick={fetchFreshProfile} className="btn btn-secondary" style={{ padding: '10px 20px', fontSize: '0.88rem' }} disabled={loading}>
                                {loading ? 'Validating Token...' : 'Verify JWT Middleware'}
                            </button>

                            {statusMsg && (
                                <div
                                    className={`alert ${statusMsg.startsWith('Success') ? 'alert-success' : 'alert-error'}`}
                                    style={{ marginTop: '20px', fontSize: '0.85rem', padding: '10px 14px' }}
                                >
                                    <p>{statusMsg}</p>
                                </div>
                            )}

                            {profileData && (
                                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', fontSize: '0.82rem', fontFamily: 'monospace', marginTop: '16px' }}>
                                    <div><strong>Server timestamp:</strong> {new Date(profileData.createdAt).toLocaleDateString()}</div>
                                    <div><strong>Verification Status:</strong> Verified 200 OK</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
export default Dashboard;
