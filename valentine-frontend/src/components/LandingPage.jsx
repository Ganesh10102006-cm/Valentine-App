import React, { useState } from 'react';

const LandingPage = ({ onStart }) => {
    const [formData, setFormData] = useState({
        userName: '',
        valentineName: '',
        gameIdea: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.userName && formData.valentineName) {
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
                        value={formData.userName}
                        onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
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
                    <label>What's your game idea?</label>
                    <textarea
                        rows="2"
                        placeholder="e.g. A quiz about our first date, or a maze to my heart..."
                        value={formData.gameIdea}
                        onChange={(e) => setFormData({ ...formData, gameIdea: e.target.value })}
                        required
                        style={{ resize: 'none' }}
                    />
                </div>

                <button type="submit" className="btn-primary">
                    Create A Game For Your Valentine
                </button>
            </form>
        </div>
    );
};

export default LandingPage;
