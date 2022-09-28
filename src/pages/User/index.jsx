import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { routes } from "../../routes/index";
import UserNavLink from "../../components/UserNavLink";
import { Row, Col, Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import "./index.css";
import { BASE_IMAGE_URL } from "../../uitil/constans";

function User(props) {
  const { userAvatar } = props;

  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    setMenuItems(
      routes.find((e) => e.key === "user/").children.filter((e) => !e.index)
    );
  }, []);

  return (
    <Row className="user-row" wrap={false}>
      <Col xs={0} md={{ span: 4 }}>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Avatar
            size={{
              sm: 40,
              md: 60,
              lg: 60,
              xl: 80,
              xxl: 80,
            }}
            icon={<UserOutlined />}
            shape="square"
            src={userAvatar !== null ? BASE_IMAGE_URL + userAvatar : null}
          ></Avatar>
          <div className="user-left-nav">
            {menuItems.map((e) => (
              <UserNavLink key={e.key} to={e.key}>
                <Space>
                  {e.icon}
                  {e.label}
                </Space>
              </UserNavLink>
            ))}
          </div>
        </Space>
      </Col>
      <Col xs={24} md={{ span: 19, offset: 1 }}>
        <Outlet></Outlet>
      </Col>
    </Row>
  );
}
export default connect(
  (state) => ({
    userAvatar: state.userToken.userAvatar,
  }),
  {}
)(User);
