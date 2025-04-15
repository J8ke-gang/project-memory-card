import React, { useState } from "react";
import Scoreboard from "./scoreboard";
import CarPhotos from "../assets/carPhotos";

const shuffleCards = (cards) => {
  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Cards = () => {
  const [cars, setCars] = useState(shuffleCards(CarPhotos));
  const [selectedCard, setSelectedCard] = useState(null);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [message, setMessage] = useState("Pick a car");

  const handleCardClick = (car) => {
    if (!selectedCard) {
      setSelectedCard(car);
      setCars(shuffleCards(cars));
      setMessage("Now try to pick the same car!");
    } else {
      if (car.title === selectedCard.title) {
        const newScore = score + 1;
        setScore(newScore);
        setBestScore((prev) => Math.max(prev, newScore));
        setMessage("Matched! Nice");
      } else {
        setScore(0);
        setMessage("Wrong! Try again.");
      }
      setSelectedCard(null);
      setCars(shuffleCards(cars));
    }
  };

  return (
    <div className="game-container">
      <Scoreboard score={score} bestScore={bestScore} />
      <p className="message">{message}</p>
      <div className="game-board">
        {cars.map((car, index) => (
          <div
            key={index}
            className={`card ${car.matched ? 'matched' : car.notMatched ? 'not-matched' : ''}`}
            onClick={() => handleCardClick(car)}
          >
            <h2>{car.title}</h2>
            <img src={car.img} alt={car.alt} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
