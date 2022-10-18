import React, { useEffect, useState, useCallback } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import RouteTypo from "../../components/RouteTypo";

import { COURSECONTENT } from "../../uitil/content";

import { openLoginModalAction } from "../../redux/actions/loginModal";
import { getUserCourse, getTypeByGrade } from "../../api/axios";

// pc端组件
import {
  Radio,
  Row,
  Col,
  Card,
  Button,
  message,
  Progress,
  Space,
  Spin,
  List,
  Tag,
  Statistic,
} from "antd";

// 移动端组件
import { Tabs } from "antd-mobile";
import { LoadingOutlined, LikeOutlined, EyeOutlined } from "@ant-design/icons";

// 引入lodash
import _pick from "lodash/pick";
import _debounce from "lodash/debounce";

import "./index.css";

const courstTypeArr = [
  { label: "全部", key: "", color: "#401c44" },
  { label: "小学", key: "primary", color: "#444693" },
  { label: "初中", key: "middle", color: "#5c7a29" },
  { label: "高中", key: "senior", color: "#4f5555" },
  { label: "大学", key: "uni", color: "#892f1b" },
  { label: "专升本", key: "upgraded", color: "#5f5d46" },
  { label: "中专", key: "special", color: "#826858" },
];

function Course(props) {
  const { userToken, openLoginModalAction } = props;
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // 当前选择
  const [selectKey, setSelectKey] = useState("");
  const [userCourse, setUserCourse] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 登录
  const handleLogin = (e) => {
    e.preventDefault();
    return openLoginModalAction();
  };

  // 当前登录状态下获取部分已选择课程
  const getCourseByLogin = async () => {
    const { result, status } = await getUserCourse({ pageSize: 5 });
    if (status === 1) {
      return message.error("获取用户课程失败");
    }
    return setUserCourse(result.data);
  };

  // 筛选选择器
  const handleSelect = (e) => {
    const { value } = e.target;
    setSelectKey(value);
    getCourseDebounc(value);
  };

  // 获取课程数据
  const getCourseByGrade = useCallback(async (key) => {
    setIsLoading(true);
    const { result, status, msg } = await getTypeByGrade({ key });
    setIsLoading(false);
    if (status === 1) {
      return message.error(msg);
    }
    setCourses(result);
  }, []);

  // 防抖获取数据
  const getCourseDebounc = useCallback(
    _debounce(getCourseByGrade, 200, {
      leading: true,
      trailing: true,
    }),
    [getCourseByGrade]
  );

  // 跳转到详情页面
  const handleClick = (item) => {
    console.log(item);
  };

  useEffect(() => {
    if (userToken && userToken.token) {
      getCourseByLogin();
    }
    getCourseByGrade(selectKey);
  }, []);

  return (
    <div className="wd-course">
      {pathname === "/course/" ? (
        <Row>
          <Col xs={24} sm={17}>
            <RouteTypo context={COURSECONTENT} />
            <Row style={{ marginBottom: "15px" }}>
              <Col xs={0} sm={24} className="wd-course-grade-nav">
                <Row align="middle">
                  <Col sm={0} md={2}>
                    <span style={{ fontSize: "14px" }}>学习方向</span>
                  </Col>
                  <Col sm={{ span: 20 }}>
                    <Radio.Group
                      value={selectKey}
                      buttonStyle="solid"
                      onChange={handleSelect}
                    >
                      <Space size={16} wrap={true}>
                        {courstTypeArr.map((e) => (
                          <Radio.Button shape="round" key={e.key} value={e.key}>
                            {e.label}
                          </Radio.Button>
                        ))}
                      </Space>
                    </Radio.Group>
                  </Col>
                </Row>
              </Col>
              <Col xs={24} sm={0}>
                <Tabs
                  activeKey={selectKey}
                  onChange={(key) => {
                    setSelectKey(key);
                    getCourseDebounc(key);
                  }}
                >
                  {courstTypeArr.map((e) => (
                    <Tabs.Tab key={e.key} title={e.label} />
                  ))}
                </Tabs>
              </Col>
            </Row>
            {isLoading ? (
              <Spin
                indicator={
                  <LoadingOutlined
                    style={{
                      fontSize: 24,
                    }}
                    spin
                  />
                }
              />
            ) : (
              <List
                grid={{
                  gutter: 16,
                  xs: 1,
                  sm: 2,
                  md: 3,
                  lg: 4,
                  xl: 4,
                  xxl: 4,
                }}
                dataSource={courses}
                rowKey="_id"
                renderItem={(item) => (
                  <List.Item onClick={() => handleClick(item)}>
                    <div className="w-border wd-course-courseLists-item scale-hover">
                      <div className="wd-course-courseLists-item-titleName">
                        {item.ctypeName}
                      </div>
                      <span className="wd-course-courseLists-item-level">
                        所属分类：
                        <Tag
                          color={
                            courstTypeArr.find((e) => e.key === item.level)
                              .color
                          }
                        >
                          {
                            courstTypeArr.find((e) => e.key === item.level)
                              .label
                          }
                        </Tag>
                      </span>
                      <Row
                        justify="space-around"
                        className="wd-course-courseLists-item-tips"
                      >
                        <Col>
                          <Statistic
                            title="查看数"
                            value={item.checkNum}
                            prefix={<EyeOutlined />}
                            valueStyle={{ fontSize: "16px" }}
                          />
                        </Col>
                        <Col>
                          <Statistic
                            title="收藏数"
                            value={item.colNum}
                            prefix={<LikeOutlined />}
                            valueStyle={{ fontSize: "16px" }}
                          />
                        </Col>
                      </Row>
                    </div>
                  </List.Item>
                )}
              />
            )}
          </Col>
          <Col xs={0} sm={{ span: 6, offset: 1 }}>
            <Card
              className="w-border "
              title={userToken.token && "我的课程"}
              extra={
                !userToken.token && (
                  <a href="javascript;" onClick={(e) => handleLogin(e)}>
                    登录
                  </a>
                )
              }
            >
              {!userToken.token ? (
                <Button block>立即注册</Button>
              ) : (
                <>
                  {userCourse.map((e) => (
                    <div
                      key={e._id}
                      className="courses-right-userCourse"
                      onClick={() => {
                        return navigate(`/course/read/${e.typeid[0]._id}`, {
                          state: e,
                        });
                      }}
                    >
                      <div className="courses-right-userCourse-title">
                        {e.typeid[0].ctypeName}
                      </div>
                      <div>
                        {Math.round(
                          (Object.keys(
                            _pick(e, [
                              "examplesentence",
                              "fixedcol",
                              "phrases",
                              "words",
                            ])
                          ).reduce((a, c) => a + e[c].wArr.length, 0) /
                            e.sumNum) *
                            100
                        ) || 0}
                        %
                      </div>
                      <Progress
                        showInfo={false}
                        trailColor="#f0f0f0"
                        percent={Math.round(
                          (Object.keys(
                            _pick(e, [
                              "examplesentence",
                              "fixedcol",
                              "phrases",
                              "words",
                            ])
                          ).reduce((a, c) => a + e[c].wArr.length, 0) /
                            e.sumNum) *
                            100
                        )}
                        size="default"
                      />
                    </div>
                  ))}
                </>
              )}
            </Card>
          </Col>
        </Row>
      ) : (
        <Outlet />
      )}
    </div>
  );
}

export default connect((state) => ({ userToken: state.userToken }), {
  openLoginModalAction,
})(Course);
