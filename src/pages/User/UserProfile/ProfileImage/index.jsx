import React, { useState } from "react";
import IconFont from "../../../../uitil/IconFont";
import { Upload, Avatar, message } from "antd";
import { connect } from "react-redux";
import { updateAvatarAction } from "../../../../redux/actions/user";

import ImgCrop from "antd-img-crop";
import "./index.css";
import { BASE_IMAGE_URL } from "../../../../uitil/constans";

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

  if (!isJpgOrPng) {
    message.error("只可以上传jpg、png类型!");
  }

  const isLt5M = file.size / 1024 / 1024 < 5;

  if (!isLt5M) {
    message.error("照片大小不能超过2MB");
  }

  return isJpgOrPng && isLt5M;
};

function ProfileImage(props) {
  const { updateAvatarAction, userAvatar } = props;

  const handleChange = async (info) => {
    if (info.file.status === "uploading") {
      return;
    }

    if (info.file.status === "done") {
      // Get this url from response in real world.
      const {
        response: {
          data: { name },
          status,
          msg,
        },
      } = info.file;
      if (status === 1) {
        return message.error(msg);
      }

      try {
        await updateAvatarAction(name);
        message.success("上传成功");
      } catch (error) {
        return message.error(error);
      }
    }
  };
  return (
    <ImgCrop rotate>
      <Upload
        name="image"
        beforeUpload={beforeUpload}
        showUploadList={false}
        className="profile-upload"
        action="/api/manage/img/upload"
        data={{ isUser: true }}
        onChange={handleChange}
        maxCount={1}
      >
        <Avatar
          shape="square"
          size={{
            xs: 75,
            sm: 75,
            md: 75,
            lg: 75,
            xl: 75,
            xxl: 75,
          }}
          icon={<IconFont type="icon-user"></IconFont>}
          src={userAvatar ? `${BASE_IMAGE_URL}${userAvatar}` : ""}
        ></Avatar>
        <div className="profile-upload-avatar-hover">
          <IconFont type="icon-camera"></IconFont>
        </div>
      </Upload>
    </ImgCrop>
  );
}
export default connect(
  (state) => ({
    userAvatar: state.user.profile["userAvatar"],
    profile: state.user.profile,
  }),
  { updateAvatarAction }
)(ProfileImage);
