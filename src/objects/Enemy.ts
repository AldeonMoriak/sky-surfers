import Phaser from "phaser";
import Bullets from "./Bullets";
import { gameObjects } from "../scenes/Game";

export default class Enemy1 extends Phaser.GameObjects.Sprite {
  private _enemy!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private _bullets!: Bullets;
  private _health!: number;
  private _speed!: number;
  private _initialtime!: number;
  private _directionIndex!: number;
  private _directionValues!: { [x: number]: [number, number] };

  constructor(scene: Phaser.Scene, x: number, y: number, initialTime: number) {
    super(scene, x, y, gameObjects.enemy1);
    this.initSprite();
    this._initialtime = initialTime;
  }

  initSprite() {
    this._health = 1;
    this._speed = 110;
    this._initialtime = 0;
    this._directionIndex = 1;

    this._directionValues = {
      0: [-1, 1],
      1: [1, 1],
      2: [-1, 1],
      3: [-1, -1],
      4: [1, -1],
    };

    // this._bullets = new Bullets(this.scene);
    this._enemy = this.scene.physics.add.sprite(
      this.x,
      this.y,
      gameObjects.enemy1
    );
    // this._enemy.setFlipY(true);

    this._enemy.setCollideWorldBounds(true);
    this._enemy.setGravity(0, 0);
  }

  update(time: number, delta: number) {
    if (this._enemy && this._enemy.active) {
      // this.setShipVelocity(200, 0);

      if (time > this._initialtime) {
        const remainder = this._directionIndex % 4;
        this.setShipVelocity(
          this._directionValues[remainder][0] * this._speed,
          this._directionValues[remainder][1] * this._speed
        );
        this._initialtime = time + 2000;
        this._directionIndex += 1;
      }
    }
  }

  private setShipVelocity(x: number, y: number): void {
    this._enemy.setVelocity(x, y);
    const angle = this._enemy.body.angle;
    this._enemy.setRotation(Math.PI / 2 + angle);
  }

  public updateHealth(): void {
    if (this._health > 0) {
      this._health -= 0.01;
    } else {
      this._health = 0;
      this._enemy.setVisible(false);
      this._enemy.setActive(false);
      // this.scene.scene.start("MenuScene");
    }
  }
}
