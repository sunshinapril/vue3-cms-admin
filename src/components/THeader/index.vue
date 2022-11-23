<template>
  <div class="header-container">
    <div class="right">
      <SwitchLang></SwitchLang>
      <div class="separator"></div>
      <UserInfo></UserInfo>
    </div>
  </div>
</template>
<script setup>
import SwitchLang from "@/components/SwitchLang.vue";
import UserInfo from "@/components/THeader/UserInfo.vue";
</script>
<style lang="less" scoped>
.header-container {
  height: 80px;
  width: 100%;
  background: #ffffff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 0 100px;
  .left {
    width: 152px;
    height: 32px;
    display: block;
    cursor: pointer;
  }
  .right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .separator {
      width: 0.5px;
      height: 16px;
      background: #d8dcdf;
      margin: 0 30px;
    }
  }
}
</style>
