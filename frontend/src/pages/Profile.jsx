import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const { user, logout } = useAuth();

    // Interactive mock state for editing profile
    const [name, setName] = useState(user?.name || '');
    const [isEditing, setIsEditing] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState('')
    const [saveLoading, setSaveLoading] = useState(false);

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        setSaveLoading(true);
        setTimeout(() => {
            setSaveLoading(false);
            setIsEditing(false);
            setSaveSuccess('Mock update completed: Profile changes saved!');
            setTimeout(() => setSaveSuccess(''), 2000);
        }, 1000);
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            <main className="dashboard-main" style={{ maxWidth: '800px', margin: '40px auto', width: '100%' }}>
                <h1 style={{
                    fontSize: '2.5rem',
                    marginBottom: '8px',
                    background: 'linear-gradient(135deg, #fff, var(--accent-gold-light))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    My Account
                </h1>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
                    Manage your personal credentials, view travel roles, and check session authorization details.
                </p>

                {saveSuccess && (
                    <div className="alert alert-success" style={{ marginBottom: '20px' }}>
                        <p>{saveSuccess}</p>
                    </div>
                )}

                <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>

                    {/* User Header Profile badge */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '24px' }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, var(--accent-gold), var(--accent-orange))',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '2rem',
                            color: 'var(--bg-primary)',
                            fontWeight: 'bold'
                        }}>
                            {user?.name?.charAt(0).toUpperCase() || 'P'}
                        </div>

                        <div>
                            <h2 style={{ fontSize: '1.6rem', fontWeight: '700' }}>{user?.name}</h2>
                            <p style={{ color: 'var(--accent-gold-light)', textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '0.05em' }}>
                                Verified {user?.role}
                            </p>
                        </div>
                    </div>

                    {/* Details & Edit Panel Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>

                        {/* Left: General Attributes */}
                        <div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--accent-gold)' }}>Security Summary</h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                <div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>MEMBER ID</div>
                                    <div style={{ fontSize: '0.95rem', fontFamily: 'monospace' }}>{user?._id}</div>
                                </div>

                                <div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>EMAIL ADDRESS</div>
                                    <div style={{ fontSize: '0.95rem' }}>{user?.email}</div>
                                </div>

                                <div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>SESSION STATE</div>
                                    <div style={{ fontSize: '0.9rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}>
                                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }}></span>
                                        JWT token authenticated
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Mock profile parameters updater */}
                        <div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--accent-gold)' }}>Update Profile</h3>

                            {isEditing ? (
                                <form onSubmit={handleUpdateProfile} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="profile-name">Full Name</label>
                                        <input
                                            type="text"
                                            id="profile-name"
                                            className="form-input"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            disabled={saveLoading}
                                        />
                                    </div>

                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                                            onClick={() => setIsEditing(false)}
                                            disabled={saveLoading}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            style={{ padding: '8px 16px', fontSize: '0.85rem', width: 'auto', color: 'black' }}
                                            disabled={saveLoading}
                                        >
                                            {saveLoading ? 'Saving...' : 'Save Profile'}
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                                        Need to modify your registered name displays? Click below to adjust your profile parameters.
                                    </p>

                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="btn btn-secondary"
                                        style={{ alignSelf: 'flex-start', width: 'auto', padding: '10px 20px', fontSize: '0.85rem' }}
                                    >
                                        Edit Display Name
                                    </button>
                                </div>
                            )}
                        </div>

                    </div>

                    {/* Action Log out panel */}
                    <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                            Logged tokens are automatically cleared upon clicking Sign Out.
                        </p>

                        <button onClick={logout} className="btn-nav-logout" style={{ padding: '10px 24px', borderRadius: '8px', fontSize: '0.9rem' }}>
                            Sign Out Securely
                        </button>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default Profile;
