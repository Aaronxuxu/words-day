import React, { useEffect, useState } from "react";

import { useLocation, useParams } from "react-router-dom";

import { Radio, Space, Row, Col, Typography } from "antd";

import ReadMbForm from "./Read_MbForm";

import qs from "query-string";
import "./index.css";

const { Title } = Typography;
const valPropsSession = sessionStorage.getItem("ReadvalProps");
const valPropsObj = {
  useMethod: "perusal",
  checkMethod: "",
  num: 0,
  props: ["words"],
};
// 课程详情
function CourseRead(props) {
  const { state, search } = useLocation();
  const params = useParams();

  const [valProps, setValProps] = useState(
    valPropsSession !== null ? qs.parse(valPropsSession) : valPropsObj
  );
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Row>
        <Col xs={24} sm={0}>
          <ReadMbForm
            valProps={valProps}
            setLoading={setLoading}
            loading={loading}
          />
        </Col>
        <Col xs={0} sm={24}>
          2
        </Col>
      </Row>
    </>
  );
}
export default CourseRead;
