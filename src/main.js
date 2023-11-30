import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import "./assets/styles/global.less";
import "./assets/styles/reset.less";
import { setupStore } from "@/stores";
import { setupComponents } from "@/components";

const app = createApp(App);

// 自定义指令
import * as directives from "./directives";
Object.keys(directives).forEach((key) => {
  app.directive(key, directives[key]);
});

app.use(router);
setupStore(app);
setupComponents(app);

app.mount("#app");
