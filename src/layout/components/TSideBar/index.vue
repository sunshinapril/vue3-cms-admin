<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="false"
        :unique-opened="true"
        :collapse-transition="false"
        mode="vertical"
        class="c-menu"
      >
        <SideBarItem
          v-for="(route, index) in sidebarRouters"
          :key="route.path + index"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
</template>

<script setup>
import SideBarItem from "./SideBarItem.vue";
import usePermission from "@/stores/modules/permission";
import { computed } from "vue";
import { useRouter } from "vue-router";
const instanceRouter = useRouter();
const activeMenu = computed(() => {
  const route = instanceRouter.currentRoute.value;
  const { meta, path } = route
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu
  } else if (route.meta.hidden) {
    const matched = route.matched.slice(-1)[0];
    return matched.parent && matched.parent.path || matched.path;
  }
  return path;
});

const sidebarRouters = computed(() => usePermission().sidebarRouters || []);
console.log(sidebarRouters, 'sidebarRouters')

</script>
<style lang="less" scoped>
.c-menu {
  border-right: none;
  :deep(.el-sub-menu__title) {
    &:hover{
      background-color: rgba(58,119,254,0.1);
    }
  }
  :deep(.el-menu-item) {
    position: relative;
    &::before {
      content: '';
      width: 2px;
      height: 100%;
      background-color: transparent;
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
    }
    &.is-active, &:hover {
      color: #3A77FE;
      background-color: rgba(58,119,254,0.1);
      &::before {
        background-color: #3A77FE;
      }
    }
  }
}
</style>

