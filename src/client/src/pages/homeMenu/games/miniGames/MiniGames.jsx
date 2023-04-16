import React from 'react'
import GameContainer from './components/gameContainer'

import style from "./miniGames.module.css"

const MiniGames = () => {
  return (
    <div className={style.miniGames}>
        <GameContainer />
        <GameContainer />
        <GameContainer />
        <GameContainer />
        <GameContainer />
    </div>
  )
}

export default MiniGames