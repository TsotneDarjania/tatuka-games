import React, { useEffect, useState } from "react";
import style from "./homePageInterface.module.css";

import image from "./user.png";
import { deleteCookies, getCookie } from "../../../../helper/cookie";

const PersonalInterface = (props) => {
  const [userName, setUserName] = useState(
    JSON.parse(getCookie("loginSession")).userName
  );
  console.log(userName);

  useEffect(() => {
    console.log(userName);

    console.log(JSON.parse(getCookie("loginSession")));
    console.log(JSON.parse(getCookie("loginSession")).userName);
  }, []);

  return (
    <div className={style.personalInterface}>
      <div className={style.content}>
        <div className={style.contentBox}>
          <img className={style.userAvatarImage} src={image}></img>
          <div className={style.userFeatures}>
            <p className={style.userName}> {userName} </p>
            <p className={style.userName}> Save Device : Yes </p>
            <button
              onClick={() => {
                props.setIsLogin(false);
                deleteCookies();
              }}
              className={style.logOut}
            >
              {" "}
              Log Out{" "}
            </button>
            <button className={style.logOut}> Settings </button>
          </div>
        </div>
        <div className={style.contentBox}>
          <div className={style.lastGameBackground}></div>
          <div className={style.latestGameContent}>
            <button className={style.continueButton}> Continue </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInterface;
