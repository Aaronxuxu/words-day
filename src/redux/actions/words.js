import { GETWORD } from "../../uitil/constans";
import { getWords } from "../../api/axios";
import { message } from "antd";

export const getWrod = (data) => {
  return async (dispatch) => {
    const { status, result, msg } = await getWords(data);
    if (status !== 0) {
      message.error(msg);
    }
    return dispatch({
      type: GETWORD,
      data: result || {},
    });
  };
};
