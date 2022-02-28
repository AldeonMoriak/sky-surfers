import Phaser from "phaser";

export default class Game extends Phaser.Scene {
  private _ship!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private _cell!: Phaser.GameObjects.Sprite;
  private _cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super("GameScene");
  }
  private gameObjects = {
    cell: "cell",
    ship: "ship",
  };

  preload() {
    this.load.image(this.gameObjects.cell, "assets/tile_0000.png");
    this.load.image(this.gameObjects.ship, "assets/ship_0001.png");
  }

  create() {
    this._cursors = this.input.keyboard.createCursorKeys();
    this._ship = this.physics.add.sprite(400, 470, this.gameObjects.ship);
    this._cell = this.add.sprite(
      (this.sys.game.config.width as number) / 2,
      (this.sys.game.config.height as number) / 2,
      this.gameObjects.cell
    );

    this._ship.setCollideWorldBounds(true);
    this._ship.setGravity(0, 0);
  }

  update() {
    if (this._cursors.left.isDown && this._cursors.down.isDown) {
      this._ship.setVelocity(-160, 160);
      console.log("left down");
    } else if (this._cursors.right.isDown && this._cursors.down.isDown) {
      this._ship.setVelocity(160, 160);
      console.log("right down");
    } else if (this._cursors.left.isDown && this._cursors.up.isDown) {
      this._ship.setVelocity(-160, -160);
      console.log("left up");
    } else if (this._cursors.right.isDown && this._cursors.up.isDown) {
      this._ship.setVelocity(160, -160);
      console.log("right up");
    } else if (this._cursors.left.isDown) {
      this._ship.setVelocity(-160, 0);
      console.log("left");
    } else if (this._cursors.right.isDown) {
      this._ship.setVelocity(160, 0);
      console.log("right");
    } else if (this._cursors.down.isDown) {
      this._ship.setVelocity(0, 160);
      console.log("down");
    } else if (this._cursors.up.isDown) {
      this._ship.setVelocity(0, -160);
      console.log("up");
    } else {
      this._ship.setVelocity(0, 0);
    }
  }
}
