import { GamePlay } from "../scenes/gamePlay";

const verticiesData = {
  head: [
    [
      { x: 644.1083939460002, y: 388.1464135123924 },
      { x: 642.4280746505042, y: 379.2788387911563 },
      { x: 638.6473562356382, y: 370.95417680795504 },
      { x: 633.1863185252762, y: 363.7153403008235 },
      { x: 626.6750812552293, y: 357.74330018244 },
      { x: 616.3831255703163, y: 352.85708554012626 },
      { x: 606.3012097973403, y: 350.6854345879868 },
      { x: 594.1188949049945, y: 350.3234927626302 },
      { x: 582.1466199245856, y: 351.7712600640565 },
      { x: 572.2747440635467, y: 355.39067831762225 },
      { x: 563.6631076741297, y: 360.27689295993605 },
      { x: 556.1016708443977, y: 368.05864220510244 },
      { x: 552.5309923414687, y: 373.8497114108077 },
      { x: 547.0699546311068, y: 373.6687404981294 },
      { x: 548.9603138385398, y: 377.83107148973 },
      { x: 566.8137063531847, y: 384.5269952588267 },
      { x: 564.7133072338147, y: 391.041948115245 },
      { x: 566.6036664412477, y: 405.3386502168298 },
      { x: 572.6948238874206, y: 424.70253787340664 },
      { x: 583.4068593962076, y: 441.35186183980915 },
      { x: 593.9088549930575, y: 444.9712800933749 },
      { x: 601.8903716466634, y: 444.79030918069657 },
      { x: 624.1546023119853, y: 452.9340002512196 },
      { x: 630.6658395820323, y: 452.7530293385413 },
      { x: 636.5469571162682, y: 446.2380764821229 },
      { x: 634.4465579968983, y: 438.9992399749914 },
      { x: 633.3963584372133, y: 433.751083507321 },
      { x: 636.7569970282052, y: 426.1503051748329 },
      { x: 636.7569970282052, y: 417.8256431916317 },
      { x: 643.2682342982522, y: 418.3685559296665 },
      { x: 649.5694316563621, y: 414.9301085887791 },
      { x: 643.8983540340632, y: 412.03457398592644 },
      { x: 635.4967575565832, y: 399.9095228364812 },
      { x: 635.4967575565832, y: 394.8423372814891 },
      { x: 647.8891123608662, y: 393.2135990673845 },
      { x: 645.9987531534332, y: 390.1370935518536 },
    ],
  ],
  body: [
    [
      { x: 737.3590982286634, y: 348.26817303404187 },
      { x: 726.086956521739, y: 342.5598335067637 },
      { x: 710.305958132045, y: 342.3219860264605 },
      { x: 695.4911433172301, y: 345.17615579009953 },
      { x: 680.6763285024153, y: 351.3601902779842 },
      { x: 670.0483091787439, y: 360.63624200981116 },
      { x: 664.2512077294685, y: 371.5772261037609 },
      { x: 657.8099838969404, y: 391.79426192953764 },
      { x: 657.8099838969404, y: 407.016500668946 },
      { x: 655.877616747182, y: 430.56340121896824 },
      { x: 653.9452495974234, y: 458.39155641444916 },
      { x: 684.8631239935587, y: 458.8672513750557 },
      { x: 710.6280193236714, y: 458.39155641444916 },
      { x: 731.8840579710144, y: 459.81864129626865 },
      { x: 740.257648953301, y: 439.601605470492 },
      { x: 745.4106280193236, y: 418.195332243199 },
      { x: 749.5974235104669, y: 398.21614389772554 },
      { x: 751.2077294685989, y: 382.99390515831715 },
      { x: 749.2753623188405, y: 366.8202764976958 },
      { x: 745.4106280193236, y: 355.4035974431395 },
    ],
  ],
  rightHand: [
    [
      { x: 653.4621578099839, y: 392.2476586888658 },
      { x: 619.1089640365002, y: 422.21644120707595 },
      { x: 624.6913580246913, y: 430.12486992715924 },
      { x: 625.979602791197, y: 433.66285119667015 },
      { x: 623.1884057971014, y: 438.44953173777316 },
      { x: 623.61782071927, y: 440.73881373569196 },
      { x: 610.0912506709608, y: 455.7232049947971 },
      { x: 568.2232957595276, y: 473.8293444328824 },
      { x: 559.849704777241, y: 474.03746097814775 },
      { x: 547.3966720343532, y: 477.159209157128 },
      { x: 537.9495437466452, y: 482.7783558792924 },
      { x: 534.728931830381, y: 491.7273673257024 },
      { x: 537.5201288244766, y: 499.2195629552549 },
      { x: 543.317230273752, y: 505.0468262226847 },
      { x: 554.6967257112184, y: 507.96045785639956 },
      { x: 596.7793880837359, y: 486.52445369406865 },
      { x: 609.6618357487922, y: 476.1186264308012 },
      { x: 622.5442834138486, y: 463.0072840790843 },
      { x: 631.9914117015566, y: 449.4797086368366 },
      { x: 636.9296833064948, y: 445.31737773152963 },
      { x: 644.4444444444443, y: 438.86576482830384 },
      { x: 635.6414385399892, y: 427.62747138397503 },
      { x: 636.9296833064948, y: 420.3433922996878 },
      { x: 659.4739667203435, y: 399.73985431841834 },
    ],
  ],
  leftHand: [
    [
      { x: 577.7357817739086, y: 388.6893262504273 },
      { x: 576.2655023903496, y: 384.70796617150495 },
      { x: 569.5442252083657, y: 378.55495514044316 },
      { x: 566.6036664412477, y: 375.84039145026884 },
      { x: 556.1016708443977, y: 371.6780604586682 },
      { x: 547.4900344549808, y: 374.03068232348596 },
      { x: 543.0791963043038, y: 382.5363152193655 },
      { x: 544.1293958639887, y: 392.12777359131474 },
      { x: 548.7502739266027, y: 400.81437739987257 },
      { x: 564.5032673218777, y: 409.13903938307385 },
      { x: 603.5706909421594, y: 424.8835087860849 },
      { x: 622.0542031926153, y: 429.5887525157204 },
      { x: 634.0264781730242, y: 430.85554890446844 },
      { x: 637.8071965878902, y: 432.8462289439296 },
      { x: 643.6883141221261, y: 432.8462289439296 },
      { x: 647.8891123608662, y: 429.7697234283987 },
      { x: 647.8891123608662, y: 416.0159340648488 },
      { x: 646.8389128011811, y: 396.2901045829154 },
      { x: 642.4280746505042, y: 387.42252986167927 },
      { x: 642.2180347385672, y: 381.81243156865236 },
      { x: 639.0674360595121, y: 382.5363152193655 },
      { x: 638.8573961475752, y: 387.0605880363227 },
      { x: 634.2365180849613, y: 395.20427910684566 },
      { x: 634.6565979088352, y: 414.3871958507442 },
      { x: 620.3738838971193, y: 414.3871958507442 },
    ],
  ],
  LeftLeg: [
    [
      { x: 622.1653704430194, y: 357.2749054022214 },
      { x: 631.8272059208045, y: 346.99149992461065 },
      { x: 634.1005789744011, y: 330.3421767703837 },
      { x: 624.7229151283154, y: 315.40675452909187 },
      { x: 606.8201023312431, y: 304.87850606391896 },
      { x: 585.7914015854756, y: 304.63366307635675 },
      { x: 569.5936185786006, y: 311.9789527032216 },
      { x: 559.3634398374164, y: 322.99688714351885 },
      { x: 557.3742384155195, y: 336.21840847187553 },
      { x: 561.9209845227124, y: 350.17445876291873 },
      { x: 574.9928795808923, y: 360.4578642405295 },
      { x: 586.9280881122738, y: 398.1636843251023 },
      { x: 583.2338569001795, y: 421.4237681435076 },
      { x: 576.9820810027892, y: 444.68385196191286 },
      { x: 574.9928795808923, y: 452.27398457633984 },
      { x: 570.1619618419998, y: 482.87935802160996 },
      { x: 572.1511632638967, y: 496.1008793499667 },
      { x: 641.7732130302892, y: 495.12150739971804 },
      { x: 641.4890413985896, y: 476.5134403449938 },
      { x: 609.0934753848396, y: 473.57532449424787 },
      { x: 610.798505175037, y: 452.27398457633984 },
      { x: 611.0826768067366, y: 445.4183809245993 },
      { x: 626.996288181912, y: 401.5914861509725 },
      { x: 630.1221761306072, y: 395.9600974370428 },
      { x: 629.553832867208, y: 383.96279104649693 },
      { x: 626.1437732868133, y: 367.0686249047078 },
    ],
  ],
  RightLeg: [
    [
      { x: 581.3833056169692, y: 318.27619328682243 },
      { x: 567.0083789246441, y: 351.98092237719436 },
      { x: 578.3197966497523, y: 388.32517844452315 },
      { x: 563.7092154214876, y: 479.6934199545675 },
      { x: 632.0490308440164, y: 479.6934199545675 },
      { x: 633.2273035237152, y: 462.43497433600356 },
      { x: 627.8072491971009, y: 457.96808252884585 },
      { x: 603.0635229234266, y: 456.7498393087119 },
      { x: 602.8278683874869, y: 430.5576100758325 },
      { x: 620.5019585829685, y: 382.8430839539204 },
      { x: 620.2663040470287, y: 373.503219266227 },
      { x: 614.8462497204143, y: 356.0417331109741 },
      { x: 608.2479227141013, y: 340.4076117859221 },
      { x: 598.3504322046315, y: 328.2251795845828 },
    ],
  ],
};

