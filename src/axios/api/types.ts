// 定义接口数据返回类型

//接口返回的数据类型
export interface Result<T> {
  data: Array<T> | T;
  status: number;
  message: string;
}

// 登录接口返回的数据类型
export interface Login {
  role: string;
  id: number;
  username: string;
  token: string;
}
