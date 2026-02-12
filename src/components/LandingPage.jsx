import React, { useState } from 'react';

const LandingPage = ({ onStart }) => {
    const [formData, setFormData] = useState({
        name: '',
        valentineName: '',
        description: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name && formData.valentineName) {
            onStart(formData);
        }
    };

    return (
        <div className="landing-page glass-card fade-in">
            <h1 style={{ fontSize: '3rem', color: '#d00000', marginBottom: '1rem' }}>
                My Valentine 💘
            </h1>
            <p style={{ marginBottom: '2rem', fontSize: '1.2rem' }}>
                Let's create something special.
            </p>

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Your Name</label>
                    <input
                        type="text"
                        placeholder="e.g. Romeo"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                </div>

                <div className="input-group">
                    <label>Valentine's Name</label>
                    <input
                        type="text"
                        placeholder="e.g. Juliet"
                        value={formData.valentineName}
                        onChange={(e) => setFormData({ ...formData, valentineName: e.target.value })}
                        required
                    />
                </div>

                <div className="input-group">
                    <label>Describe your relationship / them</label>
                    <textarea
                        rows="3"
                        placeholder="e.g. We love pizza, hiking, and silly jokes..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>

                <button type="submit" className="btn-primary">
                    Create Card 💖
                </button>
            </form>
        </div>
    );
};

export default LandingPage;
