export class Flower extends Phaser.GameObjects.Image {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    key: string,
    scale: number
  ) {
    super(scene, x, y, key);
    this.scene.add.existing(this);

    this.setScale(scale);
    this.setDepth(-4);
  }
}
