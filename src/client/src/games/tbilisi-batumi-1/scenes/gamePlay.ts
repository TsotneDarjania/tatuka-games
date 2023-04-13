import Matter from "matter-js";
import { Car } from "../gameObjects/car";
import { MapBackground } from "../gameObjects/mapBackground";
import { Road } from "../gameObjects/road";

import roadJson from "../data/roadData.json";
import buildsData from "../data/buildsData.json";
import flowersData from "../data/flowersData.json";
import monetsData from "../data/monetsData.json";

import { GameMenu } from "../ui/menu/gameMenu";
import { Angel } from "../gameObjects/angel";
import { Demon } from "../gameObjects/demon";
import { GameManager } from "../gameManager";
import { MapInformationIcon } from "../gameObjects/mapInformationIcon";
import { BonFire } from "../gameObjects/bonFire";
import MusicPlayer from "../musicPlayer";
import { Monet } from "../gameObjects/monet";
import { Flower } from "../gameObjects/flower";

export class GamePlay extends Phaser.Scene {
  gameMenu!: GameMenu;

  // GameObjects
  car!: Car;

  // Camera
  camera_z_index: number = 1.3;
  min_zoom: number = 1.0;

  max_zoom: number = 1.3;
  zoom_factor: number = 0.001;
  followOffsetX = 260;

  tbilisi!: MapBackground;
  roadToGori!: MapBackground;

  //ui
  menu!: GameMenu;

  gameManager!: GameManager;

  musicPlayer!: MusicPlayer;

  stopUpdateProcess = false;

  roads: Array<Road> = [];
  flowers: Array<Flower> = [];
  monets: Array<Monet> = [];

  constructor() {
    super("GamePlay");
  }

  preload() {
    this.anims.create({
      key: "asteroid_idle",
      frameRate: 26,
      frames: this.anims.generateFrameNumbers("asteroid", {
        start: 0,
        end: 70,
      }),
      repeat: -1,
    });
    this.anims.create({
      key: "carExplotion",
      frameRate: 30,
      frames: this.anims.generateFrameNumbers("carExplosion", {
        start: 0,
        end: 65,
      }),
    });
  }

  addRoads() {
    Object.keys(roadJson).forEach((regionKey) => {
      Object.keys(regionKey).forEach((key) => {
        const index = Number(key) + 1;
        //@ts-ignore
        const road = new Road(this, roadJson[regionKey][index]);
        this.roads.push(road);
      });
    });
  }

  addFlowers() {
    Object.keys(flowersData).forEach((key) => {
      this.flowers.push(
        new Flower(
          this,
          //@ts-ignore
          flowersData[key].x,
          //@ts-ignore
          flowersData[key].y,
          //@ts-ignore
          flowersData[key].key,
          //@ts-ignore
          flowersData[key].scale
        )
      );
    });
  }

  addMonets() {
    Object.keys(monetsData).forEach((key) => {
      this.monets.push(
        new Monet(
          this,
          //@ts-ignore
          monetsData[key].x,
          //@ts-ignore
          monetsData[key].y,
          //@ts-ignore
          monetsData[key].key,
          //@ts-ignore
          monetsData[key].value,
          this.gameMenu
        )
      );
    });
  }

  create() {
    this.gameMenu = this.scene.get("GameMenu") as GameMenu;

    // this.musicPlayer = new MusicPlayer(this);

    new Angel(this, -6200, 40, [
      "Hello Player",
      "May god watches over you",
      "and keeps you safe on your travels",
    ]);

    new Demon(this, -46800, 290, [
      "This game is crap.",
      "Let's get the hell out of here",
    ]);

    this.addRoads();

    // new Road(this, roadJson.tbilisi[9]);

    this.car = new Car(this, -45900, 910);
    //  this.car = new Car(this,-59200,900)
    // this.car = new Car(this, -100, 368);
    // this.car = new Car(this,-35100,418)

    this.addFlowers();

    new BonFire(this, -58100, 1230, 4);
    new BonFire(this, -60400, 1340, 2.6);

    new MapInformationIcon(this, -7200, 570, "map-information-icon", [
      " The objective of this game is",
      "to safely reach Batumi. ",
    ]);

    new MapInformationIcon(this, -16000, 600, "map-information-icon", [
      "Initially, the car is equipped with a radio",
      " that is tuned to only receive",
      " Georgian radio stations",
      " However, as you embark on your journey, ",
      " you will have the opportunity",
      " to explore and discover ",
      " a plethora of diverse channels and songs ",
    ]);

    new MapInformationIcon(this, -20000, 650, "map-information-icon", [
      " While travelling on the road,",
      " keep an eye out for 0.50, 1",
      " and 2 lari bills that",
      " you may come across.",
      " Collecting as much money",
      " as possible can prove",
      " to be useful on certain parts",
      " of the journey",
    ]);

    new MapInformationIcon(this, -34300, 870, "map-information-icon", [
      "Acceleration can be crucial",
      "in certain situations.",
    ]);

    this.addMonets();

    this.tbilisi = new MapBackground(this, 0, 500, buildsData.tbilisi).setScale(
      0.7
    );
    this.roadToGori = new MapBackground(
      this,
      -800,
      0,
      buildsData.roadToGori
    ).setDepth(-100);

    this.setCameraSettings();

    //Create UI Scene for Menu UI Elements
    this.scene.launch("GameMenu");

    this.gameManager = new GameManager(this);
  }

  resetCamera(duration: number) {
    this.cameras.main.fadeOut(duration);
    this.cameras.main.once("camerafadeoutcomplete", () => {
      setTimeout(() => {
        this.cameras.main.fadeIn(1500);
      }, 1000);
    });

    this.cameras.main.once("camerafadeincomplete", () => {
      this.gameManager.cameraResetFinish();
    });
  }

  pauseScene() {
    this.scene.pause();
    this.car.isAcceleratingLeft = false;
    this.car.isAcceleratingRight = false;
    this.car.isMoving = false;
  }

  continueScene() {
    this.scene.resume();

    this.car.isAcceleratingLeft = false;
    this.car.isAcceleratingRight = false;
    this.car.isMoving = false;
  }

  update() {
    if (this.stopUpdateProcess === false) {
      this.addCameraZoomEffects();

      const followOffset = new Phaser.Math.Vector2(this.followOffsetX, 0);
      this.cameras.main.setFollowOffset(followOffset.x, followOffset.y);
    }
  }

  setCameraSettings() {
    // Set initial follow offset
    const initialFollowOffset = new Phaser.Math.Vector2(0, 0);
    this.cameras.main.setFollowOffset(
      initialFollowOffset.x,
      initialFollowOffset.y
    );
    this.cameras.main.setBounds(-Infinity, 0, Infinity, 1500);
    this.cameras.main.startFollow(this.car.carBody, false, 0.1, 0.08);
    this.cameras.main.setZoom(this.camera_z_index);
  }

  addCameraZoomEffects() {
    // Check if car is moving
    if (this.car.isMoving === false) {
      // Zoom in
      if (this.camera_z_index < this.max_zoom) {
        this.camera_z_index += this.zoom_factor;
        this.followOffsetX -= 0.1;
        this.cameras.main.setZoom(this.camera_z_index);
      }
    } else {
      // Zoom out
      if (this.camera_z_index > this.min_zoom) {
        this.camera_z_index -= this.zoom_factor;
        this.followOffsetX += 0.1;
        this.cameras.main.setZoom(this.camera_z_index);
      }
    }
  }
}
