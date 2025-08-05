// src/components/Greeting.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const Greeting = () => {
  const { width, height } = useWindowSize();
  const friendName = 'Aesha'; // You can change this name

  return (
    <div className="container greeting-container">
      <Confetti width={width} height={height} />
      <h1>Happy Birthday, {friendName}!✨</h1>
      <p>To the one who knows me better than I know myself!</p>
      <Link to="/card">
        <button className="magic-button">Click mee!</button>
      </Link>
    </div>
  );
};

export default Greeting;