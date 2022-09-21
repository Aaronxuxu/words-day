import { LOGIN, LOGOUT } from "../../uitil/constans";
import { login } from "../../api/axios";

import cookie from "react-cookies";

// 登录
export const loginAction = (data) => {
  return async (dispatch) => {
    const { status, result, msg } = await login(data);
    if (status === 1) {
      return Promise.reject(msg);
    } else {
      // 设置七天过期时间
      cookie.save("userInfo", result, {
        expires: new Date(new Date().getTime() + 24 * 3600 * 1000 * 7),
      });
      dispatch({
        type: LOGIN,
        data: result,
      });
      return "ok";
    }
  };
};
