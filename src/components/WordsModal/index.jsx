import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { closeModal } from "../../redux/actions/formModal";

import { Form, Modal, Input, Select, InputNumber } from "antd";
import qs from "query-string";
const { Option } = Select;

function WordsForm(props) {
  const navigate = useNavigate();
  const { isOpen, closeModal } = props;
  const [form] = Form.useForm();

  const [isDays, setIsDays] = useState(true);

  const handleOK = () => {
    return form
      .validateFields()
      .then((val) => {
        const { typeTerm, keyValue, num } = val;
        const str = qs.stringify({
          [typeTerm]: keyValue,
          num,
          isDic: true,
        });
        closeModal();
        form.resetFields();
        return navigate(`/getword?${str}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (val) => {
    form.setFieldsValue({
      typeTerm: val,
      keyValue: val === "dayNum" ? 1 : "",
      num: 50,
    });
    return setIsDays(val === "dayNum");
  };

  return (
    <Modal
      title="选择单词背诵"
      visible={isOpen}
      onCancel={() => closeModal()}
      onOk={handleOK}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          typeTerm: "dayNum",
          keyValue: 1,
          num: 50,
        }}
      >
        <Form.Item label="查询条件" name="typeTerm">
          <Select onChange={handleChange}>
            <Option value="dayNum">天数</Option>
            <Option value="wordID">单词</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="选择单词/天数"
          name="keyValue"
          rules={[
            {
              required: true,
              message: "请输入开始的单词/天数",
            },
          ]}
        >
          {isDays ? (
            <InputNumber autoComplete="off"></InputNumber>
          ) : (
            <Input autoComplete="off"></Input>
          )}
        </Form.Item>
        <Form.Item
          label="数量"
          name="num"
          rules={[{ required: true, message: "单词数量是必填项" }]}
        >
          <InputNumber autoComplete="off"></InputNumber>
        </Form.Item>
      </Form>
    </Modal>
  );
}
export default connect((state) => ({ isOpen: state.formModal }), {
  closeModal,
})(WordsForm);
