import ajax from "./ajax";
import { GET, POST, BASEAPI } from "../uitil/constans";
// 添加指定词汇的数据
export const addWord = (data) => ajax(`${BASEAPI}/jc/add`, POST, data);
// 获取词汇里的单词
export const getWords = (data) => ajax(`${BASEAPI}/jc/get`, GET, data);

// 获取词汇大全
export const getType = () => ajax(`${BASEAPI}/wordType/all`, GET);
