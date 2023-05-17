import type { LocaleType } from '#/locale';

export function setHtmlPageLang(locale: LocaleType) {
  document.querySelector('html')?.setAttribute('lang', locale);
}

export const loadLocalePool: LocaleType[] = [];

export function setLoadLocalePool(cb: (lp: LocaleType[]) => void) {
  cb(loadLocalePool);
}
