import Phaser from 'phaser';

export default class Preload extends Phaser.Scene {
  constructor() {
    super('Preload');
  }

  preload() {
    this.load.setPath(`${process.env.PUBLIC_URL}/assets`);
    this.load.image("Kakheti","/bagrationi/images/regions/Kakheti.png")
    this.load.image("Kvemo_Kartli","/bagrationi/images/regions/Kvemo_Kartli.png")
  }
  create() {
    this.scene.start("GamePlay")
    }

 
}