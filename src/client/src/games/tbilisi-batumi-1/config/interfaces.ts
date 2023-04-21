export interface Responsivedata {
  extraWidth: {
    canvas: {
      width: number;
      height: number;
    };
    menu: {
      touchScreenText: {
        text: Array<string>;
        fontSize: number;
      };
      plug: {
        positions: {
          x: number;
          y: number;
        };
        scale: {
          width: number;
          height: number;
        };
      };
      playButton: {
        positions: {
          x: number;
          y: number;
        };
        scale: number;
      };
      playText: {
        fontSize: number;
      };
      informationButton: {
        positions: {
          x: number;
          y: number;
        };
        scale: number;
      };
      informationText: {
        fontSize: number;
        padding: number;
      };
    };
  };
}
