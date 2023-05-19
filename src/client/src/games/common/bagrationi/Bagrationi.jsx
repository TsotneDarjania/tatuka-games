import React, { useEffect, useRef } from "react";
import Phaser from "phaser";
import style from "./style.module.css";
import "pathseg";
import "./helper/WebFontLoader";
import { GamePlay } from "./scenes/gamePlay";
import Preload from "./scenes/preload";
import { CameraMovement } from "./scenes/cameraMovement";


export const Bagrationi  = () => {
  const canvasContainer = useRef(null);

  useEffect(() => {
    if (!canvasContainer.current) return;
    const game = new Phaser.Game({
      dom: { createContainer: true },
      physics: {
        default: "matter",
        matter: {
          debug: true,
          gravity: {
            y: 0.27,
          },
        },
      },
      parent: canvasContainer.current,
      type: Phaser.AUTO,
      scale:{
        width:1200,
        height:800,
        autoCenter:Phaser.Scale.CENTER_BOTH
      },
      backgroundColor: 0x19053b,
      scene: [Preload,GamePlay],
    });

    return () => game.destroy(true, false);
  }, []);

  return (
      <div ref={canvasContainer} className={style.canvas}></div>
  );
};
