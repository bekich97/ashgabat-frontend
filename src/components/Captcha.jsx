import React, { useRef, useEffect } from "react";
import * as Icon from "react-bootstrap-icons";
import { setCaptcha } from "../stores/mainSlice";
import { useDispatch } from "react-redux";

function Captcha() {
  const dispatch = useDispatch();
  const canvas = useRef();
  let ctx = null;
  let n1 = Math.floor(Math.random() * 19) + 1;
  let n2 = Math.floor(Math.random() * 19) + 1;
  let num1 = null;
  let num2 = null;
  let num3 = null;
  let num4 = null;

  if (n1 > 9) {
    num1 = Math.floor(n1 / 10);
    num2 = n1 - 10;
  } else {
    num1 = n1;
  }

  if (n2 > 9) {
    num3 = Math.floor(n2 / 10);
    num4 = n2 - 10;
  } else {
    num3 = n2;
  }

  // initialize the canvas context
  useEffect(() => {
    // dynamically assign the width and height to canvas
    const canvasEle = canvas.current;
    canvasEle.width = 300;
    canvasEle.height = 60;

    // get context of the canvas
    ctx = canvasEle.getContext("2d");
  }, []);

  const randomColor = () => {
    var letters = "0123456789ABCDE";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const randSize = () => {
    // var randRotate = Math.floor(Math.random()*(max - min + 1)) + min;
    return Math.floor(Math.random() * 15) + 16;
  };

  const randCoorX = () => {
    return Math.floor(Math.random() * 136) + 10;
  };

  const randCoorY = () => {
    return Math.floor(Math.random() * 41) + 10;
  };

  useEffect(() => {
    if (num1) {
      writeText(
        { text: num1, x: 10, y: 10 },
        { color: randomColor(), fontSize: randSize() }
      );
    }
    if (num2) {
      writeText(
        { text: num2, x: 30, y: 10 },
        { color: randomColor(), fontSize: randSize() }
      );
    }
    writeText(
      { text: "+", x: 50, y: 10 },
      { color: randomColor(), fontSize: randSize() }
    );
    if (num3) {
      writeText(
        { text: num3, x: 70, y: 10 },
        { color: randomColor(), fontSize: randSize() }
      );
    }
    if (num4) {
      writeText(
        { text: num4, x: 90, y: 10 },
        { color: randomColor(), fontSize: randSize() }
      );
    }
    writeText(
      { text: "=", x: 110, y: 10 },
      { color: randomColor(), fontSize: randSize() }
    );
    writeText(
      { text: "?", x: 130, y: 10 },
      { color: randomColor(), fontSize: randSize() }
    );

    drawLine(
      { bX: randCoorX(), bY: randCoorY() },
      { eX: randCoorX(), eY: randCoorY() },
      randomColor()
    );
    drawLine(
      { bX: randCoorX(), bY: randCoorY() },
      { eX: randCoorX(), eY: randCoorY() },
      randomColor()
    );
    drawLine(
      { bX: randCoorX(), bY: randCoorY() },
      { eX: randCoorX(), eY: randCoorY() },
      randomColor()
    );
    drawLine(
      { bX: randCoorX(), bY: randCoorY() },
      { eX: randCoorX(), eY: randCoorY() },
      randomColor()
    );
    dispatch(setCaptcha(n1+n2));
  }, []);

  // write a text
  const writeText = (info, style = {}) => {
    const { text, x, y } = info;
    const {
      fontSize = 20,
      fontFamily = "Arial",
      color = "black",
      textAlign = "left",
      textBaseline = "top",
    } = style;

    ctx.beginPath();
    ctx.font = fontSize + "px " + fontFamily;
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
    ctx.stroke();
  };

  const drawLine = (start, end, col) => {
    const { bX, bY } = start;
    const { eX, eY } = end;
    const color = col;
    ctx.strokeStyle = color;
    ctx.moveTo(bX, bY);
    ctx.lineTo(eX, eY);
    ctx.stroke();
  };

  const reloadHandle = () => {
    window.location.href = window.location.href;
  };

  return (
    <div
      style={{
        backgroundColor: "rgba(0,0,0,.05)",
        marginBottom: "10px",
        borderRadius: "5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 10px",
      }}
    >
      <canvas ref={canvas}></canvas>
      <button className="app-btn reload" onClick={() => reloadHandle()}>
        <Icon.ArrowClockwise />
      </button>
    </div>
  );
}

export default Captcha;
