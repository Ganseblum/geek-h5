import React, { Suspense, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Icon from "@/components/Icon";
import style from "./index.module.scss";
import classNames from "classnames";
import { getUserInfo } from "@/api/login";
import { useDispatch } from "react-redux";
import { saveUserInfo } from "@/store/actions/login";
export default function Index() {
  const tabBar = [
    {
      icon: "icon-dianjia",
      title: "首页",
      path: "/home/index",
    },
    {
      icon: "icon-fenxiang",
      title: "问答",
      path: "/home/qa",
    },
    {
      icon: "icon-line_computer",
      title: "视频",
      path: "/home/video",
    },

    {
      icon: "icon-geren",
      title: "我的",
      path: "/home/my",
    },
  ];
  const navigate = useNavigate();

  const goLink = (item: string) => {
    navigate(item);
  };

  const location = useLocation();
  const iconList = tabBar.map((item) => {
    return (
      <div
        className={classNames(
          "itemBox",
          item.path === location.pathname ? "active" : ""
        )}
        key={item.title}
        onClick={() => goLink(item.path)}
      >
        <Icon type={item.icon} classname="iconF"></Icon>
        {item.title}
      </div>
    );
  });
  // login / userInfo;
  const dispatch = useDispatch();
  useEffect(() => {
    getUserInfo().then((res) => {
      dispatch(saveUserInfo(res.data));
    });
  }, [dispatch]);

  return (
    <div className={style.root}>
      <Suspense>
        <Outlet></Outlet>
      </Suspense>
      <div className="tabBarBox">{iconList}</div>
    </div>
  );
}
