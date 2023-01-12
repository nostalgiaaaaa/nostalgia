export const grayscale = (
  inHeight: number,
  inWidth: number,
  inVideoArray: string[][][],
  ctx2: CanvasRenderingContext2D,
  ctx8: CanvasRenderingContext2D
) => {
  let outHeight = inHeight;
  let outWidth = inWidth;
  let outImageArray = new Array(3); // 512짜리 1차원 배열
  for (let i = 0; i < 3; i++) {
    outImageArray[i] = new Array(outHeight); // 512짜리 1차원 배열
    for (let k = 0; k < outHeight; k++)
      outImageArray[i][k] = new Array(outWidth);
  }

  // ***** 진짜 영상처리 알고리즘 *****
  let R, G, B;
  for (let i = 0; i < inHeight; i++) {
    for (let k = 0; k < inWidth; k++) {
      R = inVideoArray[0][i][k].charCodeAt(0);
      G = inVideoArray[1][i][k].charCodeAt(0);
      B = inVideoArray[2][i][k].charCodeAt(0);

      let RGB = (R + G + B) / 3;

      outImageArray[0][i][inWidth - 1 - k] = String.fromCharCode(RGB);
      outImageArray[1][i][inWidth - 1 - k] = String.fromCharCode(RGB);
      outImageArray[2][i][inWidth - 1 - k] = String.fromCharCode(RGB);
    }
  }
  let outPaper = ctx2?.createImageData(outWidth, outHeight) as ImageData;
  for (let i = 0; i < outHeight; i++) {
    for (let k = 0; k < outWidth; k++) {
      R = outImageArray[0][i][k].charCodeAt(0); // Byte 문자를 숫자로.
      G = outImageArray[1][i][k].charCodeAt(0); // Byte 문자를 숫자로.
      B = outImageArray[2][i][k].charCodeAt(0); // Byte 문자를 숫자로.
      outPaper.data[(i * outWidth + k) * 4 + 0] = R;
      outPaper.data[(i * outWidth + k) * 4 + 1] = G;
      outPaper.data[(i * outWidth + k) * 4 + 2] = B;
      outPaper.data[(i * outWidth + k) * 4 + 3] = 255;
    }
  }

  //// 화소 영역 처리
  let maskW = [
    [-1, -1, -1],
    [0, 0, 0],
    [1, 1, 1],
  ];

  let maskH = [
    [1, 0, -1],
    [1, 0, -1],
    [1, 0, -1],
  ];
  // 임시 입력 배열
  for (let rgb = 0; rgb < 3; rgb++) {
    let tempInputArrayW = new Array(inHeight + 2); // 2칸 큼
    for (let i = 0; i < inHeight + 2; i++)
      tempInputArrayW[i] = new Array(inWidth + 2);
    // 임시 입력 배열 초기화
    for (let i = 0; i < inHeight + 2; i++)
      for (let k = 0; k < inWidth + 2; k++)
        tempInputArrayW[i][k] = String.fromCharCode(127);
    // 입력 배열 --> 임시 입력
    for (let i = 0; i < inHeight; i++)
      for (let k = 0; k < inWidth; k++) {
        tempInputArrayW[i + 1][k + 1] = outImageArray[rgb][i][k];
      }
    // 임시 출력 배열
    let tempOutputArrayW = new Array(outHeight);
    for (let i = 0; i < outHeight; i++)
      tempOutputArrayW[i] = new Array(outWidth);

    // ***** 진짜 영상처리 알고리즘 *****
    for (let i = 0; i < inHeight; i++) {
      for (let k = 0; k < inWidth; k++) {
        let S = 0.0;
        for (let m = 0; m < 3; m++) {
          for (let n = 0; n < 3; n++) {
            S += maskW[m][n] * tempInputArrayW[i + m][k + n].charCodeAt(0);
          }
        }
        tempOutputArrayW[i][k] = S.toString();
      }
    }

    let tempInputArrayH = new Array(inHeight + 2); // 2칸 큼
    for (let i = 0; i < inHeight + 2; i++)
      tempInputArrayH[i] = new Array(inWidth + 2);
    // 임시 입력 배열 초기화
    for (let i = 0; i < inHeight + 2; i++)
      for (let k = 0; k < inWidth + 2; k++)
        tempInputArrayH[i][k] = String.fromCharCode(127);
    // 입력 배열 --> 임시 입력
    for (let i = 0; i < inHeight; i++)
      for (let k = 0; k < inWidth; k++) {
        tempInputArrayH[i + 1][k + 1] = outImageArray[rgb][i][k];
      }
    // 임시 출력 배열
    let tempOutputArrayH = new Array(outHeight); //
    for (let i = 0; i < outHeight; i++)
      tempOutputArrayH[i] = new Array(outWidth);

    // ***** 진짜 영상처리 알고리즘 *****
    for (let i = 0; i < inHeight; i++) {
      for (let k = 0; k < inWidth; k++) {
        let S = 0.0;
        for (let m = 0; m < 3; m++) {
          for (let n = 0; n < 3; n++) {
            S += maskH[m][n] * tempInputArrayH[i + m][k + n].charCodeAt(0);
          }
        }
        tempOutputArrayH[i][k] = S.toString();
      }
    }

    let tempOutputArray = new Array(outHeight); //
    for (let i = 0; i < outHeight; i++)
      tempOutputArray[i] = new Array(outWidth);

    for (let i = 0; i < outHeight; i++)
      for (let k = 0; k < outWidth; k++)
        tempOutputArray[i][k] = Math.sqrt(
          Math.pow(parseInt(tempOutputArrayW[i][k]), 2) +
            Math.pow(parseInt(tempOutputArrayH[i][k]), 2)
        ).toString();

    for (let i = 0; i < outHeight; i++)
      for (let k = 0; k < outWidth; k++) {
        let v = parseInt(tempOutputArray[i][k]);
        if (v > 255.0) v = 255.0;
        if (v < 0) v = 0.0;
        outImageArray[rgb][i][k] = String.fromCharCode(v);
      }
  }

  let outPaper2 = ctx8?.createImageData(outWidth, outHeight) as ImageData;
  for (let i = 0; i < outHeight; i++) {
    for (let k = 0; k < outWidth; k++) {
      R = outImageArray[0][i][k].charCodeAt(0); // Byte 문자를 숫자로.
      G = outImageArray[1][i][k].charCodeAt(0); // Byte 문자를 숫자로.
      B = outImageArray[2][i][k].charCodeAt(0); // Byte 문자를 숫자로.
      outPaper2.data[(i * outWidth + k) * 4 + 0] = R;
      outPaper2.data[(i * outWidth + k) * 4 + 1] = G;
      outPaper2.data[(i * outWidth + k) * 4 + 2] = B;
      outPaper2.data[(i * outWidth + k) * 4 + 3] = 255;
    }
  }
  return [outPaper, outPaper2];
};

