import React, { useEffect, useState } from "react";
import Moment from "moment";
import {
  Card,
  Row,
  Col,
  Space,
  Divider,
  Button,
  Form,
  Input,
  Radio,
  Cascader,
  DatePicker,
  message,
  Progress,
} from "antd";
import { connect } from "react-redux";
import {
  getProfileAction,
  updateProfileAction,
} from "../../../redux/actions/user";
import { getAreaAction } from "../../../redux/actions/jsonpAPI";
import IconFont from "../../../uitil/IconFont";
import dayjs from "dayjs";

import ProfileImage from "./ProfileImage";
import "./index.css";

function UserProfile(props) {
  const {
    profile,
    getProfileAction,
    area,
    getAreaAction,
    updateProfileAction,
  } = props;

  const [profileForm] = Form.useForm();
  const [precentValue, setPrecentValues] = useState({
    userName: null,
    userAvatar: null,
    userLabel: null,
    realName: null,
    sex: null,
    local: [],
    birthday: null,
    phone: null,
    email: null,
  });
  const [percent, setPercent] = useState(0);
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = async (fieldsValue) => {
    if (fieldsValue["birthday"]) {
      fieldsValue = {
        ...fieldsValue,
        birthday: fieldsValue["birthday"].format("YYYY-MM"),
      };
    }
    let arr = [];

    if (fieldsValue["local"] && fieldsValue["local"].length > 0) {
      const province = area.find((e) => e.value === fieldsValue["local"][0]);
      arr.push(province);
      if (fieldsValue["local"].length === 2) {
        const city = province.children.find(
          (e) => e.value === fieldsValue["local"][1]
        );
        arr.push(city);
      }
    }

    fieldsValue = {
      ...fieldsValue,
      local: arr,
    };
    // 过滤出有效的数据
    let realObj = {};
    const realArr = Object.keys(fieldsValue).filter(
      (e) => fieldsValue[e] !== undefined
    );
    realArr.forEach((e) => {
      realObj = { ...realObj, [e]: fieldsValue[e] };
    });

    try {
      await updateProfileAction(realObj);
      profileForm.resetFields();
      setIsEdit(false);
      message.success("修改成功");
    } catch (error) {
      message.error("提交出现异常，请重新提交");
    }
  };

  // 取消
  const handleCancel = () => {
    profileForm.resetFields();
    setIsEdit(false);
  };

  useEffect(() => {
    if (profile !== null) {
      let obj = Object.assign(precentValue, profile);
      setPrecentValues(obj);
      const MaxLength = Object.keys(obj).length;
      const valLength = Object.keys(obj).filter(
        (e) => obj[e] === null || obj[e].length === 0
      ).length;
      let diff =
        Math.round(((MaxLength - valLength) / MaxLength) * 100) - percent;

      setPercent(percent + diff);
    }
  }, [profile]);

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
            className="userprofile-card w-border"
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
              <Row className="userprofile-card-fw userprofile-card-Info box-shadow-hover">
                <Col xs={24} sm={{ span: 18 }} onClick={() => setIsEdit(true)}>
                  <div className="userprofile-card-info-title">
                    <div className="userprofile-card-info-userName-main">
                      {profile.userName}
                    </div>
                    {profile.sex && (
                      <IconFont
                        type={profile.sex ? "icon-male" : "icon-female"}
                      />
                    )}
                  </div>
                  <Space
                    wrap={true}
                    className="userprofile-card-info-tags"
                    split={<Divider type="vertical" />}
                    style={{ width: "100%" }}
                  >
                    <Row wrap={true} gutter={10}>
                      <Col className="userprofile-card-info-tags-label">
                        真实姓名
                      </Col>
                      <Col>{profile.realName || "--"}</Col>
                    </Row>
                    <Row wrap={true} gutter={10}>
                      <Col className="userprofile-card-info-tags-label">
                        居住地
                      </Col>
                      <Col>
                        {profile.local.map((e) => e.label).join("") || "--"}
                      </Col>
                    </Row>
                    <Row wrap={true} gutter={10}>
                      <Col className="userprofile-card-info-tags-label">
                        生日
                      </Col>
                      <Col>
                        {dayjs(profile.birthday).format("YYYY-MM") || "--"}
                      </Col>
                    </Row>
                    <Row wrap={true} gutter={10}>
                      <Col className="userprofile-card-info-tags-label">
                        <IconFont type="icon-phone" />
                      </Col>
                      <Col>{profile.phone || "--"}</Col>
                    </Row>
                    <Row wrap={true} gutter={10}>
                      <Col className="userprofile-card-info-tags-label">
                        <IconFont type="icon-email" />
                      </Col>
                      <Col>{profile.email || "--"}</Col>
                    </Row>
                  </Space>
                </Col>
                <Col
                  xs={0}
                  sm={{ span: 5, offset: 1 }}
                  style={{ textAlign: "center" }}
                >
                  <ProfileImage />
                  <div
                    className="userprofile-card-Info-editBtn"
                    onClick={() => setIsEdit(true)}
                  >
                    <Button type="link" icon={<IconFont type="icon-bianji" />}>
                      编辑
                    </Button>
                  </div>
                </Col>
              </Row>
            ) : (
              <div className="userprofile-card-fw userprofile-card-form">
                <div className="userprofile-card-form-title ">编辑个人资料</div>
                <Form
                  form={profileForm}
                  layout="vertical"
                  onFinish={handleEdit}
                  initialValues={{
                    ...profile,
                    local: profile.local.map((e) => e.value) || [],
                    birthday: new Moment(profile.birthday),
                  }}
                >
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
                          autoComplete="off"
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
                                value={true}
                                style={{ width: "100%" }}
                              >
                                男生
                              </Radio.Button>
                            </Col>
                            <Col xs={{ span: 11, offset: 1 }}>
                              <Radio.Button
                                className="form-item"
                                value={false}
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
                      <Form.Item
                        label="手机号"
                        name="phone"
                        // rules={[{ type: "email" }]}
                      >
                        <Input
                          className="form-item "
                          autoComplete="off"
                          placeholder="请输入手机号码"
                        />
                      </Form.Item>
                    </Col>
                    {/* 邮箱 */}
                    <Col xs={24} sm={{ span: 11 }}>
                      <Form.Item
                        label="邮箱"
                        name="email"
                        rules={[
                          {
                            type: "email",
                          },
                        ]}
                      >
                        <Input
                          className="form-item "
                          placeholder="请输入邮箱"
                          autoComplete="off"
                        />
                      </Form.Item>
                    </Col>
                    {/* 个人介绍 */}
                    <Col xs={24}>
                      <Form.Item
                        label="编辑个人介绍"
                        name="userLabel"
                        rules={[
                          {
                            maxLength: 100,
                          },
                        ]}
                      >
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
                        <Button type="default" onClick={handleCancel}>
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
          <Card
            className="w-border"
            title="资料完成度"
            hoverable
            bodyStyle={{ textAlign: "center" }}
            onClick={() => setIsEdit(true)}
          >
            <Progress width={75} type="circle" percent={percent} />
          </Card>
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
    updateProfileAction,
  }
)(UserProfile);
