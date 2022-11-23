import i18n from "@/lang/index";
import useLanguage from "@/stores/modules/language";
import { LANGUAGE } from "@/config";
import { setPageTitle } from "@/utils";
import router from "@/router";
export default function useToggleLang() {
  const toggle = () => {
    const { locale, t } = i18n.global;
    const route = router.currentRoute.value;
    const lang =
      useLanguage().getLanguage === LANGUAGE.zh ? LANGUAGE.en : LANGUAGE.zh;
    useLanguage().setLanguage(lang);
    locale.value = lang;
    const l = route.query.lang;
    const title = (route.meta && route.meta.title) || "";
    let url = route.fullPath;
    if (l) {
      url = route.fullPath.replace(`lang=${l}`, `lang=${lang}`);
      router.replace(url);
    }
    title && setPageTitle(t(title));
  };
  return {
    toggle,
  };
}
