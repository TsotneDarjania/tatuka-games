

export class Menu extends Phaser.Scene {
    constructor(){
        super("Menu")
    }

    create(){
        this.scene.start("Preload")
    }
}