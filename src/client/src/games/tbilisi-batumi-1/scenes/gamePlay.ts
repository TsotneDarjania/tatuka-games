import { Car } from "../gameObjects/car"
import { MapBackground } from "../gameObjects/mapBackground";
import { Road } from "../gameObjects/road";


export class GamePlay extends Phaser.Scene{

    car!: Car
    road! : Road;

    camera_z_index : number = 1.0;
    min_zoom: number = 1.0;
    max_zoom: number = 1.0;
    zoom_factor: number = 0.001;
    followOffsetX = 260;

    tbilisi! : MapBackground;

    constructor(){
        super("GamePlay")
    }

    preload(){
        
    }

    create(){
        this.car = new Car(this,0,640)

        this.tbilisi = new MapBackground(this,0,300,
            [ 
                {x:480,y:140,key:"tbilisi-build-8", scrollFactor : 0.01, scale : 0.3},
                {x:-700,y:280,key:"tbilisi-build-2", scrollFactor : 0.01, scale : 0.4},
                {x:-300,y:210,key:"tbilisi-build-4", scrollFactor : 0.01, scale : 0.3},
                {x:-250,y:300,key:"tbilisi-build-7", scrollFactor : 0.01, scale : 0.4},
                {x:1400,y:140,key:"tbilisi-build-6", scrollFactor : 0.01, scale : 0.56},
                {x:90,y:110,key:"tbilisi-build-5", scrollFactor : 0.01, scale : 0.37},
                {x:900,y:200,key:"tbilisi-build-4", scrollFactor : 0.01, scale : 0.5},
                {x:660,y:310,key:"tbilisi-build-2", scrollFactor : 0.01, scale : 0.3},
                {x:900,y:270,key:"tbilisi-build-3", scrollFactor : 0.01, scale : 0.35},
                {x:300,y:200,key:"tbilisi-build-1", scrollFactor : 0.01, scale : 0.4},
                
            ]
        )


        this.road = new Road(this, <Phaser.Curves.Path>(<unknown>new Phaser.Curves.Spline([
            new Phaser.Math.Vector2(-700, 700),
            new Phaser.Math.Vector2(-150, 730),
            new Phaser.Math.Vector2(-110, 60),
        ])));


        this.matter.add.image(-4000, 800, 'ground', undefined, 
        {
             restitution: 0.4, 
             isStatic: true 
        })
        .setDisplaySize(105000,60)

        this.setCameraSettings();
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

        this.cameras.main.setBounds(-Infinity,0,Infinity,900);

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