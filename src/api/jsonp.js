import { message } from "antd";
import jsonp from "jsonp";

const webAPI = (url, obj) => {
  const str = Object.keys(obj).reduce((a, c, i, arr) => {
    if (i === arr.length - 1) {
      a = a + `${c}=${obj[c]}`;
    } else {
      a = a + `${c}=${obj[c]}&`;
    }
    return a;
  }, "");
  return new Promise((resolve, reject) => {
    jsonp(`${url}?${str}`, {}, (err, data) => {
      if (err) {
        message.err("API请求错误，原因为：" + err.message);
      } else {
        resolve(data);
      }
    });
  });
};
export default webAPI;
