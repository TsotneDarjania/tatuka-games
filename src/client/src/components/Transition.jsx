import React from "react";
import { useEffect, useState } from "react";
import style from "./transition.module.css";

const TransitionAnimation = ({
  isTransitionPlayAnimation,
  setTransitionPlayAnimation,
  transitionAnimationAction,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const animationTime = 0.8;
  const loadTime = 600;

  useEffect(() => {
    if (isTransitionPlayAnimation) {
      playAnimation();
    }
  }, [isTransitionPlayAnimation]);

  const [positions, setPositions] = useState({
    top: -50,
    bottom: -50,
  });

  const playAnimation = () => {
    setIsOpen(true);
    //Show
    setPositions({
      top: 0,
      bottom: 0,
    });
  };

  return (
    <div
      onTransitionEnd={(div) => {
        if (isOpen) {
          if (div.target.style.top != "0vh") return;
          transitionAnimationAction();
          setTimeout(() => {
            //Hide
            setPositions({
              top: -50,
              bottom: -50,
            });
            setIsOpen(false);
            return;
          }, loadTime);
        } else {
          //for Only once
          if (div.target.style.top != "-50vh") return;
          setTransitionPlayAnimation(false);
          return;
        }
      }}
      className={style.transition}
    >
      <div
        style={{
          top: positions.top + "vh",
          transition: animationTime / 2 + "s",
        }}
      ></div>
      <div
        style={{
          bottom: positions.bottom + "vh",
          transition: animationTime / 2 + "s",
        }}
      ></div>
    </div>
  );
};

export default TransitionAnimation;
