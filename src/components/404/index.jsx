import React from "react";
import { useNavigate } from "react-router-dom";
import { Result, Button } from "antd";

function Page404() {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="很抱歉，该页面不存在！"
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          回到首页
        </Button>
      }
    />
  );
}
export default Page404;
