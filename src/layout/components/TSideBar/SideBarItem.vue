<template>
  <div v-if="!item.hidden">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        (!item.alwaysShow || onlyOneChild.noShowingChildren)
      "
    >
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path, onlyOneChild.query)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{ 'submenu-title-noDropdown': !isNest }">
          <template #title>
            <span>{{ onlyOneChild.meta.title }}</span>
          </template> 
        </el-menu-item>
      </app-link>
    </template>

    <el-sub-menu v-else ref="subMenu" :index="resolvePath(item.path)" teleported>
      <template #title>
        <svg-icon v-if="item.meta && item.meta.icon" :name="item.meta.icon" />
        <span solt="title" style="color: #111316; font-size: 14px;font-weight: 600;" v-if="item.meta">{{ item.meta.title }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>
<script setup>
  import path from 'path'
  import { isExternal } from '@/utils/validate';
  const props = defineProps({
    item: {
        type: Object,
        required: true
      },
      isNest: {
        type: Boolean,
        default: false
      },
      basePath: {
        type: String,
        default: ''
      }
  });
  const onlyOneChild = ref({});
  const hasOneShowingChild = (children, parent) => {
        // 菜单叶子，无子路由的
        if (!children) {
          onlyOneChild.value = { ...parent, path: '' }
          return true
        }

        const showingChildren = children.filter((item) => {
          if (item.hidden) {
            return false
          } else {
            // Temp set(will be used if only has one showing child)
            onlyOneChild.value = item
            return true
          }
        })

        // When there is only one child router, the child router is displayed by default
        if (showingChildren.length === 1) {
          return true
        }
        // 菜单目录，无子路由的 ；或者有子路由的，且子路由全部不显示的，显示父级
        if (showingChildren.length === 0) {
          onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
          return true
        }

        return false
      }
  const resolvePath = (routePath, routeQuery) => {
    if (isExternal(routePath)) {
      return routePath
    }
    if (isExternal(props.basePath)) {
      return props.basePath
    }
    if (/^\//.test(routePath)) {
      return routePath
    }
    if (routeQuery) {
      let query = JSON.parse(routeQuery)
      return { path: path.resolve(props.basePath, routePath), query: query }
    }
    return path.resolve(props.basePath, routePath)
  }

</script>

<style lang="less" scoped>

</style>