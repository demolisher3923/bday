// src/components/BirthdayCard.jsx
import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

// Import your assets
import sticker1 from '../assets/sticker1.jpeg';
import sticker2 from '../assets/sticker2.jpeg';
import sticker3 from '../assets/sticker3.jpg';
import sticker4 from '../assets/bubu1.gif';
import sticker6 from '../assets/sticker4.jpeg';
import sticker7 from '../assets/shinchan1.png';



import birthdayAudio from '../assets/birthday-audio.mp3';
import cardBackground from '../assets/sticker5.jpeg';

const BirthdayCard = () => {
  const { width, height } = useWindowSize();
  const audioRef = useRef(null);
  const navigate = useNavigate(); // NEW: Hook for navigation

  useEffect(() => {
    // Autoplay audio when component mounts
    if (audioRef.current) {
      audioRef.current.play().catch((err) => console.log('Audio autoplay error:', err));
    }
    // Cleanup audio on component unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  return (
    <div className="container card-container">
      <Confetti width={width} height={height} recycle={false} />
      <div
        className="birthday-card"
        style={{ backgroundImage: `url(${cardBackground})` }}
      >
        {/* This overlay div makes the text readable over the background */}
        <div className="card-overlay">
          <h2>To My Dearest Bestie,</h2>
          <p>
            Wishing you the happiest of birthdays!✨💫 Thank you for all the laughs,every moment  we spent with each other, and for being the most incredible friend anyone
            could ask for. You’ve seen every version of me and never walked away. And for that, I’m forever grateful
            I hope the world gives you as much happiness as you’ve given me. May this next year bring you all the happiness you Deserve and with all dreams come true.❤️ 
            <br />
            No matter where life takes us, just know—you’ll always have me!👻
          </p>
          <h4>With lots of love and laugh,<br />Your Best Friend 🤗</h4>

          <div className="stickers">
            <img src={sticker1} alt="Sticker 1" />
            <img src={sticker2} alt="Sticker 2" />
            <img src={sticker3} alt="Sticker 3" />
            <img src={sticker4} alt="Sticker 4" />
            <img src={sticker6} alt="Sticker 6" />
            <img src={sticker7} alt="Sticker 7" />
          </div>

          <div className="card-buttons">
            {/* NEW: Back button */}
            <button className="magic-button secondary" onClick={() => navigate('/')}>
              Go Back
            </button>
            <Link to="/game">
              <button className="magic-button">One Last Surprise!</button>
            </Link>
          </div>
        </div>
      </div>
      {/* Hidden audio element */}
      <audio ref={audioRef} src={birthdayAudio} loop />
    </div>
  );
};

export default BirthdayCard;