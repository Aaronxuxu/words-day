import React, { useRef, useEffect, useState, useCallback } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import SessionItem from "./SessionItem";
import MyGaugeChart from "../../../components/MyGaugeChart";
import { getUserCourse } from "../../../api/axios";
import qs from "query-string";

import throttle from "lodash/throttle";

import { Row, Col, Radio, Space, message, Pagination, Spin, Empty } from "antd";

import { LoadingOutlined } from "@ant-design/icons";
import "./index.css";

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
        <div className="user-session-left-main">
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
            result.data.map((e) => <SessionItem item={e} key={e._id} />)
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
      <Col xs={0} md={{ span: 7, offset: 1 }}>
        {/* <MyGaugeChart></MyGaugeChart> */}
      </Col>
    </Row>
  );
}
export default UserSession;
