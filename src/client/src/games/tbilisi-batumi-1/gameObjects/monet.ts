import { GameMenu } from "../ui/menu/gameMenu";

export class Monet extends Phaser.GameObjects.Image {
  gamePlayMenuScene!: Phaser.Scene;
  value!: number;

  soundEffect!: Phaser.Sound.BaseSound;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    key: string,
    value: number,
    gameplayMenuScene: GameMenu
  ) {
    super(scene, x, y, key);
    this.scene.add.existing(this);
    this.gamePlayMenuScene = gameplayMenuScene;
    this.value = value;

    this.init();
  }

  init() {
    this.setScale(0.09);

    this.addZone();
    this.addAnimation();
    this.addSoundEffect();
  }

  addSoundEffect() {
    this.soundEffect = this.scene.sound.add("monetSound", { volume: 0.7 });
  }

  addAnimation() {
    this.scene.tweens.add({
      targets: this,
      scale: 0.094,
      duration: 200,
      repeat: Infinity,
      yoyo: true,
    });
  }

  addZone() {
    const zone = this.scene.matter.add.circle(this.x, this.y, 25, {
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
          this.soundEffect.play();
          //@ts-ignore
          this.gamePlayMenuScene.increaseMoney(this.value);

          if (this.scene === undefined) return;
          if (this.scene.matter === undefined) return;
          if (this.scene.matter.world.remove(zone) === undefined) return;

          this.scene.matter.world.remove(zone);
          this.destroy(true);
        }
      });
    });
  }
}
