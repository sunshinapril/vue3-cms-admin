<template>
  <div class="t-header">
    <div class="nav-container">
      <company-logo />
      <top-nav></top-nav>
    </div>
    <user-info />
  </div>
</template>
<script setup>
import TopNav from "./TopNav.vue";
import CompanyLogo from "./CompanyLogo.vue";
import UserInfo from "./UserInfo.vue";
</script>
<style lang="less" scoped>
.t-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  padding: 0 40px;

  .nav-container {
    flex: 1;
    display: flex;
    align-items: center;
  }
}
</style>