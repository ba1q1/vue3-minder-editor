import { computed, unref } from 'vue';
import { i18n } from '@/locale';
import { setHtmlPageLang, loadLocalePool } from '@/locale/helper';

import type { Recordable, LocaleType } from '#/locale';

interface LangModule {
  message: Recordable;
}

function setI18nLanguage(locale: LocaleType) {
  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale;
  } else {
    (i18n.global.locale as any).value = locale;
  }
  localStorage.setItem('minder-locale', locale);
  setHtmlPageLang(locale);
}

async function changeLocale(locale: LocaleType) {
  const globalI18n = i18n.global;
  const currentLocale = unref(globalI18n.locale);
  if (currentLocale === locale) {
    return locale;
  }

  if (loadLocalePool.includes(locale)) {
    setI18nLanguage(locale);
    return locale;
  }
  const langModule = ((await import(`./lang/${locale}.ts`)) as any).default as LangModule;

  if (!langModule) return;

  const { message } = langModule;

  globalI18n.setLocaleMessage(locale, message);
  loadLocalePool.push(locale);

  setI18nLanguage(locale);
  return locale;
}

export default function useLocale() {
  const { locale } = i18n.global;
  const currentLocale = computed(() => {
    return locale;
  });

  return {
    currentLocale,
    changeLocale,
  };
}
