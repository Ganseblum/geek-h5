import React from "react";
import classNames from "classnames";
interface poros {
  type: string;
  style?: {};
  classname?: string;
  onClick?: () => void;
}
export default function Icon(Props: poros) {
  // ...rest接收所有剩余传参
  const { type, style, classname, ...rest } = Props;
  return (
    <svg
      {...rest}
      className={classNames("icon", classname)}
      aria-hidden="true"
      style={style}
    >
      <use xlinkHref={`#${type}`}></use>
    </svg>
  );
}
