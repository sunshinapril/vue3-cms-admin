<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="
            item.redirect === 'noRedirect' ||
            index == levelList.length - 1 ||
            !/^\//gi.test(item.redirect)
          "
          class="no-redirect"
          >{{ transformTitle(item.meta.title) }}</span
        >
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
<script setup>
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted, watch } from 'vue';
import {pathToRegexp} from 'path-to-regexp';
const router = useRouter();
const route = useRoute();
const levelList = ref([]);
const pathCompile = (path)  => {
  const { params } = route;
  const toPath = pathToRegexp.compile(path)
  return toPath(params)
};
const handleLink = (item) => {
  const { redirect, path } = item;
  if (redirect) {
    router.push(redirect);
    return;
  }
  router.push(pathCompile(path));
};
const getBreadcrumb = () => {
  const currentRoute = router.currentRoute.value;
  const matched = currentRoute.matched.filter((item) => item.meta && item.meta.title)
  levelList.value = matched.filter(
    (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
  )
};
const transformTitle = (title) => {
  // 对于详情和添加为同一个路由的面包屑处理
  // 匹配菜单标题中带有 {*} 的公用路由
  let reg = /^\{(.*)\}$/gi
  if (reg.test(title)) {
    const query = route.query
    if (query && query.id) {
      // 带路由查询id参数的替换 {*} 为详情 eg:活码{添加} 替换为 活码详情
      title = title.replace(reg, '详情')
    } else {
      // 默认情况下都替换为 新建
      title = title.replace(reg, '新建')
    }
  }
  return title
};
watch(() => route.path, (newV, oldV) => {
  getBreadcrumb();
}, {
  immediate: true
});
onMounted(() => {
  getBreadcrumb();
})
</script>
<style lang="less" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  line-height: 24px;
  margin-left: 8px;
  :deep(.el-breadcrumb__item) {
    .el-breadcrumb__inner {
      display: flex;
      align-items: center;
      a:hover,.is-link:hover {
        color: #3A77FE;
      }
    }
  }

  .no-redirect {
    color: #999;
    cursor: text;
  }
}
.el-icon-question {
  color: #888;
  margin-left: 10px;
}
</style>
