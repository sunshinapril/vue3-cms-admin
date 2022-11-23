<template>
  <div class="user-info">
    <div class="avatar-container" @click="goSelfPage">
      <img
        class="avatar"
        src="@/assets/imgs/common/default_avatar.png"
        alt=""
        v-realImage="info.avatar"
      />
    </div>
    <div class="options-container">
      <div class="options-item" @click="goSelfPage">
        <svg-icon name="home"></svg-icon>
        {{ $t("userInfo.homepage") }}
      </div>
      <div class="options-item" @click="logout">
        <svg-icon name="logout"></svg-icon>
        {{ $t("userInfo.logout") }}
      </div>
    </div>
  </div>
</template>

<script setup>
import useUser from "@/stores/modules/user";
import { computed } from "vue";
import { removeToken } from "@/utils/cookies";

const info = computed(() => {
  return useUser().getUserInfo;
});

const goSelfPage = () => {
};

const logout = () => {
  removeToken();
};
</script>

<style scoped lang="less">
.user-info {
  position: relative;
  .avatar-container {
    .avatar {
      width: 32px;
      height: 32px;
      cursor: pointer;
      border-radius: 50%;
    }
  }
  &:hover {
    .options-container {
      display: block;
    }
  }
  .options-container {
    position: absolute;
    width: 158px;
    right: 0;
    top: 37px;
    background: #ffffff;
    border-radius: 2px;
    display: none;
    box-shadow: 0px 2px 8px 8px rgba(84, 57, 255, 0.05);
    .options-item {
      height: 46px;
      width: 100%;
      padding: 0 20px;
      color: #242a32;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      cursor: pointer;
      &.active,
      &:hover {
        background: #f0f2ff;
        color: #5439ff;
      }
      :deep(.svg-icon) {
        margin-right: 8px;
        width: 18px;
        height: 18px;
      }
    }
  }
}
</style>
