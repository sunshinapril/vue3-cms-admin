<template>
  <div class="right-menu">
    <div @click="toMessageCenter" to="/user/messageCenter" class="right-menu-item hover-effect">
      <svg-icon icon-class="icon_4" />
      <span class="message-text">消息中心</span>
      <span class="red-dot" v-show="unRead"></span>
    </div>
    <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
      <div class="avatar-wrapper">
        <div class="user-avatar">
          <img :src="avatar" class="user-avatar-img">
        </div>
        <i class="el-icon-caret-bottom" />
      </div>
      <el-dropdown-menu slot="dropdown">
        <router-link to="/user/profile">
          <el-dropdown-item>个人中心</el-dropdown-item>
        </router-link>
        <el-dropdown-item @click.native="logout">
          <span>退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script setup>
import { ElMessageBox } from 'element-plus'
import {ref} from 'vue';
const unRead = ref(false);

const logout = () => {
  removeToken();
  ElMessageBox.confirm('确定注销并退出系统吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    
  })
};
</script>

<style scoped lang="less">
.right-menu {

}
</style>
