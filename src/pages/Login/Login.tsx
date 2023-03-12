import React, { useState } from "react";
import Header from "@/components/Header";
import { useFormik } from "formik";
import * as Yup from "yup";

import styled from "styled-components";
import { login, sendCodes } from "@/api/login";
import { Toast } from "antd-mobile";
import { useDispatch } from "react-redux";
import { saveToken } from "@/store/actions/login";
import { useNavigate } from "react-router-dom";
import { setTokenInfo } from "@/utils/storage";
const InputBox = styled.form`
  width: 95%;
  margin: auto;
  margin-top: 20px;
  overflow: hidden;
  .inputBox {
    display: flex;
    align-items: center;
    flex-direction: column;
    .top {
      margin-top: 20px;
    }
    /* justify-content: space-between; */
    input {
      /* background-color: #c0a8a8; */
      width: 300px;
      height: 35px;
      border-bottom: 1px solid gray;
    }

    .erro {
      color: red;
      font-size: 14px;
      height: 20px;
      /* margin-left: 10px; */
    }
    .bottom {
      width: 300px;
      margin-top: 20px;

      input {
        width: 220px;
      }
      .codeBox {
        input {
          border: none;
        }
        display: flex;
        align-items: center;
        border-bottom: 1px solid gray;

        .code {
          width: 80px;
          height: 35px;
          text-align: center;
          font-size: 12px;
          line-height: 35px;
        }
      }
    }
  }
  button {
    width: 200px;
    height: 35px;
    color: white;
    text-align: center;
    margin: auto;
    background-color: skyblue;
    margin-top: 40px;
  }
`;

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      mobile: "13911111111",
      code: "246810",
    },
    onSubmit: async (values) => {
      const res = await login(values);
      dispatch(saveToken(res.data));
      setTokenInfo(res.data);
      navigate("/home");
    },
    validationSchema: Yup.object({
      mobile: Yup.string()
        .required("手机号不能为空")
        .matches(/^1[3-9]\d{9}$/, "手机格式不正确"),
      code: Yup.string()
        .required("验证码不能为空")
        .matches(/^\d{6}$/, "验证码格式错误"),
    }),
  });
  const {
    values: { code, mobile },
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
  } = formik;
  const [time, setTime] = useState(0);

  const sendCode = async () => {
    if (time > 0) return;

    await sendCodes(mobile);
    Toast.show({
      content: "发送成功",
    });

    if (!/^1[3-9]\d{9}$/.test(mobile)) {
      formik.setTouched({
        mobile: true,
      });
      return;
    }
    setTime(60);
    // 当我们每次都想要获取到最新的状态，需要写成 箭头函数的形
    let timeId = setInterval(() => {
      return setTime((time) => {
        if (time === 1) {
          clearInterval(timeId);
        }
        return time - 1;
      });
    }, 1000);
  };

  return (
    <div>
      <Header center="登录"></Header>
      <InputBox onSubmit={handleSubmit}>
        <h3>短信登录</h3>
        <div className="inputBox">
          <div className="top">
            <input
              name="mobile"
              value={mobile}
              onChange={handleChange}
              onBlur={() => handleBlur}
              autoComplete="off"
              type="text"
              placeholder="请输入手机号"
            />
            <div className="erro">{errors.mobile}</div>
          </div>
          <div className="bottom">
            <div className="codeBox">
              <input
                name="code"
                value={code}
                onChange={handleChange}
                onBlur={() => handleBlur}
                autoComplete="off"
                type="text"
                placeholder="请输入验证码"
              />
              <div className="code" onClick={() => sendCode()}>
                {time ? `${time}s后重新发送` : "发送验证码"}
              </div>
            </div>
            <div className="erro">{errors.code}</div>
          </div>
        </div>
        <button type="submit">登录</button>
      </InputBox>

      {/* <Header center="登录" right={<Icon type="icon-gengduo"></Icon>}></Header> */}
    </div>
  );
}
