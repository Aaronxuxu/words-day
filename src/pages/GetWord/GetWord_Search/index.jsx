import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Input, Form, Button, InputNumber, Select, Space, Switch } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { connect } from "react-redux";

import qs from "query-string";
import "./index.css";
const { Search } = Input;
const { Option } = Select;

function GetWordSearch() {
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const { search } = useLocation();

  const [isDay, setIsDay] = useState();

  const onSearch = (val) => {
    console.log(val);
  };

  const handleChange = (val) => {
    setIsDay(val === "dayNum");
  };

  // 提交
  const handleFinish = (val) => {
    const { choseType, typeVal, num, isDic } = val;
    let obj = {
      [choseType]: typeVal,
      num,
      isDic,
    };
    return navigate(`/getword?${qs.stringify(obj)}`);
  };
  // 重置
  const onReset = () => {
    return navigate("/getword");
  };

  useEffect(() => {
    const qsSearch = qs.parse(search);

    form.setFieldsValue({
      choseType: qsSearch.dayNum ? "dayNum" : "wordID",
      typeVal: Number(qsSearch.dayNum) || qsSearch.wordID || "",
      num: Number(qsSearch.num) || 10,
      isDic: qsSearch.isDic === "true" ? true : false,
    });

    setIsDay(qsSearch.dayNum ? true : false);
  }, [search]);

  return (
    <div className="wd-getword-search">
      <Search
        className="getword-search-fs"
        size="large"
        placeholder="input search text"
        onSearch={onSearch}
        enterButton
      />
      <div className="getword-search-fs wd-getword-search-select">
        <Form layout="inline" onFinish={handleFinish} form={form}>
          <Form.Item name="choseType">
            <Select onChange={handleChange}>
              <Option value="wordID">单词</Option>
              <Option value="dayNum">天数</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="typeVal"
            rules={[{ required: true, message: "请填入必填项" }]}
          >
            {isDay ? (
              <InputNumber autoComplete="off" />
            ) : (
              <Input autoComplete="off" />
            )}
          </Form.Item>
          <Form.Item
            name="num"
            rules={[{ required: true, message: "请输入数量" }]}
          >
            <InputNumber min={10} />
          </Form.Item>
          <Form.Item label="是否默写" valuePropName="checked" name="isDic">
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
            />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
              <Button htmlType="button" onClick={onReset}>
                重置
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default connect((state) => ({ WORDS: state.WORDS }), {})(GetWordSearch);
