import React, { useState } from "react";
import "./index.css";

import {
  Form,
  FloatingBubble,
  Popup,
  Selector,
  Button,
  Popover,
} from "antd-mobile";

import {
  EditFill,
  CloseOutline,
  QuestionCircleOutline,
} from "antd-mobile-icons";

import qs from "query-string";
import { useEffect } from "react";

const useOption = [
  { label: "测验", value: "examine" },
  { label: "阅读", value: "perusal" },
];

const watchOption = [
  { label: "随机", value: "random" },
  { label: "顺序", value: "order" },
];

const propsOption = [
  { label: "单词", value: "words" },
  { label: "固定搭配", value: "fc" },
  { label: "常见短语", value: "ps" },
  { label: "真题例句", value: "es" },
];

const numsOption = [
  { label: "全部", value: 0 },
  { label: "100", value: 100 },
  { label: "50", value: 50 },
];

const itemCss = {
  "--color": "#F4F3FD",
  "--text-color": "#858597",
  "--checked-color": "#3D5CFF",
  "--checked-text-color": "#fff",
  "--border-radius": "10px",
  "--padding": "6px 20px",
};

function ReadMbForm(props) {
  // 从父组件获取数据
  const { valProps, loading, setLoading } = props;

  // 设置formRef
  const [form] = Form.useForm();
  // 修改显示规则弹窗
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isRead, setIsRead] = useState(
    valProps && valProps.useMethod === "perusal"
  );

  const handleAxios = (values) => {
    setLoading(true);
    let obj = {};
    Object.keys(values).forEach((e) => {
      if (e === "props") {
        obj[e] = values[e];
      } else {
        obj[e] = values[e][0];
      }
    });
    setLoading(false);
    setIsEditModalVisible(false);
    return sessionStorage.setItem("ReadvalProps", qs.stringify(obj));
  };

  const handleChange = (cField) => {
    if (Object.keys(cField)[0] === "useMethod") {
      return form.setFieldsValue({
        useMethod: cField[Object.keys(cField)[0]],
        checkMethod: [],
        num: [],
        props: [],
      });
    }
  };

  return (
    <>
      <FloatingBubble
        style={{
          "--initial-position-top": "80px",
          "--initial-position-right": "24px",
        }}
        onClick={() => setIsEditModalVisible(true)}
      >
        <EditFill fontSize={20} />
      </FloatingBubble>
      <Popup
        visible={isEditModalVisible}
        onMaskClick={() => setIsEditModalVisible(false)}
        bodyStyle={{
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
        }}
      >
        <div className="courseRead-popup-body">
          <div className="popup-body-title">
            <CloseOutline
              className="popup-body-title-icon"
              color="#000"
              fontSize={20}
              onClick={() => setIsEditModalVisible(false)}
            />
            <div className="popup-body-title-content">编辑</div>
          </div>

          <div className="popup-body-formItem">
            {valProps && (
              <Form
                initialValues={{
                  useMethod: [valProps.useMethod],
                  checkMethod: [valProps.checkMethod],
                  num: [Number(valProps.num)],
                  props: valProps.props,
                }}
                form={form}
                onFinish={handleAxios}
                style={{
                  "--border-top": "none",
                  "--border-inner": "none",
                  "--border-bottom": "none",
                }}
                footer={
                  <>
                    <div className="popup-body-formItem-footer-btn popup-body-formItem-footer-reset">
                      <Button
                        onClick={() => {
                          form.resetFields();
                          setIsRead(valProps.useMethod === "perusal");
                        }}
                        block={true}
                        style={{
                          "--text-color": "#3D5CFF",
                          "--background-color": "#fff",
                          "--border-color": "#3D5CFF",
                          "--border-radius": "12px",
                          padding: "12px",
                        }}
                      >
                        重置
                      </Button>
                    </div>
                    <div className="popup-body-formItem-footer-btn popup-body-formItem-footer-confirm">
                      <Button
                        type="submit"
                        style={{
                          "--text-color": "#fff",
                          "--background-color": "#3D5CFF",
                          "--border-radius": "12px",
                          padding: "12px",
                        }}
                        block={true}
                        loading={loading}
                      >
                        提交
                      </Button>
                    </div>
                  </>
                }
                onValuesChange={handleChange}
              >
                <Form.Item
                  label={
                    <div className="popup-body-form-label">模式（单选）</div>
                  }
                  name="useMethod"
                  rules={[{ required: true, message: "该栏位为必填" }]}
                >
                  <Selector
                    showCheckMark={false}
                    style={itemCss}
                    options={useOption}
                    onChange={(value) => setIsRead(value[0] === "perusal")}
                  />
                </Form.Item>

                {!isRead && (
                  <Form.Item
                    rules={[{ required: true, message: "该栏位为必填" }]}
                    label={
                      <div className="popup-body-form-label">排列模式</div>
                    }
                    name="checkMethod"
                  >
                    <Selector
                      showCheckMark={false}
                      style={itemCss}
                      options={watchOption}
                    />
                  </Form.Item>
                )}

                <Form.Item
                  rules={[{ required: true, message: "该栏位为必填" }]}
                  label={
                    <div className="popup-body-form-label">
                      分类（{isRead ? "单选" : "多选"}）
                    </div>
                  }
                  name="props"
                >
                  <Selector
                    showCheckMark={false}
                    style={itemCss}
                    multiple={isRead ? false : true}
                    options={propsOption}
                  />
                </Form.Item>
                <Form.Item
                  rules={[{ required: true, message: "该栏位为必填" }]}
                  label={
                    <div className="popup-body-form-label">
                      数量
                      <span>
                        <Popover
                          content="随机模式下，各分类生成随机数量的词汇，总数量不超所选数量"
                          trigger="click"
                          placement="top"
                          mode="dark"
                        >
                          <QuestionCircleOutline />
                        </Popover>
                      </span>
                    </div>
                  }
                  name="num"
                >
                  <Selector
                    showCheckMark={false}
                    style={itemCss}
                    options={numsOption}
                  />
                </Form.Item>
              </Form>
            )}
          </div>
        </div>
      </Popup>
    </>
  );
}

export default ReadMbForm;
