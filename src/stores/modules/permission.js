import { constantRouterMap } from "@/router/index";
import { defineComponent, h } from "vue";
const Layout = () => import("@/layout/index.vue");
import { defineStore } from "pinia";
import { RouterView } from "vue-router";

const Outlet = defineComponent({
  setup() {
    return () => h(RouterView);
  },
});

const usePermission = defineStore({
  id: "permission-pinia",
  state: () => ({
    routers: constantRouterMap,
    addRouters: [],
    sidebarRouters: [],
  }),
  getters: {
    getRouters: (state) => state.routers,
  },
  actions: {
    setRouters(routers) {
      this.addRouters = routers;
      this.routers = [...constantRouterMap, ...routers];
      return Promise.resolve(routers);
    },
    setSidebarRouters(routers) {
      this.sidebarRouters = routers;
    }
  },
});

const modulesRoutes = import.meta.glob("/src/views/**/*.{vue,jsx}");
const modulesRoutesKeys = Object.keys(modulesRoutes);

// // 遍历后台传来的路由字符串，转换为组件对象
let level = 0
export const filterAsyncRouter = (asyncRouterMap, parentPath) => {
  level++
  let res = asyncRouterMap.filter((route) => {
    route.meta = route.meta || {}
    route.meta.hidden = route.hidden

    if (parentPath) {
      let path = route.path
      route.path = /^(\/|http)/.test(path) ? path : parentPath + '/' + path
    }

    if (route.component) {
      // Layout组件特殊处理
      if (route.redirect === 'noRedirect' && route.children.length) {
        let firstChildPath = route.children[0].path
        route.redirect = firstChildPath.startsWith('/') ? firstChildPath : route.path + '/' + firstChildPath
      }
      if (route.component === 'Layout') {
        if (level != 1) {
          route.component = Outlet
        } else {
          route.component = Layout
        }
      } else {
        const index = route?.component
          ? modulesRoutesKeys.findIndex((ev) => ev.includes(route.component))
          : modulesRoutesKeys.findIndex((ev) => ev.includes(route.path));
        route.component = modulesRoutes[modulesRoutesKeys[index]];
      }
    }
    let children = route.children
    if (children && children.length) {
      route.children = filterAsyncRouter(route.children, route.path)
    }
    return true
  })
  level--
  return res
}

export default usePermission;
