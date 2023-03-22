import React from 'react'

import style from "./latestGame.module.css"

import latestGameVideo from "../../videos/1.mp4"

const LatestGame = () => {
  return (
     <div className={style.latestGameContainer}>
        <div className={style.latestGameContainerBackgroundImage}></div>
        <div className={style.leftContainer}>
          <div className={style.leftContainerBackground}> </div>
          <div className={style.leftContainerInsideBox}>
              <div> <h3> <span> Name : </span> "Batumisken" </h3></div>
              <div> <h3> <span> Publish Date : </span> : 3/21/2023 </h3></div>
              <div> 
                  <h3>
                    <span> Short Description : </span> 
                    asdjasdi iuashdiasud aisudhd iausdhaisudhasd iaudhiwud
                    asduhasidu qwiudh iudhu iudhwiudhqwd iudhisu isudh iausdhaisudhasd
                    asuihd isudhasiduhasidu aisudhs iasuhdaisudh
                  </h3>
                </div>
          </div>
          <button className={style.playButton}> Play </button>
        </div>
        <div className={style.rightContainer}>
          <video className={style.lastGameVideo} loop autoPlay>
            <source src={latestGameVideo} type="video/mp4" />
          </video>
        </div>
      </div>
  )
}

export default LatestGame