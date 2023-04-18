import React, { useEffect } from "react";
import { useState } from "react";
import PersonalInterface from "./components/homePagelnterface/HomePageInterface";
import LoginAndRegistrationForm from "./components/loginAndRegistrationForm/LoginAndRegistrationForm";
import style from "./homePage.module.css";

const HomePage = ({ setRequestedPage, setTransitionPlayAnimation }) => {
  return (
    <div className={style.personal}>
      {1 === 1 ? <LoginAndRegistrationForm /> : <PersonalInterface />}
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
