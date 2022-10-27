import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import {
  getCourseDetail,
  getCourseOfUserByOne,
  delUserCourse,
  addUserCourse,
  getTypeByID,
} from "../../../api/axios";
import { openLoginModalAction } from "../../../redux/actions/loginModal";
import MyEllipsis from "../../../components/MyEllipsis";
import CourseDetailCataLog from "./Course_Detail_CataLog";
import MySummary from "../../../components/MySummary";

import {
  Breadcrumb,
  Col,
  message,
  Row,
  Space,
  Typography,
  Statistic,
  Divider,
  Tabs,
  Spin,
  Modal,
} from "antd";
import "./index.css";

import IconFont from "../../../uitil/IconFont";

const { Title, Paragraph } = Typography;
const { confirm } = Modal;
// 课程详情
function CourseDetail(props) {
  const { userID, openLoginModalAction } = props;
  const { cName } = useParams();
  const {
    state: { id },
  } = useLocation();

  const navigate = useNavigate();

  const [courseMain, setCourseMain] = useState({});

  const [isCol, setIsCol] = useState(false);
  const [activeKey, setActiveKey] = useState("summary");
  const [isInit, setInit] = useState(true);
  const [itemLists, setItemLists] = useState({});

  // 获取课程基本信息
  const getMain = async () => {
    const { result, status, msg } = await getTypeByID({ id });
    if (status === 1) {
      return message.error(msg);
    }

    return setCourseMain(result);
  };

  // 获取课程数据
  const getDetail = async (props, pageNo) => {
    if (!isInit) {
      setItemLists({
        ...itemLists,
        [props[0]]: { ...itemLists[props[0]], isLoading: true },
      });
    }
    const { result, msg, status } = await getCourseDetail({
      cID: id,
      props,
      pageNo,
    });
    if (status === 1) {
      return message.error(msg);
    }
    let obj = itemLists;

    Object.keys(result).forEach((e) => {
      obj = {
        ...obj,
        [e]: {
          hasMore: result[e].length === 5,
          data: isInit ? result[e] : obj[e].data.concat(result[e]),
          isLoading: false,
        },
      };
    });

    setInit(false);
    setItemLists(obj);
  };

  // 已登录情况下获取该用户是否已选择该课程
  const getUserCourseVal = async () => {
    if (!userID) return;
    const { result, msg, status } = await getCourseOfUserByOne({
      id,
    });
    if (status === 1) {
      return message.error(msg);
    }
    return setIsCol(result.length > 0);
  };

  const handleCol = async () => {
    if (!userID) return openLoginModalAction();
    let promise;

    if (isCol) {
      promise = await delUserCourse({ id });
    } else {
      promise = await addUserCourse({ typeid: id });
    }
    const {
      result: { colNum },
      status,
      msg,
    } = await promise;
    if (status === 1) {
      return message.error(msg);
    }
    if (isCol) {
      message.success("删除成功！");
      setIsCol(false);
    } else {
      message.success("加入成功！");
      setIsCol(true);
    }
    setCourseMain({ ...courseMain, colNum });
  };

  // 跳转阅读页面时业务
  const handleRead = () => {
    confirm({
      title: "温馨提示",
      icon: null,
      maskClosable: true,
      keyboard: true,
      closable: true,
      content: (
        <>
          <div className="logined">
            <Title level={5}>已登录：</Title>
            <Paragraph>
              <ul>
                <li>开始阅读后会自动添加到用户课程中；</li>
                <li>用户背诵的数据会被记录；</li>
                <li>清除本地数据不会影响到已学习的内容；</li>
              </ul>
            </Paragraph>
          </div>
          <div className="unLogined">
            <Title level={5}>未登录：</Title>
            <Paragraph>
              <ul>
                <li>开始阅读后会自动保存到本地中；</li>
                <li>用户背诵的数据会被记录；</li>
                <li>清除本地数据会影响到已学习的内容；</li>
              </ul>
            </Paragraph>
          </div>
        </>
      ),
      onOk: async () => {
        if (userID && !isCol) {
          try {
            await addUserCourse({ typeid: id });
          } catch (error) {
            return message.error(error);
          }
        }
        return navigate(`/course/read/${cName}`, { state: { typeid: id } });
      },
    });
  };

  useEffect(() => {
    getUserCourseVal();
    getMain();
  }, []);

  useEffect(() => {
    if (activeKey === "catalog" && isInit) {
      getDetail();
    }
  }, [activeKey]);

  return (
    <>
      <Breadcrumb className="course-detail-bread w-marginBottom">
        <Breadcrumb.Item>
          <Link to="/course/">课程列表</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{cName}</Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <Col xs={24} sm={15}>
          <div className="course-detail-container w-marginBottom">
            <div className="detail-container-title w-marginBottom">
              <Title level={3}>{cName}</Title>
            </div>
            <div className="detail-container-context w-marginBottom">
              <MyEllipsis
                context="Ant Design, a design language for background applications, is
                refined by Ant UED Team. Ant Design, a design language for
                background applications, is refined by Ant UED Team. Ant Design,
                a design language for background applications, is refined by Ant
                UED Team. Ant Design, a design language for background
                applications, is refined by Ant UED Team. Ant Design, a design
                language for background applications, is refined by Ant UED
                Team. Ant Design, a design language for background applications,
                is refined by Ant UED Team. 简介后续添加"
              />
            </div>
            <div className="detail-container-extra">
              <Row align="bottom" justify="space-between">
                <Col>
                  <div className="detail-container-extra-button">
                    <div className="w-button button-hover" onClick={handleRead}>
                      {isCol ? "继续阅读" : "开始阅读"}
                    </div>
                  </div>
                </Col>
                <Col>
                  <Space direction="vertical">
                    <div className="detail-container-extra-tips">
                      <Statistic
                        valueStyle={{ fontSize: "14px" }}
                        value={courseMain.colNum}
                        suffix=" 人已选"
                      />
                    </div>
                    <div className="w-button button-hover" onClick={handleCol}>
                      <Space align="center">
                        <IconFont
                          style={{ fontSize: "16px" }}
                          type={isCol ? "icon-star2" : "icon-star1"}
                        ></IconFont>
                        <span>{isCol ? "已收藏" : "收藏"}</span>
                      </Space>
                    </div>
                  </Space>
                </Col>
              </Row>
            </div>
          </div>
          <div className="course-detail-tabs">
            <Tabs
              activeKey={activeKey}
              onChange={(activeKey) => setActiveKey(activeKey)}
              size="large"
              destroyInactiveTabPane={true}
            >
              <Tabs.TabPane tab="概述" key="summary">
                <MySummary
                  title="学习收获"
                  content={courseMain.introduce || "无"}
                  // ulVal={["1", "2", "3"]}
                ></MySummary>
                <MySummary
                  title="适合人群"
                  content={courseMain.introduce || "无"}
                ></MySummary>
                <MySummary
                  title="课程概述"
                  content={courseMain.introduce || "无"}
                ></MySummary>
              </Tabs.TabPane>
              <Tabs.TabPane tab="目录" key="catalog">
                {!isInit ? (
                  Object.keys(itemLists).map((e) => (
                    <CourseDetailCataLog
                      key={e}
                      getDetail={getDetail}
                      val={itemLists[e]}
                      label={e}
                    />
                  ))
                ) : (
                  <div className="course-detail-catalog-loading">
                    <Spin tip="加载中......" />
                  </div>
                )}
              </Tabs.TabPane>
            </Tabs>
          </div>
        </Col>
        <Col
          xs={0}
          sm={{
            span: 8,
            offset: 1,
          }}
        >
          <Title level={4}>温馨提示</Title>
          <Divider></Divider>
          <Paragraph style={{ fontSize: "16px" }}>
            <ul>
              <li>
                这是一个使用简便，无需缴费的小demo，用于背诵不同分类的单词。
              </li>
              <li>用户可选择登录也可选择不登陆使用。</li>
              <li>每次浏览器清除缓存后，未登录的用户则会将进度清空。</li>
            </ul>
          </Paragraph>
        </Col>
      </Row>
    </>
  );
}

export default connect(
  (state) => ({
    userID: state.userToken.userID,
  }),
  { openLoginModalAction }
)(CourseDetail);
