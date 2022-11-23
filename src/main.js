import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import "./assets/styles/global.less";
import "./assets/styles/reset.less";
import i18n from "@/lang";
import { setupStore } from "@/stores";
import { setupComponents } from "@/components";

const app = createApp(App);

// 自定义指令
import * as directives from "./directives";
Object.keys(directives).forEach((key) => {
  app.directive(key, directives[key]);
});

app.use(router);
app.use(i18n);
setupStore(app);
setupComponents(app);

app.mount("#app");
