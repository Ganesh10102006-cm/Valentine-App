import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import ValentineCard from './components/ValentineCard';

function App() {
  const [gameState, setGameState] = useState('landing'); // landing, card
  const [userData, setUserData] = useState(null);

  const showCard = (data) => {
    setUserData(data);
    setGameState('card');
  };

  return (
    <>
      <div className="floating-hearts">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="heart"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="app-container">
        {gameState === 'landing' && <LandingPage onStart={showCard} />}

        {gameState === 'card' && (
          <ValentineCard
            userData={userData}
            onBack={() => setGameState('landing')}
          />
        )}
      </div>
    </>
  );
}

export default App;
