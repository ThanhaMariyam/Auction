import React, { useState, useRef } from "react";
import "./Carousel.css";

const BASE = import.meta.env.BASE_URL;

const initialPlayers = [
  { id: 1, name: "AFTHAB", img: `${BASE}AFTHAB.png` },
  { id: 2, name: "ASHIQ", img: `${BASE}ASHIQ.png` },
  { id: 3, name: "ASIF", img: `${BASE}ASIF.png` },
  { id: 4, name: "ASLAM", img: `${BASE}ASLAM.png` },
  { id: 5, name: "FAISAL NASEEB", img: `${BASE}FAISAL_NASEEB.png` },
  { id: 6, name: "HADI", img: `${BASE}HADI.png` },
  { id: 7, name: "HANEEN", img: `${BASE}HANEEN.png` },
  { id: 8, name: "HARSH", img: `${BASE}HARSH.png` },
  { id: 9, name: "HASSAN", img: `${BASE}HASSAN.png` },
  { id: 10, name: "JABID", img: `${BASE}JABID.png` },
  { id: 11, name: "JALEEL", img: `${BASE}JALEEL.png` },
  { id: 12, name: "JASEEL", img: `${BASE}JASEEL.png` },
  { id: 13, name: "JASEEM", img: `${BASE}JASEEM.png` },
  { id: 14, name: "JAZEEL", img: `${BASE}JAZEEL.png` },
  { id: 15, name: "JINAN", img: `${BASE}JINAN.png` },
  { id: 16, name: "JISHNU P", img: `${BASE}JISHNU_P.png` },
  { id: 17, name: "JISHNU", img: `${BASE}JISHNU.png` },
  { id: 18, name: "JUNAID", img: `${BASE}JUNAID.png` },
  { id: 19, name: "LABEEB", img: `${BASE}LABEEB.png` },
  { id: 20, name: "NADEEM", img: `${BASE}NADEEM.png` },
  { id: 21, name: "NIHAD", img: `${BASE}NIHAD.png` },
  { id: 22, name: "RAHSHAL", img: `${BASE}RAHSHAL.png` },
  { id: 23, name: "RIFAY", img: `${BASE}RIFAY.png` },
  { id: 24, name: "RIZWAN", img: `${BASE}RIZWAN.png` },
  { id: 25, name: "SHAHAD", img: `${BASE}SHAHAD.png` },
  { id: 26, name: "SHAMEEM", img: `${BASE}SHAMEEM.png` },
  { id: 27, name: "SHIBILI", img: `${BASE}SHIBILI.png` },
  { id: 28, name: "SUHAIL", img: `${BASE}SUHAIL.png` },
];

const Carousel = () => {
  const [players, setPlayers] = useState(initialPlayers);
  const [angle, setAngle] = useState(0);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [revealPhase, setRevealPhase] = useState("3d"); // 3d | 2d
  const carouselRef = useRef(null);

  const spinCarousel = () => {
    if (players.length === 0) {
      alert("All players have been selected!");
      return;
    }

    setSelectedPlayer(null);
    setRevealPhase("3d");

    const randomIndex = Math.floor(Math.random() * players.length);
    const total = players.length;
    const targetAngle = (360 / total) * randomIndex;
    const startAngle = angle;

    const duration = 8000;
    const spins = 2;
    let start = null;

    const animate = (time) => {
      if (!start) start = time;
      const t = Math.min((time - start) / duration, 1);
      const easeInOut =
        t < 0.5
          ? 2 * t * t
          : 1 - Math.pow(-2 * t + 2, 2) / 2;

      const currentAngle =
        startAngle + easeInOut * (360 * spins + targetAngle);

      if (carouselRef.current) {
        carouselRef.current.style.transform = `rotateY(${currentAngle}deg)`;
      }

      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        const chosen = players[randomIndex];
        setAngle(currentAngle % 360);
        setSelectedPlayer(chosen);
        setPlayers((p) => p.filter((x) => x.id !== chosen.id));

 
        setTimeout(() => {
          setRevealPhase("2d");
        }, 4000);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <div className="carousel-wrapper glitter-box">
      <div className="heading"><img
  className="logo"
  src={`${import.meta.env.BASE_URL}WhatsApp_Image_2025-12-14_at_00.23.36_a59e74c7-removebg-preview.png`}
  alt="logo"
/>
<h1 className="title glitter-text">SUMJAY PREMIER LEAGUE 2025</h1></div>


      {!selectedPlayer && (
        <div className="carousel-container">
          <div className="carousel" ref={carouselRef}>
            {players.map((player, index) => (
              <img
                key={player.id}
                src={player.img}
                alt={player.name}
                className="carousel-item"
                style={{
                  transform: `rotateY(${
                    (360 / players.length) * index
                  }deg) translateZ(550px)`,
                }}
              />
            ))}
          </div>
        </div>
      )}


      {selectedPlayer && (
        <div className="winner-inline">
          <div
            className={`winner-card ${
              revealPhase === "2d" ? "flat" : ""
            }`}
          >
           
            <div className="card-face front">
              
                <img className="winnner-img" src={selectedPlayer.img} alt={selectedPlayer.name} />
              
            </div>

           
          </div>
        </div>
      )}

      <button className="start-btn" onClick={spinCarousel}>
        Start Auction
      </button>
    </div>
  );
};

export default Carousel;
