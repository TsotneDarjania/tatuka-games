import Matter from "matter-js";
import { GamePlay } from "../scenes/gamePlay";
import { getRandomFloat } from "../helper/tatukaMath";

export class Asteroid {
  scene!: GamePlay;
  x!: number;
  y!: number;

  asteroid!: Phaser.Physics.Matter.Sprite;

  isFalling = false;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene as GamePlay;
    this.x = x;
    this.y = y;
    this.init();
  }

  init() {
    let scale = 1;

    this.asteroid = this.scene.matter.add
      .sprite(this.x, this.y, "asteroid", undefined, {
        gravityScale: new Phaser.Math.Vector2(0, 0.04),
        isStatic: true,
        collisionFilter: {
          category: 0x0003,
          mask: 0x0003,
        },
        isSensor: true,
      } as Phaser.Types.Physics.Matter.MatterBodyConfig)
      .setDepth(-1);
    this.asteroid.play("asteroid_idle");

    this.asteroid.setRectangle(35, 70, {
      isStatic: true,
    });
    this.asteroid.setOrigin(0.5, 0.72);

    //add Collision Detection for Right Tire
    this.scene.matter.world.on("collisionstart", (event: any) => {
      event.pairs.forEach((pair: any) => {
        if (pair.bodyB === this.asteroid.body) {
          if (pair.bodyA.label === "Body") {
            this.scene.car.playExplosionAnimation();
            this.reset();
          }
        }
      });
    });
  }

  startFalling() {
    if (this.isFalling === false) return;

    const radnomX = this.scene.car.carBody.x + 700 - getRandomFloat(0, 2000);
    this.asteroid.setPosition(radnomX, -getRandomFloat(0, 300));
    this.asteroid.setRotation(0);
    this.asteroid.setStatic(false);

    setTimeout(() => {
      this.startFalling();
    }, 4000);
  }

  reset() {
    this.asteroid.setPosition(this.x, this.y - 500);
    this.asteroid.setStatic(true);
  }
}
