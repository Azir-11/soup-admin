/** 统一失败和成功的请求结果的数据类型 */
export const handleServiceResult = async (error, data) => {
  if (error) {
    const fail = {
      error,
      data: null,
    };
    return fail;
  }
  const success = {
    error: null,
    data,
  };
  return success;
};

/** 请求结果的适配器：用于接收适配器函数和请求结果 */
export const adapter = (adapterFun, ...args) => {
  let result;

  const hasError = args.some((item) => {
    const flag = Boolean(item.error);
    if (flag) {
      result = {
        error: item.error,
        data: null,
      };
    }
    return flag;
  });

  if (!hasError) {
    const adapterFunArgs = args.map((item) => item.data);
    result = {
      error: null,
      data: adapterFun(...adapterFunArgs),
    };
  }

  return result!;
};
