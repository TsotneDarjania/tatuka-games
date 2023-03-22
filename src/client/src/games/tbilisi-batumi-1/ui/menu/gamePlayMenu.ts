

export class GamePlayMenu extends Phaser.GameObjects.Container{
    constructor(scene : Phaser.Scene,x : number, y : number){
        super(scene)
        this.scene.add.existing(this)

        this.init();
    }

    init(){
        this.addSpeedometer();
    }

    addSpeedometer(){
        const speedometer = this.scene.add.image(-300,300,"speedometer")
        .setDepth(1000)
        this.add(speedometer)
    }
}