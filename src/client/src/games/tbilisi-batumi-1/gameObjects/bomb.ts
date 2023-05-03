import { GamePlay } from "../scenes/gamePlay";

export class Bomb {
  bombImage!: Phaser.GameObjects.Image;

  constructor(public scene: GamePlay, public x: number, public y: number) {
    this.addImage();
    this.addAnimation();
    this.addCollider();
  }

  addImage() {
    this.bombImage = this.scene.add
      .image(this.x, this.y, "bombIcon")
      .setScale(0.33);
  }

  addAnimation() {
    this.scene.tweens.add({
      targets: this.bombImage,
      scale: 0.34,
      duration: 300,
      repeat: -1,
      yoyo: true,
    });
  }

  addCollider() {
    const deadZone = this.scene.matter.add.circle(this.x, this.y, 22, {
      ignoreGravity: true,
      collisionFilter: {
        category: 0x0001,
        mask: 0x0002,
      },
      isSensor: true,
    });

    this.scene.matter.world.on("collisionstart", (event: any) => {
      event.pairs.forEach((pair: any) => {
        if (pair.bodyB === deadZone) {
          const scene = this.scene as GamePlay;
          scene.car.playExplosionAnimation(true);

          this.bombImage.setVisible(false);
          setTimeout(() => {
            this.reset();
          }, 7000);
        }
      });
    });
  }

  reset() {
    this.bombImage.setVisible(true);
  }
}
