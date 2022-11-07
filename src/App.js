import React, { Suspense, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import "./App.css";
import { Routes, useLocation, useNavigate } from "react-router-dom";
import { mapRoutes } from "./routes";
import Header from "./components/Header";
import { BackTop, notification } from "antd";
import LoginModal from "./components/LoginModal";

function App(props) {
  const { token, isLogin } = props;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const headerRef = useRef();

  // react 路由守卫
  useEffect(() => {
    const infoRegExp = new RegExp("/user");
    if ((pathname === "/login" || pathname === "/register") && token) {
      navigate("/");
    }
    if (infoRegExp.test(pathname) && token === null) {
      notification["info"]({
        message: "页面跳转提示",
        description: "当前未登录！正在跳转到登录页面",
      });
      navigate("/login");
    }
  }, [pathname, token]);

  // 侦听header头部设置楼下高度
  const [minHeader, setMinHeader] = useState(0);

  // 侦听头部方法
  const interceptHeader = () => {
    return setMinHeader(headerRef.current.scrollHeight);
  };

  useEffect(() => {
    interceptHeader();
    window.addEventListener("resize", interceptHeader);
    return () => {
      window.removeEventListener("resize", interceptHeader);
    };
  }, []);

  return (
    <div
      className="App"
      style={{ "--main-min-height": `calc(100vh - ${minHeader}px)` }}
    >
      <div ref={headerRef}>
        <Header></Header>
      </div>

      <div className={`wd-routes ${pathname === "/login" && "w-flex"}`}>
        <Suspense fallback={<>加载中</>}>
          <Routes>{mapRoutes.map((e) => e)}</Routes>
        </Suspense>
      </div>
      {isLogin && <LoginModal />}
      <BackTop />
    </div>
  );
}

export default connect(
  (state) => ({ token: state.userToken.token, isLogin: state.loginModal }),
  {}
)(App);
