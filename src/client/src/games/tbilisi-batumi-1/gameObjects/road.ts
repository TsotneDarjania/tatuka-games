import Matter from "matter-js";

export class Road extends Phaser.GameObjects.GameObject {
    
    constructor(scene: Phaser.Scene, path: Phaser.Curves.Path) {
        super(scene, 'road');
        
        // Create graphics object and draw road along path
        const graphics = this.scene.add.graphics();
        graphics.lineStyle(30, 0xffffff, 1);
        graphics.strokePoints(path.getPoints());

        // Convert path to Matter.js body
        const vertices = path.getPoints().map((point) => {
            return { x: point.x, y: point.y};
        });
        const body = this.scene.matter.add.gameObject(this, {
            shape: {
                type: 'fromVerts',
                verts:vertices
            },
            render: {
                lineThickness:5,
                lineColor:0x5C79B7,
                fillColor:0x5C79B7,
                strokeStyle: '0xffffff'
                
            },
            isStatic: false,
        });

    }

}
