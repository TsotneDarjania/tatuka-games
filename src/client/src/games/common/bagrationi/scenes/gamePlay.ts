import Region from "../gameObjects/region"

import { RegionsData, regionsData } from "../data/regionsData"
export const myVariable = 42;
export class GamePlay extends Phaser.Scene{
    constructor(){
        super("GamePlay")
    }

    create(){
        this.addRegions()
        
    
    }

    addRegions(){
        Object.keys(regionsData ).forEach((key: any) => {
          const index : keyof typeof regionsData = key
          const region = new Region(this,regionsData[index])
        });
          
        }
       
    }
