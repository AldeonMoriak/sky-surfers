import Phaser from "phaser";
import Bullets from "../objects/Bullets";

export default class Game extends Phaser.Scene {
  private _ship!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private _bullets!: Bullets;
  private _A!: Phaser.Input.Keyboard.Key;
  private _S!: Phaser.Input.Keyboard.Key;
  private _W!: Phaser.Input.Keyboard.Key;
  private _D!: Phaser.Input.Keyboard.Key;
  private _SPACE!: Phaser.Input.Keyboard.Key;
  private _gamepad!: Phaser.Input.Gamepad.Gamepad;

  constructor() {
    super("GameScene");
  }
  private gameObjects = {
    bullet: "bullet",
    ship: "ship",
  };

  preload() {
    this.load.image(this.gameObjects.bullet, "assets/tile_0000.png");
    this.load.image(this.gameObjects.ship, "assets/ship_0001.png");
  }

  create() {
    this._A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    this._S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    this._W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    this._D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    this._SPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)


    this._ship = this.physics.add.sprite(400, 470, this.gameObjects.ship);
    this._bullets = new Bullets(this);

    this._ship.setCollideWorldBounds(true);
    this._ship.setGravity(0, 0);

  }

  update(time: number, delta: number) {
    this._gamepad = this.input.gamepad.getPad(0);
    if (this._SPACE.isDown || this._gamepad?.X) {
      this._bullets.fireBullet(this._ship.x, this._ship.y - 25, time);
    }
    
    this._ship.setVelocity(0, 0);
    if (this._A.isDown && this._S.isDown) {
      this._ship.setVelocity(-160, 160);
    }
    else if (this._D.isDown && this._S.isDown) {
      this._ship.setVelocity(160, 160);
    }
    else if (this._A.isDown && this._W.isDown) {
      this._ship.setVelocity(-160, -160);
    }
    else if (this._D.isDown && this._W.isDown) {
      this._ship.setVelocity(160, -160);
    }
    else if (this._S.isDown) {
      this._ship.setVelocity(0, 160);
    }
    else if (this._A.isDown) {
      this._ship.setVelocity(-160, 0);
    }
    else if (this._D.isDown) {
      this._ship.setVelocity(160, 0);
    }
    else if (this._W.isDown) {
      this._ship.setVelocity(0, -160);
    }

    if (this._gamepad?.axes.length) {
      const axisH = this._gamepad.axes[0].getValue();
      const axisV = this._gamepad.axes[1].getValue();

      this._ship.setVelocityX(160 * axisH);
      this._ship.setVelocityY(160 * axisV);

      this._ship.flipX = (axisH > 0);
    }

  }
}
