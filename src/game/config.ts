import Phaser from "phaser";
import { FallingObjects } from "./scenes/FallingObjects";

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

const game = new Phaser.Game(config);

export default game;
