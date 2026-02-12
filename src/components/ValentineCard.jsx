import React from 'react';

const ValentineCard = ({ userData, onBack }) => {
    return (
        <div className="glass-card fade-in" style={{ padding: '3rem', textAlign: 'center' }}>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', color: '#d00000' }}>
                Happy Valentine's Day! 💖
            </h1>

            <div style={{ fontSize: '2rem', margin: '2rem 0', fontWeight: 'bold' }}>
                Dear {userData.valentineName},
            </div>

            <p style={{ fontSize: '1.4rem', lineHeight: '1.6', marginBottom: '2rem', fontStyle: 'italic' }}>
                "{userData.description}"
            </p>

            <div style={{ fontSize: '1.5rem', marginTop: '3rem' }}>
                With all my love,<br />
                <strong>{userData.name}</strong> 💋
            </div>

            <button onClick={onBack} style={{ marginTop: '3rem', background: 'transparent', textDecoration: 'underline', color: '#555', fontSize: '0.9rem' }}>
                Create Another Card
            </button>
        </div>
    );
};

export default ValentineCard;
