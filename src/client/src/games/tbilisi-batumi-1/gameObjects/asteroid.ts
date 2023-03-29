


export class Asteroid {
    scene! : Phaser.Scene;
    x!: number;
    y! : number;

    constructor(scene : Phaser.Scene, x : number, y : number){
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.init();
    }

    init(){
        this.scene.anims.create({
            key: "main",
            frameRate: 22,
            frames: this.scene.anims.generateFrameNumbers("asteroid", { start: 0, end: 70 }),
            repeat: -1
        });


        const asteroid  = this.scene.add.sprite(this.x,this.y, "asteroid")
        .setScale(0)
        asteroid.play("main");
    

        this.scene.add.tween( {
            targets:asteroid,
            y : asteroid.y + 1200,
            duration:6000,
            scale : 1.7
        })
    }
}