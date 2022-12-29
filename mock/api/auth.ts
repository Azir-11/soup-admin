import { userModel } from "../model";

/** 参数错误的状态码 */
const ERROR_PARAM_STATUS = 400;

const ERROR_PARAM_MSG = "参数校验失败！";

const apis = [
  // 登录
  {
    url: "/mock/user/login",
    method: "post",
    response: (options) => {
      const { userName = undefined, password = undefined } = options.body;

      if (!userName || !password) {
        return {
          code: ERROR_PARAM_STATUS,
          message: ERROR_PARAM_MSG,
          data: { userName, password },
        };
      }
      const findItem = userModel.find(
        (item) => item.userName === userName && item.password === password,
      );

      if (findItem) {
        return {
          code: 200,
          message: "success",
          data: findItem.token,
        };
      }
      return {
        code: ERROR_PARAM_STATUS,
        message: "用户名或密码错误！",
        data: null,
      };
    },
  },
  // 获取权限列表
  {
    url: "/mock/user/getPermissions",
    method: "get",
    response: (options) => {
      const { token = undefined } = options.body;

      if (!token) {
        return {
          code: ERROR_PARAM_STATUS,
          message: ERROR_PARAM_MSG,
          data: null,
        };
      }

      const findItem = userModel.find((item) => item.token === token && item.token === token);

      if (findItem) {
        return {
          code: "200",
          message: "成功",
          data: {
            token: findItem.token,
          },
        };
      }
      return {
        code: 403,
        message: "Token错误,请重新登录",
        data: null,
      };
    },
  },
  // 获取用户信息(请求头携带token, 根据token获取用户信息)
  {
    url: "/mock/getUserInfo",
    method: "get",
    response: (options: Service.MockOption): Service.MockServiceResult<Auth.UserInfo | null> => {
      // 这里的mock插件得到的字段是authorization, 前端传递的是Authorization字段
      const { authorization = "" } = options.headers;

      if (!authorization) {
        return {
          code: 400,
          message: "用户已失效或不存在！",
          data: null,
        };
      }
      const userInfo: Auth.UserInfo = {
        userId: "",
        userName: "",
        userAvatar: "",
        userRole: "user",
        userPermissions: [],
      };
      console.log("authorization", authorization);
      const isInUser = userModel.some((item) => {
        const flag = item.token === authorization;
        if (flag) {
          const { userId: itemUserId, userName, userAvatar, userRole, userPermissions } = item;
          Object.assign(userInfo, {
            userId: itemUserId,
            userName,
            userAvatar,
            userRole,
            userPermissions,
          });
        }
        return flag;
      });

      if (isInUser) {
        return {
          code: 200,
          message: "ok",
          data: userInfo,
        };
      }

      return {
        code: 400,
        message: "用户信息异常！",
        data: null,
      };
    },
  },
];
export default apis;
