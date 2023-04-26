import { GamePlay } from "../scenes/gamePlay";

export class GovermentStation {
  mainImage!: Phaser.GameObjects.Image;
  isShow: boolean = false;

  constructor(public scene: GamePlay, public x: number, public y: number) {
    this.init();
  }

  init() {
    this.addImage();
    this.addCollider();
  }

  addImage() {
    this.scene.add
      .image(this.x, this.y, "govermentStation")
      .setScale(0.5)
      .setDepth(-10);
  }

  addCollider() {
    const collider = this.scene.matter.add.rectangle(this.x, 0, 100, 4200, {
      ignoreGravity: true,
      collisionFilter: {
        category: 0x0001,
        mask: 0x0002,
      },
      isSensor: true,
    });

    this.scene.matter.world.on("collisionstart", (event: any) => {
      event.pairs.forEach((pair: any) => {
        if (pair.bodyB === collider) {
          if (this.scene.matter.world === undefined) return;
          this.showInformation();
        }
      });
    });
  }

  showInformation() {
    if (this.isShow === true) return;
    this.scene.gameMenu.showGovermentInformationOnMap(
      "veteran",
      [
        "The Armed Forces of Georgia inform ",
        "you that the occupying Russians are expected",
        "to appear on the road, we cannot do anything,",
        "we advise you not to go there, return to Tbilisi",
      ],
      0
    );
    this.isShow = true;
  }
}
