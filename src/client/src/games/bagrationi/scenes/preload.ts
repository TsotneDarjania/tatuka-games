import Phaser from "phaser";

export default class Preload extends Phaser.Scene {
  constructor() {
    super("Preload");
  }

  preload() {
    this.load.setPath(`${process.env.PUBLIC_URL}/assets/games/bagrationi/`);

    //map
    this.load.image("map-image-1", "images/map/1.png");
    this.load.image("map-image-2", "images/map/2.png");
    this.load.image("map-image-3", "images/map/3.png");
    this.load.image("map-image-4", "images/map/4.png");
    this.load.image("map-image-5", "images/map/5.png");
    this.load.image("map-image-6", "images/map/6.png");
  }

  create() {
    this.scene.start("GamePlay");
  }
}