export const gamma = (
  inHeight: number,
  inWidth: number,
  inVideoArray: string[][][],
  ctx3: CanvasRenderingContext2D
) => {
  // (중요!) 출력 영상의 크기를 결정... 알고리즘에 따름.
  let outHeight = inHeight;
  let outWidth = inWidth;
  // 출력 3차원 배열을 준비
  let outImageArray = new Array(3); // 512짜리 1차원 배열
  for (let i = 0; i < 3; i++) {
    outImageArray[i] = new Array(outHeight); // 512짜리 1차원 배열
    for (let k = 0; k < outHeight; k++)
      outImageArray[i][k] = new Array(outWidth);
  }

  // ***** 진짜 영상처리 알고리즘 *****
  for (let rgb = 0; rgb < 3; rgb++) {
    for (let i = 0; i < inHeight; i++) {
      for (let k = 0; k < inWidth; k++) {
        // 문자 --> 숫자
        let pixel = inVideoArray[rgb][i][k].charCodeAt(0);
        // ** 요기가 핵심 알고리즘.
        //pixel = Math.pow(pixel, 1/value);
        pixel = Math.trunc((pixel / 255) ** (1 / 6) * 255);
        outImageArray[rgb][i][inWidth - 1 - k] = String.fromCharCode(pixel);
      }
    }
  }
  let R, G, B;
  let outPaper = ctx3?.createImageData(outWidth, outHeight) as ImageData;
  for (let i = 0; i < outHeight; i++) {
    for (let k = 0; k < outWidth; k++) {
      R = outImageArray[0][i][k].charCodeAt(0); // Byte 문자를 숫자로.
      G = outImageArray[1][i][k].charCodeAt(0); // Byte 문자를 숫자로.
      B = outImageArray[2][i][k].charCodeAt(0); // Byte 문자를 숫자로.
      outPaper.data[(i * outWidth + k) * 4 + 0] = R;
      outPaper.data[(i * outWidth + k) * 4 + 1] = G;
      outPaper.data[(i * outWidth + k) * 4 + 2] = B;
      outPaper.data[(i * outWidth + k) * 4 + 3] = 255;
    }
  }
  return outPaper;
};

