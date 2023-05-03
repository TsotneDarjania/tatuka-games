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
import bombsData from "../data/bombsData.json";
import saveZonesData from "../data/saveZonesData.json";
import starsData from "../data/starsData.json";
import musicIconsData from "../data/musicIconsData.json";
import angelsData from "../data/angelsData.json";

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
import { Stars } from "../gameObjects/stars";
import { MusicIcon } from "../gameObjects/musicIcon";
import { GovermentStation } from "../gameObjects/govermentStation";
import {
  AngelsData,
  BombsData,
  MusicIconsData,
  SaveZonesData,
  StarsData,
} from "../config/interfaces";
import { Bomb } from "../gameObjects/bomb";
import RussianTank from "../gameObjects/russianTank";
import { RussianSoldier } from "../gameObjects/russialSoldier";

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
  russianSoldierDeadScream!: Phaser.Sound.BaseSound;
  bodyFail!: Phaser.Sound.BaseSound;

  russianTank!: RussianTank;

  constructor() {
    super("GamePlay");
  }

  create() {
    this.createSpriteSheetAnimations();
    this.addSoundEffects();

    this.gameMenu = this.scene.get("GameMenu") as GameMenu;

    this.gameManager = new GameManager(this);
    this.musicPlayer = new MusicPlayer(this);

    new GovermentStation(this, -118680, 1120);
    new RussianSoldier(this, -123080, 875);
    new RussianSoldier(this, -126220, 954);
    new RussianSoldier(this, -128720, 720);

    this.russianTank = new RussianTank(this, -130700, 1100);

    this.addBombs();
    this.addStars();
    this.addMusicMapIcons();
    this.addSaveZones();
    this.addAngels();

    new Demon(this, -46800, 290, [
      "This game is crap.",
      "Let's get the hell out of here",
    ]);

    new Demon(this, -108000, 830, [
      "Fool, I have a surprise",
      "for you on the way",
    ]);

    this.addRoads();
    this.addFlowers();

    new BonFire(this, -58100, 1230, 900, 700);
    new BonFire(this, -60400, 1340, 900, 700);
    new BonFire(this, -63400, 1340, 900, 700);
    new BonFire(this, -66000, 1380, 900, 700);

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

    //Start UI Scene for Menu UI Elements
    this.scene.launch("GameMenu");
  }

  addAngels() {
    Object.values(angelsData).forEach((data: AngelsData) => {
      new Angel(this, data.x, data.y, data.text);
    });
  }

  addMusicMapIcons() {
    Object.values(musicIconsData).forEach((data: MusicIconsData) => {
      new MusicIcon(this, data.x, data.y, data.key, data.text, data.musicKey);
    });
  }

  addStars() {
    Object.values(starsData).forEach((data: StarsData) => {
      new Stars(this, data.x, data.y, data.count);
    });
  }

  addBombs() {
    Object.values(bombsData).forEach((data: BombsData) => {
      new Bomb(this, data.x, data.y);
    });
  }

  addSaveZones() {
    Object.values(saveZonesData).forEach((data: SaveZonesData) => {
      new SaveZone(this, data.x, data.y, data.icon, data.text, data.index);
    });
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
    this.russianSoldierDeadScream = this.sound.add("RSDeadScreamSound", {
      volume: 1,
    });
    this.bodyFail = this.sound.add("bodyFail", {
      volume: 1,
    });
  }

  addRoads() {
    Object.keys(roadJson).forEach((regionKey) => {
      //@ts-ignore
      Object.keys(roadJson[regionKey]).forEach((key) => {
        console.log("regionKey is : " + regionKey + " key is : " + key);
        //@ts-ignore
        const road = new Road(this, roadJson[regionKey][key]);
        this.roads.push(road);
      });
    });

    // new Road(this, roadJson.roadToGori[5]);
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
