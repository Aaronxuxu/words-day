import React, { useEffect, useState, useRef } from "react";
import { message } from "antd";
import { connect } from "react-redux";
import IconFont from "../../uitil/IconFont";
import { closeLoginMadlAction } from "../../redux/actions/loginModal";
import { loginAction } from "../../redux/actions/userToken";
import LoginForm from "../LoginForm";
import "./index.css";

function LoginModal(props) {
  const { loginAction } = props;
  const intervalOptRef = useRef();
  const intervalTransRef = useRef();
  const { closeLoginMadlAction } = props;

  const [opa, setOpa] = useState(0);
  const [trans, setTrans] = useState(0);
  const [form, setForm] = useState(null);

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
      result = (end - start) / 10;
      result = w ? Math.floor(result) : Math.ceil(result);

      start = result + start;

      setOpa(start / 100);
      if (end === start) {
        if (key === "close") {
          closeLoginMadlAction();
        }
        return clearInterval(intervalOptRef.current);
      }
    }, 1);
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
      result = (end - start) / 10;
      result = w ? Math.floor(result) : Math.ceil(result);

      start = result + start;

      setTrans(start);
      if (end === start) {
        return clearInterval(intervalTransRef.current);
      }
    }, 1);
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
        content: "登录成功，正在跳转回首页",
      });
    } catch (error) {
      message.error({
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
        style={{ transform: `translateY(${trans}px)` }}
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
          <LoginForm handleLogin={handleLogin} setForm={setForm} />
        </div>
      </div>
    </div>
  );
}

export default connect((state) => ({ isLogin: state.loginModal }), {
  closeLoginMadlAction,
  loginAction,
})(LoginModal);
