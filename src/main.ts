import Phaser from "phaser";
import GameScene from "./scenes/Game";
import config from "./config";

new Phaser.Game(
  Object.assign(config, {
    scene: [GameScene]
  })
);
