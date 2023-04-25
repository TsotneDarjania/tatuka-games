import regionsCollidersData from "../data/regionsCollidersData.json"
export interface RegionsData{
    tbilisi : RegionData
    kvemokartli : RegionData
}
export interface RegionData{
    mapImage : {
        x : number,
        y : number,
        key : string,
        color : number
    },
    collider:{
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
export const regionsData = {
    tbilisi : {
        mapImage : {
          x : 927.5,
          y: 610, 
          key : 'Kakheti',
          color : 0xbd30ff
        },
        collider:{
          jsonData : regionsCollidersData.Kakheti
        },
        data : {
          name : "tbilisi",
          owner : "xocholava",
          people : 100,
          army : 30,
          builds : {
              item_1 : 3,
              item_2 : 5,
              item_3 : 8,
          }      
        }
      },
      kvemoKartli : {
        mapImage : {
          x : 685.5,
          y: 610, 
          key : 'Kvemo_Kartli',
          color : 0xbd30ff
        },
        collider:{
          jsonData : regionsCollidersData.Kakheti
        },
        data : {
          name : "kvemokartli",
          owner : "დარჯანია",
          people : 200,
          army : 60,
          builds : {
              item_1 : 30,
              item_2 : 50,
              item_3 : 83,
          }      
        }
      }
} 