export const reverseImage = (
  inHeight: number,
  inWidth: number,
  inVideoArray: string[][][],
  ctx4: CanvasRenderingContext2D
) => {
  let outHeight = inHeight;
  let outWidth = inWidth;
  // 출력 3차원 배열을 준비
  let outImageArray = new Array(3); // 512짜리 1차원 배열
  for (let i = 0; i < 3; i++) {
    outImageArray[i] = new Array(outHeight); // 512짜리 1차원 배열
    for (let k = 0; k < outHeight; k++)
      outImageArray[i][k] = new Array(outWidth);
  }

  // ***** 진짜 영상처리 알고리즘 *****
  for (let rgb = 0; rgb < 3; rgb++) {
    for (let i = 0; i < inHeight; i++) {
      for (let k = 0; k < inWidth; k++) {
        let pixel = inVideoArray[rgb][i][k].charCodeAt(0);
        pixel = 255 - pixel;
        outImageArray[rgb][i][k] = String.fromCharCode(pixel);
      }
    }
  }

  let R, G, B;
  let outPaper = ctx4?.createImageData(outWidth, outHeight) as ImageData;
  for (let i = 0; i < outHeight; i++) {
    for (let k = 0; k < outWidth; k++) {
      R = outImageArray[0][i][k].charCodeAt(0); // Byte 문자를 숫자로.
      G = outImageArray[1][i][k].charCodeAt(0); // Byte 문자를 숫자로.
      B = outImageArray[2][i][k].charCodeAt(0); // Byte 문자를 숫자로.
      outPaper.data[(i * outWidth + k) * 4 + 0] = R;
      outPaper.data[(i * outWidth + k) * 4 + 1] = G;
      outPaper.data[(i * outWidth + k) * 4 + 2] = B;
      outPaper.data[(i * outWidth + k) * 4 + 3] = 255;
    }
  }
  return outPaper;
};

export const rgb2hsv = (r: number, g: number, b: number) => {
  let max = Math.max(r, g, b),
    min = Math.min(r, g, b),
    d = max - min,
    h,
    s = max === 0 ? 0 : d / max,
    v = max / 255;

  switch (max) {
    case min:
      h = 0;
      break;
    case r:
      h = g - b + d * (g < b ? 6 : 0);
      h /= 6 * d;
      break;
    case g:
      h = b - r + d * 2;
      h /= 6 * d;
      break;
    case b:
      h = r - g + d * 4;
      h /= 6 * d;
      break;
  }
  return {
    h: h,
    s: s,
    v: v,
  };
};

