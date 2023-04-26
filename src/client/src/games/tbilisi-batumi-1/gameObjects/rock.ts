import { GamePlay } from "../scenes/gamePlay";

export class Rock {
  rockImage!: Phaser.Physics.Matter.Sprite;

  constructor(public scene: GamePlay, public x: number, public y: number) {
    this.rockImage = this.scene.matter.add
      .sprite(this.x, this.y, "rock", undefined, {
        collisionFilter: {
          category: 0x0001 | 0x0002,
          mask: 0x0002 | 0x0001,
        },
        shape: this.scene.cache.json.get("rockMeshe").rockMeshe,
      } as Phaser.Types.Physics.Matter.MatterBodyConfig)
      .setOrigin(0.5)
      .setTint(0x766bc7)
      .setScale(0.13);

    this.rockImage.setMass(300);
  }
}
