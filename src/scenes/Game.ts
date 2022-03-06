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
  private _enemies!: Phaser.GameObjects.Group;
  private _spawnStep!: number;
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
    this._enemies = this.add.group({});
    this._spawnStep = 0;
  }

  update(time: number, delta: number): void {
    this._player.update(time, delta);
    this.spawnEnemy(time);
    this._enemies.children.each((enemy: Phaser.GameObjects.GameObject) => {
      (enemy as Enemy1).update(time, delta);
    });
  }

  spawnEnemy(time: number, type?: string) {
    if (time > this._spawnStep) {
      const enemy = new Enemy1(this, window.innerWidth / 2, -10, time);
      this._enemies.add(enemy);
      this._spawnStep = time + 1000;
    }
  }
}
