import { GamePlay } from "../scenes/gamePlay";

export class Car{

    carMeshe : any;
    scene! : Phaser.Scene;
    x! : number;
    y! : number;
    
    isMoving : boolean = false;
    onGround : boolean = false;

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
        this.addBags();
        this.addController();  
        this.addBoy();
    }

    addBoy(){
      const charachter = this.scene.matter.add.sprite(
        this.x,
        this.y,
        'carBoy',
        undefined,
        {
          shape: {
            type: 'circle',
            radius: 12
          },
          collisionFilter: {
            category: 0x0002,
            mask: 0x0001
          },
          isSensor: false,
          ignoreGravity: false // Make the tire not be affected by gravity
        } as Phaser.Types.Physics.Matter.MatterBodyConfig
      ).setOrigin(0.5).setFlip(true,false).setDepth(-1)
      
    
      // Connect left tire to car body using a constraint
      const leftTireConstraint = this.scene.matter.add.constraint(
        charachter.body as MatterJS.BodyType,
        //@ts-ignore
        this.carBody,
        2, // Length of the constraint
        0, // Stiffness of the constraint (0 = not stiff at all)
        {
          pointA: { x: -0, y: 0 }, // Local offset of constraint point on left tire
          pointB: { x: 2, y: -20 } // Local offset of constraint point on car body
        }
      );
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
        let accelerationRate = 0.004;
        let maxSpeed = 25;

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
          if(this.carBody.rotation < -0.7 || this.carBody.rotation > 0.7 
            || this.onGround === false) return;

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
            friction: 0,
            restitution: 0,
            frictionAir : 0.003,
            shape: this.carMeshe.carBody,
            slop: 0, // increased slop value
            chamfer: {
                quality: 30, // increased chamfer quality
                radius: 10
            },
            collisionFilter: {
                category: 0x0002,
                mask: 0x0001
            },
            isSensor: false,
            sleepThreshold : 100
        } as Phaser.Types.Physics.Matter.MatterBodyConfig
    );
       
    // this.carBody.setMass(6) 
    
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
              radius: 17,
              friction: 0,
              restitution: 0,
            },
            collisionFilter: {
              category: 0x0002,
              mask: 0x0001
            },
            isSensor: false,
            ignoreGravity: false // Make the tire not be affected by gravity
          } as Phaser.Types.Physics.Matter.MatterBodyConfig
        ).setOrigin(0.509,0.49)
    
        // Connect left tire to car body using a constraint
        const leftTireConstraint = this.scene.matter.add.constraint(
          this.leftTire.body as MatterJS.BodyType,
          //@ts-ignore
          this.carBody,
          0, // Length of the constraint
          0, // Stiffness of the constraint (0 = not stiff at all)
          {
            pointA: { x: -0, y: 0 }, // Local offset of constraint point on left tire
            pointB: { x: -71, y: 26 } // Local offset of constraint point on car body
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
              radius: 17,
              friction: 0,
              restitution: 0,
            },
            collisionFilter: {
              category: 0x0002,
              mask: 0x0001
            },
            isSensor: false, // Make the tire not generate collision responses
            ignoreGravity: false // Make the tire not be affected by gravity
          } as Phaser.Types.Physics.Matter.MatterBodyConfig
        ).setOrigin(0.509,0.49)
      
        // Connect right tire to car body using a constraint
        const rightTireConstraint = this.scene.matter.add.constraint(
          this.rightTire.body as MatterJS.BodyType,
          //@ts-ignore
          this.carBody,
          0, // Length of the constraint
          0, // Stiffness of the constraint (0 = not stiff at all)
          {
            pointA: { x: -0, y: 0 }, // Local offset of constraint point on left tire
            pointB: { x: 55, y: 26 } // Local offset of constraint point on car body
          }
        );

        //add Collision Detection for Right Tire
        this.scene.matter.world.on('collisionstart', (event : any) => {
          event.pairs.forEach((pair : any) => {
            // Check if the colliders in this pair belong to the leftTire sprite
            if (pair.bodyA === this.rightTire.body || pair.bodyB === this.rightTire.body) {
              this.onGround = true;
            }
          });
        });
        this.scene.matter.world.on('collisionend', (event : any) => {
          event.pairs.forEach((pair : any) => {
            // Check if the colliders in this pair belong to the leftTire sprite
            if (pair.bodyA === this.rightTire.body || pair.bodyB === this.rightTire.body) {

              console.log(this.carBody.rotation)
              if(this.carBody.rotation > 0.15){
                this.onGround= false;
              }
              // 
            }
          });
        });
      }

      addBags(){
        this.scene.matter.add.sprite(
          this.x+60,
          this.y-20,
          "carBag",
          undefined,
          {
            isStatic:false,
            shape: this.carMeshe.bag,
          } as Phaser.Types.Physics.Matter.MatterBodyConfig
        ).setScale(1.3).setDepth(-1)

        this.scene.matter.add.sprite(
          this.x+60,
          this.y-30,
          "carBag",
          undefined,
          {
            isStatic:false,
            shape: this.carMeshe.bag,
          } as Phaser.Types.Physics.Matter.MatterBodyConfig
        ).setScale(1.1).setDepth(-1)

        this.scene.matter.add.sprite(
          this.x+80,
          this.y-30,
          "carBag",
          undefined,
          {
            isStatic:false,
            shape: this.carMeshe.bag,
          } as Phaser.Types.Physics.Matter.MatterBodyConfig
        ).setScale(1.1).setDepth(-1)
      }
      
}