import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import Axios from "axios";
import type { Request } from "@/axios/http/type";
import { message } from "./message";
import { ACCESS_TOKEN } from "@/stores/mutation-types";
import { storage } from "@/utils/storage";

export const baseURL = "http://localhost:8000/api/";

/**
 * 默认 create Axios 的配置参数
 */
const defaultConfig: AxiosRequestConfig = {
  baseURL: baseURL,
  timeout: 10000, //10秒超时
  withCredentials: false,
  responseType: "json",
  transformRequest: [
    (data) => {
      //对请求的参数进行处理
      data = JSON.stringify(data);
      return data;
    },
  ],
  validateStatus() {
    // 使用async-await，处理reject情况较为繁琐，所以全部返回resolve，在业务代码中处理异常
    return true;
  },
  transformResponse: [
    (data) => {
      //对响应的数据进行处理
      if (typeof data === "string" && data.startsWith("{")) {
        data = JSON.parse(data);
      }
      return data;
    },
  ],
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
};
/**
 * Axios create的时候后去的配置参数
 * @param config
 */
const getConfig = (config?: AxiosRequestConfig): AxiosRequestConfig => {
  if (!config) return defaultConfig;
  return defaultConfig;
};

/**
 * 自定义封装的Axios 类
 */
class EnclosureHttp {
  constructor() {
    this.httpInterceptorsRequest();
    this.httpInterceptorsResponse();
  }

  /**
   * Axios 实例
   * @private
   */
  private static axiosInstance: AxiosInstance = Axios.create(getConfig());

  /**
   * 请求拦截
   * @private
   */
  private httpInterceptorsRequest(): void {
    EnclosureHttp.axiosInstance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        /*
         * 在请求发出去之前作出一下处理,添加token
         * */
        if (storage.get(ACCESS_TOKEN)) {
          (config as any).headers.token = storage.get(ACCESS_TOKEN).value;
        }
        return config;
      },
      (err) => {
        return Promise.resolve(err);
      },
    );
  }

  /**
   * 响应拦截
   * @private
   */
  private httpInterceptorsResponse(): void {
    EnclosureHttp.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        // message("请求成功", "success");
        /*
         *   对响应的数据作出一些处理
         * */
        const { status } = response.data;
        let msg = "";
        if (status < 200 || status >= 300) {
          // 处理http错误，抛到业务代码
          this.errorHandle(status, response.data.message);
          if (typeof response.data === "string") {
            msg = "打盹了！！！";
            response.data = { msg };
          } else {
            response.data.msg = msg;
          }
        }
        return response;
      },
      (error: AxiosError) => {
        //请求出错的验证
        const { response } = error;
        if (response) {
          // 请求已发出，但是不在2xx的范围
          this.errorHandle(response.data.status, response.data.message);
          return Promise.reject(response);
        } else {
          // 处理断网的情况
          // eg:请求超时或断网时，更新state的network状态
          // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
          // 后续增加断网情况下做的一些操作
          return Promise.reject(error);
        }
      },
    );
  }

  /**
   * 请求失败后的错误统一处理
   * @param status 请求失败的状态码
   * @param other
   */
  private errorHandle = (status: string, other: string) => {
    // 状态码判断
    switch (status) {
      case "-1": // -1: 未登录状态，跳转登录页
        message("未登录状态");
        break;
      case "403": // 403 token过期
        message("登录过期，请重新登录", "warning");
        setTimeout(() => {
          // storage.remove(ACCESS_TOKEN);
          // storage.remove("LOGIN");
          location.reload();
        }, 1000);
        break;
      case "404": // 404请求不存在
        message("请求错误！！！", "error");
        break;
      default:
        message(other);
    }
  };

  /**
   * get方法
   * @param url 路径
   * @param params 参数
   * @param config
   */
  public reqGet: Request = async (url: string, params?: unknown, config?: AxiosRequestConfig) => {
    return await EnclosureHttp.axiosInstance.get(url, { params, ...config });
  };

  /**
   * post 方法
   * @param url 路径
   * @param params 参数
   * @param config
   */
  public reqPost: Request = (url: string, data: unknown = {}, config?: AxiosRequestConfig) => {
    return EnclosureHttp.axiosInstance.post(
      url,
      {
        ...(data as Record<string, unknown>),
      },
      config,
    );
  };

  /**
   * Axios init GET方法
   * @param url 路径
   * @param params 参数
   * @param config
   */
  public get: Request = (url: string, params?: unknown, config?: AxiosRequestConfig) => {
    return Axios.get(url, { params, ...config });
  };

  /**
   * Axios init POST 方法
   * @param url 路径
   * @param params 参数
   * @param config
   */
  public post: Request = (url: string, params: unknown = {}, config?: AxiosRequestConfig) => {
    return Axios.post(url, { data: params }, config);
  };
}

export default EnclosureHttp;
