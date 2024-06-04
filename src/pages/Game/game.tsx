import Phaser from "phaser";
import { FallingObjects } from "../../game/scenes/FallingObjects";

export const Game = () => {
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: "phaser-container",
    backgroundColor: "#282c34",
    width: 800,
    height: 600,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 0, x: 0 },
      },
    },
    scene: FallingObjects,
  };

  new Phaser.Game(config);

  return null;
};
