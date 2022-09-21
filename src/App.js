import React, { Suspense, useEffect } from "react";
import { connect } from "react-redux";
import "./App.css";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import routes from "./routes";
import Header from "./components/Header";
import { BackTop, notification } from "antd";
function App(props) {
  const { userInfo } = props;
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // react 路由守卫
  useEffect(() => {
    const infoRegExp = new RegExp("/userInfo");
    if ((pathname === "/login" || pathname === "/register") && userInfo) {
      navigate("/");
    }
    if (infoRegExp.test(pathname) && userInfo === null) {
      notification["info"]({
        message: "页面跳转提示",
        description: "当前未登录！正在跳转到登录页面",
      });
      navigate("/login");
    }
  }, [pathname, userInfo]);

  return (
    <div className="App">
      <Header></Header>
      <div className="wd-routes">
        <Suspense fallback={<>加载中</>}>
          <Routes>
            {routes.map((e) => (
              <Route path={e.path} key={e.path} element={<e.element />}></Route>
            ))}
          </Routes>
        </Suspense>
      </div>
      <BackTop />
    </div>
  );
}

export default connect((state) => ({ userInfo: state.userInfo }), {})(App);
