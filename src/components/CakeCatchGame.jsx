// src/components/CakeCatchGame.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const GAME_WIDTH = 600;
const GAME_HEIGHT = 400;
const CATCHER_WIDTH = 80;
const ITEM_WIDTH = 40;
const BASE_SPEED = 2;
const ITEM_GENERATION_INTERVAL = 700; // ms

const CakeCatchGame = () => {
  const [catcherX, setCatcherX] = useState(GAME_WIDTH / 2 - CATCHER_WIDTH / 2);
  const [items, setItems] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const gameAreaRef = useRef(null);
  const navigate = useNavigate();

  // Catcher movement with mouse
  const handleMouseMove = useCallback((e) => {
    if (!gameAreaRef.current || gameOver) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    let newX = e.clientX - rect.left - CATCHER_WIDTH / 2;
    newX = Math.max(0, Math.min(newX, GAME_WIDTH - CATCHER_WIDTH));
    setCatcherX(newX);
  }, [gameOver]);

  // NEW: Catcher movement with keyboard
  const handleKeyDown = useCallback((e) => {
    if (gameOver) return;
    setCatcherX((prevX) => {
      let newX = prevX;
      if (e.key === 'ArrowLeft') {
        newX = prevX - 20;
      } else if (e.key === 'ArrowRight') {
        newX = prevX + 20;
      }
      return Math.max(0, Math.min(newX, GAME_WIDTH - CATCHER_WIDTH));
    });
  }, [gameOver]);
  
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleMouseMove, handleKeyDown]);

  // Main game loop
  useEffect(() => {
    if (gameOver || timeLeft <= 0) {
        setGameOver(true);
        return;
    };

    // MODIFIED: Speed increases with score
    const currentSpeed = BASE_SPEED + Math.floor(score / 50);

    const gameLoop = setInterval(() => {
      setItems(prevItems =>
        prevItems
          .map(item => ({ ...item, y: item.y + currentSpeed }))
          .filter(item => {
            // Check for collision with catcher
            if (
              item.y + ITEM_WIDTH > GAME_HEIGHT - 20 &&
              item.x > catcherX - ITEM_WIDTH / 2 &&
              item.x < catcherX + CATCHER_WIDTH - ITEM_WIDTH / 2
            ) {
              if (item.type === 'cake') {
                setScore(s => s + 10);
              } else { // It's a bomb!
                setGameOver(true);
              }
              return false; // Remove item after catch/collision
            }
            return item.y < GAME_HEIGHT; // Remove item if it falls off screen
          })
      );
    }, 30);

    return () => clearInterval(gameLoop);
  }, [gameOver, catcherX, score, timeLeft]);

  // Item generation loop
  useEffect(() => {
    if (gameOver) return;

    const itemGenerator = setInterval(() => {
      // NEW: Randomly generate a cake or a bomb
      const itemType = Math.random() < 0.15 ? 'bomb' : 'cake'; // 15% chance of bomb
      const newItem = {
        id: Date.now(),
        x: Math.random() * (GAME_WIDTH - ITEM_WIDTH),
        y: 0,
        type: itemType,
      };
      setItems(prev => [...prev, newItem]);
    }, ITEM_GENERATION_INTERVAL);
    
    return () => clearInterval(itemGenerator);
  }, [gameOver]);

  // Countdown timer
  useEffect(() => {
    if (gameOver) return;
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setGameOver(true);
    }
  }, [timeLeft, gameOver]);

  const restartGame = () => {
    setScore(0);
    setItems([]);
    setGameOver(false);
    setTimeLeft(60);
    setCatcherX(GAME_WIDTH / 2 - CATCHER_WIDTH / 2);
  };

  return (
    <div className="container game-container">
      <h2>Cake Catcher!</h2>
      <div className="game-info">Score: {score} | Time Left: {timeLeft}s</div>
      <div ref={gameAreaRef} className="game-area" style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}>
        {gameOver ? (
          <div className="game-over">
            <h2>Game Over!</h2>
            <h3>Your Final Score: {score}</h3>
            <p>Hope you had fun! Happy Birthday again!</p>
            <div className="game-over-buttons">
                <button className="magic-button secondary" onClick={() => navigate('/card')}>
                    Back to Card
                </button>
                <button className="magic-button" onClick={restartGame}>
                    Play Again
                </button>
            </div>
          </div>
        ) : (
          <>
            <div className="catcher" style={{ left: catcherX, width: CATCHER_WIDTH }}>🎂</div>
            {items.map(item => (
              <div key={item.id} className="item" style={{ left: item.x, top: item.y }}>
                {item.type === 'cake' ? '🍰' : '💣'}
              </div>
            ))}
          </>
        )}
      </div>
      <p className="game-instructions">Use your mouse or ← → arrow keys to move.</p>
    </div>
  );
};

export default CakeCatchGame;