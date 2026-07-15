import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { templeService } from '../services/api';

const TempleDetails = () => {
    const { id } = useParams();
    const [temple, setTemple] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Interactive mock feature for premium design
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [bookingLoading, setBookingLoading] = useState(false);

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            try {
                const res = await templeService.getById(id);
                if (res.success) {
                    setTemple(res.data);
                }
            } catch (err) {
                setError(err.response?.data?.message || 'Sanctuary details could not be retrieved');
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    const handleBooking = () => {
        setBookingLoading(true);
        setTimeout(() => {
            setBookingLoading(false);
            setBookingSuccess(true);
        }, 1200);
    };

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '100px 0', fontSize: '1.2rem', color: 'var(--accent-gold)' }}>
                <div style={{ fontSize: '3rem', animation: 'spin 1.5s linear infinite', marginBottom: '15px' }}>🛕</div>
                Accessing Sacred Relics...
            </div>
        );
    }

    if (error || !temple) {
        return (
            <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
                <div className="alert alert-error" style={{ marginBottom: '24px' }}>
                    <p>{error || 'Temple not found'}</p>
                </div>
                <Link to="/dashboard" className="btn btn-secondary" style={{ display: 'inline-block', width: 'auto' }}>
                    ← Back to Dashboard
                </Link>
            </div>
        );
    }

    return (
        <div style={{ padding: '0 0 60px 0' }}>

            {/* Back Navigator */}
            <div style={{ marginBottom: '24px' }}>
                <Link to="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                    ← Return to Dashboard & Directory
                </Link>
            </div>

            {/* Main Details Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 1fr)',
                gap: '40px',
            }}>

                {/* Left Column: Image and Description */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>

                    {/* Main Visual Image Showcase */}
                    <div style={{
                        position: 'relative',
                        width: '100%',
                        height: '420px',
                        borderRadius: 'var(--radius-lg)',
                        overflow: 'hidden',
                        border: '1px solid var(--border-color)',
                        boxShadow: 'var(--shadow-lg)'
                    }}>
                        <img
                            src={temple.image}
                            alt={temple.name}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                            onError={(e) => {
                                e.target.src = 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop';
                            }}
                        />

                        {/* Dark shadow and title overlay */}
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            background: 'linear-gradient(to top, rgba(10, 14, 23, 0.95) 10%, rgba(10, 14, 23, 0) 100%)',
                            padding: '30px',
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <span style={{ color: 'var(--accent-gold-light)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
                                📍 {temple.location}
                            </span>
                            <h1 style={{ fontSize: '2.2rem', fontWeight: '800', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                                {temple.name}
                            </h1>
                        </div>
                    </div>

                    {/* Description Card */}
                    <div className="glass-card" style={{ padding: '35px' }}>
                        <h2 style={{ fontSize: '1.4rem', color: 'var(--accent-gold)', marginBottom: '16px' }}>Sanctuary Chronicle & History</h2>
                        <p style={{
                            color: 'var(--text-secondary)',
                            fontSize: '1rem',
                            lineHeight: '1.8',
                            textAlign: 'justify',
                            whiteSpace: 'pre-line'
                        }}>
                            {temple.description}
                        </p>
                    </div>

                </div>

                {/* Right Column: Reservation / Mock Action Module */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>

                    {/* Action booking widget */}
                    <div className="glass-card" style={{
                        borderColor: 'rgba(245, 158, 11, 0.25)',
                        boxShadow: 'var(--shadow-glow), var(--shadow-lg)'
                    }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', color: 'var(--text-primary)' }}>
                            Divine Darshan Slot
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>
                            Arrange safe gate tickets, guides, and priority passes for your holy temple visit.
                        </p>

                        <div style={{
                            border: '1.5px dashed var(--border-color)',
                            borderRadius: 'var(--radius-md)',
                            padding: '16px',
                            backgroundColor: 'rgba(245, 158, 11, 0.03)',
                            marginBottom: '24px'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                                <span>Standard Entry:</span>
                                <span style={{ color: '#10b981', fontWeight: '600' }}>Free</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                                <span>VIP Route Pass:</span>
                                <span style={{ color: 'var(--accent-gold)', fontWeight: '600' }}>₹250</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '8px', marginTop: '8px' }}>
                                <span>Live Waiting Time:</span>
                                <span style={{ color: '#fbbf24' }}>~30 Mins</span>
                            </div>
                        </div>

                        {bookingSuccess ? (
                            <div className="alert alert-success" style={{ animation: 'slideUp 0.3s ease' }}>
                                <p>Darshan booking request registered successfully! Email confirmation sent.</p>
                            </div>
                        ) : (
                            <button
                                onClick={handleBooking}
                                className="btn btn-primary"
                                disabled={bookingLoading}
                            >
                                {bookingLoading ? 'Requesting Pilgrimage pass...' : 'Book VIP Pass Now'}
                            </button>
                        )}

                        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '16px' }}>
                            * Passes configured in cooperation with state board authorities.
                        </p>
                    </div>

                    {/* Guidelines info card */}
                    <div className="glass-card">
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '14px', color: 'var(--accent-gold)' }}>
                            📜 Pilgrim Etiquettes
                        </h3>
                        <ul style={{
                            color: 'var(--text-secondary)',
                            fontSize: '0.88rem',
                            paddingLeft: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px'
                        }}>
                            <li>Dress conservatively; knees and shoulders must be covered.</li>
                            <li>Footwear must be deposited at designated storage counters before entry.</li>
                            <li>Photography is strictly prohibited inside the main sanctum (Garbhagriha).</li>
                            <li>Maintain quiet silence and reverence while entering paths.</li>
                        </ul>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default TempleDetails;
