import {
  GETUSERPROFILE,
  GETUSERSESSION,
  UPDATEUSERPROFILE,
  CLEARALL,
  LOGIN,
} from "../../uitil/constans";
import {
  getUserProfile,
  getUserSession,
  updateUserAvatar,
  updateUserProfile,
  delAvatarFile,
} from "../../api/axios";

import Moment from "moment";
import { message } from "antd";
import { upadateTokenAction } from "./userToken";
import cookie from "react-cookies";
// 获取个人资料
export const getProfileAction = () => {
  return async (dispatch) => {
    let { status, msg, result } = await getUserProfile();
    if (status === 1) {
      return message.error(msg);
    }
    return dispatch({
      type: GETUSERPROFILE,
      data: result,
    });
  };
};

// 更新个人资料
export const updateProfileAction = (data) => {
  return async (dispatch) => {
    let { result, msg, status, token } = await updateUserProfile(data);
    if (status === 1) {
      return new Promise.reject(new Error(msg));
    }
    result = {
      ...result,
      birthday: new Moment(result.birthday),
    };
    cookie.remove("userToken");
    dispatch(
      upadateTokenAction({
        token,
        userName: result.userName,
        userAvatar: result.userAvatar || null,
      })
    );

    return dispatch({
      type: UPDATEUSERPROFILE,
      data: result,
    });
  };
};

// 更新用户头像
export const updateAvatarAction = (data) => {
  return async (dispatch) => {
    const { status, msg, result, oldAvatar, token } = await updateUserAvatar({
      userAvatar: data,
    });
    if (status === 1) {
      return new Promise.reject(new Error(msg));
    } else {
      if (oldAvatar !== undefined) {
        await delAvatarFile({
          name: oldAvatar,
          isUser: true,
        });
      }
      console.log(result);
      cookie.remove("userToken");
      dispatch(
        upadateTokenAction({
          token,
          userName: result.userName,
          userAvatar: result.userAvatar || null,
        })
      );

      dispatch({
        type: UPDATEUSERPROFILE,
        data: result,
      });
      return "ok";
    }
  };
};

export const getSessionAction = async () => {};

// 退出登录清除所有用户信息
export const clearAllUserInfoAction = () => ({ type: CLEARALL });
