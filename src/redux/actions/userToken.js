import { LOGIN, LOGOUT } from "../../uitil/constans";
import { login, logout } from "../../api/axios";
import cookie from "react-cookies";
import qs from "query-string";

// 登录
export const loginAction = (data) => {
  return async (dispatch) => {
    const { status, result, msg } = await login(data);
    if (status === 1) {
      return Promise.reject(msg);
    } else {
      // 设置七天过期时间
      cookie.save("userToken", qs.stringify(result), {
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

// 编辑后更新Token
export const upadateTokenAction = (data) => {
  return (dispatch) => {
    // 设置七天过期时间
    cookie.save("userToken", qs.stringify(data), {
      expires: new Date(new Date().getTime() + 24 * 3600 * 1000 * 7),
    });
    dispatch({
      type: LOGIN,
      data: data,
    });
  };
};

// 退出登录
export const logoutAction = () => {
  return async (dispatch) => {
    const { msg, status } = await logout();
    if (status === 1) {
      return Promise.reject(msg);
    }
    cookie.remove("userToken");
    dispatch({
      type: LOGOUT,
      data: null,
    });
    return "ok";
  };
};
