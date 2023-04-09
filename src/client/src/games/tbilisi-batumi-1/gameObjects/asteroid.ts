import Matter from "matter-js";
import { GamePlay } from "../scenes/gamePlay";



export class Asteroid {
    scene! : GamePlay;
    x!: number;
    y! : number;
    delay! : number;

    constructor(scene : Phaser.Scene, x : number, y : number, delay : number){
        this.scene = scene as GamePlay;
        this.x = x;
        this.y = y;
        this.delay = delay;
        this.init();
    }

    init(){
        this.scene.anims.create({
            key: "asteroid_idle",
            frameRate: 22,
            frames: this.scene.anims.generateFrameNumbers("asteroid", { start: 0, end: 70 }),
            repeat: -1
        });

        let scale = 1;

        const asteroid  = this.scene.matter.add.sprite(this.x,this.y, "asteroid",undefined,{
            gravityScale: new Phaser.Math.Vector2(0,0.05),
            isStatic:true,
            collisionFilter: {
                category: 0x0003,
                mask: 0x0003
            },
            isSensor:true
         
        } as Phaser.Types.Physics.Matter.MatterBodyConfig ) 
        .setDepth(-1)
        asteroid.play("asteroid_idle");

        asteroid.setRectangle(35,70,{
            isStatic:true
        })
        asteroid.setOrigin(0.5,0.72)

        const gamePLayScene = this.scene as GamePlay;

        //add Collision Detection for Right Tire
        gamePLayScene.matter.world.on('collisionstart', (event : any) => {
           
            event.pairs.forEach((pair : any) => {
                
                if (pair.bodyB === asteroid.body){
                    gamePLayScene.car.explosive();
                    tween.remove();
                    asteroid.destroy(true);
                }

            });
        });
        

        let tween = this.scene.add.tween( {
            targets:asteroid,
            y : asteroid.y + 1900,
            duration:6000,
            delay : this.delay * 1000,
            onComplete : () => {
                this.scene.matter.world.remove(asteroid)
                asteroid.destroy(true)
            }
        })
    }
}