export class RussianSoldier {
  soldierContainer!: Phaser.GameObjects.Container;

  head!: Phaser.Physics.Matter.Sprite;
  body!: Phaser.Physics.Matter.Sprite;
  leftLeg!: Phaser.Physics.Matter.Sprite;
  rightLeg!: Phaser.Physics.Matter.Sprite;
  leftHand!: Phaser.Physics.Matter.Sprite;
  rightHand!: Phaser.Physics.Matter.Sprite;
  constructor(public scene: GamePlay, public x: number, public y: number) {
    this.init();
  }

  init() {
    this.soldierContainer = this.scene.add
      .container(this.x, this.y)
      .setScale(1);

    this.addRightHand();
    this.addRightLeg();
    this.addLeftLeg();
    this.addBody();
    this.addHead();
    this.addLeftHand();

    this.createBullet();
  }

  createBullet() {}

  addHead() {
    this.head = this.scene.matter.add
      .sprite(this.x, this.y, "RSHead", undefined, {
        ignoreGravity: true,
        shape: {
          type: "fromVerts",
          verts: verticiesData.head,
          flagInternal: true,
        },
        collisionFilter: {
          category: 0x0001,
        },
      } as Phaser.Types.Physics.Matter.MatterBodyConfig)
      .setScale(0.3);

    this.head.setOrigin(0.54, 0.49);

    //Collision Detection
    this.scene.matter.world.on("collisionstart", (event: any) => {
      event.pairs.forEach((pair: any) => {
        if (
          pair.bodyB.gameObject !== null &&
          pair.bodyB.gameObject !== undefined
        ) {
          if (
            pair.bodyB.gameObject.frame.texture.key === "RSHead" &&
            pair.bodyA.gameObject.frame.texture.key === "carBody"
          ) {
            this.dead();
          }
        }
      });
    });
  }

