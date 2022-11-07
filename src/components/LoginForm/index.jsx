import React, { useEffect } from "react";

import { Form, Button, Input } from "antd";
import "./index.css";

function LoginForm(props) {
  const {
    handleLogin,
    setForm = () => {},
    size = "middle",
    label = false,
    isShow = true,
    onfocus = null,
  } = props;

  const [form] = Form.useForm();

  useEffect(() => {
    setForm(form);
  }, []);

  return (
    <Form
      autoComplete="off"
      requiredMark={false}
      layout="vertical"
      form={form}
      style={{ width: "90%", margin: "auto" }}
      onFinish={handleLogin}
      onFocus={onfocus}
    >
      <Form.Item
        label={label && "账号"}
        name="account"
        rules={[{ required: true, message: "必填项" }]}
      >
        <Input
          size={size}
          className="login-form-radius login-form-Input"
          bordered={true}
          autoComplete="off"
          placeholder="用户名或邮箱"
        />
      </Form.Item>
      <Form.Item
        label={label && "密码"}
        name="password"
        rules={[{ required: true, message: "必填项" }]}
      >
        <Input.Password
          visibilityToggle={isShow}
          size={size}
          className="login-form-radius login-form-Input"
          autoComplete="off"
          placeholder="密码"
        />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          className="login-form-radius login-form-btn"
          block
        >
          登录
        </Button>
      </Form.Item>
    </Form>
  );
}
export default LoginForm;
