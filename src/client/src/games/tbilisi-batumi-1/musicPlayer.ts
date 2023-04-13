import { getRandomFloat } from "./helper/tatukaMath";
import { GamePlay } from "./scenes/gamePlay";

const radio_number = 1;

export default class MusicPlayer {
  scene!: Phaser.Scene;

  georgianRadio: Array<Phaser.Sound.BaseSound> = [];
  americanRockRadio: Array<Phaser.Sound.BaseSound> = [];

  songIndex!: number;
  radioIndex: number = 0;
  radios!: [Phaser.Sound.BaseSound[]];

  obstical_songs: Array<Phaser.Sound.BaseSound> = [];

  constructor(scene: Phaser.Scene) {
    this.scene = scene;

    this.radioIndex = Math.floor(getRandomFloat(0, radio_number));

    this.init();
  }

  init() {
    this.addSongs();
    this.addRadios();
    this.playSong();
  }

  stopRadio() {
    this.radios[this.radioIndex].forEach((song) => {
      song.stop();
    });
  }

  addRadios() {
    this.radios = [this.georgianRadio];
  }

  addSongs() {
    //Georgian Radio
    const mtawmindaSong = this.scene.sound.add("mtawmindaSong", {
      volume: 0.1,
    });
    mtawmindaSong.on("complete", () => {
      this.nextSong();
    });

    //Obsticales Songs
    const rock_1 = this.scene.sound.add("rock-1", { volume: 0.5 });
    rock_1.on("complete", () => {
      rock_1.play();
    });
    this.obstical_songs.push(rock_1);

    this.georgianRadio.push(mtawmindaSong);
  }

  playObstacleSong(index: number) {
    if (this.obstical_songs[index].isPlaying === false) {
      this.obstical_songs[index].play();
    }
  }

  playSong() {
    const index = Math.floor(
      getRandomFloat(0, this.radios[this.radioIndex].length - 1)
    );
    this.radios[this.radioIndex][index].play();

    this.songIndex = index;
  }

  nextSong() {
    if (this.radios.length - 1 >= this.songIndex + 1) {
      this.songIndex += 1;
    } else {
      this.songIndex = 0;
    }

    this.radios[this.radioIndex][this.songIndex].play();
  }

  changeRadioToUp() {
    if (this.radioIndex + 1 > radio_number) {
      this.radioIndex += 1;
      this.playSong();
    }
  }

  changeRadioToDown() {
    if (this.radioIndex > 0) {
      this.radioIndex -= 1;
      this.playSong();
    } else {
      if (this.radioIndex + 1 > radio_number) {
        this.radioIndex = radio_number;
        this.playSong();
      }
    }
  }
}
