import Phaser from "phaser";
import { useEffect, useRef } from "react";
import { createFallingVirusesScene } from "../../game/createFallingVirusesScene";
import { useNavigate } from "react-router-dom";

export const Game = () => {
  const phaserGameRef = useRef<any>(null);
  const navigate = useNavigate();
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    backgroundColor: "#282c34",
    parent: 'game',
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 0, x: 0 },
      },
    },
    scene: createFallingVirusesScene(() => navigate('/result'))
  };

  useEffect(() => {
    if (phaserGameRef.current) {
      return;
    }
    phaserGameRef.current = new Phaser.Game(config);
    return () => {
      phaserGameRef.current.destroy(true);
      phaserGameRef.current = null;
    };
  } , [])

  return <div id='game'></div>;
};
