import MusicPlayer from "../../musicPlayer";

let radioIsAccess =  false;



export class GamePlayMenu extends Phaser.Scene{

    layer! : Phaser.GameObjects.Layer;
    indicatorsContainer! : Phaser.GameObjects.Container;
    menuButtonsContainer! : Phaser.GameObjects.Container;

    speedometerArrow!: Phaser.GameObjects.Image;
    speedometerArrowRotation : number =  -1.5;
    
    gamePlayScene! : Phaser.Scene;

    continueButtonTween! : Phaser.Tweens.Tween;
    mainMenuTween! : Phaser.Tweens.Tween;
    recordsButtonTween! : Phaser.Tweens.Tween;

    titleText : string = "";
    regionNameText : string = "";
    screenTextsContainer! : Phaser.GameObjects.Container;

    // Radio Buttons
    radioLeftGreenButton! : Phaser.GameObjects.Image;
    radioRightGreenButton! : Phaser.GameObjects.Image;
    radioLeftRedButton! : Phaser.GameObjects.Image;
    radioRightRedButton! : Phaser.GameObjects.Image;

    radioGreenButtons! : Phaser.GameObjects.Container;
    radioRedButtons! : Phaser.GameObjects.Container;
    
    canRadioChange : boolean = true;
    radioIsAccess : boolean = false;


    constructor(){
        super("UI")
    }

    preload(){
        this.load.setPath(`${process.env.PUBLIC_URL}/assets`);

        this.load.image("modal","map/assets/modal.png")
        this.load.image("ok-button","map/assets/ok-button.png")
    }

    create(){

        this.indicatorsContainer = this.add.container(0,0);
        this.menuButtonsContainer = this.add.container(0,0);
        this.screenTextsContainer = this.add.container(0,0)
        this.menuButtonsContainer.setVisible(false)

        this.radioGreenButtons = this.add.container(0,0)
        this.radioRedButtons = this.add.container(0,0)

        this.addSpeedometer();
        this.addMenuIcon();
        this.addMenuButtons();
        this.creatScreenTexts();
        this.createRadioButtons();

        this.gamePlayScene = this.scene.get('GamePlay');  
    }

    createRadioButtons(){
        // Green Buttons
        this.radioLeftGreenButton = this.add.image(650,865,"radioGreenButton")
        .setScale(1.2)
        .setInteractive()
        .on(Phaser.Input.Events.POINTER_OVER, () => {
            this.radioLeftGreenButton.setScale(1.4)
        })  
        .on(Phaser.Input.Events.POINTER_OUT, () => {
            this.radioLeftGreenButton.setScale(1.2)
        })  

        this.radioRightGreenButton = this.add.image(945,865,"radioGreenButton")
        .setScale(1.2)
        .setFlipY(true)
        .setInteractive()
        .on(Phaser.Input.Events.POINTER_OVER, () => {
            this.radioRightGreenButton.setScale(1.4)
        })  
        .on(Phaser.Input.Events.POINTER_OUT, () => {
            this.radioRightGreenButton.setScale(1.2)
        })  


        // Red Buttons
        this.radioLeftRedButton = this.add.image(650,865,"radioRedButton")
        .setScale(1.2)
        .setInteractive()
        .on(Phaser.Input.Events.POINTER_OVER, () => {
            this.radioLeftRedButton.setScale(1.4)
        })  
        .on(Phaser.Input.Events.POINTER_OUT, () => {
            this.radioLeftRedButton.setScale(1.2)
        })  

        this.radioRightRedButton = this.add.image(945,865,"radioRedButton")
        .setScale(1.2)
        .setFlipY(true)
        .setInteractive()
        .on(Phaser.Input.Events.POINTER_OVER, () => {
            this.radioRightRedButton.setScale(1.4)
        })  
        .on(Phaser.Input.Events.POINTER_OUT, () => {
            this.radioRightRedButton.setScale(1.2)
        }) 
        
        this.radioRedButtons.add([this.radioLeftRedButton, this.radioRightRedButton])
        this.radioGreenButtons.add([this.radioLeftGreenButton, this.radioRightGreenButton])  

        if(this.canRadioChange){
            this.radioRedButtons.setVisible(false)
            this.radioGreenButtons.setVisible(true)
        } else {
            this.radioRedButtons.setVisible(true)
            this.radioGreenButtons.setVisible(false)
        }

        if(radioIsAccess === false){
            this.radioRedButtons.setVisible(false)
            this.radioGreenButtons.setVisible(false)
        }
    }

