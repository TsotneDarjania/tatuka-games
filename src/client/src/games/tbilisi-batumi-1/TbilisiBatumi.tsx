import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { Preload } from './scenes/preload';
import { GamePlay } from './scenes/gamePlay';

//@ts-ignore
import style from './style.module.css';


export const TbilisiBatumi: React.FC = () => {

    const canvas = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (canvas.current) {
        const game = new Phaser.Game({
            physics: {
                default: 'matter',
                matter: {
                    debug: true,
                    gravity: {
                        y: 0.5
                    },
                }
            },
            parent: canvas.current,
            type: Phaser.AUTO,
            width: 1600,
            height: 900,
            backgroundColor: '#19053B',
            scene: [Preload, GamePlay]
        });
    }
  }, []);

  return(
    <div className={style.game}>
        <div ref={canvas} className={style.canvas}></div>;
    </div>
  )
};