

export class Angel extends Phaser.GameObjects.Container{
    
    constructor( scene: Phaser.Scene, x: number, y: number){
        super(scene,x,y);
        this.scene.add.existing(this)

        this.init();
    }

    init(){
        this.addHead();
    }

    addHead(){
        this.scene.add.image(100,300,"angelHead");
    }

}