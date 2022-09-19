// 定义接口数据返回类型

//接口返回的数据类型
export interface Result<T> {
  data: T;
  status: number;
  msg: string;
}

export interface Login {
  id: string;
  userName: string;
  roles: string;
  token: string;
  permissions: string;
}
