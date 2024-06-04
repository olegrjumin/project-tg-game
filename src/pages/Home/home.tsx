import { Link } from "react-router-dom";
import "./home.css"

export const Home = () => {
  return (
    <main>
      <div className="avatar">
        <div className="avatar-image"></div>
        <div className="user">
          Name Surname
        </div>
      </div>
      <div className="main-text">
        <p>Help protect your device from malware.</p>
        <p>Join the protection squad.</p>
      </div>
      <div className="game-start">
        <button className="start-button">
            <Link to="/game">
              Start the game
            </Link>
          </button>
      </div>
    </main>
  );
};
