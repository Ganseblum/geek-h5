import { RootState } from "@/store";
import { getProfile } from "@/store/actions/profile";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { List, DatePicker, Picker, Toast, Popup } from "antd-mobile";
import { formDate } from "@/utils/methods";
import styles from "./index.module.scss";
import { editUserInfo, upDatePhotos } from "@/api/login";
import { removeTokenInfo } from "@/utils/storage";
import { useNavigate } from "react-router-dom";
import EditInfo from "./components/editInfo";

export default function Index() {
  // let [info, setInfo] = useState<userDet>();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.profile.profile);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch, user.gender]);

  const [visibleDate, setVisibleDate] = useState(false);
  const [visibleSex, setVisibleSex] = useState(false);

  const basicColumns = [
    [
      { label: "男", value: "0" },
      { label: "女", value: "1" },
    ],
  ];
  const [value, setValue] = useState<(string | null)[]>([`${user.gender}`]);

  const saveUserDet = () => {
    editUserInfo({
      gender: value[0] as string,
    }).then((res) => {
      Toast.show({
        content: "更改成功",
      });
    });
  };

  const navigate = useNavigate();
  const outLogin = () => {
    navigate("/login");

    removeTokenInfo();
  };

  const fileRef = useRef<HTMLInputElement>(null);
  const upDateFile = () => {
    fileRef.current?.click();
  };

  const changPhoto = (e: any) => {
    const flie = e?.target.files[0];
    const formData = new FormData();
    formData.append("photo", flie);
    upDatePhotos(flie).then((res) => {
      console.log(111);
    });
  };

  const [visible, setVisible] = useState(false);
  return (
    <div className={styles.root}>
      {user.birthday && (
        <div>
          <List>
            <List.Item
              onClick={() => {
                upDateFile();
              }}
              extra={
                <div className="imgItem">{<img src={user.photo} alt="" />}</div>
              }
            >
              简介
              <input
                type="file"
                onChange={(e) => {
                  changPhoto(e);
                }}
                ref={fileRef}
                style={{ display: "none" }}
              />
            </List.Item>
            <List.Item
              onClick={() => {
                setVisible(true);
              }}
              extra={user.intro ? user.intro : "未开启"}
            >
              手机
            </List.Item>

            <Popup
              visible={visible}
              onMaskClick={() => {
                setVisible(false);
              }}
              position="right"
              bodyStyle={{ width: "100vw" }}
            >
              <EditInfo
                info={user.intro ? user.intro : ""}
                hidePop={() => {
                  setVisible(false);
                }}
              ></EditInfo>
            </Popup>
            <List.Item
              onClick={() => {
                setVisibleSex(true);
              }}
              extra={
                <Picker
                  columns={basicColumns}
                  value={value}
                  onConfirm={(e) => {
                    setValue(e);
                  }}
                  onClose={() => {
                    setVisibleSex(false);
                  }}
                  visible={visibleSex}
                >
                  {(items, { open }) => {
                    return (
                      <>
                        {/* {items.every((item) => item === null)
                      ? "未选择"
                      : items
                          .map((item) => item?.label ?? "未选择")
                          .join(" - ")} */}
                        {value[0] === "0" ? "男" : "女"}
                      </>
                    );
                  }}
                </Picker>
              }
            >
              性别
            </List.Item>
            <List.Item
              onClick={() => {
                setVisibleDate(true);
              }}
              extra={
                <DatePicker
                  title="时间选择"
                  visible={visibleDate}
                  onClose={() => {
                    setVisibleDate(false);
                  }}
                  min={new Date("1900-01-01")}
                  max={new Date()}
                  defaultValue={new Date(String(user.birthday))}
                >
                  {(value) => formDate(value)}
                </DatePicker>
              }
            >
              出生日期
            </List.Item>
          </List>
          <div className="btnBox">
            <button
              className="saveBox"
              onClick={() => {
                saveUserDet();
              }}
            >
              保存信息
            </button>
            <button
              className="outBox"
              onClick={() => {
                outLogin();
              }}
            >
              退出登录
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
