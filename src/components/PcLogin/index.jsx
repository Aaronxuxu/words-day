import React, { useEffect } from "react";

import { Row, Col, Image, Typography, message } from "antd";
import LoginForm from "../LoginForm";
import "./index.css";
import { useState } from "react";

const { Title } = Typography;

function PcLogin(props) {
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

  return (
    <>
      <Row align="middle">
        <Col span={13}>
          <Image
            style={{ width: "70%" }}
            preview={false}
            src="/assests/loginPage.png"
          />
        </Col>
        <Col span={9}>
          <div className="login-form w-border">
            <Title level={4}>欢迎使用</Title>
            <LoginForm
              handleLogin={handleLogin}
              label={true}
              setForm={setForm}
            />
          </div>
        </Col>
      </Row>
    </>
  );
}

export default PcLogin;
