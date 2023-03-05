import { buildData } from "../../interfaces/buildsData";

export class MapBackground extends Phaser.GameObjects.Container{

    buildsData! : Array<buildData>;

    constructor(scene : Phaser.Scene, x : number, y : number, buildsData : Array<buildData>){
        super(scene,x,y)
        this.scene.add.existing(this)
        this.buildsData = buildsData;

        this.init();
        this.setDepth(-10)
    }

    init(){
        this.addBuilds();
    }

    addBuilds(){
        this.buildsData.forEach(build => {
            const buildItem = this.scene.add.image(build.x,build.y,build.key)
            .setOrigin(0.5)
            .setScrollFactor(build.scrollFactor,1)
            .setScale(build.scale);

            this.add(buildItem);
            
        });
    }
}