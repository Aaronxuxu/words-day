// axios请求
export const GET = "get";
export const POST = "post";
// 服务器前缀
export const BASEAPI = "/api";

// redux获取数据常量
export const GETWORD = "getword";
export const CLEARWORD = "clearword";

// redux打开关闭form表单
export const OPEN = "open";
export const CLOSE = "close";

// 用户登录退出
export const LOGIN = "login";
export const LOGOUT = "logout";

// 获取用户信息
export const GETUSERPROFILE = "getUserProfile";
export const GETUSERSESSION = "getUserSession";
export const CLEARALL = "clearAllUserInfo";

// 更新用户相关业务
export const UPDATEUSERPROFILE = "udpateUserProfile";

// 高德地图省份API接口密钥
export const SCRECTKEYAREA = "6e74ed68dc430cae5c59073e43d0239a";

export const GETAREA = "getArea";

export const DEEPMENU = function (target) {
  return target.reduce((a, c) => {
    let obj = {
      label: c.name,
      value: c.adcode,
    };
    if (c.districts.length > 0) {
      const reduceResult = DEEPMENU(c.districts);
      obj.children = reduceResult;
    }

    a.push(obj);
    return a;
  }, []);
};

// 图片查看路径（分离与不分离区别）
export const BASE_IMAGE_URL = "http://localhost:5000/upload";
