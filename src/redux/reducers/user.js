import { GETUSERPROFILE, GETUSERSESSION } from "../../uitil/constans";

const init = {
  session: null,
  profile: null,
};
function user(prev = init, actions) {
  const { type, data } = actions;
  switch (type) {
    // 获取个人资料
    case GETUSERPROFILE:
      return { ...prev, profile: data };
    case GETUSERSESSION:
      return { ...prev, session: data };
    default:
      return prev;
  }
}
export default user;
