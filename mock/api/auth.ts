import { userModel } from "../model";

/** 参数错误的状态码 */
const ERROR_PARAM_STATUS = 400;

const ERROR_PARAM_MSG = "参数校验失败！";

const apis = [
  // 登录
  {
    url: "/user/login",
    method: "post",
    response: (options) => {
      const { userName = undefined, password = undefined } = options.body;

      if (!userName || !password) {
        return {
          status: ERROR_PARAM_STATUS,
          message: ERROR_PARAM_MSG,
          data: null,
        };
      }
      const findItem = userModel.find(
        (item) => item.userName === userName && item.password === password,
      );

      if (findItem) {
        return {
          status: 200,
          message: "ok",
          data: findItem,
        };
      }
      return {
        status: ERROR_PARAM_STATUS,
        message: "用户名或密码错误！",
        data: null,
      };
    },
  },
  // 获取权限列表
  {
    url: "/user/getPermissions",
    method: "get",
    response: (options) => {
      const { token = undefined } = options.body;

      if (!token) {
        return {
          status: ERROR_PARAM_STATUS,
          message: ERROR_PARAM_MSG,
          data: null,
        };
      }

      const findItem = userModel.find((item) => item.token === token && item.token === token);

      if (findItem) {
        return {
          status: "200",
          message: "成功",
          data: {
            token: findItem.token,
          },
        };
      }
      return {
        status: 403,
        message: "Token错误,请重新登录",
        data: null,
      };
    },
  },
];
export default apis;
