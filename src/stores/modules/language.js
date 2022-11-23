import { defineStore } from "pinia";
import { getCurrentLanguage, setCurrentLanguage } from "@/lang";

import ElementPlusLocaleZhCn from "element-plus/lib/locale/lang/zh-cn";
import ElementPlusLocaleEn from "element-plus/lib/locale/lang/en";
const element = {
  zh: ElementPlusLocaleZhCn,
  en: ElementPlusLocaleEn,
};

const useLanguage = defineStore({
  id: "language-pinia",
  state: () => ({
    language: getCurrentLanguage(),
    locale: element[getCurrentLanguage()],
  }),
  getters: {
    getLanguage: (state) => state.language || getCurrentLanguage(),
  },
  actions: {
    setLanguage(lang) {
      this.language = lang;
      this.locale = element[lang];
      setCurrentLanguage(this.language);
    },
  },
});

export default useLanguage;
