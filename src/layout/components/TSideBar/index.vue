<template>
  <el-menu
    ref="menu"
    mode="vertical"
    text-color="#ffffff"
    background-color="#292E33"
    :default-active="defaultActive"
    :router="true"
    :collapse="collapse"
    :collapse-transition="false"
    :unique-opened="true"
  >
    <template v-for="item in routes">
      <el-menu-item
        v-if="item.hasOneShowingChild && !item.hidden"
        :key="item.path"
        :index="item.path"
        class="menu-bottom"
      >
        <svg-icon
          class="ic-menu"
          v-if="item.meta && item.meta.icon"
          :name="item.meta.icon"
        ></svg-icon>
        <template #title>
          <span v-if="item.meta">{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
      <el-sub-menu
        v-if="
          item.children &&
          item.children.filter((i) => !i.hidden).length > 1 &&
          !item.hidden
        "
        :key="item.path"
        :index="item.path"
        teleported
      >
        <template #title>
          <svg-icon
            class="ic-menu"
            v-if="item.meta && item.meta.icon"
            :name="item.meta.icon"
          ></svg-icon>
          <span v-if="item.meta">{{ item.meta.title }}</span>
        </template>
        <template v-for="child in item.children">
          <el-menu-item
            v-if="!child.hidden"
            :key="child.path"
            :index="item.path + '/' + child.path"
          >
            <svg-icon
              class="ic-menu"
              v-if="child.meta && child.meta.icon"
              :name="child.meta.icon"
            ></svg-icon>
            <template #title>
              <span v-if="child.meta"> {{ child.meta.title }}</span>
            </template>
          </el-menu-item>
        </template>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script setup>
import usePermission from "@/stores/modules/permission";
import { cloneDeep } from "lodash";
import { defineProps, computed } from "vue";
import { useRouter } from "vue-router";
defineProps(["collapse"]);
const instanceRouter = useRouter();
const defaultActive = computed(() => {
  const route = instanceRouter.currentRoute.value;
  // 详情也要高亮父层级
  if (route.meta.hidden) {
    let list = route.matched;
    let len = list.length;
    return list[len - 2].path;
  }
  if (route.meta && route.meta.active) {
    let active = route.meta.active;
    if (typeof active === "function") {
      active = active.apply(route);
    }
    return route.resolve({ name: active }).route.path;
  } else {
    return route.path;
  }
});
const routes = computed(() => {
  const addRouters = cloneDeep(usePermission().addRouters || []);
  return filterRouters(addRouters);
});

const filterRouters = (routes) => {
  routes.forEach((parent) => {
    const children = parent.children;
    const filterChild =
      (children && children.filter((item) => !item.hidden)) || [];
    if (filterChild.length === 1) {
      const item = filterChild[0];
      parent.hasOneShowingChild = true;
      parent.path = `${parent.path}/${item.path}`;
      parent.meta = {
        ...item.meta,
        icon: item.meta.icon ? item.meta.icon : parent.meta.icon,
      };
    }
    if (filterChild.length === 0) {
      parent.hasOneShowingChild = true;
    }
  });
  return routes;
};
</script>
<style lang="less" scoped>
.el-menu {
  //height: 100%;
  background: #f7fafd !important;
  border-right: none;
  :deep(.el-menu) {
    background: #f7fafd !important;
  }
  .ic-menu {
    //width: 15px;
    //height: 15px;
    font-size: 16px;
    margin-right: 6px;
    //color: #95A4BD;
    //img {
    //  display: inline-block;
    //  width: 15px;
    //  height: 15px;
    //  vertical-align: text-top;
    //  margin-top: 2px;
    //}
  }
  :deep(.el-sub-menu__title),
  :deep(.el-menu-item) {
    min-width: auto;
    position: relative;
    font-size: 14px;
    background: #f7fafd !important;
    color: #95a4bd !important;
    border-radius: 12px;
    &:hover {
      color: #4a80f5 !important;
      background: #e3ebfc !important;
      .el-sub-menu__icon-arrow {
        color: #4a80f5 !important;
      }
    }
  }
  :deep(.el-sub-menu),
  :deep(.menu-bottom) {
    text-align: left;
    background: #f7fafd !important;
    &.el-menu-item,
    .el-sub-menu__title {
      height: 50px;
      line-height: 50px;
    }
    .el-menu--inline {
      .el-menu-item {
        padding: 0 30px !important;
      }
    }
  }
  :deep(.el-menu-item.is-active) {
    background: rgb(74, 128, 245) !important;
    color: #ffffff !important;
    .ic-menu {
      color: #ffffff;
    }
  }
  &.el-menu--collapse {
    width: 73px;
    :deep(.el-menu-item),
    :deep(.el-sub-menu) {
      min-width: auto;
      text-align: center;
      position: relative;
      font-size: 14px;
      border-radius: 0;
      padding: 0 20px !important;
      transition: inherit;
      &:hover {
        background: #e6eefc !important;
        &::before {
          content: "";
          width: 2px;
          height: 30px;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          background: rgb(74, 128, 245);
        }
        .el-sub-menu__title {
          background: #e6eefc !important;
        }
      }
      &.is-active {
        background: rgb(74, 128, 245) !important;
        color: #ffffff !important;
        .el-sub-menu__title {
          background: rgb(74, 128, 245) !important;
        }
        .ic-menu {
          color: #ffffff;
        }
      }
      .el-sub-menu__title {
        padding: 0 !important;
        transition: inherit;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
.logo {
  margin: 20px auto;
  width: 138px;
  //width: 140px;
  height: 42px;
  text-align: center;
  //background: url("~@/assets/images/logo.png") no-repeat center/cover;
  background-size: contain;
  display: block;
  font-size: 26px;
  font-weight: 600;
  font-style: normal;
  color: #0d2b5e;
}
.min-logo {
  margin: 50px auto 100px;
  width: 60px;
  height: 35px;
  line-height: 35px;
  font-size: 24px;
  color: #0d2b5e;
  font-weight: bolder;
  font-style: normal;
  text-align: center;
  //border-radius: 8px;
  //background: url("~@/assets/images/min-logo.png") no-repeat center/cover;
  //background-size: contain;
  display: block;
}
</style>
<style lang="less">
.el-menu--vertical {
  .el-menu {
    background: #f7fafd !important;
    .el-menu-item {
      color: #95a4bd !important;
      background: #f7fafd !important;
      &:hover {
        color: #4a80f5 !important;
        background: #e3ebfc !important;
        .el-sub-menu__icon-arrow {
          color: #4a80f5 !important;
        }
      }
      &.is-active {
        background: rgb(74, 128, 245) !important;
        color: #ffffff !important;
        .ic-menu {
          color: #ffffff;
        }
      }
    }
  }
}
</style>
