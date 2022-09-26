import { GETAREA, SCRECTKEYAREA, DEEPMENU } from "../../uitil/constans";
// 获取高德地图API省份数据
import { getArea } from "../../api/axios";
import { message } from "antd";

export const getAreaAction = (data) => {
  return async (dispatch) => {
    console.log("1");
    const { status, info, districts } = await getArea({
      key: SCRECTKEYAREA,
      subdistrict: 2,
    });
    if (status === 0) {
      return message.error(info);
    }
    let result = DEEPMENU(districts[0].districts);
    return dispatch({
      type: GETAREA,
      data: result,
    });
  };
};
