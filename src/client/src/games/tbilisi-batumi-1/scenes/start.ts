import { RegistrationModal } from "../../common/registrationModal";
import { API } from "../api";

interface initResponse {
  statusCode: number;
  statusMessage: string;
}

export class StartScene extends Phaser.Scene {
  initResponse!: any;
  api!: API;

  constructor() {
    super("Start");
    this.initResponse = null;
  }

  preload() {
    this.load.setPath(`${process.env.PUBLIC_URL}/assets`);

    this.load.webFont(
      "mainFont",
      "https://db.onlinewebfonts.com/t/309c1296f24c92c0a68d76e6d77d7d58.woff2"
    );

    //registrationModal
    this.load.image("white", "common/images/white.png");
  }

  create() {
    this.api = new API();
    this.initialization();
  }

  async initialization() {
    try {
      this.initResponse = await this.api.init();
      console.log("Init response:", this.initResponse);
      this.checkSession();
    } catch (error) {
      console.error("Error while initializing:", error);
    }
  }

  checkSession() {
    if (this.initResponse.statusCode === 1) {
      this.startGame();
    }
    if (this.initResponse.statusCode === 0) {
      this.showLoginModal();
    }
  }

  showLoginModal() {
    const modal = new RegistrationModal(this, 0, 0, "Preload");
  }

  startGame() {
    this.scene.start("Boot");
  }
}
