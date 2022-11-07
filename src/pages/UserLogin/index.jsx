import React, { useState } from "react";

import { Row, Col } from "antd";
import { connect } from "react-redux";
import "./index.css";

import PcLogin from "../../components/PcLogin";
import MobileLogin from "../../components/MobileLogin";
import { loginAction } from "../../redux/actions/userToken";
import { useEffect } from "react";
function UserLogin(props) {
  const { loginAction } = props;

  const [isPC, setIsPC] = useState(true);

  // 侦听浏览器变化判断是否为移动端
  const setResize = () => {
    return setIsPC(document.body.offsetWidth >= 576);
  };

  useEffect(() => {
    setResize();
    window.addEventListener("resize", setResize);
    return () => {
      window.removeEventListener("resize", setResize);
    };
  }, []);

  return (
    // <div className="login">
    <Row justify="center" style={{ width: "100%" }}>
      <Col span={22}>
        {isPC ? (
          <PcLogin loginAction={loginAction} />
        ) : (
          <MobileLogin loginAction={loginAction} />
        )}
      </Col>
    </Row>

    // </div>
  );
}
export default connect(() => ({}), { loginAction })(UserLogin);
