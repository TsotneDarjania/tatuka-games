export interface RegionData {
    mapImage : MapImage,
    collider : {
        jsonData : any
    },
    data : {
        name : string,
        owner : string,
        people : number,
        army : number,
        builds : {
            item_1 : number,
            item_2 : number,
            item_3 : number,
        }      
    }

}

export interface MapImage{
    x : number
    y : number
    key : string
    color : number
}

export default class Region {
    regionImage! : Phaser.GameObjects.Image
    data : RegionData
    scene : Phaser.Scene
    collider! : MatterJS.BodyType

    constructor(scene:Phaser.Scene,data:RegionData){
        this.data = data
        this.scene = scene
        this.init();
    }

    init(){
       // this.addRegionImage();
        this.addColider();
        this.addEvents();
    }

    addRegionImage(){
        this.regionImage = this.scene.add.image(
            this.data.mapImage.x,
            this.data.mapImage.y,
            this.data.mapImage.key
        ).setInteractive();
    }

    addColider(){
        this.collider = this.scene.matter.add.fromVertices(
            this.data.mapImage.x,
            this.data.mapImage.y,
            this.data.collider.jsonData,
            { isStatic: true}
        );
        
        //fit collider position to image
        // this.scene.matter.alignBody(
        //     this.collider,
        //     this.data.mapImage.x,
        //     this.data.mapImage.y,
        //     Phaser.Display.Align.CENTER
        // );
        // create a graphics object

    }

    addEvents(){
        // this.scene.input.on('pointermove',  (pointer:any)=> {
        //     const x = pointer.worldX;
        //     const y = pointer.worldY;
        //     if (this.scene.matter.containsPoint(this.collider, x, y))
        //     { console.log(this.data.data)
        //       this.regionImage.setTint(this.data.mapImage.color);
        //       this.scene.game.canvas.style.cursor = 'pointer';
        //     } else {
        //         this.regionImage.setTint(0xfff8f8);
        //     }
            
        // })
        this.scene.input.on(Phaser.Input.Events.POINTER_DOWN,(pointer:any)=>{
            if (this.scene.matter.containsPoint(this.collider, pointer.worldX,pointer.worldY)){
                console.log(this.data.data)
            }
        })
    }
}
