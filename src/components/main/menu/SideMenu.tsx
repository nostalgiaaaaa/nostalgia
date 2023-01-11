import * as React from "react";
import { useEffect, useState } from "react";
import malonImage from "style/PostMalone.jpg";
import roseImage from "style/Rose.jpg";
import btsImage from "style/Bts.jpg";
import ChrisImage from "style/Chris.jpg";
import { Link } from "react-router-dom";

interface Menu {
  name: string;
  imageUrl: string;
  link: string;
}

const SideMenu = (props: { image: string; setImage: any }) => {
  const [hoverState, setHoverState] = useState(false);
  const [wheelState, setWheelState] = useState(0);
  const [image, setImage] = useState(props.image);

  let menu: Menu[] = [
    { name: "Post Malon", imageUrl: malonImage, link: "/main/postmalone" },
    { name: "Rose", imageUrl: roseImage, link: "/main/rose" },
    { name: "BTS", imageUrl: btsImage, link: "/main/bts" },
    { name: "Chris", imageUrl: ChrisImage, link: "/main/chris" },
  ];

  function scrollRotate(e: any) {
    if (e.deltaY > 0) {
      setWheelState(wheelState + 90);
    } else {
      setWheelState(wheelState - 90);
    }
  }

  useEffect(() => {
    let cricle = document.getElementById("side-menu") as HTMLElement;
    cricle.style.transform = "rotate(" + wheelState + "deg)";
  }, [wheelState]);

  const mouseOver = () => {
    setHoverState(true);
  };
  const mouseOut = () => {
    setHoverState(false);
  };

  const menuList = menu.map((menu, idx) => (
    <Link
      to={menu.link}
      className="each-side-menu"
      key={menu.name}
      id={"menu" + idx}
      onClick={() => props.setImage(menu.imageUrl)}
    >
      <div></div>
      <img src={menu.imageUrl} alt={menu.name}></img>
    </Link>
  ));

  return (
    <>
      <div
        className={hoverState ? "side-menu-active" : "side-menu"}
        onMouseOver={mouseOver}
        onMouseOut={mouseOut}
        onWheel={scrollRotate}
      >
        <div className="side-menu-center">
          <p>Image Editor</p>
        </div>
        <div id="side-menu">{menuList}</div>
      </div>
      <div
        className={"right-hover-box"}
        onMouseOver={mouseOver}
        onMouseOut={mouseOut}
      ></div>
    </>
  );
};

export default SideMenu;
