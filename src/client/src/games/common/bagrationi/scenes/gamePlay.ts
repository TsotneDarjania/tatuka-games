import Region from "../gameObjects/region"
import verticies from "../data/regionsCollidersData.json" 
import { RegionsData, regionsData } from "../data/regionsData"
import { ListFormat } from "typescript"
export class GamePlay extends Phaser.Scene{
    vertList : Array<number>=[]
    constructor(){
        super("GamePlay")
    }

    create(){
        this.addRegions()
        this.vertList = []
        let posx = 665
        for (let a = 0; a < Object.keys(verticies).length; a++) {
            for (let i = 0; i <  Object.values(verticies)[a][0].length; i++) {
                this.vertList.push( Object.values(verticies)[a][0][i].x)
                this.vertList.push(Object.values(verticies)[a][0][i].y)
                //this.vertList.push(verticies["Kvemo Kartli"][0][i].y)    
            }
            var polygon = new Phaser.Geom.Polygon(this.vertList);
            
            const graphics = this.add.graphics();
    
           // graphics.lineStyle(1, 0xFF00FF, 0.3);
            graphics.fillStyle(0xFFFFFF,0.5);
            let region = graphics.fillPoints(polygon.points, true);
            posx = posx - 270;
            region.setPosition(posx,163)
            this.vertList = []
            
            
        }
        
        console.log(this.vertList,verticies.Kakheti[0].length)
    }

    addRegions(){
        Object.keys(regionsData ).forEach((key: any) => {
          const index : keyof typeof regionsData = key
          const region = new Region(this,regionsData[index])
        });
        }
       
    }
