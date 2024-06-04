import Phaser from "phaser";
import { FallingObjects } from "../../game/scenes/FallingObjects";

export const Game = () => {

  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: "phaser-container",
    backgroundColor: "#282c34",
    width: 800,
    height: 600,
    scene: FallingObjects,
  };

  const game = new Phaser.Game(config);

  return <></>
};