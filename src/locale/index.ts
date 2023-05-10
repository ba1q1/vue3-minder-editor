export { default as zhCn } from './lang/zh-CN';
export { default as zhTw } from './lang/zh-TW';
export { default as enUS } from './lang/en-US';

export type TranslatePair = {
  [key: string]: string | string[] | TranslatePair;
};

export type Language = {
  name: string;
  minder: TranslatePair;
};
