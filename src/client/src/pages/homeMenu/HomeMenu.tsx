import React, { useEffect, useState } from "react";

import style from "./homeMenu.module.css";
import Transition from "../../components/Transition";
import { Intro } from "../intro/Intro";
import Games from "./games/Games";
import { deleteCookies, getCookie } from "../../helper/cookie";

export const HomeMenu: React.FC = () => {
  const [componentState, setComponentState] = useState("intro");

  const [loading, setLoading] = useState(false);

  const [isLogin, setIsLogin] = useState(false);

  const [transitionAnimationState, setTransitionAnimationState] = useState("");

  useEffect(() => {
    // checkIfLogin();
  }, []);

  const checkIfLogin = () => {
    if (getCookie("loginSession") !== "") {
      const userName = JSON.parse(getCookie("loginSession")).userName;
      const userPassword = JSON.parse(getCookie("loginSession")).password;

      fetch("http://localhost:3000/user-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // We convert the React state to JSON and send it as the POST body
        body: JSON.stringify({
          userName: userName,
          userPassword: userPassword,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          data.statusCode === 1 && setIsLogin(true);
          data.statusCode === 0 && deleteCookies();
          setLoading(false);
        });
    } else {
      deleteCookies();
      setLoading(false);
    }
  };

  return (
    <div className={style.homePage}>
      {loading === false && (
        <>
          {componentState === "intro" && (
            <Intro
              isLogin={isLogin}
              setComponentState={setComponentState}
              setTransitionAnimationState={setTransitionAnimationState}
            />
          )}
          {componentState === "games" && (
            <Games setIsLogin={setIsLogin} isLogin={isLogin} />
          )}
        </>
      )}

      <Transition
        setAnimationState={setTransitionAnimationState}
        animationState={transitionAnimationState}
      />
    </div>
  );
};
