import React, { useEffect } from 'react'
import { useState} from 'react'
import Transition from '../../../../components/Transition'
import { getCookie } from '../../../../helper/cookie'
import PersonalInterface from './components/personalInterface/PersonalInterface'
import LoginAndRegistrationForm from './LoginAndRegistrationForm'
import style from "./personal.module.css"

const Personal = (props) => {

    const [transitionAnimationState,setTransitionAnimationState] = useState("")
    
  return (
    <div className={style.personal}>
        { props.isLogin === false ?
          <LoginAndRegistrationForm setIsLogin={props.setIsLogin} /> 
          :
          <PersonalInterface setIsLogin={props.setIsLogin} />
        }
        
        <button onClick={ () => {
            setTransitionAnimationState("Play")
            setTimeout(() => {
                props.setGamesState("latest")
            }, 800);
        }} type='button' className={style.backButton}> Back </button>

        <Transition setAnimationState={setTransitionAnimationState} animationState={transitionAnimationState} />
    </div>
  )
}

export default Personal