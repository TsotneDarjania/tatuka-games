import Matter from "matter-js";
import { Car } from "../gameObjects/car";
import { MapBackground } from "../gameObjects/mapBackground";
import { Road } from "../gameObjects/road";

import roadJson from "../data/roadData.json";
import buildsData from "../data/buildsData.json";
import flowersData from "../data/flowersData.json";
import monetsData from "../data/monetsData.json";
import {
  MapInformationIconData,
  mapInformationIconsData,
} from "../data/mapInformationIconData";

import { GameMenu } from "../ui/menu/gameMenu";
import { Angel } from "../gameObjects/angel";
import { Demon } from "../gameObjects/demon";
import { GameManager } from "../gameManager";
import { MapInformationIcon } from "../gameObjects/mapInformationIcon";
import { BonFire } from "../gameObjects/bonFire";
import MusicPlayer from "../musicPlayer";
import { Monet } from "../gameObjects/monet";
import { Flower } from "../gameObjects/flower";
import { SaveZone } from "../gameObjects/saveZone";

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
  mapInformationIcons: Array<MapInformationIcon> = [];

  buttonSound!: Phaser.Sound.BaseSound;
  applause!: Phaser.Sound.BaseSound;

  constructor() {
    super("GamePlay");
  }

  create() {
    this.createSpriteSheetAnimations();
    this.addSoundEffects();

    this.gameMenu = this.scene.get("GameMenu") as GameMenu;

    this.gameManager = new GameManager(this);

    this.musicPlayer = new MusicPlayer(this);

    new SaveZone(
      this,
      -40300,
      890,
      "small-traparet",
      ["23 Rustaveli", "Ave"],
      1
    );

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
    this.addFlowers();

    new BonFire(this, -58100, 1230, 4);
    new BonFire(this, -60400, 1340, 2.6);

    this.addMapInformationIcons();

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
  }

  addMapInformationIcons() {
    Object.values(mapInformationIconsData).forEach(
      (data: MapInformationIconData) => {
        new MapInformationIcon(
          this,
          data.x,
          data.y,
          "map-information-icon",
          data.text
        );
      }
    );
  }

  addSoundEffects() {
    this.buttonSound = this.sound.add("buttonSound", {
      volume: 1,
    });
    this.applause = this.sound.add("applauseSound", {
      volume: 1,
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

  createSpriteSheetAnimations() {
    this.anims.create({
      key: "bonfire_idle",
      frameRate: 13,
      frames: this.anims.generateFrameNumbers("bonfire", {
        start: 0,
        end: 53,
      }),
      repeat: -1,
    });

    this.anims.create({
      key: "asteroid_idle",
      frameRate: 27,
      frames: this.anims.generateFrameNumbers("asteroid", {
        start: 0,
        end: 69,
      }),
      repeat: -1,
    });

    this.anims.create({
      key: "car_explotion",
      frameRate: 24,
      frames: this.anims.generateFrameNumbers("carExplosion", {
        start: 0,
        end: 63,
      }),
    });
  }
}
