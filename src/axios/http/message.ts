import type { NotificationType } from "naive-ui";
/**
 * 封装的 naive 的消息提示框
 * @param message
 * @param type
 */
export const message = (msg: string, type: NotificationType = "info") => {
  const message = window["$message"];
  message[type](msg);
};
