import { setCookie } from "../../helper/cookie";
import { API } from "../tbilisi-batumi-1/api";

import config from "./config/registrationModal.json";

interface ServerResponse {
  statusCode: number;
  statusMessage: string;
  responseMessage: string;
}

export class RegistrationModal extends Phaser.GameObjects.Container {
  api!: API;
  startSceneName!: string;
  attentionText!: Phaser.GameObjects.DOMElement;
  attentionContainer!: Phaser.GameObjects.Container;

  screenSize!: any;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    startSceneName: string
  ) {
    super(scene, x, y);
    this.scene.add.existing(this);
    this.api = new API();
    this.startSceneName = startSceneName;
    this.attentionContainer = this.scene.add.container(0, 0);

    this.init();
  }

  init() {
    this.getScreenSize();
    this.addBackgroundColor();
    this.addCenterLine();
    this.addTitle();
    this.addRegAndLogTitles();
    this.addFormElements();

    this.createAttentionModal();
  }

  getScreenSize() {
    if (this.scene.game.canvas.width >= 950) {
      this.screenSize = "bigSize";
    }
    if (
      this.scene.game.canvas.width >= 663 &&
      this.scene.game.canvas.width < 950
    ) {
      this.screenSize = "mediumSize";
    }
    if (this.scene.game.canvas.width < 663) {
      this.screenSize = "smallSize";
    }
  }

  createAttentionModal() {
    const background = this.scene.add
      .dom(
        0,
        0,
        "div",
        "width: 100vw; height: 100vh; background-color:black; z-index : 10; position: absolute;"
      )
      .setOrigin(0)
      .setAlpha(0.85);

    this.attentionText = this.scene.add
      .dom(
        this.scene.game.canvas.width / 2,
        this.scene.game.canvas.height / 2,
        "h2",
        "font-family: 'Bungee Inline', cursive; font-size : " + //@ts-ignore
          config[this.screenSize].attentionModal.text.fontSize +
          "px; width: 80vw; color: #E6691F; z-index : 14; position: absolute; text-align: center;"
      )
      .setOrigin(0.5);

    this.attentionText.setPosition(
      this.scene.game.canvas.width / 2 - this.attentionText.width / 2,
      this.scene.game.canvas.height / 2 +
        //@ts-ignore
        config[this.screenSize].attentionModal.text.y
    );

    const okButton = this.scene.add
      .dom(
        this.scene.game.canvas.width / 2,
        this.scene.game.canvas.height / 2 +
          //@ts-ignore
          config[this.screenSize].attentionModal.okButton.y,
        "button",
        "width: 80px; height: 80px; border-radius: 10px; cursor: pointer; background-color: #E6691F; " +
          " border: 5px solid #E5AA7B; color: white; font-weight: bold; font-size: 25px;"
      )
      .setOrigin(0.5);
    (okButton.node as HTMLInputElement).innerHTML = "OK";
    okButton.addListener("click");
    okButton.on("click", () => {
      this.attentionContainer.setVisible(false);
    });

    this.attentionContainer.add([background, this.attentionText, okButton]);
    this.attentionContainer.setVisible(false);
  }

  showAttentionModal(text: string) {
    this.attentionContainer.setVisible(true);
    this.attentionText.setText(text);
  }

  addFormElements() {
    //Login
    const loginUserNameInput = this.scene.add.dom(
      this.scene.game.canvas.width / 2 +
        //@ts-ignore
        config[this.screenSize].loginUserNameInput.positions.x,
      //@ts-ignore
      config[this.screenSize].loginUserNameInput.positions.y,
      "input",
      "font-size: " +
        //@ts-ignore
        config[this.screenSize].loginUserNameInput.fontSize +
        "px; outline: none; border 1px solid #F5D09A; text-align:center; " +
        " color:#192324; background:none;width: " + //@ts-ignore
        config[this.screenSize].loginUserNameInput.width +
        "px; height: " + //@ts-ignore
        config[this.screenSize].loginUserNameInput.height +
        "px "
    );
    (loginUserNameInput.node as HTMLInputElement).maxLength = 15;
    (loginUserNameInput.node as HTMLInputElement).setAttribute(
      "placeholder",
      "Username"
    );
    (loginUserNameInput.node as HTMLInputElement).setAttribute("type", "text");

    const loginPasswordInput = this.scene.add.dom(
      this.scene.game.canvas.width / 2 +
        //@ts-ignore
        config[this.screenSize].loginPasswordInput.positions.x,
      //@ts-ignore
      config[this.screenSize].loginPasswordInput.positions.y,
      "input",
      "font-size: 24px; outline: none; border 1px solid #F5D09A; text-align:center; " +
        " color:#192324; background:none;width: " +
        //@ts-ignore
        config[this.screenSize].loginPasswordInput.width +
        "px; height: " + //@ts-ignore
        config[this.screenSize].loginPasswordInput.height +
        "px "
    );
    (loginPasswordInput.node as HTMLInputElement).maxLength = 15;
    (loginPasswordInput.node as HTMLInputElement).setAttribute(
      "placeholder",
      "Password"
    );
    (loginPasswordInput.node as HTMLInputElement).setAttribute(
      "type",
      "password"
    );

    const loginButton = this.scene.add.dom(
      this.scene.game.canvas.width / 2 +
        //@ts-ignore
        config[this.screenSize].loginButton.positions.x,
      //@ts-ignore
      config[this.screenSize].loginButton.positions.y,
      "button",
      " border:none; width: " + //@ts-ignore
        config[this.screenSize].loginButton.width +
        "px; height: " + //@ts-ignore
        config[this.screenSize].loginButton.height +
        "px; font-size : 24px; background-color:#CF7521; color: white; " +
        " cursor: pointer;"
    );
    (loginButton.node as HTMLInputElement).innerHTML = "Login";
    loginButton.addListener("click");
    loginButton.on("click", () => {
      const username = (loginUserNameInput.node as HTMLInputElement).value;
      const password = (loginPasswordInput.node as HTMLInputElement).value;
      this.sendLoginRequest(username, password);
    });

    //Registration
    const registrationUserNameInput = this.scene.add.dom(
      this.scene.game.canvas.width / 2 +
        //@ts-ignore
        config[this.screenSize].registrationUserNameInput.position.x,
      //@ts-ignore
      config[this.screenSize].registrationUserNameInput.position.y,
      "input",
      "font-size: " + //@ts-ignore
        config[this.screenSize].registrationUserNameInput.fontSize +
        "px; outline: none; border 1px solid #F5D09A; text-align:center; " +
        " color:#192324; background:none;width: " + //@ts-ignore
        config[this.screenSize].registrationUserNameInput.width +
        "px; height: " + //@ts-ignore
        config[this.screenSize].registrationUserNameInput.height +
        "px "
    );
    (registrationUserNameInput.node as HTMLInputElement).maxLength = 15;
    (registrationUserNameInput.node as HTMLInputElement).setAttribute(
      "placeholder",
      "Username"
    );
    (registrationUserNameInput.node as HTMLInputElement).setAttribute(
      "type",
      "text"
    );

    const registrationPasswordInput = this.scene.add.dom(
      this.scene.game.canvas.width / 2 +
        //@ts-ignore
        config[this.screenSize].registrationPasswordInput.position.x,
      //@ts-ignore
      config[this.screenSize].registrationPasswordInput.position.y,
      "input",
      "font-size: " + //@ts-ignore
        config[this.screenSize].registrationPasswordInput.fontSize +
        "px; outline: none; border 1px solid #F5D09A; text-align:center; " +
        " color:#192324; background:none;width: " + //@ts-ignore
        config[this.screenSize].registrationPasswordInput.width +
        "px; height: " + //@ts-ignore
        config[this.screenSize].registrationPasswordInput.height +
        "px "
    );
    (registrationPasswordInput.node as HTMLInputElement).maxLength = 15;
    (registrationPasswordInput.node as HTMLInputElement).setAttribute(
      "placeholder",
      "Password"
    );
    (registrationPasswordInput.node as HTMLInputElement).setAttribute(
      "type",
      "password"
    );

    const registrationButton = this.scene.add.dom(
      this.scene.game.canvas.width / 2 +
        //@ts-ignore
        config[this.screenSize].registrationButton.position.x,
      //@ts-ignore
      config[this.screenSize].registrationButton.position.y,
      "button",
      " border:none; width: " + //@ts-ignore
        config[this.screenSize].registrationButton.width +
        "px; height: " + //@ts-ignore
        config[this.screenSize].registrationButton.height +
        "px; font-size : 24px; background-color:#CF7521; color: white; " +
        " cursor: pointer;"
    );
    (registrationButton.node as HTMLInputElement).innerHTML = "Registration";
    registrationButton.addListener("click");
    registrationButton.on("click", () => {
      const username = (registrationUserNameInput.node as HTMLInputElement)
        .value;
      const password = (registrationPasswordInput.node as HTMLInputElement)
        .value;
      this.sendRegistrationRequest(username, password);
    });
  }

  async sendLoginRequest(username: string, password: string) {
    //Check Validation
    if (username.length < 3) {
      this.showAttentionModal(
        "Your Username must have a minimum of 3 characters."
      );
      return;
    }
    if (password.length < 3) {
      this.showAttentionModal(
        "Your password must have a minimum of 3 characters."
      );
      return;
    }

    let response: ServerResponse;

    try {
      response = (await this.api.sendLoginRequset(
        username,
        password
      )) as unknown as ServerResponse;
      console.log("Server response:", response);
      this.checkServerResponse(response.statusCode, username, password);
    } catch (error) {
      console.error("Error while initializing:", error);
    }
  }

  saveSession(username: string, password: string) {
    setCookie(
      "loginSession",
      JSON.stringify({
        userName: username,
        password: password,
      }),
      2100
    );
  }

  checkServerResponse(statusCode: number, username: string, password: string) {
    if (statusCode === 1) {
      this.saveSession(username, password);
      this.startGame();
    }
    if (statusCode === 2) {
      this.showAttentionModal(
        "We're sorry, but that username is already in use. Please choose a different username"
      );
    }
    if (statusCode === 0) {
      this.showAttentionModal("Username or Password is Incorrect");
    }
  }

  async sendRegistrationRequest(username: string, password: string) {
    //Check Validation
    if (username.length < 3) {
      this.showAttentionModal(
        "Your Username must have a minimum of 3 characters."
      );
      return;
    }
    if (password.length < 3) {
      this.showAttentionModal(
        "Your password must have a minimum of 3 characters."
      );
      return;
    }

    let response: ServerResponse;

    try {
      response = (await this.api.sendRegistrationRequest(
        username,
        password
      )) as unknown as ServerResponse;
      console.log("Server response:", response);
      this.checkServerResponse(response.statusCode, username, password);
    } catch (error) {
      console.error("Error while initializing:", error);
    }
  }

  startGame() {
    this.scene.scene.start(this.startSceneName);
  }

  addRegAndLogTitles() {
    //Log Title
    this.scene.add.text(
      this.scene.game.canvas.width / 2 +
        //@ts-ignore
        config[this.screenSize].loginTitle.position.x, //@ts-ignore
      config[this.screenSize].loginTitle.position.y,
      "Login",
      {
        //@ts-ignore
        fontSize: config[this.screenSize].loginTitle.fontSize + "px",
        color: "#D98423",
        align: "center",
        fontFamily: "mainFont",
      }
    );

    //Reg Title
    this.scene.add.text(
      this.scene.game.canvas.width / 2 +
        //@ts-ignore
        config[this.screenSize].regTitle.position.x, //@ts-ignore
      config[this.screenSize].regTitle.position.y,
      "Registration",
      {
        //@ts-ignore
        fontSize: config[this.screenSize].regTitle.fontSize + "px",
        color: "#D98423",
        align: "center",
        fontFamily: "mainFont",
      }
    );
  }

  addBackgroundColor() {
    this.scene.add
      .image(0, 0, "white")
      .setOrigin(0)
      .setDisplaySize(
        this.scene.game.canvas.width,
        this.scene.game.canvas.height
      )
      .setTint(0xfaeccf);
  }

  addTitle() {
    this.scene.add
      .text(
        this.scene.game.canvas.width / 2,
        //@ts-ignore
        config[this.screenSize].title.positions.y,
        //@ts-ignore
        config[this.screenSize].title.text,
        {
          fontFamily: "mainFont",
          color: "#D98423",
          align: "center",
          //@ts-ignore
          fontSize: config[this.screenSize].title.fontSize,
        }
      )
      .setOrigin(0.5);
  }

  addCenterLine() {
    this.scene.add
      .image(
        this.scene.game.canvas.width / 2, //@ts-ignore
        config[this.screenSize].centerLine.y,
        "white"
      )
      .setOrigin(0.5, 0)
      .setDisplaySize(
        //@ts-ignore
        config[this.screenSize].centerLine.width,
        //@ts-ignore
        config[this.screenSize].centerLine.height
      )
      .setTint(0x382209);
  }
}
