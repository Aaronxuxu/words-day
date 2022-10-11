import {
  GETUSERPROFILE,
  UPDATEUSERPROFILE,
  CLEARALL,
} from "../../uitil/constans";

const init = {
  profile: null,
};
function user(prev = init, actions) {
  const { type, data } = actions;
  switch (type) {
    // 获取个人资料
    case GETUSERPROFILE:
      return { ...prev, profile: data };
    // 更新个人资料
    case UPDATEUSERPROFILE:
      return { ...prev, profile: data };

    case CLEARALL:
      return init;
    default:
      return prev;
  }
}
export default user;