export const hsv2rgb = (h: number, s: number, v: number) => {
  let r, g, b, i, f, p, q, t;

  h = h * 360;
  s = s * 100;
  v = v * 100;

  // Make sure our arguments stay in-range
  h = Math.max(0, Math.min(360, h));
  s = Math.max(0, Math.min(100, s));
  v = Math.max(0, Math.min(100, v));

  h /= 360;
  s /= 100;
  v /= 100;

  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
  }
  return {
    r: Math.round((r as number) * 255),
    g: Math.round((g as number) * 255),
    b: Math.round((b as number) * 255),
  };
};

export const mirLr = (
  inHeight: number,
  inWidth: number,
  inVideoArray: string[][][],
  ctx5: CanvasRenderingContext2D
) => {
  let outHeight = inHeight;
  let outWidth = inWidth;
  let outImageArray = new Array(3); // 512짜리 1차원 배열
  for (let i = 0; i < 3; i++) {
    outImageArray[i] = new Array(outHeight); // 512짜리 1차원 배열
    for (let k = 0; k < outHeight; k++)
      outImageArray[i][k] = new Array(outWidth);
  }

  for (let rgb = 0; rgb < 3; rgb++) {
    for (let i = 0; i < inHeight; i++) {
      for (let k = 0; k < inWidth; k++) {
        outImageArray[rgb][i][k] = inVideoArray[rgb][i][inWidth - 1 - k];
      }
    }
  }
  let R, G, B;
  for (let i = 0; i < inHeight; i++) {
    for (let k = 0; k < inWidth; k++) {
      R = outImageArray[0][i][k].charCodeAt(0);
      G = outImageArray[1][i][k].charCodeAt(0);
      B = outImageArray[2][i][k].charCodeAt(0);
      let hsv = rgb2hsv(R, G, B);
      let H = hsv.h;
      let S = hsv.s;
      let V = hsv.v;

      R += 2;
      S += 2;
      B += 2;

      let rgb = hsv2rgb(H as number, S, V);
      R = rgb.r;
      G = rgb.g;
      B = rgb.b;

      outImageArray[0][i][k] = String.fromCharCode(R);
      outImageArray[1][i][k] = String.fromCharCode(G);
      outImageArray[2][i][k] = String.fromCharCode(B);
    }
  }

  let outPaper = ctx5?.createImageData(outWidth, outHeight) as ImageData;
  for (let i = 0; i < outHeight; i++) {
    for (let k = 0; k < outWidth; k++) {
      R = outImageArray[0][i][k].charCodeAt(0); // Byte 문자를 숫자로.
      G = outImageArray[1][i][k].charCodeAt(0); // Byte 문자를 숫자로.
      B = outImageArray[2][i][k].charCodeAt(0); // Byte 문자를 숫자로.
      outPaper.data[(i * outWidth + k) * 4 + 0] = R;
      outPaper.data[(i * outWidth + k) * 4 + 1] = G;
      outPaper.data[(i * outWidth + k) * 4 + 2] = B;
      outPaper.data[(i * outWidth + k) * 4 + 3] = 255;
    }
  }
  return outPaper;
};

export const mirTb = (
  inHeight: number,
  inWidth: number,
  inVideoArray: string[][][],
  ctx6: CanvasRenderingContext2D
) => {
  let outHeight = inHeight;
  let outWidth = inWidth;
  let outImageArray = new Array(3); // 512짜리 1차원 배열
  for (let i = 0; i < 3; i++) {
    outImageArray[i] = new Array(outHeight); // 512짜리 1차원 배열
    for (let k = 0; k < outHeight; k++)
      outImageArray[i][k] = new Array(outWidth);
  }

  for (let rgb = 0; rgb < 3; rgb++) {
    for (let i = 0; i < inHeight; i++) {
      for (let k = 0; k < inWidth; k++) {
        outImageArray[rgb][i][k] = inVideoArray[rgb][inHeight - 1 - i][k];
      }
    }
  }

  let R, G, B;
  let outPaper = ctx6?.createImageData(outWidth, outHeight) as ImageData;
  for (let i = 0; i < outHeight; i++) {
    for (let k = 0; k < outWidth; k++) {
      R = outImageArray[0][i][k].charCodeAt(0); // Byte 문자를 숫자로.
      G = outImageArray[1][i][k].charCodeAt(0); // Byte 문자를 숫자로.
      B = outImageArray[2][i][k].charCodeAt(0); // Byte 문자를 숫자로.
      outPaper.data[(i * outWidth + k) * 4 + 0] = R;
      outPaper.data[(i * outWidth + k) * 4 + 1] = G;
      outPaper.data[(i * outWidth + k) * 4 + 2] = B;
      outPaper.data[(i * outWidth + k) * 4 + 3] = 255;
    }
  }
  return outPaper;
};

