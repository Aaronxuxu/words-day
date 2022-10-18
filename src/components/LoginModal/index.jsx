import React, { useEffect, useState, useRef } from "react";
import { Form, Input, Button, message } from "antd";
import { connect } from "react-redux";
import IconFont from "../../uitil/IconFont";
import { closeLoginMadlAction } from "../../redux/actions/loginModal";
import { loginAction } from "../../redux/actions/userToken";

import "./index.css";

function LoginModal(props) {
  const { loginAction } = props;
  const intervalOptRef = useRef();
  const intervalTransRef = useRef();
  const { closeLoginMadlAction } = props;

  const [opa, setOpa] = useState(0);
  const [trans, setTrans] = useState(0);

  const [form] = Form.useForm();

  // 隐藏显示
  const opcative = (key) => {
    let result = 0;
    let start = 0;
    let end = 0;
    if (key === "open") {
      start = 0;
      end = 100;
    } else {
      start = 100;
      end = 0;
    }

    let w = start > end;

    intervalOptRef.current = setInterval(() => {
      if (w) {
        result = Math.floor((end - start) / 5);
      } else {
        result = Math.ceil((end - start) / 5);
      }

      start = result + start;

      setOpa(start / 100);
      if (end === start) {
        if (key === "close") {
          closeLoginMadlAction();
        }
        return clearInterval(intervalOptRef.current);
      }
    }, 20);
  };

  // 移动数值
  const transform = (key) => {
    let result = 0;
    let start = 0;
    let end = 0;

    if (key === "open") {
      start = 100;
      end = 0;
    } else {
      start = 0;
      end = 100;
    }

    let w = start > end;

    intervalTransRef.current = setInterval(() => {
      if (w) {
        result = Math.floor((end - start) / 4);
      } else {
        result = Math.ceil((end - start) / 4);
      }

      start = result + start;

      setTrans(start);
      if (end === start) {
        return clearInterval(intervalTransRef.current);
      }
    }, 20);
  };

  // 关闭弹窗
  const handleClose = () => {
    opcative("close");
    transform("close");
  };

  useEffect(() => {
    opcative("open");
    transform("open");
    return () => {
      clearInterval(intervalOptRef.current);
      clearInterval(intervalTransRef.current);
    };
  }, []);

  // 登录操作
  const handleLogin = async (value) => {
    try {
      await loginAction(value);
      message.success({
        className: "loginModal-message ",
        content: "登录成功，正在跳转回首页",
      });
    } catch (error) {
      message.error({
        className: "loginModal-message ",
        content: error,
      });
    }
    form.resetFields();
    opcative("close");
    transform("close");
  };

  return (
    <div className="loginModal" style={{ opacity: opa }}>
      <div
        className="loginModal-body"
        style={{ transform: `translateY(${trans}px)`, opacity: opa }}
      >
        <div className="loginModal-body-title">
          {/* 图片位置，待修改上线修改路径 */}

          <img
            className="loginModal-body-title-logo"
            src="../../assests/horizontalLogo.png"
            alt=""
          />

          <div className="loginModal-body-title-close" onClick={handleClose}>
            <IconFont type="icon-close"></IconFont>
          </div>
        </div>
        <div className="loginModal-body-form">
          <Form
            form={form}
            style={{ width: "90%", margin: "auto" }}
            onFinish={handleLogin}
          >
            <Form.Item
              name="account"
              rules={[{ required: true, message: "必填项" }]}
            >
              <Input
                className="loginModal-body-form-radius"
                bordered={true}
                autoComplete="off"
                placeholder="用户名或邮箱"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "必填项" }]}
            >
              <Input.Password
                className="loginModal-body-form-radius"
                autoComplete="off"
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
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
