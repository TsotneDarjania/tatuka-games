import { GamePlay } from "../scenes/gamePlay";

export class BonFire {
  constructor(
    public scene: Phaser.Scene,
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ) {
    this.init();
  }

  init() {
    const bonfire = this.scene.add
      .sprite(this.x, this.y, "bonfire")
      .setTint(0xecff59)
      .setDepth(-5)
      .setDisplaySize(this.width, this.height);
    bonfire.play("bonfire_idle");

    // add Dead Zone
    const deadZone = this.scene.matter.add.rectangle(
      this.x,
      this.y + this.width / 2,
      this.width,
      this.height,
      {
        ignoreGravity: true,
        collisionFilter: {
          category: 0x0001,
          mask: 0x0002,
        },
        isSensor: true,
      }
    );

    this.scene.matter.world.on("collisionstart", (event: any) => {
      event.pairs.forEach((pair: any) => {
        if (pair.bodyB === deadZone) {
          const scene = this.scene as GamePlay;
          scene.car.playExplosionAnimation();
        }
      });
    });
  }
}
