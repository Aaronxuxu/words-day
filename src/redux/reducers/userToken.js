import { LOGIN, LOGOUT } from "../../uitil/constans";
import cookies from "react-cookies";
import qs from "qs";
const cookieInfo = qs.parse(cookies.load("userToken"));
const init = {
  token: cookieInfo.token || null,
  userName: cookieInfo.userName || null,
  userAvatar: cookieInfo.userAvatar || null,
  userID: cookieInfo.userID || null,
};

function userInfo(prev = init, actions) {
  const { type, data } = actions;
  switch (type) {
    case LOGIN:
      return data;
    case LOGOUT:
      return {
        token: null,
        userName: null,
        userAvatar: null,
        userID: null,
      };
    default:
      return prev;
  }
}

export default userInfo;
