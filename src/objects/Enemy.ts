import Phaser from "phaser";
import Bullets from "./Bullets";
import { gameObjects } from "../scenes/Game";

export default class Enemy1 extends Phaser.GameObjects.Sprite {
  private _enemy!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private _bullets!: Bullets;
  private _health!: number;
  private _speed!: number;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, gameObjects.enemy1);
    this.initSprite();
  }

  initSprite() {
    this._health = 1;
    this._speed = 110;

    // this._bullets = new Bullets(this.scene);
    this._enemy = this.scene.physics.add.sprite(
      this.x,
      this.y,
      gameObjects.enemy1
    );
    this._enemy.setRotation(Math.PI / 1.1);

    this._enemy.setCollideWorldBounds(true);
    this._enemy.setGravity(0, 0);
  }

  update(time: number, delta: number) {
    if (this._enemy && this._enemy.active) {
      this.setShipVelocity(200,0)

      if(time % 4000 < 100) {
      this.setShipVelocity(-200, 200)
      }

    }
  }

  private setShipVelocity(x: number, y: number): void {
    this._enemy.setVelocity(x, y);
  }

  public updateHealth(): void {
    if (this._health > 0) {
      this._health -= 0.01;
    } else {
      this._health = 0;
      this._enemy.setVisible(false)
      this._enemy.setActive(false)
      // this.scene.scene.start("MenuScene");
    }
  }
}
