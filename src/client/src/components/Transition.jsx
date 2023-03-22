import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import style from './transition.module.css';


const Transition = ( props ) => {

    const animationDelay = 800;

    const [topPartAnimationState, setTopPartAnimationState] = useState("")
    const [bottomPartAnimationState, setBottomPartAnimationState] = useState("")

    useEffect( () => {
      if(props.animationState === "Play") showAnimation();
      if(props.animationState === "Stop") hideAnimation();

    }, [props.animationState])

    const showAnimation = () => {
        setTopPartAnimationState("toBottom")
        setBottomPartAnimationState("toTop")

        setTimeout( () => {
          props.setAnimationState("")
          hideAnimation();
        },animationDelay)
    }

    const hideAnimation = () => {
        setTopPartAnimationState(" ")
        setBottomPartAnimationState(" ")
    }


  return (
    <div className={style.transition}>
        <div className={style.part_1 + " " + style[topPartAnimationState]}></div>
        <div className={style.part_2 + " " + style[bottomPartAnimationState]}></div>
    </div>
  )
}

export default Transition