export const bwImage = (
  inHeight: number,
  inWidth: number,
  inVideoArray: string[][][],
  ctx1: CanvasRenderingContext2D
) => {
  let outHeight = inHeight;
  let outWidth = inWidth;
  let outImageArray = new Array(3);
  for (let i = 0; i < 3; i++) {
    outImageArray[i] = new Array(outHeight);
    for (let k = 0; k < outHeight; k++)
      outImageArray[i][k] = new Array(outWidth);
  }

  // ***** 진짜 영상처리 알고리즘 *****
  let R, G, B;
  for (let i = 0; i < inHeight; i++) {
    for (let k = 0; k < inWidth; k++) {
      R = inVideoArray[0][i][k].charCodeAt(0);
      G = inVideoArray[1][i][k].charCodeAt(0);
      B = inVideoArray[2][i][k].charCodeAt(0);
      let RGB = (R + G + B) / 3;
      if (RGB > 70) RGB = 255;
      else RGB = 0;
      outImageArray[0][i][k] = String.fromCharCode(RGB);
      outImageArray[1][i][k] = String.fromCharCode(RGB);
      outImageArray[2][i][k] = String.fromCharCode(RGB);
    }
  }
  let outPaper = ctx1?.createImageData(outWidth, outHeight) as ImageData;
  for (let i = 0; i < outHeight; i++) {
    for (let k = 0; k < outWidth; k++) {
      R = outImageArray[0][i][k].charCodeAt(0); // Byte 문자를 숫자로.
      G = outImageArray[1][i][k].charCodeAt(0); // Byte 문자를 숫자로.
      B = outImageArray[2][i][k].charCodeAt(0); // Byte 문자를 숫자로.
      outPaper.data[(i * outWidth + k) * 4 + 0] = R;
      outPaper.data[(i * outWidth + k) * 4 + 1] = G;
      outPaper.data[(i * outWidth + k) * 4 + 2] = B;
      outPaper.data[(i * outWidth + k) * 4 + 3] = 255;
    }
  }
  return outPaper;
};

