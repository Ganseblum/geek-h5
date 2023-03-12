import { editUserInfo } from "@/api/login";
import Headers from "@/components/Header";
import { getProfile } from "@/store/actions/profile";
import { TextArea, Toast } from "antd-mobile";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./index.module.scss";

interface Props {
  hidePop: () => void;
  info: string;
}

interface subP {
  intro: string;
  hidePop: () => void;
}

function Submit(props: subP) {
  const dispatch = useDispatch();

  const saveDet = () => {
    console.log(props.intro);
    editUserInfo({
      intro: props.intro,
    }).then((res) => {
      dispatch(getProfile());
      Toast.show({
        content: "更改成功",
      });
      props.hidePop();
    });
  };
  return (
    <div className="sub" onClick={() => saveDet()}>
      提交
    </div>
  );
}

export default function EditInfo(props: Props) {
  const { hidePop, info } = props;
  const [userInfo, setUserInfo] = useState(info);
  return (
    <div className={styles.root}>
      <Headers
        hidePops={() => {
          hidePop();
        }}
        center="个人介绍"
        right={<Submit intro={userInfo} hidePop={() => hidePop()}></Submit>}
      ></Headers>

      <div className="textBox">
        <TextArea
          defaultValue={userInfo}
          showCount
          maxLength={30}
          onChange={(e) => {
            setUserInfo(e);
          }}
        />
      </div>
    </div>
  );
}
