<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="false"
        :unique-opened="true"
        :collapse-transition="false"
        mode="vertical"
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
    return route.matched.slice(-1)[0].parent.path
  }
  return path;
});

const sidebarRouters = computed(() => usePermission().sidebarRouters || []);
console.log(sidebarRouters, 'sidebarRouters')

</script>
<style lang="less" scoped>

</style>

