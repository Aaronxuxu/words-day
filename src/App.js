import React, { Suspense } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import routes from "./routes";
import Header from "./components/Header";
import { BackTop } from "antd";
function App() {
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

export default App;
