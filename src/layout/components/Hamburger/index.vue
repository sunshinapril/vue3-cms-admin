<template>
  <div class="hamburger-container" @click="toggleClick">
    <svg
      :class="{ 'is-active': isCollapse }"
      class="hamburger"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
    >
      <path
        d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"
      />
    </svg>
    <svg-icon @click="handleLink({ path: '/' })" name="icon_9" class="cp home"></svg-icon>
  </div>

</template>
<script setup>
import useUser from "@/stores/modules/user";
import { computed } from "vue";
const isCollapse = computed(() => useUser().isCollapse);
const toggleClick = () => {
  useUser().setIsCollapse(!isCollapse.value);
}
const handleLink = (item) => {
  const { path } = item;
  router.push('/');
};
</script>
<style lang="less" scoped>
.hamburger-container {
  display: inline-flex;
  align-items: center;
  .hamburger {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
    fill: currentColor;
    cursor: pointer;
  }

  .hamburger.is-active {
    transform: rotate(180deg);
  }

  .home {
    color: #3A77FE;
    width: 23px;
    height: 23px;
    cursor: pointer;
  }
}
</style>
