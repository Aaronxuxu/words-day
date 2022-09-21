import ajax from "./ajax";
import { GET, POST, BASEAPI } from "../uitil/constans";

// 用户登录
export const login = (data) => ajax(`${BASEAPI}/user/login`, POST, data);
// 用户注册
export const register = (data) => ajax(`${BASEAPI}/user/register`, POST, data);
// 注册检测是否存在账号
export const isExist = (data) => ajax(`${BASEAPI}/user/isExist`, GET, data);

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
