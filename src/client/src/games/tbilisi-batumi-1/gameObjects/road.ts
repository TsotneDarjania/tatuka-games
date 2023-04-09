
export interface roadData {    
    image : string,
    x:number,
    y:number,
    path:string
}


export class Road extends Phaser.GameObjects.GameObject {

    roadData! : roadData
    x! : number
    y! : number
    
    constructor(scene: Phaser.Scene, roadData:object) {
        super(scene, 'road');

        this.roadData = roadData as roadData;

        this.x = this.roadData.x;
        this.y = this.roadData.y;

        this.scene.add.existing(this)
        this.init();
    }

    init(){
        const PATH = this.roadData.path;

        // let pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        // pathElement.setAttributeNS(null, 'd', PATH);
        // pathElement.setAttributeNS(null, 'id', 'path3780');

        // console.time("calculatingVerts");
        // const verts = this.scene.matter.svg.pathToVertices(pathElement, 70);
        // console.log(JSON.stringify(verts))
        // console.timeEnd("calculatingVerts")
        

        const collider = this.scene.matter.add.fromVertices(
            this.x,
            this.y, 
            this.roadData.path,
            {
                isStatic: true,
                collisionFilter: {
                    category: 0x0001,
                    mask: 0x0002
                },
                isSensor: false,
                slop: 0 // increased slop value
            }
        );

        const polygon =  this.scene.add.polygon(
            this.x - collider.centerOffset.x,
            this.y - collider.centerOffset.y + 4,
            this.roadData.path,
            0x0A1024).
            setOrigin(0)
            .setStrokeStyle(7,0x194254,1)  
            
   
        
        
    }
    
}
