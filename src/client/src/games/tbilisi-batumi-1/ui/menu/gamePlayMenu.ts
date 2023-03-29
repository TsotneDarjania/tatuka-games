

export class GamePlayMenu extends Phaser.Scene{

    layer! : Phaser.GameObjects.Layer;
    indicatorsContainer! : Phaser.GameObjects.Container;
    menuButtonsContainer! : Phaser.GameObjects.Container;
    
    gamePlayScene! : Phaser.Scene;

    continueButtonTween! : Phaser.Tweens.Tween;
    mainMenuTween! : Phaser.Tweens.Tween;
    recordsButtonTween! : Phaser.Tweens.Tween;

    constructor(){
        super("UI")
    }

    create(){
        this.indicatorsContainer = this.add.container(0,0);
        this.menuButtonsContainer = this.add.container(0,0);
        this.menuButtonsContainer.setVisible(false)

        this.addSpeedometer();
        this.addMenuIcon();
        this.addMenuButtons();


        this.gamePlayScene = this.scene.get('GamePlay');
    }

    addMenuIcon(){
        const icon = this.add.sprite(1530,50,"gamePlayMenuIcon")
        .setScale(0.2)
        .setAlpha(0.6)
        .setTint(0x5DB1F5)
        .setInteractive()

        this.indicatorsContainer.add(icon)

        //Add Events
        icon.on(Phaser.Input.Events.POINTER_DOWN, () => {
           this.showMenu();
        })

        icon.on(Phaser.Input.Events.POINTER_OVER, () => {
            icon.setAlpha(0.9)
        })
        icon.on(Phaser.Input.Events.POINTER_OUT, () => {
            icon.setAlpha(0.6)
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
            duration:500,
            scale : 0.5,
            delay:1000,
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
            duration:500,
            scale : 0.5,
            delay:500,
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
            duration:500,
            scale : 0.5,
            ease: Phaser.Math.Easing.Bounce.Out
        })

        this.menuButtonsContainer.add([continueButton,mainMenu,recordsButton])
    }

    addSpeedometer(){
        const speedometer = this.add.image(this.game.canvas.width/2,795,"speedometer")
        .setScale(0.22)
        .setAlpha(0.2)

        this.indicatorsContainer.add(speedometer)
    }
}