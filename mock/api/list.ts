import { Random } from "mockjs";

/**
 * @param {Number} times 回调函数需要执行的次数
 * @param {Function} callback 回调函数
 */
export function doCustomTimes(times: number, callback: any) {
  let i = -1;
  while (++i < times) {
    callback(i);
  }
}

const tableList = (pageSize) => {
  const result: any[] = [];
  doCustomTimes(pageSize, () => {
    result.push({
      id: "@integer(10,999999)",
      beginTime: "@datetime",
      endTime: "@datetime",
      address: "@city()",
      name: "@cname()",
      avatar: Random.image("400x400", Random.color(), Random.color(), Random.first()),
      date: `@date('yyyy-MM-dd')`,
      time: `@time('HH:mm')`,
      "no|100000-10000000": 100000,
      "status|1": [true, false],
    });
  });
  return result;
};

export default [
  //表格数据列表
  {
    url: "/mock/table/list",
    timeout: 1000,
    method: "get",
    response: ({ query }) => {
      const { page = 1, pageSize = 10 } = query;
      const list = tableList(Number(pageSize));
      const data = {
        page: Number(page),
        pageSize: Number(pageSize),
        pageCount: 60,
        list,
      };
      return {
        status: 200,
        message: "ok",
        data: data,
      };
    },
  },
];
