import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import RouteTypo from "../../components/RouteTypo";

import { COURSECONTENT } from "../../uitil/content";

import { openLoginModalAction } from "../../redux/actions/loginModal";

import { Radio, Row, Col, Card } from "antd";

import "./index.css";

function Course(props) {
  const { userToken, openLoginModalAction } = props;
  const { pathname } = useLocation();

  // 登录
  const handleLogin = (e) => {
    e.preventDefault();
    return openLoginModalAction();
  };

  return (
    <div className="wd-course">
      {pathname === "/course/" ? (
        <Row>
          <Col xs={24} sm={18}>
            <RouteTypo context={COURSECONTENT}></RouteTypo>
            <Radio.Group defaultValue="a" buttonStyle="solid">
              <Radio.Button value="a">Hangzhou</Radio.Button>
              <Radio.Button value="b">Shanghai</Radio.Button>
              <Radio.Button value="c">Beijing</Radio.Button>
              <Radio.Button value="d">Chengdu</Radio.Button>
            </Radio.Group>
          </Col>
          <Col xs={0} sm={{ span: 5, offset: 1 }}>
            <Card
              title={userToken.token && "我的课程"}
              extra={
                !userToken.token && (
                  <a href="javascript;" onClick={(e) => handleLogin(e)}>
                    登录
                  </a>
                )
              }
            >
              <p>Card content</p>
            </Card>
          </Col>
        </Row>
      ) : (
        <Outlet />
      )}
    </div>
  );
}

export default connect((state) => ({ userToken: state.userToken }), {
  openLoginModalAction,
})(Course);
