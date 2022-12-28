import { EnumDataType } from "@/enum";

export const isNumber = (data: unknown) => {
  return Object.prototype.toString.call(data) === EnumDataType.number;
};
export const isString = (data: unknown) => {
  return Object.prototype.toString.call(data) === EnumDataType.string;
};
export const isBoolean = (data: unknown) => {
  return Object.prototype.toString.call(data) === EnumDataType.boolean;
};
export const isNull = (data: unknown) => {
  return Object.prototype.toString.call(data) === EnumDataType.null;
};
export const isUndefined = (data: unknown) => {
  return Object.prototype.toString.call(data) === EnumDataType.undefined;
};
export const isObject = (data: unknown) => {
  return Object.prototype.toString.call(data) === EnumDataType.object;
};
export const isArray = (data: unknown) => {
  return Object.prototype.toString.call(data) === EnumDataType.array;
};
export const isDate = (data: unknown) => {
  return Object.prototype.toString.call(data) === EnumDataType.date;
};
export const isRegExp = (data: unknown) => {
  return Object.prototype.toString.call(data) === EnumDataType.regexp;
};
export const isSet = (data: unknown) => {
  return Object.prototype.toString.call(data) === EnumDataType.set;
};
export const isMap = (data: unknown) => {
  return Object.prototype.toString.call(data) === EnumDataType.map;
};
export const isFile = (data: unknown) => {
  return Object.prototype.toString.call(data) === EnumDataType.file;
};
export function isFunction<T extends (...args: any[]) => any | void | never>(
  data: T | unknown,
): data is T {
  return Object.prototype.toString.call(data) === EnumDataType.function;
}
