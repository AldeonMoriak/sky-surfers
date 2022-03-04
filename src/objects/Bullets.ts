import Bullet from "./Bullet";
import Phaser from 'phaser';

export default class Bullets extends Phaser.Physics.Arcade.Group {
  private _lastBulletTime: number = 0;
  private _isRight: boolean = false;
  constructor(scene: Phaser.Scene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      frameQuantity: 50,
      key: 'bullet',
      active: false,
      visible: false,
      classType: Bullet
    })
  }

  fireBullet(x: number, y: number, time: number) {
    const bullet = this.getFirstDead(false) as Bullet;

    if (bullet && (time - this._lastBulletTime > 100)) {
      this._lastBulletTime = time;
      if (this._isRight) {
        bullet.fire(x - 9, y);
      } else {
        bullet.fire(x + 9, y);
      }

      this._isRight = !this._isRight
    }
  }
}