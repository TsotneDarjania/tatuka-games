import { GamePlay } from "../scenes/gamePlay";


export class BonFire{

    scene!: Phaser.Scene;
    x!: number;
    y!: number;
    scale! : number;

    constructor(scene : Phaser.Scene, x: number, y: number, scale : number){
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.scale = scale;

        this.init();
    }

    init(){
        this.scene.anims.create({
            key: "bonfire_idle",
            frameRate: 13,
            frames: this.scene.anims.generateFrameNumbers("bonfire", { start: 0, end: 53 }),
            repeat: -1
        });

        const bonfire = this.scene.add.sprite(this.x, this.y,"bonfire")
        .setTint(0xECFF59)
        .setDepth(-5)
        .setScale(this.scale)
        bonfire.play("bonfire_idle");

        // add Dead Zone
        const deadZone = this.scene.matter.add.rectangle(this.x,this.y + 280,bonfire.width * this.scale,
             bonfire.height * this.scale,{
            ignoreGravity:true,
            collisionFilter: {
                category: 0x0001,
                mask: 0x0002
            },
            isSensor:true
        })

        this.scene.matter.world.on('collisionstart', (event : any) => {
            event.pairs.forEach((pair : any) => {
                if (pair.bodyB ===deadZone) {
                    const scene = this.scene as GamePlay;
                    scene.car.explosive();
                }
            });
        });
        
    }
}