import { message } from "antd";
import axios from "axios";
import { GET } from "../uitil/constans";
import store from "../redux/store";

axios.defaults.timeout = 5 * 1000;
axios.interceptors.request.use((config) => {
  const token = store.getState().userToken.token;
  if (token !== null) {
    config.headers.Authorization = token;
  }
  return config;
});

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
        const {
          status,
          data: { msg },
        } = err.response;
        message.error(msg);
        if (status === 401) {
          window.location.href = "/";
        }
      });
  });
}
export default ajax;
