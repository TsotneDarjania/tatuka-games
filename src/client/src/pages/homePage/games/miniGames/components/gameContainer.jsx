import React from 'react'

import {AiFillLike} from "react-icons/ai"
import {FaCommentAlt} from "react-icons/fa"

import style from "./gameContainer.module.css"

const GameContainer = () => {
  return (
    <div className={style.gameContainer}>
        <div className={style.gameBackgroundImage + " " + style["miniGameBackgroundImage-1"]}></div>
        <button className={style.openButton}> Open </button>
        <p className={style.name}> "aisdjoasidj" </p>
        <p className={style.shortDescription}> 
            asiudhasiud asiudhasd asiudhasd
            asiud aisudhqiwudqwd iquwdh iudwd wudhqiud qiwudhwiud diwuw wuwd w wdwd dwd 
            wdiuqwdh qiwudhqiwudhqiwduhqd qdwuhd iudhwiqudhqd iwuw wudhwd iuwhdiuwhdiqwuh
            qiwudhqiwud qiduqwiduhd diuwhdw wiudh diuwhdwqdqwuidhd q,dwoasidad
        </p>
        <div className={style.likeIcon}> <AiFillLike /> </div>
        <div className={style.likeNumber}> 0 </div>
        <div className={style.deslikeIcon}> <AiFillLike /> </div>
        <div className={style.deslikeNumber}> 0 </div>
        <div className={style.commentIcon}> <FaCommentAlt /> </div>
    </div>
  )
}

export default GameContainer