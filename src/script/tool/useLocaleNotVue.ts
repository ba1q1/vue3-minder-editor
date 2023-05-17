import type { Recordable } from '#/locale';
import zhCN from '@/locale/lang/zh-CN';
import enUS from '@/locale/lang/en-US';

const findCode = (arr: string[], tree: Recordable<Recordable>) => {
  let curCode = arr.shift();
  let curNode = tree[curCode || ''];
  while (curCode) {
    if (!curCode || !curNode) {
      return '';
    }
    if (curNode && arr.length === 0) {
      return curNode;
    }
    curCode = arr.shift();

    curNode = curNode[curCode || ''];
  }
};

export default function useLocaleNotVue(key: string) {
  const locale = localStorage.getItem('minder-locale') || 'zh-CN';

  const arr = key.split('.');
  switch (locale) {
    case 'zh-CN':
      // eslint-disable-next-line no-eval
      return findCode(arr, zhCN.message);
    case 'en-US':
      return findCode(arr, enUS.message);
    default:
      return key;
  }
}
