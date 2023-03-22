import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

import style from "./games.module.css"
import LatestGame from './latestGame/LatestGame'
import MiniGames from './miniGames/MiniGames'


const Games = () => {

  const [gamesState, setGamesState] = useState("latest")

  const [miniGamesClass, setMiniGamesClass] = useState("")
  const [latestGamesClass, setLatestGamesClass] = useState("select-item")
  const [artGamesClass, setArtGamesClass] = useState("")

  const[showLatestGame, setShowLatestGame] = useState("showLatestGame")
  const[showMiniGames, setShowMiniGames] = useState("")

  useEffect( () => {
    if(gamesState === "latest"){
      setLatestGamesClass("select-item")
      setShowLatestGame("showLatestGame")
      setShowMiniGames("")

      setMiniGamesClass("")
    }
    if(gamesState === "mini"){
      setLatestGamesClass("")
      setShowLatestGame("")
      setShowMiniGames("showMiniGames")

      setMiniGamesClass("select-item")
    }

  },[gamesState])


  return (
    <div className={style.games}>
      <div className={style.headZone}> 
          <h2 className={style.headZoneItem + " " + style[miniGamesClass] } onClick={ () => {
            setGamesState("mini")
          }}> Mini Games </h2>
          <h2 className={style.headZoneItem + " " + style[latestGamesClass] } onClick={ () => {
            setGamesState("latest")
          }}> Latest Game </h2>
          <h2 className={style.headZoneItem + " " + style[artGamesClass] }> Art Games </h2>
      </div>
      <div className={style.latestGame + " " + style[showLatestGame] }>
        <LatestGame />
      </div>
      <div className={style.miniGames + " " + style[showMiniGames] }>
        <MiniGames />
      </div>
      

    </div>
  )
}

export default Games