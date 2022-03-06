import Phaser from "phaser";

export default {
  type: Phaser.AUTO,
  parent: "game",
  backgroundColor: "#33A5E7",
  input: {
    gamepad: true
  },
  scale: {
    width: window.innerWidth,
    height: window.innerHeight,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true
    },
  },
};
