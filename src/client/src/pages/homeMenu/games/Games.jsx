import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import style from "./games.module.css";
import LatestGame from "./latestGame/LatestGame";
import MiniGames from "./miniGames/MiniGames";

import Transition from "../../../components/Transition";
import { HomeMenu } from "../HomeMenu";

const Games = (props) => {
  const [gamesState, setGamesState] = useState("latest");

  const [miniGamesClass, setMiniGamesClass] = useState("");
  const [latestGamesClass, setLatestGamesClass] = useState("select-item");
  const [artGamesClass, setArtGamesClass] = useState("");

  const [showLatestGame, setShowLatestGame] = useState("showLatestGame");
  const [showMiniGames, setShowMiniGames] = useState("");

  const [headZoneClass, setHeadZoneClass] = useState("");

  useEffect(() => {
    if (gamesState === "latest") {
      setLatestGamesClass("select-item");
      setShowLatestGame("showLatestGame");
      setHeadZoneClass("");
      setShowMiniGames("");

      setMiniGamesClass("");
    }
    if (gamesState === "mini") {
      setLatestGamesClass("");
      setShowLatestGame("");
      setShowMiniGames("showMiniGames");

      setMiniGamesClass("select-item");
    }
    if (gamesState === "personal") {
      setLatestGamesClass("");
      setShowLatestGame("");
      setHeadZoneClass("hideHeadZone");
    }
  }, [gamesState]);

  const [transitionAnimationState, setTransitionAnimationState] = useState("");

  return (
    <div className={style.games}>
      <div className={style.headZone + " " + style[headZoneClass]}>
        <h2
          className={style.headZoneItem + " " + style[miniGamesClass]}
          onClick={() => {
            setGamesState("mini");
          }}
        >
          {" "}
          Mini Games{" "}
        </h2>
        <h2
          className={style.headZoneItem + " " + style[latestGamesClass]}
          onClick={() => {
            setGamesState("latest");
          }}
        >
          {" "}
          Latest Game{" "}
        </h2>
        <h2 className={style.headZoneItem + " " + style[artGamesClass]}>
          {" "}
          Art Games{" "}
        </h2>
      </div>
      <div className={style.latestGame + " " + style[showLatestGame]}>
        <LatestGame />
      </div>
      <div className={style.miniGames + " " + style[showMiniGames]}>
        <MiniGames />
      </div>
      {gamesState === "latest" && (
        <button
          onClick={() => {
            setTransitionAnimationState("Play");
            setTimeout(() => {
              setGamesState("personal");
            }, 600);
          }}
          className={style.personalButton}
        >
          Home
        </button>
      )}
      {gamesState === "personal" && (
        <HomeMenu
          setIsLogin={props.setIsLogin}
          isLogin={props.isLogin}
          setGamesState={setGamesState}
        />
      )}

      <Transition
        setAnimationState={setTransitionAnimationState}
        animationState={transitionAnimationState}
      />
    </div>
  );
};

export default Games;
