import React, { useState, useCallback, useEffect, forwardRef } from "react";
import { useMouse } from "@mantine/hooks";
import { useRouter } from "next/router";

export const RectDrawing = forwardRef(function ForwardRefFunc(props, ref) {
  const router = useRouter();
  const { x: mouseX, y: mouseY } = useMouse();
  const [center, setCenter] = useState({ left: 0, top: 0 });
  const [dblclick, setDblclick] = useState(false);

  const handleDblClick = useCallback((e) => {
    document.body.style.userSelect = "none";
    setDblclick(true);
    setCenter({
      left: e.clientX,
      top: e.clientY,
    });
  }, []);

  const handleMouseUp = useCallback(() => {
    document.body.style.userSelect = "none";
    setDblclick(false);
    setCenter({
      left: 0,
      top: 0,
    });
  }, []);

  useEffect(() => {
    ref.current.addEventListener("dblclick", handleDblClick);
    ref.current.addEventListener("mouseup", handleMouseUp);
  }, []);

  if (router.pathname !== "/") {
    return (
      <div
        style={{
          width:
            Math.sign(mouseX - center.left) > 0
              ? mouseX - center.left
              : -(mouseX - center.left),
          height:
            Math.sign(mouseY - center.top) > 0
              ? mouseY - center.top
              : -(mouseY - center.top),
          left: center.left,
          top: center.top,
          right: 0,
          bottom: 0,
        }}
        //要素反転の条件分岐(X：マイナス Y：プラス)  (X：プラス、Y：マイナス) (X：マイナス、Y：マイナス)
        className={`${dblclick ? "block" : "hidden"} 
        ${
          Math.sign(mouseY - center.top) < 0 &&
          Math.sign(mouseX - center.left) > 0
            ? "origin-top rotate-180"
            : ""
        } ${
          Math.sign(mouseX - center.left) < 0 &&
          Math.sign(mouseY - center.top) > 0
            ? "origin-left rotate-180"
            : ""
        } 
        ${
          Math.sign(mouseX - center.left) < 0 &&
          Math.sign(mouseY - center.top) < 0
            ? "origin-top-left rotate-180"
            : ""
        }  absolute z-[100] border border-red-900 bg-black opacity-5 `}
      ></div>
    );
  }
  return <></>;
});
