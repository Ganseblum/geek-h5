import React from "react";
import { useSelector } from "react-redux";
import styles from "./popBox.module.scss";
import { RootState } from "@/store";
import { getTokenInfo } from "@/utils/storage";
interface Props {
  hideBox: () => void;
}

export default function PopBox(props: Props) {
  const channel = useSelector((state: RootState) => {
    if (getTokenInfo()) {
      return state.home.userChannel;
    } else {
      return state.home.allChannel;
    }
  });

  const Tb = channel.map((item) => <div>{item}</div>);
  const { hideBox } = props;
  return (
    <div className={styles.root}>
      <div className="popHead">
        <p onClick={() => hideBox()}>返回</p>
        <p>编辑</p>
      </div>
      <div className="myChannel">
        <p>我的频道</p>
        {Tb}
      </div>
      <div className="recommendChannel">
        <p>推荐频道</p>
      </div>
    </div>
  );
}
