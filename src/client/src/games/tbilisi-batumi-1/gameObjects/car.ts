import { GamePlay } from "../scenes/gamePlay";


// let save_x = -100;
// let save_y = 368;

let save_x = -45900;
let save_y = 780;


export class Car{

    carMeshe : any;
    scene! : Phaser.Scene;
    x! : number;
    y! : number;
    
    isMoving : boolean = false;
    onGround : boolean = false;
    canMoving : boolean = true;
    isExplosive : boolean = false;

    loose : boolean = false;

    allObjects : Array<Phaser.Physics.Matter.Sprite> = [];
    bags : Array<Phaser.Physics.Matter.Sprite> = [];

    carBody!: Phaser.Physics.Matter.Sprite;
    leftTire! : Phaser.Physics.Matter.Sprite;
    rightTire! : Phaser.Physics.Matter.Sprite;

    upsideDownTime : number = 300;

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
        this.createExplosiveAnimation();
    }

    createExplosiveAnimation(){
      this.scene.anims.create({
        key: "carExplotion",
        frameRate: 30,
        frames: this.scene.anims.generateFrameNumbers("carExplosion", { start: 0, end: 65 }),
      });
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

      this.allObjects.push(charachter)
      
    
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

    upsideLose(){
      this.loose = true;

      const scene = this.scene as GamePlay;
      scene.resetCamera();
      this.upsideDownTime = 5000;

      const gamePlayScene = this.scene.scene.get('UI'); 
      //@ts-ignore
      gamePlayScene.hideCarIndicators();

      setTimeout(() => {
        if(this.loose === true){
          this.reset();
        }
        
      }, 500);
    }

    reset(){
      this.loose = false;

      if(this.carBody.isStatic() === false){
        this.carBody.setStatic(true)
      }

      this.carBody.setPosition(save_x,save_y)
      this.carBody.setRotation(0)
      this.leftTire.setPosition(save_x - 43, save_y + 30)
      this.rightTire.setPosition(save_x + 79, save_y + 30)
      this.isExplosive = false;
      this.canMoving = true;
      this.allObjects.forEach(object => {
        object.setVisible(true)
      });
      this.bags.forEach(bag => {
        bag.destroy(true)
      });
      this.onGround = true;
      this.upsideDownTime = 300;

      this.x = save_x;
      this.y = save_y;

      setTimeout(() => {
        this.carBody.setStatic(false)
        this.addBags();
      }, 100);
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

          if(this.carBody.angle < -45 || this.carBody.angle > 45
            || this.onGround === false) {
                this.upsideDownTime -= 1;
                if(this.upsideDownTime < 0 && this.isExplosive === false){
                  this.upsideLose();
                }
          } else {
            this.upsideDownTime = 300;
          }

          if(this.carBody.angle < -38 || this.carBody.angle > 38
            || this.onGround === false) {
              this.isMoving=false; 
              return;
          }

          if(this.canMoving){
            if (isAcceleratingLeft && this.carBody.body.velocity.x > -maxSpeed) {
              const force = new Phaser.Math.Vector2(-accelerationRate, 0);
              this.carBody.applyForce(force);
              let scene = this.scene as GamePlay;
            }
          
            if (isAcceleratingRight && this.carBody.body.velocity.x < maxSpeed) {
                const force = new Phaser.Math.Vector2(accelerationRate, 0);
                this.carBody.applyForce(force);
            }
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
            sleepThreshold : 100,
        } as Phaser.Types.Physics.Matter.MatterBodyConfig
    );
    this.allObjects.push(this.carBody)
       
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
        this.allObjects.push(this.leftTire)
    
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
         //add Collision Detection for Right Tire
         this.scene.matter.world.on('collisionstart', (event : any) => {
          event.pairs.forEach((pair : any) => {
            // Check if the colliders in this pair belong to the leftTire sprite
            if (pair.bodyA === this.leftTire.body || pair.bodyB === this.leftTire.body) {
              this.onGround = true;
            }
          });
        });
      
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
        this.allObjects.push(this.rightTire)
      
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

              // console.log(this.carBody.rotation)
              if(this.carBody.angle < -38){
                this.onGround= false;
              }
              // 
            }
          });
        });
      }

      addBags(){
        this.bags[0] = this.scene.matter.add.sprite(
          this.x+60,
          this.y-20,
          "carBag",
          undefined,
          {
            isStatic:false,
            shape: this.carMeshe.bag,
          } as Phaser.Types.Physics.Matter.MatterBodyConfig
        ).setScale(1.3).setDepth(-1)
        this.allObjects.push(this.bags[0])

        this.bags[1] = this.scene.matter.add.sprite(
          this.x+60,
          this.y-30,
          "carBag",
          undefined,
          {
            isStatic:false,
            shape: this.carMeshe.bag,
          } as Phaser.Types.Physics.Matter.MatterBodyConfig
        ).setScale(1.1).setDepth(-1)
        this.allObjects.push(this.bags[1])

        this.bags[2] = this.scene.matter.add.sprite(
          this.x+80,
          this.y-30,
          "carBag",
          undefined,
          {
            isStatic:false,
            shape: this.carMeshe.bag,
          } as Phaser.Types.Physics.Matter.MatterBodyConfig
        ).setScale(1.1).setDepth(-1)
        this.allObjects.push(this.bags[2])
      }

      explosive(){

        if(this.isExplosive === false && this.loose === false){
          this.loose = true;
          // if(this.carBody.isStatic() === false){
          //   this.carBody.setStatic(true);
          // }
          this.isExplosive = true;
          this.canMoving = false;
          //Hide Car objects
          this.allObjects.forEach(object => {
              object.setVisible(false)
          });
  
          this.playExplosiveAnimation();
        }
      }

      

      playExplosiveAnimation(){
        const carExplotion = this.scene.add.sprite(this.carBody.x, this.carBody.y,"carExplotion")
        carExplotion.play("carExplotion");

        carExplotion.on("animationcomplete", () => {
          carExplotion.destroy(true)
          const scene = this.scene as GamePlay;
          scene.resetCamera();

          const gamePlayScene = this.scene.scene.get('UI'); 
          //@ts-ignore
          gamePlayScene.hideCarIndicators();

          setTimeout(() => {
            if(this.loose === true){
              this.reset();
            }
          }, 500);
          
       });
      
      }
      
}