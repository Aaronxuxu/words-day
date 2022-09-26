import { LOGIN, LOGOUT } from "../../uitil/constans";
import cookies from "react-cookies";
const init = {
  token: cookies.load("userToken") || null,
  userAvatar: cookies.load("userAvatar") || null,
};
function userInfo(prev = init, actions) {
  const { type, data } = actions;

  switch (type) {
    case LOGIN:
      return data;
    case LOGOUT:
      return { token: null, userAvatar: null };
    default:
      return prev;
  }
}

export default userInfo;
