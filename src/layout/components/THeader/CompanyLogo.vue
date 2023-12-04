<template>
  <div class="logo-wrap">
    <img class="logo" :src="logoUrl" />
  </div>
</template>
<script setup>
import logoUrl from "@/assets/images/common/logo.png";
</script>
<style lang="less" scoped>
.logo-wrap {
  width: 104px;
  height: 40px;
  flex-shrink: 0;
  .logo{
    width: 100%;
    height: 100%;
    display: none;
  }
}
</style>