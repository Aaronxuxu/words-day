import React, { useState } from "react";

import { message, Space, Image, Typography } from "antd";
import "./index.css";
import LoginForm from "../LoginForm";
import { useEffect } from "react";
const { Title } = Typography;

function MobileLogin(props) {
  const { loginAction } = props;

  const [form, setForm] = useState(null);

  const handleLogin = async (value) => {
    try {
      await loginAction(value);
      message.success("登录成功，正在跳转回首页");
    } catch (error) {
      message.error(error);
    }
    form.resetFields();
  };

  const mobileFocus = (e) => {
    // if (e.target.className.includes("login-form-Input")) {
    //   // // 可见高度
    //   // let offSetHeight = document.body.offsetHeight;
    //   // // 目标高度
    //   // let curHeight = e.target.scrollHeight;
    //   // // 目标离可视区域高度
    //   // let offSetTop = e.target.getBoundingClientRect().top;
    //   message.success(
    //     `目标高度：${e.target.scrollHeight}，
    //     可见高度：${document.body.clientHeight}，
    //     离顶部的距离：${e.target.getBoundingClientRect().top}，
    //     屏幕分辨率高度：${window.screen.height}`
    //   );
    // }
  };

  return (
    <Space
      className="mobileLogin"
      direction="vertical"
      size={16}
      style={{
        "--login-form-input-padding": "15px 11px",
        "--login-form-btn-padding": "14px 12px",
      }}
    >
      <Image preview={false} src="/assests/loginPage-mobile.png" />
      <Title level={3}>登录</Title>
      <LoginForm
        isShow={false}
        size="large"
        setForm={setForm}
        handleLogin={handleLogin}
        onfocus={mobileFocus}
      />
    </Space>
  );
}

export default MobileLogin;
