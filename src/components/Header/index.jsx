import React from "react";
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
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  AlignCenterOutlined,
  UserOutlined,
  SelectOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { openModal } from "../../redux/actions/formModal";
import { logoutAction } from "../../redux/actions/userInfo";
import "./index.css";

const { confirm } = Modal;
function Header(props) {
  const { openModal, userInfo, logoutAction } = props;

  const navigate = useNavigate();

  const handleReset = () => {
    return navigate("/getword");
  };

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
          label: <Link to="userInfo">个人中心</Link>,
          key: "info",
          icon: <UserOutlined />,
        },
        { label: "筛选词汇", key: "words", icon: <SelectOutlined /> },
        {
          type: "divider",
        },
        { label: "退出登录", key: "logout", icon: <LogoutOutlined /> },
      ]}
    ></Menu>
  );

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
              trigger={["click", "hover"]}
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
  logoutAction,
})(Header);
