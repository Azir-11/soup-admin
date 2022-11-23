/**
 * boolean组合式函数
 * @param initValue 初始值
 */
export default function useBoolean(initValue = false) {
  const bool = ref(initValue);

  const setBool = (value: boolean) => {
    bool.value = value;
  };
  const setTrue = () => {
    setBool(true);
  };
  const setFalse = () => {
    setBool(false);
  };
  const toggle = () => {
    setBool(!bool.value);
  };

  return {
    bool,
    setBool,
    setTrue,
    setFalse,
    toggle,
  };
}
