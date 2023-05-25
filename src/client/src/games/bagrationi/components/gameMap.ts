import { GamePlay } from "../scenes/gamePlay";

export class GameMap extends Phaser.GameObjects.Container {
  constructor(scene: GamePlay, x: number, y: number) {
    super(scene, x, y);
    this.scene.add.existing(this);

    this.init();
  }

  init() {
    const image_1 = this.scene.add.image(0, 0, "map-image-1");
    const image_2 = this.scene.add.image(
      image_1.displayWidth + 25,
      0,
      "map-image-2"
    );
    const image_3 = this.scene.add.image(
      image_1.displayWidth + image_2.displayWidth - 182,
      0,
      "map-image-3"
    );
    const image_4 = this.scene.add.image(
      0,
      image_1.displayHeight,
      "map-image-4"
    );
    const image_5 = this.scene.add.image(
      image_1.displayWidth + 25,
      image_2.displayHeight,
      "map-image-5"
    );
    const image_6 = this.scene.add.image(
      image_1.displayWidth + image_2.displayWidth - 182,
      image_3.displayHeight,
      "map-image-6"
    );

    this.add([image_1, image_2, image_3, image_4, image_5, image_6]);
  }
}
