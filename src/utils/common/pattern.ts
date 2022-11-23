/**
 * 策略模式
 * @param actions 每一种可能执行的操作
 */
export const exeStrategyActions = (actions) => {
  actions.some((item) => {
    const [flag, action] = item;
    if (flag) {
      action();
    }
    return flag;
  });
};
