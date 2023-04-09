import Matter from "matter-js";
import { Car } from "../gameObjects/car"
import { MapBackground } from "../gameObjects/mapBackground";
import { Road, roadData } from "../gameObjects/road";

import roadJson from "../data/roadData.json"
import buildsData from "../data/buildsData.json"
import { GamePlayMenu } from "../ui/menu/gamePlayMenu";
import { Angel } from "../gameObjects/angel";
import { Demon } from "../gameObjects/demon";
import { Asteroid } from "../gameObjects/asteroid";
import { GameLogic } from "../gameLogic";
import { MapInformationIcon } from "../gameObjects/mapInformationIcon";
import { BonFire } from "../gameObjects/bonFire";
import MusicPlayer from "../musicPlayer";

const camera_save_x : number = 500;
const camera_save_y : number = 0;

export class GamePlay extends Phaser.Scene{

    backgroundColor! : Phaser.GameObjects.Image;

    // GameObjects
    car!: Car

    // Camera
    camera_z_index : number = 1.3;
    min_zoom: number = 1.0;
    max_zoom: number = 1.3;
    zoom_factor: number = 0.001;
    followOffsetX = 260;

    tbilisi! : MapBackground;
    roadToGori! : MapBackground;

    //ui
    menu! : GamePlayMenu

    menuScale : number = 1;

    gameLogic! : GameLogic;

    musicPlayer! : MusicPlayer;

    constructor(){
        super("GamePlay")
    }

    create(){

        // this.musicPlayer = new MusicPlayer(this)

        new Angel(this,-6200,40, [
            "Hello Player", 
            "May god watches over you",
            "and keeps you safe on your travels"
        ])

        new Demon(this,-46800,290, [
            "This game is crap.", 
            "Let's get the hell out of here"
        ])

        new Road(this,roadJson.tbilisi[1])
        new Road(this,roadJson.tbilisi[2])
        new Road(this,roadJson.tbilisi[3])
        new Road(this,roadJson.tbilisi[4])
        new Road(this,roadJson.tbilisi[5])
        new Road(this,roadJson.tbilisi[6])
        new Road(this,roadJson.tbilisi[7])
        new Road(this,roadJson.tbilisi[8])
        new Road(this,roadJson.tbilisi[9])

        // this.car = new Car(this,-45900,780)
        //  this.car = new Car(this,-59200,900)
        this.car = new Car(this,-100,368)
        
    
        new BonFire(this,-58100,1230,4);
        new BonFire(this,-60400,1340,2.6);
        

        new MapInformationIcon(this,-7200,570,"map-information-icon",
        [   
            " The objective of this game is",
            "to safely reach Batumi. "
        ])

        new MapInformationIcon(this,-16000,600,"map-information-icon",
        [  
            "open_radio"
        ],)


        this.tbilisi = new MapBackground(this,0,500,buildsData.tbilisi).
        setScale(0.7)
        this.roadToGori = new MapBackground(this,-800,0,buildsData.roadToGori)
        .setDepth(-100)

        this.setCameraSettings();

        //Create UI Scene for Menu UI Elements
        this.scene.launch("UI");

        this.gameLogic = new GameLogic(this)

        this.backgroundColor = this.add.image(0,0,"white")
        .setScale(9)
        .setScrollFactor(0,0)
        .setDepth(-1000)
        .setOrigin(0)
        .setTint(0xFF3C52)
        .setAlpha(0)
    }

    resetCamera(){
        this.cameras.main.fadeOut(400);
        this.cameras.main.once('camerafadeoutcomplete', () => {
            setTimeout(() => {
                this.cameras.main.fadeIn(1500);
            }, 1000);
        });

        this.cameras.main.once('camerafadeincomplete', () => {
            const gamePlayScene = this.scene.get('UI'); 
            //@ts-ignore
            gamePlayScene.showCarIndicators();
        });
    }

    pauseScene(){
        this.scene.pause();
    }

    continueScene(){
        this.scene.resume();
    }

    update(){
       this.addCameraZoomEffects();

       const followOffset = new Phaser.Math.Vector2(this.followOffsetX, 0);
       this.cameras.main.setFollowOffset(followOffset.x, followOffset.y);
    }

    setCameraSettings(){
        // Set initial follow offset
        const initialFollowOffset = new Phaser.Math.Vector2(0, 0);
        this.cameras.main.setFollowOffset(initialFollowOffset.x, initialFollowOffset.y);
        this.cameras.main.setBounds(-Infinity,0,Infinity,1500);
        this.cameras.main.startFollow(this.car.carBody,false,0.1,0.08);
        this.cameras.main.setZoom(this.camera_z_index);
    }

    addCameraZoomEffects(){
         // Check if car is moving
         if(this.car.isMoving === false){
            // Zoom in
            if(this.camera_z_index < this.max_zoom){
                this.camera_z_index += this.zoom_factor;
                this.followOffsetX -= 0.1;
                this.cameras.main.setZoom(this.camera_z_index);
                this.menuScale -= 0.0006;
            }
        } else {
            // Zoom out
            if(this.camera_z_index > this.min_zoom){
                this.camera_z_index -= this.zoom_factor;
                this.followOffsetX += 0.1;
                this.cameras.main.setZoom(this.camera_z_index);
                this.menuScale += 0.0006;
            }
        }
    }
}
