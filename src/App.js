import React, { Suspense, useEffect, lazy } from "react";
import { connect } from "react-redux";
import "./App.css";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { mapRoutes } from "./routes";
import Header from "./components/Header";
import { BackTop, notification } from "antd";

const GetWord = lazy(() => import("./pages/GetWord"));

function App(props) {
  const { token } = props;
  const { pathname } = useLocation();
  const navigate = useNavigate();

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

  return (
    <div className="App">
      <Header></Header>
      <div className="wd-routes">
        <Suspense fallback={<>加载中</>}>
          <Routes>
            <Route index element={<GetWord />}></Route>
            {mapRoutes.map((e) => e)}
          </Routes>
        </Suspense>
      </div>
      <BackTop />
    </div>
  );
}

export default connect((state) => ({ token: state.userToken.token }), {})(App);
