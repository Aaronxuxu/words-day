import React from "react";
import { useNavigate } from "react-router-dom";

import { addWord } from "../../api/axios";

import { Form, Input, Button, message } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import "./index.css";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 4,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 20,
    },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 20,
      offset: 4,
    },
  },
};

function AddWord() {
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const handleFinish = async (values) => {
    const { status, data, msg } = await addWord(values);
    console.log(status, data, msg);
    if (status !== 0) {
      message.error(msg);
    } else {
      message.success("成功");
    }
    form.resetFields();
  };
  const handleNext = (fnc, e) => {
    if (e.keyCode === 40) {
      return fnc();
    }
  };
  return (
    <div className="addword">
      <Button onClick={() => navigate({ pathname: "/" })}>回到首页</Button>
      <Form
        form={form}
        name="dynamic_form_item"
        {...formItemLayoutWithOutLabel}
        onFinish={handleFinish}
      >
        <Form.Item
          {...formItemLayout}
          label="英语单词"
          name="word"
          rules={[
            {
              required: true,
              message: "该选项为必填项",
            },
          ]}
        >
          <Input
            autoFocus
            placeholder="输入英语单词"
            style={{
              width: "90%",
            }}
            autoComplete="off"
          ></Input>
        </Form.Item>
        <Form.List
          name="cwords"
          rules={[
            {
              validator: async (_, names) => {
                if (!names) {
                  return Promise.reject(new Error("至少填入一个中文翻译"));
                }
              },
            },
          ]}
          initialValue={[""]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0
                    ? formItemLayout
                    : formItemLayoutWithOutLabel)}
                  label={index === 0 ? "单词中文" : ""}
                  required={true}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={["onChange", "onBlur"]}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "请填入英文翻译词语或删除此输入框",
                      },
                    ]}
                    noStyle
                  >
                    <Input
                      placeholder="英文翻译"
                      style={{
                        width: "80%",
                      }}
                      autoFocus={index > 0}
                      autoComplete="off"
                      onKeyUp={(e) => handleNext(add, e)}
                    />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                    />
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{
                    width: "60%",
                  }}
                  icon={<PlusOutlined />}
                >
                  添加一个中文翻译
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
export default AddWord;