export const boundaryLineColor = (
  inHeight: number,
  inWidth: number,
  inVideoArray: string[][][],
  ctx7: CanvasRenderingContext2D
) => {
  let outHeight = inHeight;
  let outWidth = inWidth;
  let outImageArray = new Array(3); // 512짜리 1차원 배열
  for (let i = 0; i < 3; i++) {
    outImageArray[i] = new Array(outHeight); // 512짜리 1차원 배열
    for (let k = 0; k < outHeight; k++)
      outImageArray[i][k] = new Array(outWidth);
  }

  //// 화소 영역 처리
  let maskW = [
    [-1, -1, -1],
    [0, 0, 0],
    [1, 1, 1],
  ];

  let maskH = [
    [1, 0, -1],
    [1, 0, -1],
    [1, 0, -1],
  ];
  // 임시 입력 배열

  for (let rgb = 0; rgb < 3; rgb++) {
    let tempInputArrayW = new Array(inHeight + 2); // 2칸 큼
    for (let i = 0; i < inHeight + 2; i++)
      tempInputArrayW[i] = new Array(inWidth + 2);
    // 임시 입력 배열 초기화
    for (let i = 0; i < inHeight + 2; i++)
      for (let k = 0; k < inWidth + 2; k++)
        tempInputArrayW[i][k] = String.fromCharCode(127);
    // 입력 배열 --> 임시 입력
    for (let i = 0; i < inHeight; i++)
      for (let k = 0; k < inWidth; k++) {
        tempInputArrayW[i + 1][k + 1] = inVideoArray[rgb][i][k];
      }
    // 임시 출력 배열
    let tempOutputArrayW = new Array(outHeight);
    for (let i = 0; i < outHeight; i++)
      tempOutputArrayW[i] = new Array(outWidth);

    // ***** 진짜 영상처리 알고리즘 *****
    for (let i = 0; i < inHeight; i++) {
      for (let k = 0; k < inWidth; k++) {
        let S = 0.0;
        for (let m = 0; m < 3; m++) {
          for (let n = 0; n < 3; n++) {
            S += maskW[m][n] * tempInputArrayW[i + m][k + n].charCodeAt(0);
          }
        }
        tempOutputArrayW[i][k] = S.toString();
      }
    }

    let tempInputArrayH = new Array(inHeight + 2); // 2칸 큼
    for (let i = 0; i < inHeight + 2; i++)
      tempInputArrayH[i] = new Array(inWidth + 2);
    // 임시 입력 배열 초기화
    for (let i = 0; i < inHeight + 2; i++)
      for (let k = 0; k < inWidth + 2; k++)
        tempInputArrayH[i][k] = String.fromCharCode(127);
    // 입력 배열 --> 임시 입력
    for (let i = 0; i < inHeight; i++)
      for (let k = 0; k < inWidth; k++) {
        tempInputArrayH[i + 1][k + 1] = inVideoArray[rgb][i][k];
      }
    // 임시 출력 배열
    let tempOutputArrayH = new Array(outHeight); //
    for (let i = 0; i < outHeight; i++)
      tempOutputArrayH[i] = new Array(outWidth);

    // ***** 진짜 영상처리 알고리즘 *****
    for (let i = 0; i < inHeight; i++) {
      for (let k = 0; k < inWidth; k++) {
        let S = 0.0;
        for (let m = 0; m < 3; m++) {
          for (let n = 0; n < 3; n++) {
            S += maskH[m][n] * tempInputArrayH[i + m][k + n].charCodeAt(0);
          }
        }
        tempOutputArrayH[i][k] = S.toString();
      }
    }

    let tempOutputArray = new Array(outHeight); //
    for (let i = 0; i < outHeight; i++)
      tempOutputArray[i] = new Array(outWidth);

    for (let i = 0; i < outHeight; i++)
      for (let k = 0; k < outWidth; k++)
        tempOutputArray[i][k] = Math.sqrt(
          Math.pow(parseInt(tempOutputArrayW[i][k]), 2) +
            Math.pow(parseInt(tempOutputArrayH[i][k]), 2)
        ).toString();

    for (let i = 0; i < outHeight; i++)
      for (let k = 0; k < outWidth; k++) {
        let v = parseInt(tempOutputArray[i][k]);
        if (v > 255.0) v = 255.0;
        if (v < 0) v = 0.0;
        outImageArray[rgb][i][k] = String.fromCharCode(v);
      }
  }
  let R, G, B;
  let outPaper = ctx7?.createImageData(outWidth, outHeight) as ImageData;
  for (let i = 0; i < outHeight; i++) {
    for (let k = 0; k < outWidth; k++) {
      R = outImageArray[0][i][k].charCodeAt(0); // Byte 문자를 숫자로.
      G = outImageArray[1][i][k].charCodeAt(0); // Byte 문자를 숫자로.
      B = outImageArray[2][i][k].charCodeAt(0); // Byte 문자를 숫자로.
      outPaper.data[(i * outWidth + k) * 4 + 0] = R;
      outPaper.data[(i * outWidth + k) * 4 + 1] = G;
      outPaper.data[(i * outWidth + k) * 4 + 2] = B;
      outPaper.data[(i * outWidth + k) * 4 + 3] = 255;
    }
  }
  return outPaper;
};
