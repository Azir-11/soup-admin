/** 将路由路径转换成路由名字 */
export const transformRoutePathToRouteName = (path) => {
  if (path === "/") return "root";

  const pathSplitMark = "/";
  const routeSplitMark = "_";

  const name = path.split(pathSplitMark).slice(1).join(routeSplitMark);

  return name;
};
