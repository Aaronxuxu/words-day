import React from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Row, Col, Space } from "antd";

import { connect } from "react-redux";
import WordsModal from "../../../components/WordsModal";
import { openModal } from "../../../redux/actions/formModal";

import "./index.css";
const { Search } = Input;

function GetWordSearch(props) {
  const navigate = useNavigate();

  const onSearch = (val) => {
    console.log(val);
  };
  const handleShow = () => {
    return props.openModal();
  };

  const handleReset = () => {
    return navigate("/getword");
  };

  return (
    <Row
      wrap={false}
      align="middle"
      justify="center"
      className="getword-search"
      gutter={6}
    >
      <Col xs={24} sm={16}>
        <Search
          className="getword-search-fs"
          size="large"
          placeholder="搜索单词"
          onSearch={onSearch}
          enterButton
        />
      </Col>
      <Col xs={0} sm={4}>
        <Space wrap={true}>
          <Button onClick={handleShow} type="primary">
            选择
          </Button>
          <Button onClick={handleReset}>重置</Button>
        </Space>

        <WordsModal></WordsModal>
      </Col>
    </Row>
  );
}

export default connect((state) => ({ WORDS: state.WORDS }), { openModal })(
  GetWordSearch
);
