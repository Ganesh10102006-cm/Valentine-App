
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ValentineCard = ({ userData, onBack }) => {
    const [status, setStatus] = useState('generating');
    const [error, setError] = useState('');
    const [downloadUrl, setDownloadUrl] = useState(null);

    useEffect(() => {
        const generateGame = async () => {
            try {
                // Determine API URL based on environment (dev vs prod)
                const apiUrl = `${import.meta.env.DEV}/generate`;

                const response = await axios.post(apiUrl, userData, {
                    responseType: 'blob', // Important for handling file downloads
                    headers: { 'Content-Type': 'application/json' }
                });

                const url = window.URL.createObjectURL(new Blob([response.data]));
                setDownloadUrl(url);
                setStatus('completed');
            } catch (err) {
                console.error(err);
                const errorMessage = err.response?.data?.error || err.message || 'Generation failed';
                setError(errorMessage);
                setStatus('error');
            }
        };

        generateGame();
    }, [userData]);

    return (
        <div className="card-container glass-card fade-in">
            {status === 'generating' && (
                <div style={{ textAlign: 'center' }}>
                    <h2 style={{ color: '#d63384' }}>Crafting Magic...</h2>
                    <p>Our AI is designing your custom game.</p>
                    <div className="loader" style={{ margin: '2rem auto', border: '5px solid #f3f3f3', borderTop: '5px solid #d63384', borderRadius: '50%', width: '50px', height: '50px', animation: 'spin 1s linear infinite' }}></div>
                    <p style={{ fontSize: '0.9rem', color: '#666' }}>This might take about 10-20 seconds.</p>
                </div>
            )}

            {status === 'completed' && (
                <div style={{ textAlign: 'center' }}>
                    <h2 style={{ color: '#28a745' }}>Done! 💌</h2>
                    <p>Your game is ready to play.</p>
                    <a href={downloadUrl} download="valentine-game.html" className="btn-primary" style={{ display: 'inline-block', marginTop: '1rem', textDecoration: 'none', padding: '10px 20px', borderRadius: '5px' }}>
                        Download Game 💘
                    </a>
                    <div style={{ marginTop: '1rem' }}>
                        <button onClick={onBack} className="btn-secondary">
                            Create Another
                        </button>
                    </div>
                </div>
            )}

            {status === 'error' && (
                <div style={{ textAlign: 'center' }}>
                    <h2 style={{ color: '#dc3545' }}>Oops! 💔</h2>
                    <p>Something went wrong: {error}</p>
                    <button onClick={onBack} className="btn-secondary" style={{ marginTop: '1rem' }}>
                        Try Again
                    </button>
                </div>
            )}

            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default ValentineCard;