  addBody() {
    this.body = this.scene.matter.add
      .sprite(this.x - 3, this.y + 30, "RSBody", undefined, {
        ignoreGravity: true,
        shape: {
          type: "fromVerts",
          verts: verticiesData.body,
          flagInternal: true,
        },
        collisionFilter: {
          category: 0x0003,
          mask: 0x0002,
        },
      } as Phaser.Types.Physics.Matter.MatterBodyConfig)
      .setScale(0.3);

    this.body.setOrigin(0.51, 0.52);

    //Collision Detection
    this.scene.matter.world.on("collisionstart", (event: any) => {
      event.pairs.forEach((pair: any) => {
        if (
          pair.bodyB.gameObject !== null &&
          pair.bodyB.gameObject !== undefined
        ) {
          if (
            pair.bodyB.gameObject.frame.texture.key === "RSBody" &&
            pair.bodyA.gameObject.frame.texture.key === "carBody"
          ) {
            this.dead();
          }
        }
      });
    });
  }

  addLeftLeg() {
    this.leftLeg = this.scene.matter.add
      .sprite(this.x + -3, this.y + 68, "RSLeftLeg", undefined, {
        ignoreGravity: true,
        shape: {
          type: "fromVerts",
          verts: verticiesData.LeftLeg,
          flagInternal: true,
        },
        collisionFilter: {
          category: 0x0001,
        },
      } as Phaser.Types.Physics.Matter.MatterBodyConfig)
      .setScale(0.3);

    this.leftLeg.setOrigin(0.51, 0.52);

    //Collision Detection
    this.scene.matter.world.on("collisionstart", (event: any) => {
      event.pairs.forEach((pair: any) => {
        if (
          pair.bodyB.gameObject !== null &&
          pair.bodyB.gameObject !== undefined
        ) {
          if (
            pair.bodyB.gameObject.frame.texture.key === "RSLeftLeg" &&
            pair.bodyA.gameObject.frame.texture.key === "carBody"
          ) {
            this.dead();
          }
        }
      });
    });
  }

