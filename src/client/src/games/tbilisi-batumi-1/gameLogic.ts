
import { Asteroid } from "./gameObjects/asteroid";
import { getRandomFloat } from "./helper/tatukaMath";
import { GamePlay } from "./scenes/gamePlay";


const showScreenTexts = {
    1: {
        title : "BATUMISKEN",
        text : "Tbilisi Section"
    }
}


export class GameLogic{

    gamePlayScene! : GamePlay;
    carBody! : Phaser.GameObjects.Sprite;

    isRedMode : boolean = false;
    isNormalMode : boolean = true;
    asteroidLoadTime : number = 300;
    startFallingAsteroids : boolean = false;

    gamePLayMenuScene! : Phaser.Scene;

    oldGameProcessIndex : number = 1;
    newgameProcessIndex : number =  1;


    constructor(scene: Phaser.Scene){
        this.gamePlayScene = scene as GamePlay;
        this.init();
    }

    init(){
        this.gamePLayMenuScene = this.gamePlayScene.scene.get("UI")

        this.carBody = this.gamePlayScene.car.carBody
        this.gamePlayScene.events.on("update", this.update, this)

        this.createGameZones();
    }

    update(){

        if(this.startFallingAsteroids){
            this.fallingAsteroids();
        }

    }

    emptyFunction(){

    }

    createGameZones(){
        const zone_1 = new GameZone(this.gamePlayScene,
            -1300,
            500,
            1800,
            1200,
            this.showScreenText.bind(this),
            this.emptyFunction.bind(this)
        ) 

        const zone_2 = new GameZone(this.gamePlayScene,
            -57000,
            500,
            20000,
            2200,
            this.toRedMode.bind(this),
            this.toNormalMode.bind(this)
        ) 
    }

    toNormalMode(){
        if(this.isNormalMode === false){
            this.startFallingAsteroids = false;
            this.isNormalMode = true;
            this.isRedMode = false;

             // Change background color with tween animation
             this.gamePlayScene.tweens.add({
                targets: this.gamePlayScene.backgroundColor,
                duration:40000,
                alpha : 0
            })
        }
    }

    toRedMode(){
        this.gamePlayScene.musicPlayer.stopRadio();
        this.gamePlayScene.musicPlayer.playObsticaleSong(0)

        if(this.isRedMode === false){
            this.startFallingAsteroids = true;
            this.isRedMode = true;
            this.isNormalMode = false;

             // Change background color with tween animation
             this.gamePlayScene.tweens.add({
                targets: this.gamePlayScene.backgroundColor,
                duration:40000,
                alpha : 1
            })   
        }
    }

    fallingAsteroids(){
        this.asteroidLoadTime -= 1;
        if(this.asteroidLoadTime < 0){
            this.asteroidLoadTime = getRandomFloat(100,600);
            new Asteroid(this.gamePlayScene,this.carBody.x - getRandomFloat(400,800),0,getRandomFloat(0,5))
            new Asteroid(this.gamePlayScene,this.carBody.x - getRandomFloat(800,1300),0,getRandomFloat(0,5))
            new Asteroid(this.gamePlayScene,this.carBody.x - getRandomFloat(1300,2200),0,getRandomFloat(0,5))
            new Asteroid(this.gamePlayScene,this.carBody.x + getRandomFloat(200,700),0,getRandomFloat(0,5))
            new Asteroid(this.gamePlayScene,this.carBody.x + getRandomFloat(700,1200),0,getRandomFloat(0,5))
        }
    }

    showScreenText(){
        if(this.oldGameProcessIndex === this.newgameProcessIndex){
            //@ts-ignore
            this.gamePLayMenuScene.showScreenTexts(showScreenTexts[this.oldGameProcessIndex].title,showScreenTexts[this.oldGameProcessIndex].text);
            this.newgameProcessIndex += 1;
        }
    }
}


class GameZone{
    scene! : Phaser.Scene;
    collisionEnter! : any
    collisionExit! : any
    zone! : any;
    x!: number;
    y! : number;
    width! : number;
    height! : number;

    constructor(scene: Phaser.Scene,
        x: number,
        y: number,
        width: number, 
        height : number,
        collisionEnter : any,
        collisionExit : any) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        const gamePLayScene = scene as GamePlay;

        // use arrow function to bind the `this` context correctly
        this.collisionEnter = collisionEnter;
        this.collisionExit = collisionExit;

        this.init();
    }

    init(){
        this.zone = this.scene.matter.add.rectangle(this.x,this.y,this.width,this.height,{
            isStatic:false,
            ignoreGravity:true,
            collisionFilter: {
                category: 0x0001,
                mask: 0x0002
            },
            isSensor:true
        })

        this.addCollisionTrigger();
    }

    addCollisionTrigger(){
        const scene = this.scene as GamePlay
 
        this.scene.matter.world.on('collisionstart', (event : any) => {
                event.pairs.forEach((pair : any) => {
                if (pair.bodyB === this.zone) {
                    this.collisionEnter();
                }
            });
        });

        this.scene.matter.world.on('collisionend', (event : any) => {
                event.pairs.forEach((pair : any) => {
                if (pair.bodyB === this.zone) {
                    this.collisionExit();
                }
            });
        });
    }
}
