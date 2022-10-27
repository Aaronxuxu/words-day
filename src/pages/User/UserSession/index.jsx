import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import SessionItem from "./SessionItem";
import MyPercentChart from "../../../components/MyPercentChart";
import { getUserCourse, getTypeAndUserType } from "../../../api/axios";
import qs from "query-string";

import throttle from "lodash/throttle";
import _pick from "lodash/pick";
import {
  Typography,
  Row,
  Col,
  Radio,
  Space,
  message,
  Pagination,
  Spin,
  Empty,
} from "antd";

import { LoadingOutlined } from "@ant-design/icons";
import "./index.css";
const { Title } = Typography;
const navItem = [
  { value: "all", label: "全部" },
  { value: "finished", label: "已完成" },
  { value: "unFinished", label: "未完成" },
];

function UserSession() {
  const { key } = useParams();
  const { search, pathname } = useLocation();

  const navigate = useNavigate();

  const [Loading, setLoading] = useState(true);

  const [params, setParams] = useState({ key: "null", pageNo: 1 });

  const [result, setResult] = useState({});

  const [typeLengthArr, setTypeLengthArr] = useState(null);

  const getCoursList = async () => {
    setLoading(true);
    let obj = {
      ...params,
      key,
      ...qs.parse(search),
    };
    setParams(obj);
    const { result, msg, status } = await getUserCourse(obj);
    setLoading(false);
    if (status === 1) {
      return message.error(msg);
    }

    setResult(result);
  };

  const getTypeLengthArr = async () => {
    const { result, msg, status } = await getTypeAndUserType();
    if (status === 1) {
      setTypeLengthArr([0, 100]);
      return message.error(msg);
    }

    return setTypeLengthArr(result);
  };

  const resetResult = (key, value) => {
    if (key === "del") {
      const { id } = value;
      getTypeLengthArr();
      return setResult({
        total: result.total - 1,
        data: result.data.filter((e) => e.typeid[0]._id !== id),
      });
    } else {
      const { _id } = value;
      const obj = _pick(value, [
        "examplesentence",
        "fixedcol",
        "phrases",
        "words",
      ]);
      return setResult({
        ...result,
        data: result.data.map((e) => (e._id === _id ? { ...e, ...obj } : e)),
      });
    }
  };

  useEffect(() => {
    getCoursList();
  }, [key, search]);

  const handleChangeKey = (e) => {
    return navigate(`/user/session/${e.target.value}`);
  };

  const changePage = useCallback((page) => {
    return navigate(
      `${pathname}?${qs.stringify({ ...qs.parse(search), pageNo: page })}`
    );
  }, []);

  const handleChangePageNo = useCallback(
    throttle(changePage, 200, {
      leading: true,
      trailing: false,
    }),
    [changePage]
  );

  useEffect(() => {
    getTypeLengthArr();
  }, []);

  return (
    <Row className="user-session">
      <Col xs={24} md={16}>
        <div className="user-session-left-nav">
          <Radio.Group
            value={params.key}
            buttonStyle="solid"
            onChange={handleChangeKey}
          >
            <Space align="center" size={15}>
              {navItem.map((e) => (
                <Radio.Button key={e.value} value={e.value}>
                  {e.label}
                </Radio.Button>
              ))}
            </Space>
          </Radio.Group>
        </div>
        <div className="user-session-left-main w-border">
          {Loading && (
            <div className="user-session-left-main-loading">
              <Spin
                size="large"
                indicator={
                  <LoadingOutlined
                    style={{
                      fontSize: 40,
                    }}
                    spin
                  />
                }
              />
            </div>
          )}
          {result.data && result.data.length > 0 ? (
            result.data.map((e) => (
              <SessionItem resetResult={resetResult} item={e} key={e._id} />
            ))
          ) : (
            <Empty></Empty>
          )}
        </div>
        <Pagination
          hideOnSinglePage={true}
          current={Number(params.pageNo)}
          total={result.total}
          pageSize={10}
          onChange={handleChangePageNo}
        />
      </Col>
      <Col xs={0} md={{ span: 7, offset: 1 }} style={{ textAlign: "center" }}>
        <Title level={3}>总进度</Title>
        {typeLengthArr !== null && <MyPercentChart item={typeLengthArr} />}
      </Col>
    </Row>
  );
}
export default UserSession;
