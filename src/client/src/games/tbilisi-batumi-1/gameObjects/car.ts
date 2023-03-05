import { GamePlay } from "../scenes/gamePlay";

export class Car{

    carMeshe : any;
    scene! : Phaser.Scene;
    x! : number;
    y! : number;

    isMoving : boolean = false;

    carBody!: Phaser.Physics.Matter.Sprite;
    leftTire! : Phaser.GameObjects.Sprite;
    rightTire! : Phaser.GameObjects.Sprite;

    constructor(scene : Phaser.Scene, x : number, y : number){
        this.scene = scene;
        this.x = x;
        this.y = y;

        this.carMeshe = this.scene.cache.json.get('carMeshe');

        this.init(); 
        this.rotate();

        
    }

    init(){
        this.addCarBody();
        this.addCarTires();
        this.addController();  
    }

    rotate(){
      let scaleX = this.carBody.scaleX;
      this.carBody.setScale(-scaleX, 1);
    }

    //this function is not finish
    changeMeshSize(mesh : any, x : number, y : number){
        const currentVertices = mesh.fixtures[0].vertices[0];
        const newVertices = currentVertices.map((vertex: { x: number; y: number; }) => ({
            x: vertex.x * x,
            y: vertex.y * y,
        }));

        mesh.fixtures[0].vertices[0] = newVertices;
    }

    addController(){
        let isAcceleratingLeft = false;
        let isAcceleratingRight = false;
        let accelerationRate = 0.005;
        let maxSpeed = 14;

        const scene = this.scene as GamePlay;

        this.scene.input.keyboard.on('keydown-LEFT', () => {
            isAcceleratingLeft = true;
            this.isMoving = true;
        });

        this.scene.input.keyboard.on('keyup-LEFT', () => {
            isAcceleratingLeft = false;
            this.isMoving = false;
        });

        this.scene.input.keyboard.on('keydown-RIGHT', () => {
            isAcceleratingRight = true;
            this.isMoving = true;
        });

        this.scene.input.keyboard.on('keyup-RIGHT', () => {
            isAcceleratingRight = false;
            this.isMoving = false;
        });

        this.scene.events.on('update', () => {
            if (isAcceleratingLeft && this.carBody.body.velocity.x > -maxSpeed) {
                const force = new Phaser.Math.Vector2(-accelerationRate, 0);
                this.carBody.applyForce(force);
                let scene = this.scene as GamePlay;
            }
            
            if (isAcceleratingRight && this.carBody.body.velocity.x < maxSpeed) {
                const force = new Phaser.Math.Vector2(accelerationRate, 0);
                this.carBody.applyForce(force);
            }

            this.leftTire.rotation += this.carBody.body.velocity.x / 25;
            this.rightTire.rotation += this.carBody.body.velocity.x  / 25;
        });
    }
   
    addCarBody(){   
        this.carBody = this.scene.matter.add.sprite(
            this.x,
            this.y,
            'carBody',
            undefined,
            {
                shape: this.carMeshe.carBody,
                friction: 0.0001, // set the friction to 0.2
                restitution: 0.7 // set the restitution to 0.5
            } as Phaser.Types.Physics.Matter.MatterBodyConfig
        );
    }

    addCarTires() {
        this.leftTire = this.scene.matter.add.sprite(
          this.x-43,
          this.y+30,
          'carTire',
          undefined,
          {
            shape: {
              type: 'circle',
              radius: 20
            },
            collisionFilter: {
              category: 0,
              mask: 0
            },
            ignoreGravity: false // Make the tire not be affected by gravity
          } as Phaser.Types.Physics.Matter.MatterBodyConfig
        )
        .setScale(0.65);
      
        // Connect left tire to car body using a constraint
        const leftTireConstraint = this.scene.matter.add.constraint(
          this.leftTire.body as MatterJS.BodyType,
          //@ts-ignore
          this.carBody,
          0, // Length of the constraint
          1, // Stiffness of the constraint (0 = not stiff at all)
          {
            pointA: { x: -0, y: 0 }, // Local offset of constraint point on left tire
            pointB: { x: -79, y: 25 } // Local offset of constraint point on car body
          }
        );
      
        this.rightTire = this.scene.matter.add.sprite(
          this.x+79,
          this.y+30,
          'carTire',
          undefined,
          {
            shape: {
              type: 'circle',
              radius: 20
            },
            collisionFilter: {
              category: 0,
              mask: 0
            },
            isSensor: true, // Make the tire not generate collision responses
            ignoreGravity: false // Make the tire not be affected by gravity
          } as Phaser.Types.Physics.Matter.MatterBodyConfig
        )
        .setScale(0.65);
      
        // Connect right tire to car body using a constraint
        const rightTireConstraint = this.scene.matter.add.constraint(
          this.rightTire.body as MatterJS.BodyType,
          //@ts-ignore
          this.carBody,
          0, // Length of the constraint
          0, // Stiffness of the constraint (0 = not stiff at all)
          {
            pointA: { x: -0, y: 0 }, // Local offset of constraint point on left tire
            pointB: { x: 43, y: 25 } // Local offset of constraint point on car body
          }
        );
      }
      
}