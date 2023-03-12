// import Tabs from "@/components/Tabs";
import Icon from "@/components/Icon";
import { RootState } from "@/store";
import { getAllChannel, getUserChannel } from "@/store/actions/home";
// import styles from "./index.module.scss";

import { getTokenInfo } from "@/utils/storage";
import { Popup, Tabs } from "antd-mobile";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PopBox from "./components/popBox";

export default function Index() {
  // const home = useSelector((state: RootState) => state.home);
  // const profile = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserChannel());
    dispatch(getAllChannel());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const channel = useSelector((state: RootState) => {
    if (getTokenInfo()) {
      return state.home.userChannel;
    } else {
      return state.home.allChannel;
    }
  });

  const Tb = channel.map((item) => (
    <Tabs.Tab title={item.name} key={item.id}></Tabs.Tab>
  ));

  const selectItem = (e: string) => {
    console.log(e);
  };

  const [visible, setVisible] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: "5px",
      }}
    >
      <Popup
        visible={visible}
        onMaskClick={() => {
          setVisible(false);
        }}
        position="left"
        bodyStyle={{ width: "100vw" }}
      >
        <PopBox
          hideBox={() => {
            setVisible(false);
          }}
        ></PopBox>
      </Popup>

      <div style={{ width: "88vw" }}>
        <Tabs
          onChange={(e) => {
            selectItem(e);
          }}
          defaultActiveKey="0"
        >
          {Tb}
        </Tabs>
      </div>
      <Icon
        type="icon-gengduo"
        onClick={() => {
          setVisible(true);
        }}
      ></Icon>
    </div>
  );
}
