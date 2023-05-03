import { colliderCategories } from "../helper/colliderCategories";
import { GamePlay } from "../scenes/gamePlay";

const verticiesData = {
  russianTank: [
    [
      { x: 499.9289789704852, y: 333.48534862321293 },
      { x: 494.245546336494, y: 347.8086633955993 },
      { x: 514.1375605554633, y: 361.03018472395604 },
      { x: 536.8712910914282, y: 368.19184211014925 },
      { x: 577.3657486086156, y: 389.6768142687289 },
      { x: 733.6601460433744, y: 477.26939306909196 },
      { x: 703.1116956356715, y: 480.5747734011811 },
      { x: 687.4822558921957, y: 494.3471914515527 },
      { x: 617.1497770465543, y: 499.3052619496864 },
      { x: 597.9681919068339, y: 526.8500980504296 },
      { x: 602.9411954615762, y: 535.1135488806525 },
      { x: 620.7019224427988, y: 558.2512112052767 },
      { x: 634.2000749485279, y: 568.718248923559 },
      { x: 650.5399437712526, y: 578.0834931978118 },
      { x: 948.9201570557921, y: 579.7361833638564 },
      { x: 968.1017421955123, y: 572.5745259776631 },
      { x: 979.4686074634949, y: 562.1074882593807 },
      { x: 987.2833273352328, y: 549.9877603750538 },
      { x: 996.5189053654685, y: 539.5207226567715 },
      { x: 1009.3066287919487, y: 532.909961992593 },
      { x: 1005.7544833957043, y: 522.4429242743107 },
      { x: 997.9397635239663, y: 506.46691933587965 },
      { x: 987.2833273352328, y: 500.957952115731 },
      { x: 917.6612775688402, y: 496.5507783396122 },
      { x: 901.3214087461156, y: 481.12567012319596 },
      { x: 865.0895257044215, y: 478.37118651312164 },
      { x: 870.7729583384128, y: 471.2095291269285 },
      { x: 898.47969242912, y: 471.2095291269285 },
      { x: 905.5839832216091, y: 466.2514586287947 },
      { x: 902.7422669046134, y: 444.2155897482003 },
      { x: 854.4330895156879, y: 439.2575192500665 },
      { x: 839.5140788514609, y: 430.4431716978287 },
      { x: 792.6257596210332, y: 433.74855202991785 },
      { x: 781.9693234322997, y: 441.46110613812596 },
      { x: 742.1852949943611, y: 440.35931269409616 },
      { x: 736.50186236037, y: 445.31738319222995 },
      { x: 723.7141389338897, y: 446.41917663625964 },
      { x: 581.6283230841091, y: 374.8026027743276 },
      { x: 542.5547237254194, y: 357.173907669852 },
    ],
  ],
};

export default class RussianTank {
  tankBody!: Phaser.Physics.Matter.Sprite;

  canMotion: boolean = false;

  constructor(public scene: GamePlay, public x: number, public y: number) {
    this.init();
  }

  init() {
    this.addTankBody();
    this.addCollision();

    this.scene.events.on("update", () => {
      if (this.canMotion) {
        let force = new Phaser.Math.Vector2(-0.005, 0);
        if (this.tankBody.angle < -55 || this.tankBody.angle > 55) {
          this.tankBody.setRotation(0);
          force = new Phaser.Math.Vector2(0, 0);
          this.tankBody.setVelocity(0, 0);
        }
        if (this.tankBody.body.velocity.x > -7.2)
          this.tankBody.applyForce(force);
      } else {
        this.tankBody.setVelocity(0, this.tankBody.body.velocity.y);
      }
    });
  }

  addTankBody() {
    this.tankBody = this.scene.matter.add
      .sprite(this.x, this.y, "russianTank", undefined, {
        gravityScale: new Phaser.Math.Vector2(0, 0.8),
        isStatic: false,
        frictionAir: 0.006,
        friction: 0,
        restitution: 0,
        shape: {
          type: "fromVerts",
          verts: verticiesData.russianTank,
          flagInternal: true,
        },
      } as Phaser.Types.Physics.Matter.MatterBodyConfig)
      .setScale(0.6);

    this.tankBody.setOrigin(0.57, 0.69);

    this.tankBody.setCollisionCategory(colliderCategories[1]);
    this.tankBody.setCollidesWith(
      colliderCategories[1] | colliderCategories[2]
    );

    this.tankBody.setFixedRotation();
  }

  startMotion() {
    this.canMotion = true;
  }

  addCollision() {
    this.scene.matter.world.on("collisionstart", (event: any) => {
      event.pairs.forEach((pair: any) => {
        if (
          pair.bodyB.gameObject === this.tankBody &&
          pair.bodyA.gameObject === this.scene.car.carBody
        ) {
          if (this.scene.car.carBody.visible === false) return;
          this.canMotion = false;
          this.scene.car.playExplosionAnimation(false);
        }
      });
    });
  }

  reset() {
    this.canMotion = false;
    this.tankBody.destroy(true);
    this.scene.matter.world.remove(this.tankBody);

    this.init();
  }
}
