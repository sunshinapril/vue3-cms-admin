import { fileURLToPath, URL } from "node:url";

import { loadEnv } from "vite";
import { wrapperEnv } from "./build/utils";
import { createProxy } from "./build/proxy";
import { getPluginsList } from "./build/plugins";

export default ({ command, mode }) => {
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd());
  const viteEnv = wrapperEnv(env);

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY } = viteEnv;
  // @ts-ignore
  return {
    base: VITE_PUBLIC_PATH,
    plugins: getPluginsList(command),
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      // Listening on all local IPs
      host: true,
      port: VITE_PORT,
      // Load proxy configuration from .env
      proxy: createProxy(VITE_PROXY),
    },
    build: {
      sourcemap: false,
      //@ts-ignore
      brotliSize: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 2000,
    },
  };
};