  addRightLeg() {
    this.rightLeg = this.scene.matter.add
      .sprite(this.x + 5, this.y + 71, "RSRightLeg", undefined, {
        ignoreGravity: true,
        shape: {
          type: "fromVerts",
          verts: verticiesData.RightLeg,
          flagInternal: true,
        },
        collisionFilter: {
          category: 0x0001,
        },
        isSensor: true,
      } as Phaser.Types.Physics.Matter.MatterBodyConfig)
      .setScale(0.3);

    this.rightLeg.setOrigin(0.51, 0.52);

    //Collision Detection
    this.scene.matter.world.on("collisionstart", (event: any) => {
      event.pairs.forEach((pair: any) => {
        if (
          pair.bodyB.gameObject !== null &&
          pair.bodyB.gameObject !== undefined
        ) {
          if (
            pair.bodyB.gameObject.frame.texture.key === "RSRightLeg" &&
            pair.bodyA.gameObject.frame.texture.key === "carBody"
          ) {
            this.dead();
          }
        }
      });
    });
  }

  addLeftHand() {
    this.leftHand = this.scene.matter.add
      .sprite(this.x + 12, this.y + 31, "RSLeftHand", undefined, {
        ignoreGravity: true,
        shape: {
          type: "fromVerts",
          verts: verticiesData.leftHand,
          flagInternal: true,
        },
        collisionFilter: {
          category: 0x0001,
        },
      } as Phaser.Types.Physics.Matter.MatterBodyConfig)
      .setScale(0.35);

    this.leftHand.setOrigin(0.51, 0.52);

    //Collision Detection
    this.scene.matter.world.on("collisionstart", (event: any) => {
      event.pairs.forEach((pair: any) => {
        if (
          pair.bodyB.gameObject !== null &&
          pair.bodyB.gameObject !== undefined
        ) {
          if (
            pair.bodyB.gameObject.frame.texture.key === "RSRLeftHand" &&
            pair.bodyA.gameObject.frame.texture.key === "carBody"
          ) {
            this.dead();
          }
        }
      });
    });
  }

  addRightHand() {
    this.rightHand = this.scene.matter.add
      .sprite(this.x + 30, this.y + 12, "RSRightHand", undefined, {
        ignoreGravity: true,
        shape: {
          type: "fromVerts",
          verts: verticiesData.rightHand,
          flagInternal: true,
        },
        collisionFilter: {
          category: 0x0001,
        },
      } as Phaser.Types.Physics.Matter.MatterBodyConfig)
      .setScale(0.3);

    this.rightHand.setOrigin(0.51, 0.52);

    //Collision Detection
    this.scene.matter.world.on("collisionstart", (event: any) => {
      event.pairs.forEach((pair: any) => {
        if (
          pair.bodyB.gameObject !== null &&
          pair.bodyB.gameObject !== undefined
        ) {
          if (
            pair.bodyB.gameObject.frame.texture.key === "RSRightHand" &&
            pair.bodyA.gameObject.frame.texture.key === "carBody"
          ) {
            this.dead();
          }
        }
      });
    });
  }

  dead() {
    this.head.setIgnoreGravity(false);
    this.head.setCollisionCategory(0x0002);

    this.body.setIgnoreGravity(false);
    this.body.setCollidesWith(0x0001);

    this.rightHand.setIgnoreGravity(false);
    this.rightHand.setCollisionCategory(0x0002);
    this.rightHand.setCollidesWith(0x0001);

    this.leftHand.setIgnoreGravity(false);
    this.leftHand.setCollisionCategory(0x0002);
    this.leftHand.setCollidesWith(0x0001);

    this.leftLeg.setIgnoreGravity(false);
    this.leftLeg.setCollisionCategory(0x0002);
    this.leftLeg.setCollidesWith(0x0001);

    this.rightLeg.setIgnoreGravity(false);
    this.rightLeg.setCollisionCategory(0x0002);
    this.rightLeg.setCollidesWith(0x0001);
  }
}
