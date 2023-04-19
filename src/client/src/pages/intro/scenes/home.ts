
import config from "./config.json"


export class Home extends Phaser.Scene{

    size! : any;

    constructor(){
        super("Home")
    }

    preload(){
        this.load.setPath(`${process.env.PUBLIC_URL}/assets/homePage/`);

        this.load.image("board","images/board.png")
    }

    create(){
        if(this.game.canvas.width >= 1300){
            this.size = 1300;
        }
        if(this.game.canvas.width >= 1000 && this.game.canvas.width < 1300){
            this.size = 1000;
        }
        if(this.game.canvas.width >= 600 && this.game.canvas.width < 1000){
            this.size = 600;
        }
        if(this.game.canvas.width < 600){
            this.size = 600;
        }

        if(this.game.canvas.width < 900 && this.game.canvas.height > 617){
            this.size = "w-900,h-617";
        }
        

        this.addTitle();
        this.addBoard();
    }

    addBoard(){
        //@ts-ignore
        const point = this.matter.add.circle(this.game.canvas.width/2,config[this.size].board.point.x,10,{
            isStatic:true
        })

        //@ts-ignore
        const board = this.matter.add.image(this.game.canvas.width/2, config[this.size].board.y, "board", undefined,{
            frictionAir:0.0005,
            collisionFilter: {
                category: 0,
                mask: 0
            } 
            //@ts-ignore
        }).setScale(config[this.size].board.scale).setTint(0xE68604);

        const leftTireConstraint = this.matter.add.constraint(
            board.body as MatterJS.BodyType,
            //@ts-ignore
            point,
            0.4, // Length of the constraint
            0, // Stiffness of the constraint (0 = not stiff at all)
            {
              //@ts-ignore
              pointA: { x: -0, y: config[this.size].board.constraintWidth}, // Local offset of constraint point on left tire
              pointB: { x: 0, y: 0} // Local offset of constraint point on car body
            }
          );

          board.angle = 16;
    }

    addTitle(){
        //@ts-ignore
        new Word(this,["S","i","l","k"],this.game.canvas.width/2 + (config[this.size].silk.x),config[this.size].silk.y + (this.game.canvas.height/2),config[this.size].spacing,this.size);
        //@ts-ignore
        new Word(this,["R","o","a","d"],this.game.canvas.width/2 + (config[this.size].road.x),config[this.size].road.y + (this.game.canvas.height/2),config[this.size].spacing,this.size);
        //@ts-ignore
        new Word(this,["G","a","m","i","n","g"],this.game.canvas.width/2 + (config[this.size].gaminig.x),config[this.size].gaminig.y + (this.game.canvas.height/2),config[this.size].spacing,this.size);
    }
}

class Word {
    scene! : Phaser.Scene;
    word!: Array<string>;

    x! : number;
    y! : number;
    spacing! : number;
    size! : number
    

    constructor( scene : Phaser.Scene, word : Array<string>, x : number, y : number, spacing : number, size : number){
        this.scene = scene;
        this.word = word;
        this.x = x;
        this.y = y;
        this.spacing = spacing;
        this.size = size;

        this.init();
    }

    init(){
        let offset_X = 0;

        this.word.forEach( (letter) => {
            //@ts-ignore
            new Letter(this.scene,this.x + offset_X,this.y,letter,"#E67912",config[this.size].fontSize, this.size)
            offset_X += this.spacing;
        })
    }
}



class Letter {

    scene! : Phaser.Scene;
    letter! : string
    color! : string;
    fontSize! : number;

    size! : number;

    x!: number;
    y!: number


    constructor(scene : Phaser.Scene, x : number, y : number, letter : string, color : string, fontSize : number, size : number){
        this.scene = scene;
        this.letter = letter;
        this.color = color;
        this.fontSize = fontSize;
        this.x = x;
        this.y = y;
        this.size = size;

        this.addLetter();
        this.addCollider();
    }

    addLetter(){
        const letter =  this.scene.add.text(this.x, this.y, this.letter, {
            fontSize: this.fontSize + "px",
            stroke: "#E65901",
            //@ts-ignore
            strokeThickness: config[this.size].strokeThickness,
            shadow: {
              offsetX: 0,
              offsetY: 0,
              color: this.color,
              //@ts-ignore
              blur: config[this.size].blur,
              stroke: true,
              fill: false,
            },
        }).setFill("")

        this.scene.matter.add.gameObject(letter,{
            isStatic:true,   
        })
    }

    addCollider(){
        const letter = this.scene.add.text(this.x,this.y,this.letter,{
            fontSize: this.fontSize +  "px"
        }).setStroke(this.color,5).setFill(this.color)

        const collider = this.scene.matter.add.gameObject(letter,{
            isStatic:true,
            restitution: 0.7,
            gravityScale: new Phaser.Math.Vector2(0,6),
            collisionFilter: {
                category: 0,
                mask: 0
            }     
        }).setInteractive().on(Phaser.Input.Events.POINTER_OVER, () => {
            collider.body.gameObject.setStatic(false)
        })

    }
}