
export class Home extends Phaser.Scene{


    constructor(){
        super("Home")
    }

    preload(){
        this.load.setPath(`${process.env.PUBLIC_URL}/assets/homePage/`);

        this.load.image("board","images/board.png")
    }

    create(){
        this.addTitle();
        this.addBoard();
    }

    update(){

    }

    addBoard(){
        const point = this.matter.add.circle(this.game.canvas.width/2,100,10,{
            isStatic:true
        })

        const board = this.matter.add.image(this.game.canvas.width/2, 200, "board", undefined,{
            frictionAir:0.0005,
            collisionFilter: {
                category: 0,
                mask: 0
            } 
        }).setScale(0.5).setTint(0xE68604);

        const leftTireConstraint = this.matter.add.constraint(
            board.body as MatterJS.BodyType,
            //@ts-ignore
            point,
            0.4, // Length of the constraint
            0, // Stiffness of the constraint (0 = not stiff at all)
            {
              pointA: { x: -0, y: -120}, // Local offset of constraint point on left tire
              pointB: { x: 0, y: 0} // Local offset of constraint point on car body
            }
          );

          board.angle = 16;
    }

    addTitle(){

        let pos_x_1 = 580;
        let pos_x_2 = 200;
        let pos_x_3 = 170;

        let pos_y_1 = this.game.canvas.height/2;
        let pos_y_2 = this.game.canvas.height/2;
        let pos_y_3 = this.game.canvas.height/2;
 

        if(this.sys.game.canvas.width < 1230){
            pos_x_1 = 380;
            pos_x_2 = 120;
            pos_x_3 = 130;
        }
        if(this.sys.game.canvas.width < 1000){
            pos_x_1 = 80;
            pos_x_2 = 80;
            pos_x_3 = -120;

            pos_y_1 = this.game.canvas.height/2 - 70;
            pos_y_2 = this.game.canvas.height/2
            pos_y_3 = this.game.canvas.height/2 + 70;
        }

        new Word(this,["S","i","l","k"],this.game.canvas.width/2 - pos_x_1,pos_y_1,80);
        new Word(this,["R","o","a","d"],this.game.canvas.width/2 - pos_x_2,pos_y_2,80);
        new Word(this,["G","a","m","i","n","g"],this.game.canvas.width/2 + pos_x_3,pos_y_3,80);
    }
}

class Word {
    scene! : Phaser.Scene;
    word!: Array<string>;

    x! : number;
    y! : number;
    spacing! : number;

    constructor( scene : Phaser.Scene, word : Array<string>, x : number, y : number, spacing : number){
        this.scene = scene;
        this.word = word;
        this.x = x;
        this.y = y;
        this.spacing = spacing;

        this.init();
    }

    init(){
        let offset_X = 0;

        this.word.forEach( (letter) => {
            let fontSize = 120;

            if(this.scene.sys.game.canvas.width < 1475){
                fontSize = 70;
            }
            if(this.scene.sys.game.canvas.width < 1230){
                fontSize = 40;
                this.spacing = 50;
            }

            new Letter(this.scene,this.x + offset_X,this.y,letter,"#E67912",fontSize)
            offset_X += this.spacing;
        })
    }
}



class Letter {

    scene! : Phaser.Scene;
    letter! : string
    color! : string;
    fontSize! : number;

    x!: number;
    y!: number


    constructor(scene : Phaser.Scene, x : number, y : number, letter : string, color : string, fontSize : number){
        this.scene = scene;
        this.letter = letter;
        this.color = color;
        this.fontSize = fontSize;
        this.x = x;
        this.y = y;

        this.addLetter();
        this.addCollider();
    }

    addLetter(){
        let strokeThickness = 3;
        let blur = 10;
        if(this.scene.sys.game.canvas.width < 1230){
            strokeThickness = 1;
            blur = 5;
        }

        const letter =  this.scene.add.text(this.x, this.y, this.letter, {
            fontSize: this.fontSize + "px",
            stroke: "#E65901",
            strokeThickness: strokeThickness,
            shadow: {
              offsetX: 0,
              offsetY: 0,
              color: this.color,
              blur: blur,
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