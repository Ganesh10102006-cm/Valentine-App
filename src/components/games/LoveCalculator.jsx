import React, { useState } from 'react';

const LoveCalculator = ({ userData }) => {
    const [result, setResult] = useState(null);

    const calculateLove = () => {
        // Deterministic "random" based on names so it's consistent for the same pair
        const seed = (userData.name + userData.valentineName).toLowerCase().split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const percentage = Math.abs(Math.sin(seed) * 10000 % 40) + 60; // Always between 60% and 100% because we are nice :)

        setTimeout(() => {
            setResult(Math.floor(percentage));
        }, 1500);
    }

    return (
        <div className="glass-card fade-in">
            <h2>Love Calculator 💘</h2>
            <div style={{ margin: '2rem 0', fontSize: '1.5rem' }}>
                {userData.name} + {userData.valentineName}
            </div>

            {!result ? (
                <button className="btn-primary" onClick={calculateLove}>
                    Calculate Compatibility
                </button>
            ) : (
                <div className="result fade-in">
                    <div style={{ fontSize: '4rem', color: '#d00000', fontWeight: 'bold' }}>
                        {result}%
                    </div>
                    <p style={{ marginTop: '1rem', fontStyle: 'italic' }}>
                        {result > 90 ? "A Match Made in Heaven! 👼" :
                            result > 80 ? "Super Compatible! 🔥" :
                                "Still a great couple! 😉"}
                    </p>
                    <p style={{ marginTop: '0.5rem', opacity: 0.8 }}>
                        Based on: {userData.description.substring(0, 20)}...
                    </p>
                </div>
            )}
        </div>
    );
};

export default LoveCalculator;
