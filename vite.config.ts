import { getPluginsList } from "./build/plugins";
import { include, exclude } from "./build/optimize";
import { type UserConfigExport, type ConfigEnv, loadEnv } from "vite";
import {
  root,
  alias,
  wrapperEnv,
  pathResolve,
  __APP_INFO__
} from "./build/utils";

export default ({ mode }: ConfigEnv): UserConfigExport => {
  const { VITE_CDN, VITE_COMPRESSION, VITE_PUBLIC_PATH } = wrapperEnv(
    loadEnv(mode, root)
  );

  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias
    },
    plugins: getPluginsList(VITE_CDN, VITE_COMPRESSION),
    optimizeDeps: {
      include,
      exclude
    },
    build: {
      target: "es2015",
      sourcemap: false,
      outDir: "frontend/dist", // 将输出目录改为 Wails 默认目录
      chunkSizeWarningLimit: 4000,
      rollupOptions: {
        input: {
          index: pathResolve("./index.html", import.meta.url) // 保持输入配置
        },
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]"
        }
      }
    },
    define: {
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    }
  };
};
