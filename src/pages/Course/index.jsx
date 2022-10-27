import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import CourseIndex from "./Course_Index/Course_Index";

import "./index.css";

function Course() {
  const { pathname } = useLocation();
  return (
    <div className="wd-course ">
      {pathname === "/course/" ? <CourseIndex /> : <Outlet />}
    </div>
  );
}

export default Course;
