import React from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Avatar, Row, Col, Button, Affix, Menu, Dropdown } from "antd";
import {
  AlignCenterOutlined,
  UserOutlined,
  SelectOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { openModal } from "../../redux/actions/formModal";

import "./index.css";

const menu = (
  <Menu
    items={[
      { label: "个人中心", key: "info", icon: <UserOutlined /> },
      { label: "筛选词汇", key: "words", icon: <SelectOutlined /> },
      {
        type: "divider",
      },
      { label: "退出登录", key: "logout", icon: <LogoutOutlined /> },
    ]}
  ></Menu>
);

function Header(props) {
  const { openModal, userInfo } = props;

  const navigate = useNavigate();

  const handleReset = () => {
    return navigate("/getword");
  };

  return (
    <Affix offsetTop={0}>
      <Row className="wd-header" align="middle" justify="space-between">
        <Col sm={0}>
          <Button type="text" onClick={() => openModal()}>
            <AlignCenterOutlined />
          </Button>
        </Col>
        <Col sm={0}>
          <Button type="text" onClick={handleReset}>
            重置
          </Button>
        </Col>
        <Col sm={{ span: 2, offset: 22 }}>
          {userInfo ? (
            <Dropdown
              placement="bottomRight"
              overlay={menu}
              trigger={["click"]}
              arrow={{
                pointAtCenter: true,
              }}
            >
              <Button
                type="link"
                size="large"
                icon={<Avatar></Avatar>}
              ></Button>
            </Dropdown>
          ) : (
            <Button type="link" onClick={() => navigate("/login")}>
              登录
            </Button>
          )}
        </Col>
      </Row>
    </Affix>
  );
}
export default connect((state) => ({ userInfo: state.userInfo }), {
  openModal,
})(Header);
