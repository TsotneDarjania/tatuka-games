import Phaser from 'phaser'


export class Preload extends Phaser.Scene {
	constructor() {
		super('Preload')
	}

	preload() {
		
		
		this.load.setPath(`${process.env.PUBLIC_URL}/assets`);

		//Angel
		this.load.image("angelHead","angel/head.png")

		//Menu
		this.load.image("speedometer",`menu/gamePlay/dsa.png`)

		// Car
		this.load.svg("carBody",`car/body.svg`)
		this.load.svg("carTire",`car/tire.svg`)
		this.load.svg("carBag",`car/bag.svg`)
		this.load.svg("carBoy",`car/boy.svg`)

        this.load.json('carMeshe', `car/car.json`);

		//tbilisi builds
		this.load.image("tbilisi-build-1", `tbilisi/tbilisi-build-1.png`);
		this.load.image("tbilisi-build-2", `tbilisi/tbilisi-build-2.png`);
		this.load.image("tbilisi-build-3", `tbilisi/tbilisi-build-3.png`);
		this.load.image("tbilisi-build-4", `tbilisi/tbilisi-build-4.png`);
		this.load.image("tbilisi-build-5", `tbilisi/build-5.png`);
		this.load.image("tbilisi-build-6", `tbilisi/build-6.png`);
		this.load.image("tbilisi-build-7", `tbilisi/build-7.png`);
		this.load.image("tbilisi-build-8", `tbilisi/build-8.png`);
		this.load.image("tbilisi-build-9", `tbilisi/build-9.png`);
		this.load.image("tbilisi-build-10", `tbilisi/build-10.png`);
		this.load.image("tbilisi-build-11", `tbilisi/build-11.png`);
	}

	create() {
		this.scene.start("GamePlay")
	}
}