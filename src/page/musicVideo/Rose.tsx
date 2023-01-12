import BackgroundEffect from "components/main/etc/BackgroundEffect";
import LabelView from "components/main/etc/Labelview";
import { useEffect, useState } from "react";
import {
  boundaryLineColor,
  bwImage,
  gamma,
  grayscale,
  mirLr,
  mirTb,
  reverseImage,
} from "util/videoProcessing";

const PostMalone = () => {
  const [videoState, setVideoState] = useState(false);
  const [isShowCanvas, setisShowCanvas] = useState(false);
  let raf: number;

  useEffect(() => {
    window.cancelAnimationFrame(raf);
  });
  useEffect(() => {
    let flag = 1;
    let width = 0;
    let height = 0;
    let inWidth = 0;
    let inHeight = 0;
    let inVideoArray: string[][][] = [];
    let video = document.getElementById("video") as HTMLVideoElement;
    let c1 = document.getElementById("c1") as HTMLCanvasElement;
    let ctx1 = c1.getContext("2d");
    let c2 = document.getElementById("c2") as HTMLCanvasElement;
    let ctx2 = c2.getContext("2d");
    let c3 = document.getElementById("c3") as HTMLCanvasElement;
    let ctx3 = c3.getContext("2d");
    let c4 = document.getElementById("c4") as HTMLCanvasElement;
    let ctx4 = c4.getContext("2d");
    let c5 = document.getElementById("c5") as HTMLCanvasElement;
    let ctx5 = c5.getContext("2d");
    let c6 = document.getElementById("c6") as HTMLCanvasElement;
    let ctx6 = c6.getContext("2d");
    let c7 = document.getElementById("c7") as HTMLCanvasElement;
    let ctx7 = c7.getContext("2d");
    let c8 = document.getElementById("c8") as HTMLCanvasElement;
    let ctx8 = c8.getContext("2d");

    video.addEventListener(
      "play",
      () => {
        setVideoState(true);
        width = video.videoWidth / 2;
        height = video.videoHeight / 2;
        if (flag === 1) {
          setTimeout(function () {
            flag++;
            setisShowCanvas(true);
            computeimageData();
          }, 1000);
        } else {
          computeimageData();
        }
      },
      false
    );

    const computeimageData = () => {
      ctx1?.drawImage(video, 0, 0, width, height);
      let imageData = ctx1?.getImageData(0, 0, width, height);

      inWidth = width;
      inHeight = height;
      inVideoArray = new Array(3); // 3장짜리 배열 (R, G, B)
      for (let i = 0; i < 3; i++) {
        inVideoArray[i] = new Array(inHeight);
        for (let k = 0; k < inHeight; k++)
          inVideoArray[i][k] = new Array(inWidth);
      }

      // 출력된 캔버스에서 픽셀값 뽑기
      let R, G, B, px;
      for (let i = 0; i < inHeight; i++) {
        for (let k = 0; k < inWidth; k++) {
          px = (i * inWidth + k) * 4; // 1픽셀 = 4byte
          R = imageData?.data[px + 0] as number;
          G = imageData?.data[px + 1] as number;
          B = imageData?.data[px + 2] as number;
          // Alpha = imageData.data[px + 3];
          inVideoArray[0][i][k] = String.fromCharCode(R);
          inVideoArray[1][i][k] = String.fromCharCode(G);
          inVideoArray[2][i][k] = String.fromCharCode(B);
        }
      }
      let grayArr = grayscale(
        inHeight,
        inWidth,
        inVideoArray,
        ctx2 as CanvasRenderingContext2D,
        ctx8 as CanvasRenderingContext2D
      );
      ctx2?.putImageData(grayArr[0], 0, 0);
      ctx8?.putImageData(grayArr[1], 0, 0);
      ctx3?.putImageData(gamma(inHeight, inWidth, inVideoArray, ctx3), 0, 0);
      ctx4?.putImageData(
        reverseImage(inHeight, inWidth, inVideoArray, ctx4),
        0,
        0
      );
      ctx5?.putImageData(mirLr(inHeight, inWidth, inVideoArray, ctx5), 0, 0);
      ctx6?.putImageData(mirTb(inHeight, inWidth, inVideoArray, ctx6), 0, 0);
      ctx1?.putImageData(bwImage(inHeight, inWidth, inVideoArray, ctx1), 0, 0);
      ctx7?.putImageData(
        boundaryLineColor(inHeight, inWidth, inVideoArray, ctx7),
        0,
        0
      );

      if (video.paused || video.ended) {
        window.cancelAnimationFrame(raf);
      } else {
        raf = window.requestAnimationFrame(computeimageData);
      }
    };
  }, []);
  return (
    <>
      <BackgroundEffect play={videoState}></BackgroundEffect>
      <LabelView play={videoState} label={"ROSÉ"}></LabelView>
      <div className="video">
        <video id="video" controls={true} width="480" height="270">
          <source
            src={require("style/RoseVideo.mp4")}
            type="video/mp4"
          ></source>
        </video>
      </div>
      <div style={{ visibility: isShowCanvas ? "visible" : "hidden" }}>
        <div className="cx1">
          <canvas id="c1" width="320" height="180"></canvas>
        </div>

        <div className="cx2">
          <canvas id="c2" width="320" height="180"></canvas>
        </div>

        <div className="cx3">
          <canvas id="c3" width="320" height="180"></canvas>
        </div>

        <div className="cx4">
          <canvas id="c4" width="320" height="180"></canvas>
        </div>

        <div className="cx5">
          <canvas id="c5" width="320" height="180"></canvas>
        </div>

        <div className="cx6">
          <canvas id="c6" width="320" height="180"></canvas>
        </div>

        <div className="cx7">
          <canvas id="c7" width="320" height="180"></canvas>
        </div>

        <div className="cx8">
          <canvas id="c8" width="320" height="180"></canvas>
        </div>
      </div>
    </>
  );
};

// PostMalone.propTypes = {
//   imageState: PropTypes.string,
// };

export default PostMalone;
