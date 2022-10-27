import React from "react";

import RouteTypo from "../../../components/RouteTypo";
import { COURSECONTENT } from "../../../uitil/content";

// pc端组件
import {
  Radio,
  Row,
  Col,
  Card,
  Button,
  Progress,
  Space,
  List,
  Tag,
  Statistic,
  Divider,
  Spin,
} from "antd";

// 移动端组件
import { Tabs } from "antd-mobile";
import { LikeOutlined, EyeOutlined } from "@ant-design/icons";
// 引入lodash
import _pick from "lodash/pick";

// 滚动加载
import InfiniteScroll from "react-infinite-scroll-component";
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

function CourseIndexUi(props) {
  const {
    userToken,
    openModal,
    MyCourseFn,
    myCourses,
    selectKey,
    setSelectKey,
    courseList,
    isLoading,
    getCourseListFn,
    hasMore,
    getIDToDetail,
  } = props;

  return (
    <Row>
      <Col xs={24} sm={17}>
        <RouteTypo context={COURSECONTENT} />

        <div className="w-marginBottom wd-course-grade-nav-pc pc">
          <Radio.Group
            value={selectKey}
            buttonStyle="solid"
            onChange={(e) => setSelectKey(e.target.value)}
          >
            <Space size={16} wrap={true}>
              {courstTypeArr.map((e) => (
                <Radio.Button shape="round" key={e.key} value={e.key}>
                  {e.label}
                </Radio.Button>
              ))}
            </Space>
          </Radio.Group>
        </div>
        <div className="w-marginBottom mobile">
          <Tabs activeKey={selectKey} onChange={(key) => setSelectKey(key)}>
            {courstTypeArr.map((e) => (
              <Tabs.Tab key={e.key} title={e.label} />
            ))}
          </Tabs>
        </div>

        <InfiniteScroll
          dataLength={courseList.length}
          hasMore={hasMore}
          next={getCourseListFn}
          loader={
            <div className="inScrollLoading">
              <Spin style={{ color: "black" }} tip="加载中" />
            </div>
          }
          endMessage={
            courseList.length > 0 && (
              <Divider plain>没有更多的数据了 🤐</Divider>
            )
          }
        >
          <List
            style={{ padding: "0 10px" }}
            loading={isLoading}
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 3,
              lg: 4,
              xl: 4,
              xxl: 4,
            }}
            dataSource={courseList}
            rowKey="_id"
            renderItem={(item) => (
              <List.Item onClick={() => getIDToDetail(item)}>
                <div className="w-border wd-course-courseLists-item scale-hover">
                  <div className="wd-course-courseLists-item-titleName">
                    {item.ctypeName}
                  </div>
                  <span className="wd-course-courseLists-item-level">
                    所属分类：
                    <Tag
                      color={
                        courstTypeArr.find((e) => e.key === item.level).color
                      }
                    >
                      {courstTypeArr.find((e) => e.key === item.level).label}
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
        </InfiniteScroll>
      </Col>
      <Col xs={0} sm={{ span: 6, offset: 1 }}>
        <Card
          className="w-border"
          title={userToken.token && "我的课程"}
          extra={
            !userToken.token && (
              <a href="javascript;" onClick={(e) => openModal(e)}>
                登录
              </a>
            )
          }
        >
          {!userToken.token ? (
            <Button block>立即注册</Button>
          ) : (
            <>
              {myCourses.map((e) => (
                <div
                  key={e._id}
                  className="courses-right-userCourse"
                  onClick={() => MyCourseFn(e)}
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

        <Card
          className="w-border"
          style={{ marginTop: "25px" }}
          title="猜你喜欢"
        ></Card>
      </Col>
    </Row>
  );
}
export default CourseIndexUi;
