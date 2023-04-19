import React, { useEffect } from "react";
import { useState } from "react";

import LoginAndRegistrationForm from "./components/loginAndRegistrationForm/LoginAndRegistrationForm";
import style from "./homePage.module.css";
import HomePageInterface from "./components/homePagelnterface/HomePageInterface";

const HomePage = ({ setRequestedPage, setTransitionPlayAnimation }) => {
  return (
    <div className={style.homePage}>
      {1 === 2 ? <LoginAndRegistrationForm /> : <HomePageInterface />}
      <button
        onClick={() => {
          setTransitionPlayAnimation(true);
          setRequestedPage("homeMenu");
        }}
        type="button"
        className={style.backButton}
      >
        Back
      </button>
    </div>
  );
};

export default HomePage;
