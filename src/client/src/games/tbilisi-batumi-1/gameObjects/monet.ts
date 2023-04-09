import { GamePlayMenu } from "../ui/menu/gamePlayMenu";


export class Monet extends Phaser.GameObjects.Image{

    gamePlayMenuScene! : Phaser.Scene;


    constructor(scene: Phaser.Scene, x: number, y: number, key : string){
        super(scene,x,y,key)
        this.scene.add.existing(this)

        this.init();
    }

    init(){
        
        this.setScale(0.6)

        this.addZone();
        this.addAnimation();
    }

    addAnimation(){
        this.scene.tweens.add({
            targets: this,
            scale : 0.31,
            duration:200,
            repeat : Infinity,
            yoyo:true
        })
    }

    addZone(){
        const zone = this.scene.matter.add.circle(this.x,this.y,30,{
            ignoreGravity:true,
            collisionFilter: {
                category: 0x0001,
                mask: 0x0002
            },
            isSensor:true
        })

        this.scene.matter.world.on('collisionstart', (event : any) => {
            event.pairs.forEach((pair : any) => {
            if (pair.bodyB === zone) {
               
                    this.scene.matter.world.remove(zone)
                    this.showInformation();
                    
                }
            });
        });
    }

    showInformation(){
        this.gamePlayMenuScene = this.scene.scene.get("UI") as GamePlayMenu;
        //@ts-ignore
        this.gamePlayMenuScene.showInformationOnMap(this.showtext);
        this.destroy(true)
    }
}