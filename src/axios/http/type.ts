import type { AxiosRequestConfig } from "axios";

export interface IUser {
  name: string;
  pasword: string;
}

// 定制业务相关的网络请求响应格式， T 是具体的接口返回类型数据
export interface CustomSuccessData<T> {
  status: number;
  statusText: string;
  message?: string;
  data: T;
  [keys: string]: unknown;
}

/**
 *
 */
export interface Request {
  <T>(url: string, params?: Record<string, unknown>, config?: AxiosRequestConfig): Promise<
    CustomSuccessData<T>
  >;
}
