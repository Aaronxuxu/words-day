import React, { useState } from "react";

import { Input, Form, Button, Row, Col, message } from "antd";
import { connect } from "react-redux";
import { loginAction } from "../../redux/actions/userToken";

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
    <Row justify="center" style={{ marginTop: "15px" }}>
      <Col xs={24} sm={12}>
        <Form
          form={form}
          autoComplete="off"
          onFinish={handleLogin}
          initialValues={{
            account: "Aaron",
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
      </Col>
    </Row>
  );
}
export default connect(() => ({}), { loginAction })(UserLogin);
