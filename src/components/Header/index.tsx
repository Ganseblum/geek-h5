import React from "react";
import { useNavigate } from "react-router";
import styles from "./index.module.scss"

import Icon from "../Icon";

interface Props {
  center: string;
  right?: JSX.Element | React.ReactElement;
  hidePops?: () => void;
  myStyles?: {};
}

export default function Headers(props: Props) {
  const { center, right, hidePops, myStyles } = props;
  const naviagte = useNavigate();
  const goBack = () => {
    if (hidePops) {
      hidePops();
      return;
    }
    naviagte(-1);
  };
  return (
    <div className={styles.root} style={myStyles}>
      <div className="content">
        <div className="left">
          <Icon
            type="icon-fanhui"
            classname="iconF"
            onClick={() => goBack()}
          ></Icon>
        </div>
        <div className="center">{center}</div>
        <div className="right">{right}</div>
      </div>
    </div>
  );
}
