<template>
  <div class="right-menu">
    <div @click="toMessageCenter" class="right-menu-item">
      <svg-icon name="icon_4" />
      <span class="message-text">消息中心</span>
      <span class="red-dot" v-show="unRead"></span>
    </div>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <div class="user-avatar">
          <img :src="avatar" class="user-avatar-img">
        </div>
        <el-icon :size="18">
          <CaretBottom />
        </el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <router-link to="/user/profile">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <el-dropdown-item @click.native="logout">
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { CaretBottom } from "@element-plus/icons-vue";
import { ElMessageBox } from 'element-plus'
import {ref, onMounted} from 'vue';
import avatar from '@/assets/images/user/avatar.png';
import { useRouter } from "vue-router";
import {getNoReadCount} from '@/apis/messageNotice';
import useUser from '@/stores/modules/user';
const unRead = ref(false);
const router = useRouter();
const toMessageCenter = () => {
  router.push({path: '/user/messageCenter'});
  unRead.value = false;
}

onMounted(() => {
  getUnReadNum();
})

const getUnReadNum = async () => {
  const { data} = await getNoReadCount();
  if (data) {
    unRead.value = true;
  }
}

const logout = () => {
  ElMessageBox.confirm('确定注销并退出系统吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    await useUser().logout();
    location.href = '/login';
  })
};
</script>

<style scoped lang="less">
.right-menu {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  .right-menu-item {
    padding: 0 8px;
    font-size: 18px;
    color: #FFFFFF;
    vertical-align: middle;
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-right: 22px;
    .svg-icon {
      width: 20px;
      height: 20px;
      vertical-align: middle;
      margin-right: 5px;
    }
    .message-text {
      height: 20px;
      font-size: 14px;
      font-family: PingFang-SC-Medium, PingFang-SC;
      font-weight: 500;
      line-height: 20px;
    }
    .red-dot{
      display: inline-block;
      width: 5px;
      height: 5px;
      border-radius: 50% 50%;
      background-color: red;
      position: absolute;
      top: 8px;
      left: 21px;
    }
  }
  .avatar-container {
    cursor: pointer;
    .avatar-wrapper {
      position: relative;
      color: #fff;
      display: flex;
      align-items: center;
      .user-avatar {
        width: 34px;
        height: 34px;
        border-radius: 50%;
        background: rgba(172,171,202,0.1);
        border: 1px solid #ACABCA;
        display: inline-flex;
        align-items: center;
        justify-content: center;  
        vertical-align: middle;    
        margin-right: 8px;      
        .user-avatar-img {
          width: 80%;
          height: 80%;
        }
      }
    }
  }
}
</style>
