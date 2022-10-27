import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// 课程详情
function CourseRead(props) {
  const location = useLocation();
  console.log(location);
  return <div>阅读</div>;
}
export default CourseRead;
