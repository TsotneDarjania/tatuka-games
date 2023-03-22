import Matter from "matter-js";
import { Car } from "../gameObjects/car"
import { MapBackground } from "../gameObjects/mapBackground";
import { Road, roadData } from "../gameObjects/road";

import roadJson from "../data/roadData.json"
import buildsData from "../data/buildsData.json"
import { GamePlayMenu } from "../ui/menu/gamePlayMenu";
import { Angel } from "../gameObjects/angel";

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

    constructor(){
        super("GamePlay")
    }

    create(){
        new Angel(this,0,0)

        new Road(this,roadJson.tbilisi[1])
        new Road(this,roadJson.tbilisi[2])
        new Road(this,roadJson.tbilisi[3])
        new Road(this,roadJson.tbilisi[4])
        new Road(this,roadJson.tbilisi[5])

        this.createMenu();

        // this.car = new Car(this,-45700,800)
        this.car = new Car(this,0,380)

        this.tbilisi = new MapBackground(this,0,500,buildsData.tbilisi).
        setScale(0.7)

        this.setCameraSettings();
    }

    update(){
       this.addCameraZoomEffects();

       const followOffset = new Phaser.Math.Vector2(this.followOffsetX, 0);
       this.cameras.main.setFollowOffset(followOffset.x, followOffset.y);
    }

    createMenu(){
        this.menu = new GamePlayMenu(this,0,0);
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
            }
        }else{
            // Zoom out
            if(this.camera_z_index > this.min_zoom){
                this.camera_z_index -= this.zoom_factor;
                this.followOffsetX += 0.1;
                this.cameras.main.setZoom(this.camera_z_index);
            }
        }
    }
}