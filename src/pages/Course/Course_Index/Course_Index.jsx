import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import CourseIndexUi from "./Course_Index_Ui";

import { openLoginModalAction } from "../../../redux/actions/loginModal";

import { getUserCourse, getTypeByGrade } from "../../../api/axios";

import { message } from "antd";

import _debounce from "lodash/debounce";

function CourseIndex(props) {
  // redux状态库
  const { openLoginModalAction, userToken } = props;
  const navigate = useNavigate();

  //   课程数据
  const [courseList, setCourseList] = useState([]);
  //   用户课程
  const [myCourses, setMyCourses] = useState([]);
  const [selectKey, setSelectKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  //    未登录状态下，打开登录框方法
  const openModal = (e) => {
    e.preventDefault();
    return openLoginModalAction();
  };

  //   已登录状态下，获取自己的课程
  const getMyCourses = async () => {
    const { result, status } = await getUserCourse({ pageSize: 5 });
    if (status === 1) {
      return message.error("获取用户课程失败");
    }
    return setMyCourses(result.data);
  };

  //   登录状态下，点击已选择课程
  const MyCourseFn = (item) => {
    return navigate(`/course/read/${item.typeid[0]._id}`, {
      state: item,
    });
  };

  // 获取课程数据
  const getCourseListFn = async (key = selectKey, isChange) => {
    if (isChange) {
      setIsLoading(true);
    }

    const { result, msg, status } = await getTypeByGrade({ key });
    setIsLoading(false);
    if (status === 1) {
      return message.error(msg);
    }
    setHasMore(result.length === 12);

    if (isChange) {
      setCourseList(result);
    } else {
      setCourseList([...courseList, ...result]);
    }
  };

  // 防抖函数
  const getCourseListFnDeb = useCallback(
    _debounce(getCourseListFn, 50, {
      leading: true,
      trailing: true,
    }),
    []
  );

  // 跳转到详情页面
  const getIDToDetail = (item) => {
    const { ctypeName } = item;
    return navigate(`/course/detail/${ctypeName}`, { state: { id: item._id } });
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      getCourseListFnDeb(selectKey, true);
    }, 200);

    return () => {
      clearTimeout(timeOut);
    };
  }, [selectKey]);

  useEffect(() => {
    if (userToken && userToken.token) {
      getMyCourses();
    }
  }, []);

  useEffect(() => {
    if (
      hasMore &&
      document.documentElement.scrollTop + document.body.offsetHeight >=
        document.body.scrollHeight * 0.8
    ) {
      getCourseListFn(selectKey);
    }
  }, [courseList]);

  return (
    <CourseIndexUi
      userToken={userToken}
      openModal={openModal}
      courseList={courseList}
      getCourseListFn={getCourseListFn}
      MyCourseFn={MyCourseFn}
      myCourses={myCourses}
      setSelectKey={setSelectKey}
      selectKey={selectKey}
      isLoading={isLoading}
      hasMore={hasMore}
      getIDToDetail={getIDToDetail}
    />
  );
}
export default connect((state) => ({ userToken: state.userToken }), {
  openLoginModalAction,
})(CourseIndex);
