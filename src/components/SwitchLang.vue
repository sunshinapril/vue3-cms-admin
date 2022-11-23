<template>
  <div class="lang-img" :class="{ zh: isZh }" @click="toggle"></div>
</template>

<script setup>
import useLanguage from "@/stores/modules/language";
import { computed, inject } from "vue";
import { LANGUAGE } from "@/config";
import useToggleLang from "@/composables/useToggleLang";
const onReload = inject("reload");
const toggle = () => {
  const { toggle } = useToggleLang();
  toggle();
  onReload();
};
const isZh = computed(() => {
  return useLanguage().getLanguage === LANGUAGE.zh;
});
</script>

<style scoped lang="less">
.lang-img {
  width: 24px;
  height: 24px;
  cursor: pointer;
  background: url("@/assets/imgs/common/switch_zh.png") no-repeat center center;
  background-size: contain;
  &.zh {
    background: url("@/assets/imgs/common/switch_en.png") no-repeat center
      center;
    background-size: contain;
  }
}
</style>
