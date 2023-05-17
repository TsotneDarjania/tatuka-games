import { colliderCategories } from "../helper/colliderCategories";
import { GamePlay } from "../scenes/gamePlay";

export class Rail extends Phaser.GameObjects.Container {
  rightRail!: Phaser.GameObjects.Image;
  leftRail!: Phaser.GameObjects.Image;

  constructor(scene: GamePlay, x: number, y: number) {
    super(scene, x, y);
    this.scene.add.existing(this);
    this.setDepth(-6);

    this.init();
  }

  init() {
    this.createRightRail();
    this.createLeftRail();
  }

  createLeftRail() {
    this.leftRail = this.scene.add
      .image(this.x - 378, this.y - 3, "rail")
      .setScale(0.15)
      .setDepth(-5)
      .setFlipY(true);
  }

  createRightRail() {
    this.rightRail = this.scene.add
      .image(this.x, this.y, "rail")
      .setScale(0.15)
      .setDepth(-5);
  }
}
