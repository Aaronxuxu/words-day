import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Avatar,
  Modal,
  Row,
  Col,
  Button,
  Affix,
  Menu,
  Dropdown,
  notification,
  Space,
} from "antd";
import {
  UserOutlined,
  SelectOutlined,
  LogoutOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { openModal } from "../../redux/actions/formModal";
import { logoutAction } from "../../redux/actions/userToken";
import { clearAllUserInfoAction } from "../../redux/actions/user";
import { BASE_IMAGE_URL } from "../../uitil/constans";
import HeaderXsNav from "./HeaderXsNav";
import "./index.css";

const { confirm } = Modal;
function Header(props) {
  const {
    openModal,
    userToken,
    logoutAction,
    clearAllUserInfoAction,
    userToken: { userAvatar },
  } = props;

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClick = ({ key }) => {
    if (key === "logout") {
      confirm({
        title: "确定要退出吗？",
        icon: <ExclamationCircleOutlined />,
        content: "退出可继续使用，但无法查询已学部分",
        maskClosable: true,
        async onOk() {
          try {
            await logoutAction();
            await clearAllUserInfoAction();
            notification["success"]({
              message: "退出成功！",
              description: "正在跳转回首页",
            });
            navigate("/");
          } catch (error) {
            notification["error"]({
              message: error,
              description: "如出现多次退出未成功，请联系管理员。",
            });
          }
        },
      });
    }
  };

  const menu = (
    <Menu
      onClick={handleClick}
      items={[
        {
          label: <Link to="user">个人中心</Link>,
          key: "info",
          icon: <UserOutlined />,
        },
        {
          label: <Link to="user/session/all/">进度管理</Link>,
          key: "words",
          icon: <SelectOutlined />,
        },
        {
          type: "divider",
        },
        { label: "退出登录", key: "logout", icon: <LogoutOutlined /> },
      ]}
    ></Menu>
  );

  const headerNav = [
    {
      key: "/",
      label: "首页",
    },
    {
      key: "/course/",
      label: "学习",
    },
    {
      key: "/depots/",
      label: "词汇库",
    },
  ];

  return (
    <Affix offsetTop={0}>
      <Row className="wd-header" align="middle">
        <Col xs={24} sm={0}>
          <HeaderXsNav handleClick={handleClick} userToken={userToken} />
        </Col>
        <Col xs={0} sm={{ span: 20, offset: 2 }}>
          <div className="wd-header-sm-nav">
            <Space>
              {headerNav.map((e) => (
                <Button
                  style={{ color: "black" }}
                  type="link"
                  key={e.key}
                  onClick={() => navigate(e.key)}
                >
                  {e.label}
                </Button>
              ))}
            </Space>
            {userToken.token ? (
              <Dropdown
                placement="bottomRight"
                overlay={menu}
                trigger={["click", "hover"]}
                arrow={{
                  pointAtCenter: true,
                }}
              >
                <Button
                  type="link"
                  size="large"
                  icon={
                    <Avatar
                      src={
                        userAvatar !== null ? BASE_IMAGE_URL + userAvatar : ""
                      }
                    ></Avatar>
                  }
                ></Button>
              </Dropdown>
            ) : (
              <Button type="link" onClick={() => navigate("/login")}>
                登录
              </Button>
            )}
          </div>
        </Col>
      </Row>
    </Affix>
  );
}
export default connect((state) => ({ userToken: state.userToken }), {
  openModal,
  logoutAction,
  clearAllUserInfoAction,
})(Header);
