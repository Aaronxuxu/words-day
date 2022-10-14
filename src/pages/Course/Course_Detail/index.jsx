import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

// 课程详情
function CourseDetail(props) {
  const params = useParams();
  console.log(params);
  return <div>详情页面</div>;
}
export default CourseDetail;
