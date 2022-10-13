import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Input, Button, Row, Col, Space, Radio, Select } from "antd";

import { connect } from "react-redux";
import WordsModal from "../../../components/WordsModal";
import { openModal } from "../../../redux/actions/formModal";
import SearchSelect from "../../../components/SearchSelect";
import { getTypeByName } from "../../../api/axios";
import "./index.css";

import qs from "query-string";

const { Search } = Input;

const checkOption = [
  { label: "单词", value: "words" },
  { label: "固定搭配", value: "fixedcol" },
  { label: "常见短语", value: "phrases" },
  { label: "真题例句", value: "examplesentence" },
];

function DepotsSearch(props) {
  const { WORDS } = props;
  const [searchVal, setSearchVal] = useState();
  const [radioValue, setRadioValue] = useState();
  const { search, pathname } = useLocation();

  const navigate = useNavigate();

  let searchObj = qs.parse(search);

  // 搜索关键词，变更词汇种类，变更全选选择框
  const handleAlter = (key, value) => {
    if (key === "ctypeName") {
      searchObj = { ...searchObj, ctypeName: value, pageNo: 1 };
    } else if (key === "searchVal") {
      searchObj = {
        ...searchObj,
        searchVal: value === "" ? undefined : value,
        pageNo: 1,
      };
    } else if (key === "select") {
      searchObj = { ...searchObj, props: value, pageNo: 1 };
    } else {
      searchObj = { ...searchObj, props: value.target.value, pageNo: 1 };
      setRadioValue(value.target.value);
    }

    return navigate(`${pathname}?${qs.stringify(searchObj)}`);
  };

  useEffect(() => {
    if (Object.keys(WORDS).length > 0) {
      setRadioValue(WORDS.props);
      setSearchVal(WORDS.searchVal);
    }
  }, [WORDS]);

  return (
    <>
      <Row
        align="middle"
        justify="center"
        className="getword-search"
        gutter={[6, 15]}
      >
        <Col xs={24} sm={16}>
          <Search
            allowClear={true}
            className="getword-search-fs"
            size="large"
            placeholder="搜索单词"
            onSearch={(val) => handleAlter("searchVal", val)}
            enterButton
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          />
        </Col>
        {/* 待重写 */}
        <Col xs={0} sm={4}>
          <Space wrap={true}>
            <Button onClick={() => props.openModal()} type="primary">
              选择
            </Button>
            <Button onClick={() => navigate("/")}>重置</Button>
          </Space>
          <WordsModal></WordsModal>
        </Col>

        {/* 筛选分类、筛选单词、固定搭配、例句、短语或全部 */}
        <Col xs={24} sm={18}>
          <Row align="middle" justify="center">
            <Col xs={12} sm={6}>
              <SearchSelect
                selectValue={WORDS.ctypeName}
                style={{ width: "100%" }}
                optVal="ctypeName"
                API={getTypeByName}
                onChange={(val) => handleAlter("ctypeName", val)}
              />
            </Col>
            <Col xs={0} sm={{ span: 17, offset: 1 }} flex="unset">
              <Radio.Group
                onChange={(e) => handleAlter("radio", e)}
                value={radioValue}
                options={checkOption}
              ></Radio.Group>
            </Col>
            <Col xs={{ span: 8, offset: 1 }} sm={0}>
              <Select
                options={checkOption}
                style={{ width: "100%" }}
                value={radioValue}
                onChange={(val) => handleAlter("select", val)}
              ></Select>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default connect((state) => ({ WORDS: state.WORDS }), { openModal })(
  DepotsSearch
);
