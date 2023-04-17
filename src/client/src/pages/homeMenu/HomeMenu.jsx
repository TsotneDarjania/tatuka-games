import React, { useEffect, useState } from "react";

import style from "./homeMenu.module.css";
import Games from "./games/Games";
import LatestGame from "./games/latestGame/LatestGame";

export const HomeMenu = () => {
  return (
    <div className={style.homeMenu}>
      <LatestGame />
    </div>
  );
};
