<template>
  <el-menu 
  :default-active="activeMenu" 
  :ellipsis="false"
  background-color="transparent" 
  mode="horizontal" 
  @select="handleSelect">
    <template v-for="(item, index) in topMenus">
      <el-menu-item :index="item.path">
        <svg-icon v-if="item.meta && item.meta.icon" :name="item.meta.icon" />
        {{ item.meta.title }}
      </el-menu-item>
    </template>
  </el-menu>
</template>
<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import usePermission from '@/stores/modules/permission'; 
import { isExternal } from '@/utils/validate';
const route = useRoute();
const router = useRouter();
// 默认激活的一级菜单路径 eg：/drainageCode
const activeMenu = computed(() => {
  let activePath = route.path.match(/\/[^\/]+/)
  activePath = activePath && activePath[0];
  activeRoutes(activePath);
  return activePath
});

const routers = computed(() => {
  return usePermission().getRouters || [];
});

const topMenus = computed(() => {
  let topMenus = []
  routers.value && routers.value.map((menu) => {
    if (menu.hidden !== true) {
      topMenus.push(menu)
    }
  })
  return topMenus
})

const handleSelect = (path, keyPath) => {
  if (ishttp(path)) {
    // http(s):// 路径新窗口打开
    window.open(path, '_blank')
  } else if (path.indexOf('/redirect') !== -1) {
    // /redirect 路径内部打开
    router.push({ path: path.replace('/redirect', '') });
  } else {
    activeRoutes(path);
    if (!isExternal(path)) {
      router.push({ path });
    }
  }
}


// 当前激活的侧边栏菜单
const activeRoutes = (path)  =>{
  let activeRoute = routers.value.find((e) => e.path == path);
  let routes = (activeRoute && activeRoute.children) || [];
  if (routes.length > 0) {
    usePermission().setSidebarRouters(routes);
  }
  return routes;
}

const ishttp =(url) => /^http/.test(url);

</script>
<style lang="less" scoped>
.el-menu--horizontal {
  margin-left: 50px;
  border-bottom: none;
  .el-menu-item {
    color: #ffffff;
    border-bottom: none;
    &:hover, &.is-active {
      background-color: rgba(58,119,254,.3);
      color: #fff !important;
      border-bottom: none;
    }
    .svg-icon {
      width: 20px;
      height: 20px;
      margin-right: 4px;
      vertical-align: middle;
    }
  }
}
</style>