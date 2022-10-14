import React from "react";
import { Form, Input, Button } from "antd";
import { connect } from "react-redux";
import IconFont from "../../uitil/IconFont";
import { closeLoginMadlAction } from "../../redux/actions/loginModal";
import { loginAction } from "../../redux/actions/userToken";

import "./index.css";

function LoginModal(props) {
  const { isLogin, closeLoginMadlAction } = props;

  return (
    <div
      className="loginModal"
      style={{
        display: isLogin ? "block" : "none",
      }}
    >
      <div className="loginModal-mask"></div>

      <div className="loginModal-body">
        <div className="loginModal-body-title">
          {/* 图片位置，待修改上线修改路径 */}

          <img
            className="loginModal-body-title-logo"
            src="../../assests/horizontalLogo.png"
            alt=""
          />

          <div
            className="loginModal-body-title-close"
            onClick={() => closeLoginMadlAction()}
          >
            <IconFont type="icon-close"></IconFont>
          </div>
        </div>

        <div className="loginModal-body-form">
          <Form style={{ width: "90%", margin: "auto" }}>
            <Form.Item name="account">
              <Input
                className="loginModal-body-form-radius"
                bordered={true}
                autoComplete="off"
                placeholder="用户名或邮箱"
              />
            </Form.Item>
            <Form.Item name="password">
              <Input.Password
                className="loginModal-body-form-radius"
                autoComplete="off"
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item>
              <Button
                className="loginModal-body-form-radius loginModal-body-form-btn"
                block
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default connect((state) => ({ isLogin: state.loginModal }), {
  closeLoginMadlAction,
  loginAction,
})(LoginModal);
