import React from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Avatar, Row, Col, Button, Affix } from "antd";
import { AlignCenterOutlined } from "@ant-design/icons";
import { openModal } from "../../redux/actions/formModal";

import "./index.css";
function Header(props) {
  const { openModal } = props;
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
          <Avatar></Avatar>
        </Col>
      </Row>
    </Affix>
  );
}
export default connect(() => ({}), { openModal })(Header);
