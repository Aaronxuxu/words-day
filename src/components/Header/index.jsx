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
  Drawer,
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  AlignCenterOutlined,
  UserOutlined,
  SelectOutlined,
  LogoutOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { openModal } from "../../redux/actions/formModal";
import { logoutAction } from "../../redux/actions/userToken";
import { clearAllUserInfoAction } from "../../redux/actions/user";
import { BASE_IMAGE_URL } from "../../uitil/constans";
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

  const handleNav = () => {};

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
      key: "/depot/",
      label: "词汇库",
    },
  ];

  const showDrawer = () => {
    console.log(1);
    setOpen(true);
  };
  const mobileNav = (path) => {
    setOpen(false);
    return navigate(path);
  };
  return (
    <Affix offsetTop={0}>
      <Row className="wd-header" align="middle" justify="space-between">
        <Col>
          <Row>
            <Col xs={24} sm={0}>
              <Button
                type="text"
                size="large"
                icon={<AlignCenterOutlined></AlignCenterOutlined>}
                onClick={showDrawer}
              />
              <Drawer
                width={"65%"}
                placement="left"
                onClose={() => setOpen(false)}
                visible={open}
                closable={false}
                headerStyle={{ borderBottom: "none", paddingBottom: "0" }}
                bodyStyle={{ paddingTop: "0" }}
                title={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "end",
                    }}
                  >
                    <Button
                      onClick={() => setOpen(false)}
                      size="large"
                      type="text"
                      icon={<CloseOutlined />}
                    />
                  </div>
                }
              >
                {headerNav.map((e) => (
                  <Button
                    key={e.key}
                    block
                    type="text"
                    onClick={() => mobileNav(e.key)}
                    size="large"
                    style={{ fontWeight: 700, fontSize: "20px" }}
                  >
                    {e.label}
                  </Button>
                ))}
              </Drawer>
            </Col>
            <Col xs={0} sm={24}>
              <Space>
                {headerNav.map((e) => (
                  <Button
                    type="text"
                    key={e.key}
                    onClick={() => navigate(e.key)}
                  >
                    {e.label}
                  </Button>
                ))}
              </Space>
            </Col>
          </Row>
        </Col>
        <Col>
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
                    src={userAvatar !== null ? BASE_IMAGE_URL + userAvatar : ""}
                  ></Avatar>
                }
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
export default connect((state) => ({ userToken: state.userToken }), {
  openModal,
  logoutAction,
  clearAllUserInfoAction,
})(Header);
