import Phaser from "phaser";
import Enemy1 from "../objects/Enemy";
import Player from "../objects/Player";

export const gameObjects = {
  bullet: "bullet",
  ship: "ship",
  enemy1: "enemy1",
};
export default class Game extends Phaser.Scene {
  private _player!: Player;
  private _enemy1!: Enemy1;
  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.image(gameObjects.bullet, "assets/tile_0000.png");
    this.load.image(gameObjects.ship, "assets/ship_0001.png");
    this.load.image(gameObjects.enemy1, "assets/ship_0000.png");
  }

  create() {
    this._player = new Player(this, 400, 470);
      this._enemy1 = new Enemy1(this, 100, 270);
  }

  update(time: number, delta: number): void {
    this._player.update(time, delta);
    if (time % 3000 < 100) {
      this._enemy1.update(time, delta);
    }
  }
}
