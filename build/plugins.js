import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import importToCDN from "vite-plugin-cdn-import";
import viteCompression from "vite-plugin-compression";
import path from "path";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import styleImport from "vite-plugin-style-import";
import VueI18n from "@intlify/vite-plugin-vue-i18n";
import { resolve } from "path";
import removeConsole from "vite-plugin-remove-console";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

export function getPluginsList() {
  return [
    vue(),
    // https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: [resolve("@/lang/**")],
    }),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    importToCDN({
      modules: [
        {
          name: "vue",
          var: "Vue",
          path: "//www.westmoney10.com/api/cos/cdn/wm-creator/js/vue.global.js",
        },
        {
          name: "vue-i18n",
          var: "VueI18n",
          path: "//www.westmoney10.com/api/cos/cdn/wm-creator/js/vue-i18n.global.js",
        },
        {
          name: "vue-router",
          var: "VueRouter",
          path: "//www.westmoney10.com/api/cos/cdn/wm-creator/js/vue-router.global.js",
        },
        {
          // 引入cdn element-plus
          name: "element-plus",
          var: "ElementPlus",
          path: "//www.westmoney10.com/api/cos/cdn/wm-creator/js/index.full.js",
          css: "//www.westmoney10.com/api/cos/cdn/wm-creator/css/index.css",
        },
        {
          // 引入cdn element-plus
          name: "icons-vue",
          var: "IconsVue",
          path: "//unpkg.com/@element-plus/icons-vue",
        },
        {
          name: "vue-demi",
          var: "VueDemi",
          path: "//www.westmoney10.com/api/cos/cdn/wm-creator/js/index.iife.js",
        },
        {
          name: "pinia",
          var: "Pinia",
          path: "//www.westmoney10.com/api/cos/cdn/wm-creator/js/pinia.iife.prod.min.js",
        },
      ],
    }),
    // 该插件2.0.0版本有问题，下载低版本
    styleImport({
      libs: [
        {
          libraryName: "element-plus",
          esModule: true,
          resolveStyle: (name) => {
            return `element-plus/theme-chalk/${name}.css`;
          },
        },
      ],
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      // eslint-disable-next-line no-undef
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      // 指定symbolId格式
      symbolId: "icon-[dir]-[name]",

      /**
       * 自定义插入位置
       * @default: body-last
       */
      // inject?: "body-last" | "body-first"

      /**
       * custom dom id
       * @default: __svg__icons__dom__
       */
      // customDomId: "__svg__icons__dom__",
    }),
    removeConsole(),
    viteCompression(),
  ];
}
