import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { Preload } from './scenes/preload';
import { GamePlay } from './scenes/gamePlay';

import style from './style.module.css';
import { GamePlayMenu } from './ui/menu/gamePlayMenu';


import "pathseg"
import "./helper/WebFontLoader";
import { StartScene } from './scenes/start';
import { Menu } from './scenes/menu';

export const TbilisiBatumi: React.FC = () => {

    const canvasContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasContainer.current) return; 

        const game = new Phaser.Game({
            dom : { createContainer : true},
            physics: {
                default: 'matter',
                matter: {
                    debug: false,
                    gravity: {
                        y: 0.27
                    },
                }
            },
            parent: canvasContainer.current,
            type: Phaser.AUTO,
            width: 1600,
            height: 900,
            backgroundColor: '#19053B',
            scene: [Menu,StartScene, Preload, GamePlay,GamePlayMenu]
        });
    
        return () => {
            game.destroy(true,false)
        }
  }, [canvasContainer]);
//
  return(
    <div className={style.game}>
        <div ref={canvasContainer} className={style.canvas}></div>;
    </div>
  )
};