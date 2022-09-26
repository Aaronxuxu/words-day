import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  Card,
  Row,
  Col,
  Space,
  Divider,
  Avatar,
  Button,
  Form,
  Input,
  Radio,
  Cascader,
  DatePicker,
} from "antd";
import { connect } from "react-redux";
import { getProfileAction } from "../../../redux/actions/user";
import { getAreaAction } from "../../../redux/actions/jsonpAPI";
import { createFromIconfontCN } from "@ant-design/icons";
import "./index.css";
const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/c/font_3672969_mu5bwtpigua.js",
});

function UserProfile(props) {
  const { profile, getProfileAction, area, getAreaAction } = props;
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (profile === null) {
      getProfileAction();
    }
  }, []);

  useEffect(() => {
    if (isEdit && area === null) {
      getAreaAction();
    }
  }, [isEdit]);

  return (
    profile !== null && (
      <Row className="userprofile">
        <Col xs={24} md={18}>
          <Card
            className="userprofile-card"
            bordered={false}
            bodyStyle={{ padding: "0 0 30px", borderTop: "1px solid #f0f0f0" }}
            title={
              <Space align="center" className="userprofile-card-title">
                <IconFont type="icon-detail" style={{ fontSize: "20px" }} />
                个人资料
              </Space>
            }
          >
            {!isEdit ? (
              <Row
                className="userprofile-card-fw userprofile-card-Info"
                onClick={() => setIsEdit(true)}
              >
                <Col xs={24} sm={{ span: 18 }}>
                  <div className="userprofile-card-info-title">
                    <div className="userprofile-card-info-userName-main">
                      {profile.userName}
                    </div>
                    <IconFont type="icon-male" />
                  </div>
                  <Space
                    wrap={true}
                    className="userprofile-card-info-tags"
                    split={<Divider type="vertical" />}
                    style={{ width: "100%" }}
                  >
                    <Row wrap={true} gutter={8}>
                      <Col>真实姓名</Col>
                      <Col>{profile.realName || "-asdasdd-"}</Col>
                    </Row>
                    <Row wrap={true} gutter={8}>
                      <Col>居住地</Col>
                      <Col>{profile.local || "--"}</Col>
                    </Row>
                    <Row wrap={true} gutter={8}>
                      <Col>生日</Col>
                      <Col>{profile.bairthday || "--"}</Col>
                    </Row>
                    <Row wrap={true} gutter={8}>
                      <Col>
                        <IconFont type="icon-phone" />
                      </Col>
                      <Col>{profile.phone || "--"}</Col>
                    </Row>
                    <Row wrap={true} gutter={8}>
                      <Col>
                        <IconFont type="icon-email" />
                      </Col>
                      <Col>{profile.phone || "--"}</Col>
                    </Row>
                  </Space>
                </Col>
                <Col
                  xs={0}
                  sm={{ span: 5, offset: 1 }}
                  style={{ textAlign: "center" }}
                >
                  <Avatar
                    shape="square"
                    size={{
                      sm: 75,
                      md: 75,
                      lg: 75,
                      xl: 75,
                      xxl: 75,
                    }}
                    icon={<IconFont type="icon-user" />}
                  />
                  <div className="userprofile-card-Info-editBtn">
                    <Button type="link" icon={<IconFont type="icon-bianji" />}>
                      编辑
                    </Button>
                  </div>
                </Col>
              </Row>
            ) : (
              <div className="userprofile-card-fw userprofile-card-form">
                <div className="userprofile-card-form-title">编辑个人资料</div>
                <Form layout="vertical">
                  <Row>
                    {/* 昵称 */}
                    <Col xs={24} sm={{ span: 11 }}>
                      <Form.Item
                        label="昵称"
                        rules={[
                          {
                            required: true,
                            message: "昵称必填！",
                          },
                        ]}
                        name="userName"
                      >
                        <Input
                          className="form-item "
                          placeholder="请输入一个昵称"
                          autoComplete="off"
                        />
                      </Form.Item>
                    </Col>
                    {/* 真实姓名 */}
                    <Col xs={24} sm={{ span: 11, offset: 2 }}>
                      <Form.Item
                        label="真实姓名"
                        name="realName"
                        autoComplete="off"
                      >
                        <Input
                          className="form-item "
                          placeholder="请输入你的姓名（选填）"
                        />
                      </Form.Item>
                    </Col>
                    {/* 性别 */}
                    <Col xs={24} sm={{ span: 11 }}>
                      <Form.Item label="性别" name="sex">
                        <Radio.Group
                          buttonStyle="solid"
                          style={{ width: "100%", textAlign: "center" }}
                        >
                          <Row align="middle">
                            <Col xs={11}>
                              <Radio.Button
                                className="form-item"
                                value={1}
                                style={{ width: "100%" }}
                              >
                                男生
                              </Radio.Button>
                            </Col>
                            <Col xs={{ span: 11, offset: 1 }}>
                              <Radio.Button
                                className="form-item"
                                value={0}
                                style={{ width: "100%" }}
                              >
                                女生
                              </Radio.Button>
                            </Col>
                          </Row>
                        </Radio.Group>
                      </Form.Item>
                    </Col>
                    {/* 地址 */}
                    <Col xs={24} sm={{ span: 11, offset: 2 }}>
                      <Form.Item label="居住地" name="local">
                        <Cascader
                          expandTrigger="hover"
                          options={area !== null && area}
                          changeOnSelect
                        />
                      </Form.Item>
                    </Col>
                    {/* 出生日期 */}
                    <Col xs={24} sm={{ span: 11 }}>
                      <Form.Item label="出生日期" name="birthday">
                        <DatePicker
                          style={{ width: "100%" }}
                          format="YYYY/MM"
                          picker="month"
                          className="form-item "
                        />
                      </Form.Item>
                    </Col>
                    {/* 手机号码 */}
                    <Col xs={24} sm={{ span: 11, offset: 2 }}>
                      <Form.Item label="手机号" name="phone">
                        <Input placeholder="请输入一个昵称" />
                      </Form.Item>
                    </Col>
                    {/* 邮箱 */}
                    <Col xs={24} sm={{ span: 11 }}>
                      <Form.Item label="邮箱" name="email">
                        <Input
                          className="form-item "
                          placeholder="请输入邮箱"
                          autoComplete="off"
                        />
                      </Form.Item>
                    </Col>
                    {/* 个人介绍 */}
                    <Col xs={24}>
                      <Form.Item label="编辑个人介绍" name="userLabel">
                        <Input.TextArea
                          className="form-item "
                          placeholder="简短介绍自己"
                          showCount
                          maxLength={100}
                        ></Input.TextArea>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item style={{ marginTop: "15px" }}>
                    <Row justify="end" gutter={16}>
                      <Col>
                        <Button type="default" htmlType="submit">
                          取消
                        </Button>
                      </Col>
                      <Col>
                        <Button type="primary" htmlType="submit">
                          保存
                        </Button>
                      </Col>
                    </Row>
                  </Form.Item>
                </Form>
              </div>
            )}
          </Card>
        </Col>
        <Col xs={0} md={{ span: 5, offset: 1 }}>
          资料完成度
        </Col>
      </Row>
    )
  );
}
export default connect(
  (state) => ({ profile: state.user.profile, area: state.jsonpAPI.area }),
  {
    getProfileAction,
    getAreaAction,
  }
)(UserProfile);
