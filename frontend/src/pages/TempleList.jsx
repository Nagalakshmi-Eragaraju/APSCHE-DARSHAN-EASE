import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { templeService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const TempleList = () => {
    const { user } = useAuth();
    const [temples, setTemples] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Drawer / modal open state for Add Temple Form
    const [showAddForm, setShowAddForm] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [formError, setFormError] = useState('');
    const [formSuccess, setFormSuccess] = useState('');

    // Prefilled test values to make testing super fast
    const [formData, setFormData] = useState({
        name: 'Meenakshi Amman Temple',
        location: 'Madurai, Tamil Nadu',
        description: 'A historic Hindu temple located on the southern bank of the Vaigai River in the temple city of Madurai, Tamil Nadu, India. It is dedicated to Thirukamakkottam Meenakshi, a form of Parvati, and her consort, Sundareswarar, a form of Shiva.',
        image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=800&auto=format&fit=crop'
    });

    const fetchTemples = async () => {
        setLoading(true);
        try {
            const res = await templeService.getAll();
            if (res.success) {
                setTemples(res.data);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch temples');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTemples();
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setFormError('');
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setSubmitLoading(true);
        setFormError('');
        setFormSuccess('');

        const { name, location, description, image } = formData;
        if (!name.trim() || !location.trim() || !description.trim() || !image.trim()) {
            setFormError('Please fill in all temple fields');
            setSubmitLoading(false);
            return;
        }

        try {
            const res = await templeService.create(formData);
            if (res.success) {
                setFormSuccess('Temple registered successfully!');
                // Add to state list instantly
                setTemples((prev) => [res.data, ...prev]);
                // Reset form content to another default suggestions
                setFormData({
                    name: '',
                    location: '',
                    description: '',
                    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop'
                });

                // Autoclose after 1.5 seconds
                setTimeout(() => {
                    setShowAddForm(false);
                    setFormSuccess('');
                }, 1500);
            }
        } catch (err) {
            setFormError(err.response?.data?.message || 'Failed to register temple');
        } finally {
            setSubmitLoading(false);
        }
    };

    return (
        <div style={{ padding: '0 0 60px 0' }}>

            {/* Header Profile Section */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '20px',
                marginBottom: '40px'
            }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '8px', background: 'linear-gradient(135deg, #fff, var(--accent-gold-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Sacred Temples
                    </h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Explore holy destinations, configure itineraries, and check darshan details.</p>
                </div>

                {user && (
                    <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="btn btn-primary"
                        style={{ width: 'auto', padding: '12px 24px' }}
                    >
                        {showAddForm ? 'Close Editor' : '➕ Add Temple'}
                    </button>
                )}
            </div>

            {/* Add Temple Form Section (Slide Drawer Look-alike) */}
            {showAddForm && (
                <div className="glass-card" style={{ marginBottom: '40px', animation: 'slideUp 0.4s ease' }}>
                    <h2 style={{ color: 'var(--accent-gold)', marginBottom: '20px' }}>Register New Temple</h2>

                    {formError && <div className="alert alert-error"><p>{formError}</p></div>}
                    {formSuccess && <div className="alert alert-success"><p>{formSuccess}</p></div>}

                    <form onSubmit={handleFormSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div className="form-group" style={{ gridColumn: 'span 1' }}>
                            <label className="form-label" htmlFor="name">Temple Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-input"
                                value={formData.name}
                                onChange={handleInputChange}
                                disabled={submitLoading}
                            />
                        </div>

                        <div className="form-group" style={{ gridColumn: 'span 1' }}>
                            <label className="form-label" htmlFor="location">Geographic Location</label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                className="form-input"
                                value={formData.location}
                                onChange={handleInputChange}
                                disabled={submitLoading}
                            />
                        </div>

                        <div className="form-group" style={{ gridColumn: 'span 2' }}>
                            <label className="form-label" htmlFor="image">Image Showcase URL</label>
                            <input
                                type="text"
                                id="image"
                                name="image"
                                className="form-input"
                                value={formData.image}
                                onChange={handleInputChange}
                                disabled={submitLoading}
                            />
                        </div>

                        <div className="form-group" style={{ gridColumn: 'span 2' }}>
                            <label className="form-label" htmlFor="description">Historical Description</label>
                            <textarea
                                id="description"
                                name="description"
                                className="form-input"
                                rows="4"
                                style={{ resize: 'vertical', minHeight: '100px' }}
                                value={formData.description}
                                onChange={handleInputChange}
                                disabled={submitLoading}
                            />
                        </div>

                        <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                style={{ width: 'auto' }}
                                onClick={() => setShowAddForm(false)}
                                disabled={submitLoading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                style={{ width: 'auto', padding: '12px 35px' }}
                                disabled={submitLoading}
                            >
                                {submitLoading ? 'Registering...' : 'Add Temple'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Loader */}
            {loading ? (
                <div style={{ textAlign: 'center', padding: '60px 0', fontSize: '1.2rem', color: 'var(--accent-gold)' }}>
                    <div style={{ fontSize: '3rem', animation: 'spin 1.5s linear infinite', marginBottom: '15px' }}>🛕</div>
                    Searching Chronicles...
                </div>
            ) : error ? (
                <div className="alert alert-error" style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <p>{error}</p>
                </div>
            ) : temples.length === 0 ? (
                <div className="glass-card" style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-secondary)' }}>
                    <p style={{ fontSize: '1.2rem', marginBottom: '16px' }}>No temples have been cataloged yet.</p>
                    {user ? (
                        <p>Click the <strong>Add Temple</strong> button above to construct the first holy destination database!</p>
                    ) : (
                        <p>Please register or sign in to contribute temple entries.</p>
                    )}
                </div>
            ) : (
                /* Temple Cards Grid */
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '30px'
                }}>
                    {temples.map((temple) => (
                        <div key={temple._id} className="glass-card" style={{
                            padding: '0',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            borderRadius: 'var(--radius-md)'
                        }}>

                            {/* Card Banner Image */}
                            <div style={{ width: '100%', height: '200px', overflow: 'hidden', position: 'relative' }}>
                                <img
                                    src={temple.image}
                                    alt={temple.name}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.4s ease'
                                    }}
                                    onError={(e) => {
                                        e.target.src = 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop';
                                    }}
                                    onMouseOver={(e) => e.target.style.transform = 'scale(1.08)'}
                                    onMouseOut={(e) => e.target.style.transform = 'scale(1.0)'}
                                />

                                {/* Location Overlay Badge */}
                                <div style={{
                                    position: 'absolute',
                                    bottom: '12px',
                                    left: '12px',
                                    backgroundColor: 'rgba(10, 14, 23, 0.8)',
                                    backdropFilter: 'blur(4px)',
                                    padding: '5px 12px',
                                    borderRadius: '20px',
                                    fontSize: '0.78rem',
                                    border: '1px solid var(--border-color)',
                                    color: 'var(--accent-gold-light)',
                                    fontWeight: '500'
                                }}>
                                    📍 {temple.location}
                                </div>
                            </div>

                            {/* Card Details Text */}
                            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: '1' }}>
                                <h3 style={{ fontSize: '1.3rem', marginBottom: '12px', color: 'var(--text-primary)' }}>
                                    {temple.name}
                                </h3>
                                <p style={{
                                    color: 'var(--text-secondary)',
                                    fontSize: '0.88rem',
                                    lineHeight: '1.6',
                                    marginBottom: '20px',
                                    flexGrow: '1',
                                    overflow: 'hidden',
                                    display: '-webkit-box',
                                    WebkitLineClamp: '3',
                                    WebkitBoxOrient: 'vertical'
                                }}>
                                    {temple.description}
                                </p>

                                <Link
                                    to={`/temples/${temple._id}`}
                                    className="btn btn-secondary"
                                    style={{
                                        marginTop: 'auto',
                                        textAlign: 'center',
                                        padding: '10px 0',
                                        fontSize: '0.85rem'
                                    }}
                                >
                                    View Sanctuary details →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TempleList;
