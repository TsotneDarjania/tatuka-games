import { colliderCategories } from "../helper/colliderCategories";

export interface roadData {
  image: string;
  x: number;
  y: number;
  path: string;
}

export class Road extends Phaser.GameObjects.GameObject {
  roadData!: roadData;
  x!: number;
  y!: number;

  collider!: MatterJS.BodyType;
  polygon!: Phaser.GameObjects.Polygon;

  constructor(scene: Phaser.Scene, roadData: object) {
    super(scene, "road");

    this.roadData = roadData as roadData;

    this.x = this.roadData.x;
    this.y = this.roadData.y;

    this.scene.add.existing(this);
    this.init();
  }

  init() {
    // const PATH = this.roadData.path;

    // let pathElement = document.createElementNS(
    //   "http://www.w3.org/2000/svg",
    //   "path"
    // );
    // pathElement.setAttributeNS(null, "d", PATH);
    // pathElement.setAttributeNS(null, "id", "path3780");

    // console.time("calculatingVerts");
    // const verts = this.scene.matter.svg.pathToVertices(pathElement, 70);
    // console.log(JSON.stringify(verts));
    // console.timeEnd("calculatingVerts");

    this.collider = this.scene.matter.add.fromVertices(
      this.x,
      this.y,
      this.roadData.path,
      {
        isStatic: true,
        slop: 0, // increased slop value
      }
    );

    this.collider.collisionFilter.category = colliderCategories[1];

    this.polygon = this.scene.add
      .polygon(
        this.x - this.collider.centerOffset.x,
        this.y - this.collider.centerOffset.y + 4,
        this.roadData.path,
        0x0a1024
      )
      .setOrigin(0)
      .setStrokeStyle(7, 0x194254, 1);
  }
}
