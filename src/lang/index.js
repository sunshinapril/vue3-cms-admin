import { createI18n } from "vue-i18n";
import store2 from "store2";

import en from "@/lang/en";
import zhCN from "@/lang/zh-cn";
import { langKey, LANGUAGE } from "@/config";

const messages = {
  en: {
    ...en,
  },
  zh: {
    ...zhCN,
  },
};

export const getCurrentLanguage = () => {
  return store2.get(langKey) || LANGUAGE.en;
};

export const setCurrentLanguage = (lang) => {
  return store2.set(langKey, lang);
};

const i18n = createI18n({
  legacy: false,
  locale: getCurrentLanguage(),
  messages: messages,
});

export default i18n;
