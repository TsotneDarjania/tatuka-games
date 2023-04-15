import { gameZonesData } from "./data/gameZones";
import { Asteroid } from "./gameObjects/asteroid";
import { Car } from "./gameObjects/car";
import { getRandomFloat } from "./helper/tatukaMath";
import { GamePlay } from "./scenes/gamePlay";
import { GameMenu } from "./ui/menu/gameMenu";

let radioIsAccess = false;
let speedometerIsAccess = false;
let moneyIsAccess = false;

// x: -45900,
//           y: 910,

interface SaveZoneData {
  carPositions: {
    x: number;
    y: number;
  };
}

const showScreenTexts: Record<number, { title: string; text: string }> = {
  1: {
    title: "BATUMISKEN",
    text: "Tbilisi Section",
  },
};

export class GameManager {
  gamePlay!: GamePlay;
  gameMenu!: GameMenu;
  carBody!: Phaser.GameObjects.Sprite;

  saveZonesData: Array<SaveZoneData> = [];
  saveZoneIndex = 0;

  backgroundImage!: Phaser.GameObjects.Image;

  asteroids: Array<Asteroid> = [];

  constructor(scene: Phaser.Scene) {
    this.gamePlay = scene as GamePlay;
    this.init();
  }

  init() {
    this.gameMenu = this.gamePlay.scene.get("GameMenu") as GameMenu;

    this.saveZonesData = [
      {
        carPositions: {
          x: -100,
          y: 386,
        },
      },
      {
        carPositions: {
          x: -40200,
          y: 770,
        },
      },
    ];

    this.initCar();
    this.createGameZones();
    this.createBackgroundImage();
    this.createAsteroids();
  }

  initCar() {
    this.gamePlay.car = new Car(
      this.gamePlay,
      this.saveZonesData[this.saveZoneIndex].carPositions.x,
      this.saveZonesData[this.saveZoneIndex].carPositions.y
    );
    this.carBody = this.gamePlay.car.carBody;
  }

  saveGame(index: number) {
    this.saveZoneIndex = index;
  }

  createBackgroundImage() {
    this.backgroundImage = this.gamePlay.add
      .image(0, 0, "white")
      .setDisplaySize(
        this.gamePlay.game.canvas.width,
        this.gamePlay.game.canvas.height
      )
      .setScrollFactor(0, 0)
      .setDepth(-1000)
      .setOrigin(0)
      .setTint(0xff3c52)
      .setAlpha(0);
  }

  loose(reason: string) {
    if (reason === "upsideDown") {
      this.replay();
    }
    if (reason === "fireExplotion") {
      this.replay();
    }
  }

  replay() {
    this.gamePlay.resetCamera(400);
    this.gameMenu.stopUpdateProcess = true;
    this.stopFallingAsteroids();

    //time when camera is dark
    setTimeout(() => {
      this.gamePlay.car.resetCar(
        this.saveZonesData[this.saveZoneIndex].carPositions.x,
        this.saveZonesData[this.saveZoneIndex].carPositions.y
      );
    }, 400);

    setTimeout(() => {
      this.gamePlay.car.carBody.setStatic(false);
      this.gamePlay.car.addBags();
    }, 500);
  }

  cameraResetFinish() {}

  emptyFunction() {}

  createGameZones() {
    const zoneCallBackFunctions: Record<
      number,
      { enter: Function; exit: Function }
    > = {
      1: {
        enter: () => {
          this.showScreenText(1);
        },
        exit: () => {
          this.emptyFunction();
        },
      },
      2: {
        enter: () => {
          this.openRadio();
        },
        exit: () => {
          this.emptyFunction();
        },
      },
      3: {
        enter: () => {
          this.openMoney();
        },
        exit: () => {
          this.emptyFunction();
        },
      },
      4: {
        enter: () => {
          this.gamePlay.musicPlayer.stopRadio();
          this.gamePlay.musicPlayer.playObstacleSong(0);
          this.startFallingAsteroids();
          this.changeColorToGameBackground(0x730d31, 1, 9000);
        },
        exit: () => {
          this.stopFallingAsteroids();
          this.changeColorToGameBackground(0x730d31, 0, 9000);
        },
      },
    };

    Object.values(gameZonesData).forEach((data) => {
      new GameZone(
        this.gamePlay,
        data.x,
        data.y,
        data.width,
        data.height,
        zoneCallBackFunctions[data.id].enter,
        zoneCallBackFunctions[data.id].exit
      );
    });
  }

  showScreenText(index: number) {
    this.gameMenu.showScreenTexts(
      showScreenTexts[index].title,
      showScreenTexts[index].text
    );
  }

  openRadio() {
    this.gameMenu.radioIsAccess = true;
  }

  openMoney() {
    this.gameMenu.moneyIsaccess = true;
  }

  changeColorToGameBackground(color: number, alpha: number, duration: number) {
    this.backgroundImage.setTint(color);

    this.gamePlay.tweens.add({
      targets: this.backgroundImage,
      duration: duration,
      alpha: alpha,
    });
  }

  createAsteroids() {
    for (let i = 0; i < 4; i++) {
      this.asteroids.push(
        new Asteroid(
          this.gamePlay,
          this.carBody.x - 700 + getRandomFloat(0, 1400),
          0
        )
      );
    }
  }

  startFallingAsteroids() {
    this.asteroids.forEach((asteroid) => {
      asteroid.isFalling = true;
      asteroid.startFalling();
    });
  }

  stopFallingAsteroids() {
    this.asteroids.forEach((asteroid) => {
      asteroid.isFalling = false;
    });
  }
}

class GameZone {
  collisionEnter!: any;
  collisionExit!: any;
  zone!: any;

  isInside = false;

  constructor(
    public scene: Phaser.Scene,
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    collisionEnter: any,
    collisionExit: any
  ) {
    // use arrow function to bind the `this` context correctly
    this.collisionEnter = collisionEnter;
    this.collisionExit = collisionExit;

    this.init();
  }

  init() {
    this.zone = this.scene.matter.add.rectangle(
      this.x,
      this.y,
      this.width,
      this.height,
      {
        isStatic: false,
        ignoreGravity: true,
        collisionFilter: {
          category: 0x0001,
          mask: 0x0002,
        },
        isSensor: true,
      }
    );

    this.addCollisionTrigger();
  }

  addCollisionTrigger() {
    this.scene.matter.world.on(
      Phaser.Physics.Matter.Events.COLLISION_START,
      (event: any) => {
        event.pairs.forEach((pair: any) => {
          if (pair.bodyB === this.zone) {
            if (this.isInside === false) {
              this.collisionEnter();
              this.isInside = true;
            }
          }
        });
      }
    );

    this.scene.matter.world.on(
      Phaser.Physics.Matter.Events.COLLISION_END,
      (event: any) => {
        event.pairs.forEach((pair: any) => {
          if (pair.bodyB === this.zone) {
            if (this.isInside === true) {
              this.collisionExit();
              this.isInside = false;
            }
          }
        });
      }
    );
  }
}
