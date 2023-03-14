import Phaser from 'phaser'


export class Preload extends Phaser.Scene {
	constructor() {
		super('Preload')
	}

	preload() {
        // Car
		this.load.svg("carBody",`${process.env.PUBLIC_URL}/assets/car/body.svg`)
		this.load.svg("carTire",`${process.env.PUBLIC_URL}/assets/car/tire.svg`)
		this.load.svg("carBag",`${process.env.PUBLIC_URL}/assets/car/bag.svg`)
		this.load.svg("carBoy",`${process.env.PUBLIC_URL}/assets/car/boy.svg`)

        this.load.json('carMeshe', `${process.env.PUBLIC_URL}/assets/car/car.json`);

		//tbilisi builds
		this.load.image("tbilisi-build-1", `${process.env.PUBLIC_URL}/assets/tbilisi/tbilisi-build-1.png`);
		this.load.image("tbilisi-build-2", `${process.env.PUBLIC_URL}/assets/tbilisi/tbilisi-build-2.png`);
		this.load.image("tbilisi-build-3", `${process.env.PUBLIC_URL}/assets/tbilisi/tbilisi-build-3.png`);
		this.load.image("tbilisi-build-4", `${process.env.PUBLIC_URL}/assets/tbilisi/tbilisi-build-4.png`);
		this.load.image("tbilisi-build-5", `${process.env.PUBLIC_URL}/assets/tbilisi/build-5.png`);
		this.load.image("tbilisi-build-6", `${process.env.PUBLIC_URL}/assets/tbilisi/build-6.png`);
		this.load.image("tbilisi-build-7", `${process.env.PUBLIC_URL}/assets/tbilisi/build-7.png`);
		this.load.image("tbilisi-build-8", `${process.env.PUBLIC_URL}/assets/tbilisi/build-8.png`);
	}

	create() {
		this.scene.start("GamePlay")
	}
}