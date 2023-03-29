import React from 'react'
import style from "./warning.module.css"

const Warning = (props) => {
  return (
    <div className={style.warning}>
        <div className={style.shadow}></div>
        <div className={style.content}>
            <h3 className={style.title}> Warning </h3>
            <p className={style.text}> {props.text} </p>
        </div>
        <button onClick={ () => {
            props.okState(false)
        }} className={style.okButton}> Ok </button>
    </div>
  )
}

export default Warning