import React, { useEffect, useRef } from "react";
import Phaser from "phaser";
import { Preload } from "./scenes/preload";
import { GamePlay } from "./scenes/gamePlay";

import style from "./style.module.css";
import { GameMenu } from "./ui/menu/gameMenu";

import "pathseg";
import "./helper/WebFontLoader";
import { StartScene } from "./scenes/start";
import { Menu } from "./scenes/menu";
import { Boot } from "./scenes/boot";

export const TbilisiBatumi: React.FC = () => {
  const canvasContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasContainer.current) return;

    const game = new Phaser.Game({
      dom: { createContainer: true },
      physics: {
        default: "matter",
        matter: {
          debug: false,
          gravity: {
            y: 0.27,
          },
        },
      },
      parent: canvasContainer.current,
      type: Phaser.AUTO,
      width: window.innerWidth + 10,
      height: window.innerHeight + 10,
      backgroundColor: 0x19053b,
      scene: [StartScene, Boot, Menu, Preload, GamePlay, GameMenu],
    });

    return () => game.destroy(true, false);
  }, []);

  return (
    <div className={style.game}>
      <div ref={canvasContainer} className={style.canvas}></div>;
    </div>
  );
};
