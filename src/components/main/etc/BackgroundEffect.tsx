import { useState } from "react";

interface Props {
  play: boolean;
}
const BackgroundEffect = (props: Props) => {
  const image = window.sessionStorage.getItem("image");
  const [inWidth, setInWidth] = useState(window.innerWidth);
  const [inHeight, setInHeight] = useState(window.innerHeight);
  window.addEventListener(
    "resize",
    () => {
      setInWidth(window.innerWidth);
      setInHeight(window.innerHeight);
    },
    false
  );

  // document.addEventListener("mousemove", (e) => {
  //   if (props.play) {
  //     const mouseX = ((e.clientX - inWidth / 2) * 5) / inWidth;
  //     const mouseY = ((e.clientY - inHeight / 2) * 5) / inHeight;

  //     // let piece = document.getElementById("piece-1") as HTMLElement;

  //     (
  //       document.getElementById("piece-1") as HTMLElement
  //     ).style.transform = `rotateX(${-mouseY}deg) rotateY(${mouseX}deg)`;
  //     (
  //       document.getElementById("piece-2") as HTMLElement
  //     ).style.transform = `rotateX(${-mouseY}deg) rotateY(${mouseX}deg)`;
  //     (
  //       document.getElementById("piece-3") as HTMLElement
  //     ).style.transform = `rotateX(${-mouseY}deg) rotateY(${mouseX}deg)`;
  //     (
  //       document.getElementById("piece-4") as HTMLElement
  //     ).style.transform = `rotateX(${-mouseY}deg) rotateY(${mouseX}deg)`;
  //     (
  //       document.getElementById("piece-5") as HTMLElement
  //     ).style.transform = `rotateX(${-mouseY}deg) rotateY(${mouseX}deg)`;
  //     (
  //       document.getElementById("piece-6") as HTMLElement
  //     ).style.transform = `rotateX(${-mouseY}deg) rotateY(${mouseX}deg)`;
  //     (
  //       document.getElementById("piece-7") as HTMLElement
  //     ).style.transform = `rotateX(${-mouseY}deg) rotateY(${mouseX}deg)`;
  //     (
  //       document.getElementById("piece-8") as HTMLElement
  //     ).style.transform = `rotateX(${-mouseY}deg) rotateY(${mouseX}deg)`;
  //     (
  //       document.getElementById("piece-9") as HTMLElement
  //     ).style.transform = `rotateX(${-mouseY}deg) rotateY(${mouseX}deg)`;
  //     (
  //       document.getElementById("piece-10") as HTMLElement
  //     ).style.transform = `rotateX(${-mouseY}deg) rotateY(${mouseX}deg)`;
  //     console.log(mouseX, mouseY);
  //   }
  // });

  return (
    <div className="background-wrap">
      <div
        className={`background-piece-1 ${props.play ? "play-background " : ""}`}
      >
        <div
          id="piece-1"
          className="piece-conts"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: `auto ${inHeight}px`,
          }}
        ></div>
      </div>
      <div
        className={`background-piece-2 ${props.play ? "play-background " : ""}`}
      >
        <div
          id="piece-2"
          className="piece-conts"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: `auto ${inHeight}px`,
            backgroundPosition: `-${inWidth * 0.4}px 0px`,
          }}
        ></div>
      </div>
      <div
        className={`background-piece-3 ${props.play ? "play-background " : ""}`}
      >
        <div
          id="piece-3"
          className="piece-conts"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: `auto ${inHeight}px`,
            backgroundPosition: `-${inWidth * 0.9}px 0px`,
          }}
        ></div>
      </div>
      <div
        className={`background-piece-7 ${props.play ? "play-background " : ""}`}
      >
        <div
          id="piece-7"
          className="piece-conts"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: `auto ${inHeight}px`,
            backgroundPosition: `-${inWidth * 0.3}px -${inHeight * 0.5}px`,
          }}
        ></div>
      </div>
      <div
        className={`background-piece-4 ${props.play ? "play-background " : ""}`}
      >
        <div
          id="piece-4"
          className="piece-conts"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: `auto ${inHeight}px`,
            backgroundPosition: `0px -${inHeight * 0.5}px`,
          }}
        ></div>
      </div>
      <div
        className={`background-piece-6 ${props.play ? "play-background " : ""}`}
      >
        <div
          id="piece-6"
          className="piece-conts"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: `auto ${inHeight}px`,
            backgroundPosition: `-${inWidth * 0.7}px -${inHeight * 0.15}px`,
          }}
        ></div>
      </div>
      <div
        className={`background-piece-5 ${props.play ? "play-background " : ""}`}
      >
        <div
          id="piece-5"
          className="piece-conts"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: `auto ${inHeight}px`,
            backgroundPosition: `-${inWidth * 0.4}px -${inHeight * 0.15}px`,
          }}
        ></div>
      </div>{" "}
      <div
        className={`background-piece-9 ${props.play ? "play-background " : ""}`}
      >
        <div
          id="piece-9"
          className="piece-conts"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: `auto ${inHeight}px`,
            backgroundPosition: `-${inWidth * 0.6}px -${inHeight * 0.5}px`,
          }}
        ></div>
      </div>
      <div
        className={`background-piece-8 ${props.play ? "play-background " : ""}`}
      >
        <div
          id="piece-8"
          className="piece-conts"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: `auto ${inHeight}px`,
            backgroundPosition: `-${inWidth * 0.3}px -${inHeight * 0.8}px`,
          }}
        ></div>
      </div>
      <div
        className={`background-piece-10 ${
          props.play ? "play-background " : ""
        }`}
      >
        <div
          id="piece-10"
          className="piece-conts"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: `auto ${inHeight}px`,
            backgroundPosition: `-${inWidth * 0.9}px -${inHeight * 0.7}px`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default BackgroundEffect;
