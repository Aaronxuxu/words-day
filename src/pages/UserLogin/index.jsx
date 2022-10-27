import React, { useState } from "react";

import { Input, Form, Button, Row, Col, message, Image } from "antd";
import { connect } from "react-redux";
import { loginAction } from "../../redux/actions/userToken";
import "./index.css";

function UserLogin(props) {
  const { loginAction } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const handleLogin = async (value) => {
    setIsLoading(true);
    try {
      await loginAction(value);
      message.success("登录成功，正在跳转回首页");
    } catch (error) {
      message.error(error);
    }
    form.resetFields();
    setIsLoading(false);
  };

  return (
    // <div className="login">
    <Row align="middle" style={{ width: "100%" }}>
      <Col span={0} md={12}>
        <Image
          style={{ width: "85%" }}
          preview={false}
          src="/assests/loginPage.png"
        ></Image>
      </Col>
      <Col span={24} md={{ span: 11, offset: 1 }}>
        <div className="login-form w-border">
          <Form
            requiredMark={false}
            layout="vertical"
            form={form}
            autoComplete="off"
            onFinish={handleLogin}
            initialValues={{
              account: "Julia",
              password: "Baekhyun1234",
            }}
          >
            <Form.Item
              label="账号"
              name="account"
              rules={[{ required: true, message: "必填项" }]}
            >
              <Input placeholder="请输入账号" autoFocus />
            </Form.Item>
            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: "必填项" }]}
            >
              <Input.Password placeholder="请输入密码" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
    // </div>
  );
}
export default connect(() => ({}), { loginAction })(UserLogin);
