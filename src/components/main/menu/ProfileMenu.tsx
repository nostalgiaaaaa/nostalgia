import * as React from "react";
import { useState } from "react";

const ProfileMenu = () => {
  const [hoverState, setHoverState] = useState(false);

  const mouseOver = () => {
    setHoverState(true);
  };
  const mouseOut = () => {
    setHoverState(false);
  };

  return (
    <>
      <div
        className={hoverState ? "profile-menu-active" : "profile-menu"}
        onMouseOver={mouseOver}
        onMouseOut={mouseOut}
      ></div>
      <div
        className={"left-hover-box"}
        onMouseOver={mouseOver}
        onMouseOut={mouseOut}
      ></div>
    </>
  );
};

export default ProfileMenu;
