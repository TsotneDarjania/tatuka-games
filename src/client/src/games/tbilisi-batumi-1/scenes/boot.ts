import Phaser from "phaser";

export class Boot extends Phaser.Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    console.log("Boot scene");
    // load spinning icon
  }

  create() {
    this.scene.start("Preload");
  }
}
