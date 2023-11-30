<template>
  <div class="t-header">
    <logo />
    <top-nav></top-nav>
    <user-info />
  </div>
</template>
<script setup>
import TopNav from "./TopNav.vue";
import Logo from "./Logo.vue";
import UserInfo from "./UserInfo.vue";
</script>
<style lang="less" scoped>
.t-header {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  padding: 0 40px;
}
</style>