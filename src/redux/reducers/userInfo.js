import { LOGIN, LOGOUT } from "../../uitil/constans";
import cookies from "react-cookies";
const init = cookies.load("userInfo") || null;

function userInfo(prev = init, actions) {
  const { type, data } = actions;

  switch (type) {
    case LOGIN:
      return data;
    case LOGOUT:
      return "";
    default:
      return prev;
  }
}

export default userInfo;
