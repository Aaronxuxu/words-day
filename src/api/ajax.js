import { message } from "antd";
import axios from "axios";
import { GET } from "../uitil/constans";

function ajax(url, method = GET, data = {}) {
  return new Promise((resolve, rejcet) => {
    let promise;
    if (method === GET) {
      promise = axios.get(url, { params: data });
    } else {
      promise = axios.post(url, data);
    }
    promise
      .then((res) => {
        const { data } = res;
        return resolve(data);
      })
      .catch((err) => {
        message.error(err);
      });
  });
}
export default ajax;
