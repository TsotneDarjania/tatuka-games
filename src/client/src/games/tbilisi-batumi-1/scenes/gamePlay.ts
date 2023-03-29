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

export class GamePlay extends Phaser.Scene{

    // GameObjects
    car!: Car

    // Camera
    camera_z_index : number = 1.3;
    min_zoom: number = 1.0;
    max_zoom: number = 1.3;
    zoom_factor: number = 0.001;
    followOffsetX = 260;

    tbilisi! : MapBackground;

    //ui
    menu! : GamePlayMenu

    menuScale : number = 1;

    constructor(){
        super("GamePlay")
    }

    create(){
        new Angel(this,-2600,120, [
            "Hello Player", 
            "May god watches over you",
            "and keeps you safe on your travels"
        ])

        new Demon(this,-46800,290, [
            "This game is crap.", 
            "Let's get the hell out of here"
        ])

        new Asteroid(this,-46500,0);

        setTimeout(() => {
            new Asteroid(this,-47500,0);
        }, 2000);
        setTimeout(() => {
            new Asteroid(this,-47900,0);
        }, 3000);
        setTimeout(() => {
            new Asteroid(this,-48100,0);
        }, 3500);
        setTimeout(() => {
            new Asteroid(this,-48600,0);
        }, 4200);
        setTimeout(() => {
            new Asteroid(this,-49600,0);
        }, 500);

        new Road(this,roadJson.tbilisi[1])
        new Road(this,roadJson.tbilisi[2])
        new Road(this,roadJson.tbilisi[3])
        new Road(this,roadJson.tbilisi[4])
        new Road(this,roadJson.tbilisi[5])

        this.car = new Car(this,-45700,800)
        // this.car = new Car(this,0,380)

        this.tbilisi = new MapBackground(this,0,500,buildsData.tbilisi).
        setScale(0.7)

        this.setCameraSettings();

        //Create UI Scene for Menu UI Elements
        this.scene.launch("UI");
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
        }else{
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