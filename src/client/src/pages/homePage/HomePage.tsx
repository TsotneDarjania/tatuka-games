import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

import style from './homePage.module.css';
import { Home } from './scenes/home';
import Transition from '../../components/Transition';
import { useState } from 'react';
import { Intro } from './intro/Intro';
import Games from './games/Games';

export const HomePage: React.FC = () => {

  const canvasContainer = useRef<HTMLDivElement>(null);
  const [componentState, setComponentState] = useState("intro")

  const [ transitionAnimationState, setTransitionAnimationState] = useState("")


  return(
    <div className={style.homePage}>

      {
        componentState === "intro" && <Intro setComponentState={setComponentState} setTransitionAnimationState={setTransitionAnimationState} />
      }
      {
        componentState === "games" && <Games />
      }


      <Transition setAnimationState={setTransitionAnimationState} animationState={transitionAnimationState} />
    </div>
  )
};