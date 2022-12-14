// axios请求
import ajax from "./ajax";

// jsonp请求
import webAPI from "./jsonp";

import { GET, POST, BASEAPI } from "../uitil/constans";

// 用户登录
export const login = (data) => ajax(`${BASEAPI}/login`, POST, data);
// 用户注册
export const register = (data) => ajax(`${BASEAPI}/register`, POST, data);
// 注册检测是否存在账号
export const isExist = (data) => ajax(`${BASEAPI}/AccountisExist`, GET, data);
// 退出登录
export const logout = (data) => ajax(`${BASEAPI}/user/logout`, GET, data);

// 获取用户个人资料
export const getUserProfile = () => ajax(`${BASEAPI}/user/detail`, GET);

// 更新用户个人资料
export const updateUserProfile = (data) =>
  ajax(`${BASEAPI}/user/updateProfile`, POST, data);

// 更新用户头像
export const updateUserAvatar = (data) =>
  ajax(`${BASEAPI}/user/updateAvatar`, POST, data);

// 删除用户头像文件
export const delAvatarFile = (data) =>
  ajax(`${BASEAPI}/manage/img/delete`, POST, data);

// 获取用户学习进度
export const getUserCourse = (data) =>
  ajax(`${BASEAPI}/user/course`, GET, data);

// 用户添加课程
export const addUserCourse = (obj) =>
  ajax(`${BASEAPI}/user/addCourse`, POST, obj);

// 用户删除学习进度
export const delUserCourse = (data) =>
  ajax(`${BASEAPI}/user/delCourse`, POST, data);

// 获取用户选择的课程数与全部课程数量
export const getTypeAndUserType = () =>
  ajax(`${BASEAPI}/user/getTypeAndUserType`, GET);

// 用户更新课程进度
export const updateUserCourse = (data) =>
  ajax(`${BASEAPI}/user/updateCourse`, POST, data);

// 用户重置课程进度
export const resetUserCourse = (data) =>
  ajax(`${BASEAPI}/user/resetCourse`, POST, data);

// 添加词汇种类
export const addTypeName = (data) =>
  ajax(`${BASEAPI}/wordType/add`, POST, data);

// 添加指定词汇的数据
export const addWord = (data) => ajax(`${BASEAPI}/word/add`, POST, data);

// 获取词汇里的单词
export const getWords = (data) => ajax(`${BASEAPI}/word/get`, GET, data);

// 获取指定单词详细数据
export const getWordByID = (obj) => ajax(`${BASEAPI}/word/get/id`, GET, obj);

// 获取词汇大全
export const getType = () => ajax(`${BASEAPI}/wordType/all`, GET);

// 模糊查询获取词汇种类
export const getTypeByName = (obj) =>
  ajax(`${BASEAPI}/wordType/Name`, GET, {
    typeName: obj.searchVal,
    count: obj.count,
  });

// 根据词汇词表获取分类
export const getTypeByGrade = (obj) =>
  ajax(`${BASEAPI}/wordType/Grade`, GET, obj);

// 根据ID获取词汇分类
export const getTypeByID = (obj) => ajax(`${BASEAPI}/wordType/id`, GET, obj);

// 获取词汇详情
export const getCourseDetail = (obj) =>
  ajax(`${BASEAPI}/course/detail`, GET, obj);

// 判断用户是否已收藏此课程
export const getCourseOfUserByOne = (obj) =>
  ajax(`${BASEAPI}/user/courseOne`, GET, obj);

// API请求
// 获取省份市区
export const getArea = (obj) =>
  webAPI("https://restapi.amap.com/v3/config/district", obj);
