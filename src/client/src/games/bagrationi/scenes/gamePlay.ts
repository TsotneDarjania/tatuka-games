import Region from "../gameObjects/region";
import verticies from "../data/regionsCollidersData.json";
import { regionsData } from "../data/regionsData";
import { GameMap } from "../components/gameMap";
export class GamePlay extends Phaser.Scene {
  //   vertList: Array<number> = [];
  gameMap!: GameMap;

  constructor() {
    super("GamePlay");
  }

  create() {
    this.cameras.main.setZoom(0.6);

    this.addMap();
    this.addController();

    // this.addRegions();
    // this.vertList = [];
    // let posx = 665;
    // for (let a = 0; a < Object.keys(verticies).length; a++) {
    //   for (let i = 0; i < Object.values(verticies)[a][0].length; i++) {
    //     this.vertList.push(Object.values(verticies)[a][0][i].x);
    //     this.vertList.push(Object.values(verticies)[a][0][i].y);
    //     //this.vertList.push(verticies["Kvemo Kartli"][0][i].y)
    //   }
    //   var polygon = new Phaser.Geom.Polygon(this.vertList);
    //   const graphics = this.add.graphics();
    //   graphics.fillStyle(0xffffff, 0.5);
    //   let region = graphics.fillPoints(polygon.points, true);
    //   posx = posx - 270;
    //   region.setPosition(posx, 163);
    //   this.vertList = [];
    // }
  }

  addMap() {
    this.gameMap = new GameMap(this, 0, 0);
  }

  addController() {
    const cameraSpeed = 23;
    const cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.setBounds(
      this.gameMap.getBounds().x,
      this.gameMap.getBounds().y,
      this.gameMap.getBounds().width,
      this.gameMap.getBounds().height
    );

    this.events.on("update", () => {
      if (cursors.up.isDown) {
        this.cameras.main.scrollY -= cameraSpeed;
      }
      if (cursors.down.isDown) {
        this.cameras.main.scrollY += cameraSpeed;
      }
      if (cursors.left.isDown) {
        this.cameras.main.scrollX -= cameraSpeed;
      }
      if (cursors.right.isDown) {
        this.cameras.main.scrollX += cameraSpeed;
      }
    });
  }

  addRegions() {
    Object.keys(regionsData).forEach((key: any) => {
      const index: keyof typeof regionsData = key;
      const region = new Region(this, regionsData[index]);
    });
  }
}
