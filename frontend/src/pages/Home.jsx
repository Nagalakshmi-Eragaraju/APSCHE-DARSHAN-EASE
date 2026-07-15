import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const Home = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            {/* Hero Core Section */}
            <section style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '80px 24px',
                textAlign: 'center',
                maxWidth: '900px',
                margin: '0 auto',
                animation: 'slideUp 0.8s ease'
            }}>
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: 'rgba(245, 158, 11, 0.08)',
                    border: '1px solid var(--border-color)',
                    padding: '8px 18px',
                    borderRadius: '50px',
                    marginBottom: '28px',
                    fontSize: '0.88rem',
                    color: 'var(--accent-gold-light)'
                }}>
                    ✨ A Smart Temple Tour & Booking Planner
                </div>

                <h1 style={{
                    fontSize: '3.6rem',
                    lineHeight: '1.15',
                    marginBottom: '20px',
                    fontFamily: 'var(--font-display)',
                    fontWeight: '800',
                    background: 'linear-gradient(135deg, #ffffff 40%, var(--accent-gold-light) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.02em'
                }}>
                    Simplify Your Sacred Journey with Darshan Ease
                </h1>

                <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '1.2rem',
                    lineHeight: '1.6',
                    maxWidth: '650px',
                    marginBottom: '40px'
                }}>
                    Avoid long queues, coordinate with trusted spiritual guides, and book premium darshan slots at major historic temple sanctuaries across India.
                </p>

                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', width: '100%', maxWidth: '400px' }}>
                    {isAuthenticated ? (
                        <Link to="/dashboard" className="btn btn-primary" style={{ padding: '16px 36px', color: 'black' }}>
                            Go to Sandbox Workspace →
                        </Link>
                    ) : (
                        <>
                            <Link to="/register" className="btn btn-primary" style={{ padding: '16px 30px', color: 'black' }}>
                                Join as Pilgrim
                            </Link>
                            <Link to="/login" className="btn btn-secondary" style={{ padding: '16px 30px' }}>
                                Sign In
                            </Link>
                        </>
                    )}
                </div>
            </section>

            {/* Feature Highlighters section */}
            <section style={{
                backgroundColor: 'rgba(15, 22, 38, 0.4)',
                borderTop: '1px solid var(--border-color)',
                padding: '60px 40px',
                width: '100%'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h2 style={{
                        textAlign: 'center',
                        fontSize: '2rem',
                        color: 'var(--accent-gold)',
                        marginBottom: '40px'
                    }}>
                        Designed for Divine Seekers
                    </h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '30px'
                    }}>
                        {/* Feature 1 */}
                        <div className="glass-card" style={{ padding: '24px' }}>
                            <div style={{ fontSize: '2rem', marginBottom: '14px' }}>🎫</div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Fast VIP Darshans</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                                Secure bookings and digital passes directly synced with temple trust networks.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="glass-card" style={{ padding: '24px' }}>
                            <div style={{ fontSize: '2rem', marginBottom: '14px' }}>👳🏽</div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Vetted Guides</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                                Hire certified guides to walk you through rituals and rich mythological histories.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="glass-card" style={{ padding: '24px' }}>
                            <div style={{ fontSize: '2rem', marginBottom: '14px' }}>⏰</div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Live Wait Updates</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                                Track crowd flow, temperature, and waiting durations before visiting.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{
                textAlign: 'center',
                padding: '30px',
                color: 'var(--text-muted)',
                fontSize: '0.85rem',
                borderTop: '1px solid rgba(255,255,255,0.03)'
            }}>
                © {new Date().getFullYear()} Darshan Ease. All spiritual rites reserved.
            </footer>
        </div>
    );
};

export default Home;
