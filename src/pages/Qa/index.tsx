import Headers from "@/components/Header";
import { getTokenInfo } from "@/utils/storage";
import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import styles from "./index.module.scss";

export default function Index() {
  const clientRef = useRef<Socket>();
  const [message, setMessageList] = useState([
    { type: "robot", text: "您好需要什么帮助" },

    { type: "user", text: "你好" },
  ]);
  useEffect(() => {
    // 创建客户端实例
    const client = io("http://toutiao.itheima.net", {
      transports: ["websocket"],
      // 在查询字符串参数中传递 token
      query: {
        token: getTokenInfo().token,
      },
    });

    // 监听连接成功的事件
    client.on("connect", () => {
      // 向聊天记录中添加一条消息
      setMessageList((messageList) => [
        ...messageList,
        { type: "robot", text: "我现在恭候着您的提问。" },
      ]);
    });

    // 监听收到消息的事件
    client.on("message", (data) => {
      setMessageList((messageList) => [
        ...messageList,
        {
          type: "robot",
          text: data.msg,
        },
      ]);
    });

    // 将客户端实例缓存到 ref 引用中
    clientRef.current = client;

    // 在组件销毁时关闭 socket.io 的连接
    return () => {
      client.close();
    };
  }, []);

  const keyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      clientRef.current?.emit("message", {
        msg: value,
        timestamp: Date.now(),
      });
      setMessageList((messageList) => [
        ...messageList,
        { type: "user", text: value },
      ]);
      setValue("");
    }
  };

  const [value, setValue] = useState("");
  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const lsitRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // lsitRef.current!.scrollHeight - lsitRef.current!.offsetHeight;
    lsitRef.current!.scrollTop = 99999;
  }, [message]);

  return (
    <div>
      <div className={styles.root}>
        <Headers center="小智同学" myStyles={{ position: "fixed" }}></Headers>
        <div className="bg" ref={lsitRef}>
          {message.map((item, index) => (
            <div
              key={index}
              className={classNames(
                item.type === "robot" ? "rightBox" : "leftBox"
              )}
            >
              <div className="img"></div>
              <div className="message">{item.text}</div>
            </div>
          ))}
        </div>

        <input
          type="text"
          value={value}
          onChange={(e) => {
            changeValue(e);
          }}
          onKeyDown={(e) => {
            keyDown(e);
          }}
        />
      </div>
    </div>
  );
}