    radioOnn(){
        this.canRadioChange = true;
        if(this.canRadioChange){
            this.radioRedButtons.setVisible(false)
            this.radioGreenButtons.setVisible(true)
        } else {
            this.radioRedButtons.setVisible(true)
            this.radioGreenButtons.setVisible(false)
        }
    }

    radioOff(){
        this.canRadioChange = false;
        if(this.canRadioChange){
            this.radioRedButtons.setVisible(false)
            this.radioGreenButtons.setVisible(true)
        } else {
            this.radioRedButtons.setVisible(true)
            this.radioGreenButtons.setVisible(false)
        }
    }

    hideCarIndicators(){
        this.indicatorsContainer.setVisible(false)
        this.radioGreenButtons.setVisible(false)
        this.radioRedButtons.setVisible(false)
    }

    showCarIndicators(){
        this.indicatorsContainer.setVisible(true)
        if(radioIsAccess){
            this.radioOnn();
        }
    }

    showInformationOnMap(text : Array<string>){

        if(text[0] === "open_radio"){
            text = [
                "Initially, the car is equipped with a radio",
                " that is tuned to only receive",
                " Georgian radio stations",
                " However, as you embark on your journey, ",
                " you will have the opportunity",
                " to explore and discover ",
                " a plethora of diverse channels and songs ",
            ]
            radioIsAccess = true;
        }

        const modalContainer = this.add.container(this.game.canvas.width/2,this.game.canvas.height/2);

        const modalBackground = this.add.image(
            0,
            0,
            "modal",
        ).setOrigin(0.5)
        .setScale(0.7)

        const okButton = this.add.image(modalContainer.width/2,368,"ok-button")
        .setInteractive()
        .on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.indicatorsContainer.setVisible(true)
            // this.menuButtonsContainer.setVisible(true)
            //@ts-ignore
            this.gamePlayScene. continueScene()
            modalContainer.destroy(true)

            if(radioIsAccess){
                this.radioOnn();
            }
        })
        
        okButton.on(Phaser.Input.Events.POINTER_OVER, () => {
            okButton.setScale(1.1)
        })
        okButton.on(Phaser.Input.Events.POINTER_OUT, () => {
            okButton.setScale(1)
        })


        const txt = this.add.text(
            modalContainer.width/2,
            modalContainer.height/2,
            text,
            {
                fontFamily:"mainFont",
                color:"black",
                align:"center",
                fontSize:"17px",
                
            }
        ).setOrigin(0.5)
        txt.setLineSpacing(10)


        this.indicatorsContainer.setVisible(false)
        this.menuButtonsContainer.setVisible(false)
        //@ts-ignore
        this.gamePlayScene.pauseScene();

        modalContainer.add([modalBackground,okButton,txt])
        modalContainer.setScale(0)

        this.add.tween({
            targets:modalContainer,
            duration:800,
            scale:1,
            ease: Phaser.Math.Easing.Bounce.Out
        })
    }

    creatScreenTexts(){
        const title = this.add.text(
            this.game.canvas.width/2,
            this.game.canvas.height/2 - 200,
            this.titleText,{
                color:"#4BF8FA",
                fontSize: "120px",
                backgroundColor:"#082118"
            })

            .setOrigin(0.5);
        const text = this.add.text(
            this.game.canvas.width/2,
            this.game.canvas.height/2 - 300,
            this.regionNameText,{
                color:"#4BF8FA",
                fontSize: "62px",
                backgroundColor:"#082118"
            })
            .setText("")
            .setOrigin(0.5);

        this.screenTextsContainer.add([title,text])
        this.screenTextsContainer.setAlpha(0)
    }

    showScreenTexts(title: string, text: string){
        //@ts-ignore
        this.screenTextsContainer.getAt(0).setText(title)
        //@ts-ignore
        this.screenTextsContainer.getAt(1).setText(text)

        this.tweens.add({
            targets:this.screenTextsContainer,
            duration: 5000,
            alpha : 1,
            onComplete: () => {
                setTimeout(() => {
                    this.hideScreenTexts();
                }, 2000);
            }
        })
    }

    hideScreenTexts(){
        this.tweens.add({
            targets:this.screenTextsContainer,
            duration: 5000,
            alpha : 0,
        })
    }

    addMenuIcon(){
        const icon = this.add.sprite(1530,50,"gamePlayMenuIcon")
        .setScale(0.5)
        .setAlpha(0.5)
        .setInteractive()

        this.indicatorsContainer.add(icon)

        //Add Events
        icon.on(Phaser.Input.Events.POINTER_DOWN, () => {
           this.showMenu();
        })

        icon.on(Phaser.Input.Events.POINTER_OVER, () => {
            icon.setAlpha(1)
        })
        icon.on(Phaser.Input.Events.POINTER_OUT, () => {
            icon.setAlpha(0.5)
        })
    }

    showMenu(){
        //@ts-ignore
        this.gamePlayScene.pauseScene();


        this.indicatorsContainer.setVisible(false)
        this.menuButtonsContainer.setVisible(true)
        
        this.continueButtonTween.restart();
        this.mainMenuTween.restart();
        this.recordsButtonTween.restart();
    }

    hideMenu(){
        //@ts-ignore
        this.gamePlayScene.continueScene();

        this.indicatorsContainer.setVisible(true)
        this.menuButtonsContainer.setVisible(false)
    }

    addMenuButtons(){

        const continueButton = this.add.image(this.game.canvas.width/2,700,"gameplayMenuContinueButton")
        .setScale(0)
        .setInteractive()
        .on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.hideMenu();
        })
        .on(Phaser.Input.Events.POINTER_OVER, () => {
            continueButton.setScale(0.55)
        })
        .on(Phaser.Input.Events.POINTER_OUT, () => {
            continueButton.setScale(0.5)
        })
    
        this.continueButtonTween = this.add.tween({
            targets:continueButton,
            duration:200,
            scale : 0.5,
            delay:300,
            ease: Phaser.Math.Easing.Bounce.Out
        })


        const mainMenu = this.add.image(this.game.canvas.width/2, 450, "gameplayBackToMainMenuButton")
        .setScale(0)
        .setInteractive()
        .on(Phaser.Input.Events.POINTER_OVER, () => {
            mainMenu.setScale(0.55)
        })
        .on(Phaser.Input.Events.POINTER_OUT, () => {
            mainMenu.setScale(0.5)
        })

        this.mainMenuTween =  this.add.tween({
            targets:mainMenu,
            duration:200,
            scale : 0.5,
            delay:150,
            ease: Phaser.Math.Easing.Bounce.Out
        })

        const recordsButton = this.add.image(this.game.canvas.width/2, 200, "gameplayRecordsIcon")
        .setScale(0)
        .setInteractive()
        .on(Phaser.Input.Events.POINTER_OVER, () => {
            recordsButton.setScale(0.55)
        })
        .on(Phaser.Input.Events.POINTER_OUT, () => {
            recordsButton.setScale(0.5)
        })

        this.recordsButtonTween = this.add.tween({
            targets:recordsButton,
            duration:200,
            scale : 0.5,
            ease: Phaser.Math.Easing.Bounce.Out
        })

        this.menuButtonsContainer.add([continueButton,mainMenu,recordsButton])
    }

    addSpeedometer(){

        const speedometer = this.add.image(this.game.canvas.width/2,760,"speedometer")
        .setScale(0.4)
        .setAlpha(1)

        this.indicatorsContainer.add(speedometer)

        this.speedometerArrow = this.add.image(this.game.canvas.width/2+11,810,"speedometer-arrow")
        .setScale(0.3)
        .setOrigin(0.5,0.99)
        .setRotation(-1.5)

        this.indicatorsContainer.add(this.speedometerArrow)

        
    }

    update(){
        //@ts-ignore
        this.speedometerArrowRotation = (Math.abs(this.gamePlayScene.car.carBody.body.velocity.x)/9) * 1.5;
        this.speedometerArrow.setRotation(this.speedometerArrowRotation - 1.5) 
    }
}