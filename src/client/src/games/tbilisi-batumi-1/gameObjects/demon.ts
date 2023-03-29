
export class Demon extends Phaser.GameObjects.Container{

    readonly animationDuration : number = 500;
    text! : string[]

    constructor( scene: Phaser.Scene, x: number, y: number, text : string[]){
        super(scene,x,y);
        this.scene.add.existing(this)

        this.text = text;

        this.init();
        this.setDepth(-4)
    }

    init(){
        this.addHead();
        this.addWings();
        this.addBody();
        this.addText();

        this.scene.tweens.add({
            targets:this,
            yoyo:true,
            loop:Infinity,
            duration : 800,
            y : this.y - 20,
        }) 
    }

    addText(){

        // Add Circles
        const circle_1 = this.scene.add.image(50,320,"angelCircle")
        .setScale(0.05)
        .setTint(0x5FA5B1C)
        this.add(circle_1)

        const circle_2 = this.scene.add.image(80,300,"angelCircle")
        .setScale(0.1)
        .setTint(0xFA5B1C)
        this.add(circle_2)

        const circle_3 = this.scene.add.image(115,265,"angelCircle")
        .setScale(0.14)
        .setTint(0xFA5B1C)
        this.add(circle_3)

        const text = this.scene.add.text(145,220,this.text,{
            fontSize: "20px",
            color : "#FA5B1C",
            backgroundColor: "#100726",
            align:"center",
        })
        
        this.add(text)

    }

    addHead(){
        const head = this.scene.add.image(0,300,"demonHead")
        .setScale(0.95);

        this.scene.tweens.add({
            targets : head,
            y : head.y - 4,
            duration : this.animationDuration,
            loop:Infinity,
            yoyo : true
        })

        this.add(head)
    }

    addWings(){
        // Left Wing
        const leftWing = this.scene.add.image(-90,400,"demonWing")
        .setScale(0.67);

        this.scene.tweens.add( {
            targets : leftWing,
            y : leftWing.y - 27,
            x : leftWing.x - 25,
            duration : 800,
            loop : Infinity,
            rotation : 0.7,
            ease : Phaser.Math.Easing.Cubic.Out,
            yoyo : true
        })

        this.add(leftWing)

        // Right Wing
        const rightWing = this.scene.add.image(90,400,"demonWing")
        .setScale(0.67)
        .setFlip(true,false)

        this.scene.tweens.add( {
            targets : rightWing,
            y : rightWing.y - 27,
            x : rightWing.x + 25,
            duration : 800,
            ease : Phaser.Math.Easing.Cubic.Out,
            loop : Infinity,
            rotation : -0.7,
            yoyo : true
        })

        this.add(rightWing)
    }

    addBody(){
        const body = this.scene.add.image(0,387,"demonBody")
        .setScale(1.2);
        this.add(body)
        
        this.scene.tweens.add({
            targets:body,
            scale : 1.18,
            duration:this.animationDuration,
            loop : Infinity,
            yoyo:true
        })
    }

}