export class Menu extends Phaser.Scene {
  backgroundZone!: Phaser.GameObjects.Image;
  touchToScreenText!: Phaser.GameObjects.Text;
  touchScreenTextTween!: Phaser.Tweens.Tween;
  plug!: Phaser.GameObjects.Image;

  isMenuOff = true;

  plugSound!: Phaser.Sound.BaseSound;
  buttonSound!: Phaser.Sound.BaseSound;

  menuButtonsContainer!: Phaser.GameObjects.Container;

  constructor() {
    super("Menu");
  }

  create() {
    this.addBackground();
    this.addCar();
    this.addPlug();
    this.addInteractiveZone();
    this.addTouchToScreenText();
    this.createMenuButtons();

    //Load Sound Effects
    this.plugSound = this.sound.add("plugSound", {
      volume: 1,
    });
    this.buttonSound = this.sound.add("buttonSound", {
      volume: 1,
    });
  }

  createMenuButtons() {
    this.menuButtonsContainer = this.add
      .container(this.game.canvas.width / 2, this.game.canvas.height / 2)
      .setDepth(100);

    const playButton = this.add
      .text(0, -200, "Play", {
        fontFamily: "mainFont",
        color: "#FFF5D7",
        backgroundColor: "#D4700D",
        fontSize: "35px",
        align: "center",
      })
      .setOrigin(0.5)
      .setDepth(100)
      .setShadow(3, 3, "#D4930D")
      .setPadding(14)
      .setInteractive({ cursor: "pointer" })
      .on(Phaser.Input.Events.POINTER_OVER, () => {
        playButton.setScale(1.1);
        playButton.setBackgroundColor("#402204");
      })
      .on(Phaser.Input.Events.POINTER_OUT, () => {
        playButton.setScale(1);
        playButton.setBackgroundColor("#D4700D");
      })
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.buttonSound.play();
        this.playGame();
      });

    const mapButton = this.add
      .text(0, -100, "Map", {
        fontFamily: "mainFont",
        color: "#FFF5D7",
        backgroundColor: "#D4700D",
        fontSize: "35px",
        align: "center",
      })
      .setOrigin(0.5)
      .setShadow(3, 3, "#D4930D")
      .setPadding(14)
      .setInteractive({ cursor: "pointer" })
      .on(Phaser.Input.Events.POINTER_OVER, () => {
        mapButton.setScale(1.1);
        mapButton.setBackgroundColor("#402204");
      })
      .on(Phaser.Input.Events.POINTER_OUT, () => {
        mapButton.setScale(1);
        mapButton.setBackgroundColor("#D4700D");
      })
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.buttonSound.play();
      });

    const informationButton = this.add
      .text(0, 0, "Game Information", {
        fontFamily: "mainFont",
        color: "#FFF5D7",
        backgroundColor: "#D4700D",
        fontSize: "35px",
        align: "center",
      })
      .setOrigin(0.5)
      .setShadow(3, 3, "#D4930D")
      .setPadding(14)
      .setInteractive({ cursor: "pointer" })
      .on(Phaser.Input.Events.POINTER_OVER, () => {
        informationButton.setScale(1.1);
        informationButton.setBackgroundColor("#402204");
      })
      .on(Phaser.Input.Events.POINTER_OUT, () => {
        informationButton.setScale(1);
        informationButton.setBackgroundColor("#D4700D");
      })
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.buttonSound.play();
      });

    this.menuButtonsContainer.add([playButton, mapButton, informationButton]);

    this.menuButtonsContainer.setScale(0);
  }

  addTouchToScreenText() {
    this.touchToScreenText = this.add
      .text(
        this.game.canvas.width / 2,
        this.game.canvas.height / 2,
        "Touch To Scren For Open Menu",
        {
          align: "center",
          fontFamily: "mainFont",
          fontSize: "50px",
        }
      )
      .setAlpha(0)
      .setOrigin(0.5);

    //Add Animation
    this.touchScreenTextTween = this.tweens.add({
      targets: this.touchToScreenText,
      duration: 500,
      alpha: 1,
      yoyo: true,
      repeat: -1,
    });
  }

  addBackground() {
    this.add
      .image(0, 0, "menuBackground")
      .setDisplaySize(this.game.canvas.width, this.game.canvas.height)
      .setOrigin(0);
  }

  addCar() {
    this.add.image(812, 603, "menuCarBody").setScale(2);
    //left Tire
    this.add.image(570, 730, "menuCarTire").setScale(1.4);
    //right Tire
    this.add.image(1076, 730, "menuCarTire").setScale(1.4);
  }

  addPlug() {
    this.plug = this.add.image(1510, 300, "plug").setScale(0.8);
  }

  addInteractiveZone() {
    this.backgroundZone = this.add
      .image(0, 0, "white")
      .setDisplaySize(this.game.canvas.width, this.game.canvas.height)
      .setOrigin(0)
      .setAlpha(0.9)
      .setTint(0x141314)
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.plugSound.play();
        if (this.isMenuOff) {
          this.isMenuOff = false;
          this.openMenu();
          return;
        } else {
          this.isMenuOff = true;
          this.closeMenu();
        }
      });
  }

  openMenu() {
    this.touchToScreenText.setVisible(false);
    this.backgroundZone.setAlpha(0.4);

    //Up Plug Animation
    this.tweens.add({
      targets: this.plug,
      duration: 150,
      y: 230,
    });

    //showMenuButtons
    this.tweens.add({
      targets: this.menuButtonsContainer,
      duration: 150,
      scale: 1,
    });
  }

  closeMenu() {
    this.touchToScreenText.setVisible(true);
    this.backgroundZone.setAlpha(0.9);
    this.touchScreenTextTween.restart();

    //down Plug Animation
    this.tweens.add({
      targets: this.plug,
      duration: 150,
      y: 300,
    });

    //hideMenuButtons
    this.tweens.add({
      targets: this.menuButtonsContainer,
      duration: 150,
      scale: 0,
    });
  }

  playGame() {
    this.scene.start("GamePlay");
  }
}
