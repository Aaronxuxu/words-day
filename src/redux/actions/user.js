import { GETUSERPROFILE, GETUSERSESSION } from "../../uitil/constans";
import { getUserProfile, getUserSession } from "../../api/axios";
import { message } from "antd";

export const getProfileAction = () => {
  return async (dispatch) => {
    const { status, msg, result } = await getUserProfile();
    if (status === 1) {
      return message.error(msg);
    }
    return dispatch({
      type: GETUSERPROFILE,
      data: result,
    });
  };
};
export const getSessionAction = async () => {};
