import Phaser from "phaser";
import { FallingObjects } from "../../game/scenes/FallingObjects";
import { useEffect, useRef } from "react";

export const Game = () => {
  const phaserGameRef = useRef<any>(null);
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
    scene: FallingObjects,
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
