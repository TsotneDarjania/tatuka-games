import React, { useEffect } from "react";
import { useState } from "react";
import Transition from "../../components/Transition";
import PersonalInterface from "./components/homePagelnterface/HomePageInterface";
import LoginAndRegistrationForm from "./components/loginAndRegistrationForm/LoginAndRegistrationForm";
import style from "./homePage.module.css";

const HomePage = (props) => {
  const [transitionAnimationState, setTransitionAnimationState] = useState("");

  return (
    <div className={style.personal}>
      {props.isLogin === false ? (
        <LoginAndRegistrationForm setIsLogin={props.setIsLogin} />
      ) : (
        <PersonalInterface setIsLogin={props.setIsLogin} />
      )}

      <button
        onClick={() => {
          setTransitionAnimationState("Play");
          setTimeout(() => {
            props.setGamesState("latest");
          }, 800);
        }}
        type="button"
        className={style.backButton}
      >
        {" "}
        Back{" "}
      </button>

      <Transition
        setAnimationState={setTransitionAnimationState}
        animationState={transitionAnimationState}
      />
    </div>
  );
};

export default HomePage;
