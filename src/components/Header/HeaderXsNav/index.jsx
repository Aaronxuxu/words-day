import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Button, Drawer, Divider } from "antd";

import {
  AlignCenterOutlined,
  CloseOutlined,
  RightOutlined,
} from "@ant-design/icons";
import "./index.css";

const userNav = [
  { key: "/user/", label: "个人资料" },
  { key: "/user/session/all", label: "进度管理" },
];

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

function HeaderXsNav(props) {
  const { userToken, handleClick } = props;
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const mobileNav = (path) => {
    setOpen(false);
    return navigate(path);
  };
  return (
    <>
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
        bodyStyle={{
          paddingTop: "0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        title={
          <div className="headerXs-title">
            <Button
              onClick={() => setOpen(false)}
              size="large"
              type="text"
              icon={<CloseOutlined />}
            />
          </div>
        }
      >
        <div>
          {headerNav.map((e) => (
            <Button
              key={e.key}
              block
              type="text"
              onClick={() => mobileNav(e.key)}
              size="large"
            >
              <div className="headerNav-Btn">
                {e.label}
                <RightOutlined />
              </div>
            </Button>
          ))}
          {pathname.includes("/user") && (
            <>
              <Divider></Divider>
              {userNav.map((e) => (
                <Button
                  key={e.key}
                  block
                  type="text"
                  onClick={() => mobileNav(e.key)}
                  size="large"
                >
                  <div className="headerNav-Btn">
                    {e.label}
                    <RightOutlined />
                  </div>
                </Button>
              ))}
            </>
          )}
        </div>

        {userToken.token ? (
          <div>
            <Button
              block
              type="text"
              size="large"
              onClick={() => {
                setOpen(false);
                return navigate("/user");
              }}
            >
              <div className="headerNav-Btn">
                我的中心
                <RightOutlined />
              </div>
            </Button>
            <Button
              block
              type="text"
              size="large"
              onClick={() => {
                setOpen(false);
                return handleClick({ key: "logout" });
              }}
            >
              <div className="headerNav-Btn">
                退出登录
                <RightOutlined />
              </div>
            </Button>
          </div>
        ) : (
          <>
            <Button
              block
              type="text"
              size="large"
              onClick={() => {
                setOpen(false);
                return navigate("/login");
              }}
            >
              <div className="headerNav-Btn">
                登录
                <RightOutlined />
              </div>
            </Button>
          </>
        )}
      </Drawer>
    </>
  );
}

export default HeaderXsNav;
