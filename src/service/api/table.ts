import { mockRequest } from "../request";
/**
 * 获取table信息
 */
export const getTable = () => {
  return mockRequest.get("/table/list");
};
