import Phaser from "phaser";
import Bullets from "./Bullets";
import { gameObjects } from "../scenes/Game";

export default class Player extends Phaser.GameObjects.Sprite {
  private _ship!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private _bullets!: Bullets;
  private _A!: Phaser.Input.Keyboard.Key;
  private _S!: Phaser.Input.Keyboard.Key;
  private _W!: Phaser.Input.Keyboard.Key;
  private _D!: Phaser.Input.Keyboard.Key;
  private _SPACE!: Phaser.Input.Keyboard.Key;
  private _gamepad!: Phaser.Input.Gamepad.Gamepad;
  private _health!: number;
  private _lifeBar!: Phaser.GameObjects.Graphics;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, gameObjects.ship);
    this.initSprite();
  }

  initSprite() {
    this._health = 1;
    this._A = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.A
    );
    this._S = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.S
    );
    this._W = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.W
    );
    this._D = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.D
    );
    this._SPACE = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    this._bullets = new Bullets(this.scene);
    this._ship = this.scene.physics.add.sprite(
      this.x,
      this.y,
      gameObjects.ship
    );

    this._ship.setCollideWorldBounds(true);
    this._ship.setGravity(0, 0);
    this._lifeBar = this.scene.add.graphics();
    this.redrawLifebar();
  }

  update(time: number, delta: number) {
    if (this._ship && this._ship.active) {
      this._gamepad = this.scene.input.gamepad.getPad(0);
      if (this._SPACE?.isDown || this._gamepad?.X) {
        this._bullets.fireBullet(this._ship.x, this._ship.y - 25, time);
      }

      this.setShipVelocity(0, 0);
      if (this._A.isDown && this._S.isDown) {
        this.setShipVelocity(-160, 160);
      } else if (this._D.isDown && this._S.isDown) {
        this.setShipVelocity(160, 160);
      } else if (this._A.isDown && this._W.isDown) {
        this.setShipVelocity(-160, -160);
      } else if (this._D.isDown && this._W.isDown) {
        this.setShipVelocity(160, -160);
      } else if (this._S.isDown) {
        this.setShipVelocity(0, 160);
      } else if (this._A.isDown) {
        this.setShipVelocity(-160, 0);
      } else if (this._D.isDown) {
        this.setShipVelocity(160, 0);
      } else if (this._W.isDown) {
        this.setShipVelocity(0, -160);
      }

      if (this._gamepad?.axes.length) {
        const axisH = this._gamepad.axes[0].getValue();
        const axisV = this._gamepad.axes[1].getValue();

        this.setShipVelocity(160 * axisH, 0);
        this.setShipVelocity(0, 160 * axisV);

        this._ship.flipX = axisH > 0;
      }
    }
  }

  private setShipVelocity(x: number, y: number): void {
    this._ship.setVelocity(x, y);
  }

  public updateHealth(): void {
    if (this._health > 0) {
      this._health -= 0.01;
      this.redrawLifebar();
    } else {
      this._health = 0;
      this._ship.setVisible(false)
      this._ship.setActive(false)
      // this.scene.scene.start("MenuScene");
    }
  }

  private redrawLifebar(): void {
    this._lifeBar.clear();
    this._lifeBar.fillStyle(0xf5161c, 1);
    this._lifeBar.fillRect(
      12,
      this.scene.scale.height - 25,
      this.width * this._health * 5,
      15
    );
    this._lifeBar.lineStyle(2, 0xffffff);
    this._lifeBar.strokeRect(
      12,
      this.scene.scale.height - 25,
      this.width * 5,
      15
    );
    this._lifeBar.setDepth(1);
    this._lifeBar.setAlpha(0.5);
  }
}
