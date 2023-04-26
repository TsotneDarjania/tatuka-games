import { GamePlay } from "../scenes/gamePlay";
import { GameMenu } from "../ui/menu/gameMenu";

export class MusicIcon extends Phaser.GameObjects.Image {
  gamePlayMenuScene!: GameMenu;

  showtext!: Array<string>;

  constructor(
    public scene: GamePlay,
    x: number,
    y: number,
    key: string,
    showText: Array<string>,
    public musicIndex: string
  ) {
    super(scene, x, y, key);
    this.scene.add.existing(this);
    this.showtext = showText;

    this.init();
  }

  init() {
    this.setScale(0.14);
    this.setTint(0x776cc7);

    this.addZone();
    this.addAnimation();
  }

  addAnimation() {
    this.scene.tweens.add({
      targets: this,
      scale: 0.145,
      duration: 200,
      repeat: Infinity,
      yoyo: true,
    });
  }

  addZone() {
    const zone = this.scene.matter.add.circle(this.x, this.y, 30, {
      ignoreGravity: true,
      collisionFilter: {
        category: 0x0001,
        mask: 0x0002,
      },
      isSensor: true,
    });

    this.scene.matter.world.on("collisionstart", (event: any) => {
      event.pairs.forEach((pair: any) => {
        if (pair.bodyB === zone) {
          if (this.scene === undefined) return;
          this.scene.matter.world!.remove(zone);
          this.showInformation();
        }
      });
    });
  }

  showInformation() {
    this.scene.gameMenu.showInformationOnMap(this.showtext);
    this.scene.musicPlayer.addNewSong(this.musicIndex);
    this.destroy(true);
  }
}
