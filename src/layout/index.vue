<template>
  <div class="g-main">
    <div class="top-wrap">
      <t-header />
    </div>
    <el-container class="g-container">
        <!-- 侧边栏 -->
      <div class="sidebar" :class="{ isCollapse: isCollapse }">
        <div class="sidebar-content">
          <sidebar
            :class="{ 'side-bar-box': !isCollapse }"
            :collapse="!isCollapse"
          />
        </div>
        <div class="expand-collapse" @click="isCollapse = !isCollapse">
          <el-icon v-if="isCollapse"><CaretLeft /></el-icon>
          <el-icon v-else><CaretRight /></el-icon>
        </div>
      </div>
      <div class="g-router-view">
        <router-view />
      </div>
    </el-container>
  </div>
</template>

<script setup>
import { CaretLeft, CaretRight } from "@element-plus/icons-vue";
import Sidebar from "./components/TSideBar/index.vue";
import THeader from "./components/THeader/index.vue";
import { ref, watch } from "vue";
import useUser from "@/stores/modules/user";
const isCollapse = ref(true);
watch(isCollapse, (val) => {
  useUser().setIsCollapse(val);
});
</script>

<style lang="less" scoped>
.g-main {
  height: 100%;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .top-wrap {
    height: 60px;
    background: #1D2A64;
    flex-shrink: 0;
  }
  .g-container {
    display: flex;
    flex: 1;
    .g-router-view {
      height: 100%;
      flex: 1;
      margin: 20px;
      overflow: hidden;
      overflow-y: auto;
    }
    .sidebar {
      width: 73px;
      height: 100%;
      flex-shrink: 0;
      overflow: visible;
      padding-bottom: 20px;
      background: #f7fafd;
      position: relative;
      box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.13);
      &.isCollapse {
        width: 200px;
        .sidebar-content {
          height: 100%;
          overflow: hidden;
          overflow-y: auto;
          padding: 0 25px;
        }
      }
      .sidebar-content {
        height: 100%;
        overflow: hidden;
        overflow-y: auto;
        padding: 0;
      }
      .expand-collapse {
        width: 12px;
        height: 66px;
        line-height: 66px;
        text-align: center;
        position: absolute;
        top: 50%;
        right: -12px;
        transform: translateY(-50%);
        z-index: 999;
        background: #d6def8;
        cursor: pointer;
        > i {
          margin-left: -3px;
          color: #95a4bd;
        }
      }
    }
  }
}
</style>
