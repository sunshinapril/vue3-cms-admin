import { constantRouterMap } from "@/router/index";
import { defineComponent } from "vue";
const Layout = () => import("@/views/Layout.vue");
import { defineStore } from "pinia";

const Outlet = defineComponent({
  render() {
    return "<router-view />";
  },
});

const usePermission = defineStore({
  id: "permission-pinia",
  state: () => ({
    routers: constantRouterMap,
    addRouters: [],
  }),
  actions: {
    setRouters(routers) {
      this.addRouters = routers;
      this.routers = constantRouterMap.concat(routers);
      return Promise.resolve(routers);
    },
  },
});
const modulesRoutes = import.meta.glob("/src/views/**/*.{vue,jsx}");

export const filterAsyncRouter = (routers) => {
  // 遍历后台传来的路由字符串，转换为组件对象
  const modulesRoutesKeys = Object.keys(modulesRoutes);

  return routers.filter((router) => {
    router.meta = {
      ...router?.meta,
      hidden: router.hidden,
    };
    if (router.component) {
      if (router.component === "Layout") {
        // Layout组件特殊处理
        router.component = Layout;
      } else if (router.component === "Outlet") {
        router.component = Outlet;
      } else {
        const index = router?.component
          ? modulesRoutesKeys.findIndex((ev) => ev.includes(router.component))
          : modulesRoutesKeys.findIndex((ev) => ev.includes(router.path));
        router.component = modulesRoutes[modulesRoutesKeys[index]];
      }
    }
    if (router.children && router.children.length) {
      // 给导航第一项添加重定向
      router.redirect = `${router.path}/${router.children[0].path}`;
      router.children = filterAsyncRouter(router.children);
    }
    return true;
  });
};

export default usePermission;
