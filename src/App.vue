<script setup>
import { computed, ref, nextTick, provide, onBeforeMount } from "vue";
import useLanguage from "./stores/modules/language";
import { ElConfigProvider } from "element-plus";
import { LANGUAGE, langKey } from "./config";
import store2 from "store2";
import { useI18n } from "vue-i18n";
import { getUrlParam } from "./utils";
const { locale } = useI18n();

const localeLang = computed(() => useLanguage().locale);
const isReloadRouter = ref(true);
// 用来刷新路由
const reload = () => {
  isReloadRouter.value = false;
  nextTick(() => {
    isReloadRouter.value = true;
  });
};
provide("reload", reload);

const lang = ref();
// 在此初始化设置语言
onBeforeMount(() => {
  lang.value = getUrlParam("lang") || store2.get(langKey) || LANGUAGE.en;
  const langArray = [LANGUAGE.en, LANGUAGE.zh];
  if (!langArray.includes(lang.value)) {
    lang.value = LANGUAGE.en;
  }
  if (lang.value !== store2.get(langKey)) {
    useLanguage().setLanguage(lang.value);
    locale.value = lang.value;
  }
});
</script>

<template>
  <el-config-provider :locale="localeLang">
    <router-view v-if="isReloadRouter" />
  </el-config-provider>
</template>

<style scoped lang="less"></style>
