import React, { useEffect, useState } from "react";

import { addWord, getType } from "../../api/axios";

import {
  Button,
  Form,
  Select,
  message,
  Input,
  Row,
  Col,
  Checkbox,
  Space,
  Card,
} from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  CloseSquareOutlined,
  CheckSquareOutlined,
} from "@ant-design/icons";
import "./index.css";

const { Option } = Select;

// 后期需再优化

function AddWord() {
  // 词汇类型
  const [formCtype] = Form.useForm();
  const [fCForm] = Form.useForm();
  const [phrasesForm] = Form.useForm();
  const [eSForm] = Form.useForm();

  const [wordType, setWordType] = useState([]);

  const [isDisabled, setIsDisabled] = useState({
    fCForm: { is: false, form: fCForm },
    phrasesForm: { is: false, form: phrasesForm },
    eSForm: { is: false, form: eSForm },
  });

  const getWordsType = async () => {
    const { status, result, msg } = await getType();

    if (status === 1) {
      return message.error(msg);
    } else {
      formCtype.setFieldsValue({
        ctypeName: result[0]._id,
      });
      setWordType(result);
    }
  };

  const handleAdd = async (formName, { values, forms }) => {
    const isArray = Object.keys(isDisabled)
      .filter((e) => isDisabled[e].is)
      .map((e) => forms[e].validateFields());
    const { wordForm } = forms;
    const data = await Promise.all(isArray);
    const wordData = await wordForm.validateFields();
    let obj = { wordArr: wordData, ...values };
    data.forEach((element) => {
      obj = { ...obj, ...element };
    });
    const { result, status, msg } = await addWord(obj);
    if (status === 1) {
      return message.error(msg);
    }
    console.log(result);
    Object.keys(forms).forEach((e) => {
      if (e !== "ctypeForm") {
        forms[e].resetFields();
      }
    });
    setIsDisabled({
      fCForm: { is: false, form: fCForm },
      phrasesForm: { is: false, form: phrasesForm },
      eSForm: { is: false, form: eSForm },
    });
    message.success("添加成功");
  };

  const handleChecked = (key, e) => {
    const { checked } = e.target;
    if (!checked) {
      isDisabled[key].form.resetFields();
    }
    setIsDisabled({
      ...isDisabled,
      [key]: { ...isDisabled[key], is: checked },
    });
  };

  useEffect(() => {
    getWordsType();
  }, []);

  return (
    <div className="addword">
      <Form.Provider onFormFinish={handleAdd}>
        {/* 选择词汇类型 */}
        <Form name="ctypeForm" form={formCtype}>
          <Row justify="center" align="middle">
            <Col xs={{ span: 24 }} sm={{ span: 12 }}>
              <Form.Item label="选择词汇种类" name="ctypeName">
                <Select>
                  {wordType.map((e) => (
                    <Option key={e._id} value={e._id}>
                      {e.ctypeName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 0 }} sm={{ span: 2, offset: 2 }}>
              <Form.Item>
                <Button htmlType="submit" type="primary">
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Row justify="space-between">
          {/* 瀑布流左边 */}
          <Col sm={{ span: 11 }} xs={{ span: 24 }}>
            <Space direction="vertical" style={{ width: "100%" }} size="large">
              {/* 单词 */}
              <Card>
                <Form name="wordForm" layout="vertical">
                  <Form.Item label="单词" name="label">
                    <Input autoComplete="off" placeholder="请输入单词"></Input>
                  </Form.Item>
                  <Form.List
                    name="translate"
                    rules={[
                      {
                        validator: async (_, names) => {
                          if (!names || names.length < 1) {
                            return Promise.reject(
                              new Error("至少需要一个翻译")
                            );
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
                            label={index === 0 ? "中文翻译" : ""}
                            required={false}
                            key={field.key}
                          >
                            <Form.Item
                              {...field}
                              validateTrigger={["onChange", "onBlur"]}
                              rules={[
                                {
                                  required: true,
                                  whitespace: true,
                                  message: "必填项",
                                },
                              ]}
                              noStyle
                            >
                              <Input
                                placeholder="passenger name"
                                style={{
                                  width: "80%",
                                  marginRight: "5px",
                                }}
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
                            icon={<PlusOutlined />}
                          >
                            添加翻译
                          </Button>

                          <Form.ErrorList errors={errors} />
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Form>
              </Card>

              {/* 固定搭配 */}
              <Card
                title="固定搭配"
                extra={
                  <Checkbox
                    checked={isDisabled.fCForm.is}
                    onChange={(e) => handleChecked("fCForm", e)}
                  >
                    是否需要
                  </Checkbox>
                }
              >
                <Form
                  form={fCForm}
                  name="fCForm"
                  disabled={!isDisabled.fCForm.is}
                >
                  <Form.List
                    name="fcArray"
                    initialValue={[{ label: "", translate: [""] }]}
                  >
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <Space
                            key={key}
                            style={{
                              display: "flex",
                              marginBottom: 8,
                            }}
                            align="baseline"
                          >
                            <Form.Item
                              {...restField}
                              name={[name, "label"]}
                              rules={[
                                {
                                  required: true,
                                  message: "缺少英文",
                                },
                              ]}
                            >
                              <Input placeholder="英文搭配" />
                            </Form.Item>
                            <Form.List
                              {...restField}
                              name={[name, "translate"]}
                              rules={[
                                {
                                  validator: async (_, names) => {
                                    if (!names || names.length < 1) {
                                      return Promise.reject(
                                        new Error("至少需要一个翻译")
                                      );
                                    }
                                  },
                                },
                              ]}
                              initialValue={[""]}
                            >
                              {(fields, { add, remove }, { errors }) => (
                                <>
                                  {fields.map((field, index) => (
                                    <Form.Item required={false} key={field.key}>
                                      <Form.Item
                                        {...field}
                                        validateTrigger={["onChange", "onBlur"]}
                                        rules={[
                                          {
                                            required: true,
                                            whitespace: true,
                                            message: "至少一个中文",
                                          },
                                        ]}
                                        noStyle
                                      >
                                        <Input
                                          placeholder="中文"
                                          style={{
                                            width: "80%",
                                            marginRight: "5px",
                                          }}
                                        />
                                      </Form.Item>
                                      {fields.length > 1 ? (
                                        <CloseSquareOutlined
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
                                    >
                                      <Row align="middle" justify="center">
                                        <Col xs={{ span: 24 }} lg={{ span: 2 }}>
                                          <CheckSquareOutlined />
                                        </Col>
                                        <Col
                                          xs={{ span: 0 }}
                                          lg={{ span: 20, offset: 2 }}
                                        >
                                          <span>添加翻译</span>
                                        </Col>
                                      </Row>
                                    </Button>
                                    <Form.ErrorList errors={errors} />
                                  </Form.Item>
                                </>
                              )}
                            </Form.List>
                            <MinusCircleOutlined onClick={() => remove(name)} />
                          </Space>
                        ))}
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                          >
                            添加搭配
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Form>
              </Card>
            </Space>
          </Col>

          {/* 瀑布流右边 */}
          <Col sm={{ span: 11, offset: 2 }} xs={{ span: 24 }}>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              {/* 常见短语 */}
              <Card
                title="常见短语"
                extra={
                  <Checkbox
                    checked={isDisabled.phrasesForm.is}
                    onChange={(e) => handleChecked("phrasesForm", e)}
                  >
                    是否需要
                  </Checkbox>
                }
              >
                <Form
                  form={phrasesForm}
                  name="phrasesForm"
                  disabled={!isDisabled.phrasesForm.is}
                >
                  <Form.List
                    name="phrasesArray"
                    initialValue={[{ label: "", translate: [""] }]}
                  >
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <Space
                            key={key}
                            style={{
                              display: "flex",
                              marginBottom: 8,
                            }}
                            align="baseline"
                          >
                            <Form.Item
                              {...restField}
                              name={[name, "label"]}
                              rules={[
                                {
                                  required: true,
                                  message: "缺少英文",
                                },
                              ]}
                            >
                              <Input placeholder="英文搭配" />
                            </Form.Item>
                            <Form.List
                              {...restField}
                              name={[name, "translate"]}
                              rules={[
                                {
                                  validator: async (_, names) => {
                                    if (!names || names.length < 1) {
                                      return Promise.reject(
                                        new Error("缺少翻译")
                                      );
                                    }
                                  },
                                },
                              ]}
                              initialValue={[""]}
                            >
                              {(fields, { add, remove }, { errors }) => (
                                <>
                                  {fields.map((field, index) => (
                                    <Form.Item required={false} key={field.key}>
                                      <Form.Item
                                        {...field}
                                        validateTrigger={["onChange", "onBlur"]}
                                        rules={[
                                          {
                                            required: true,
                                            whitespace: true,
                                            message: "至少一个中文",
                                          },
                                        ]}
                                        noStyle
                                      >
                                        <Input
                                          placeholder="中文"
                                          style={{
                                            width: "80%",
                                            marginRight: "5px",
                                          }}
                                        />
                                      </Form.Item>
                                      {fields.length > 1 ? (
                                        <CloseSquareOutlined
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
                                    >
                                      <Row align="middle" justify="center">
                                        <Col xs={{ span: 24 }} lg={{ span: 2 }}>
                                          <CheckSquareOutlined />
                                        </Col>
                                        <Col
                                          xs={{ span: 0 }}
                                          lg={{ span: 20, offset: 2 }}
                                        >
                                          <span>添加翻译</span>
                                        </Col>
                                      </Row>
                                    </Button>
                                    <Form.ErrorList errors={errors} />
                                  </Form.Item>
                                </>
                              )}
                            </Form.List>
                            <MinusCircleOutlined onClick={() => remove(name)} />
                          </Space>
                        ))}
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                          >
                            添加搭配
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Form>
              </Card>

              {/* 例句 */}
              <Card
                title="真题例句"
                extra={
                  <Checkbox
                    checked={isDisabled.eSForm.is}
                    onChange={(e) => handleChecked("eSForm", e)}
                  >
                    是否需要
                  </Checkbox>
                }
              >
                <Form
                  form={eSForm}
                  name="eSForm"
                  disabled={!isDisabled.eSForm.is}
                >
                  <Form.List
                    name="eSArray"
                    initialValue={[{ label: "", translate: [""] }]}
                  >
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <Space
                            key={key}
                            style={{
                              display: "flex",
                              marginBottom: 8,
                            }}
                            align="baseline"
                          >
                            <Form.Item
                              {...restField}
                              name={[name, "label"]}
                              rules={[
                                {
                                  required: true,
                                  message: "缺少英文",
                                },
                              ]}
                            >
                              <Input placeholder="英文搭配" />
                            </Form.Item>
                            <Form.List
                              {...restField}
                              name={[name, "translate"]}
                              rules={[
                                {
                                  validator: async (_, names) => {
                                    if (!names || names.length < 1) {
                                      return Promise.reject(
                                        new Error("缺少翻译")
                                      );
                                    }
                                  },
                                },
                              ]}
                              initialValue={[""]}
                            >
                              {(fields, { add, remove }, { errors }) => (
                                <>
                                  {fields.map((field, index) => (
                                    <Form.Item required={false} key={field.key}>
                                      <Form.Item
                                        {...field}
                                        validateTrigger={["onChange", "onBlur"]}
                                        rules={[
                                          {
                                            required: true,
                                            whitespace: true,
                                            message: "至少一个中文",
                                          },
                                        ]}
                                        noStyle
                                      >
                                        <Input
                                          placeholder="中文"
                                          style={{
                                            width: "80%",
                                            marginRight: "5px",
                                          }}
                                        />
                                      </Form.Item>
                                      {fields.length > 1 ? (
                                        <CloseSquareOutlined
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
                                    >
                                      <Row align="middle" justify="center">
                                        <Col xs={{ span: 24 }} lg={{ span: 2 }}>
                                          <CheckSquareOutlined />
                                        </Col>
                                        <Col
                                          xs={{ span: 0 }}
                                          lg={{ span: 20, offset: 2 }}
                                        >
                                          <span>添加翻译</span>
                                        </Col>
                                      </Row>
                                    </Button>
                                    <Form.ErrorList errors={errors} />
                                  </Form.Item>
                                </>
                              )}
                            </Form.List>
                            <MinusCircleOutlined onClick={() => remove(name)} />
                          </Space>
                        ))}
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                          >
                            添加搭配
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Form>
              </Card>
            </Space>
          </Col>
        </Row>
      </Form.Provider>
    </div>
  );
}
export default AddWord;
