import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    server: {
      host: "localhost",
      // port: 8080,
      watch: {
        usePolling: true
      },
      // https: true,
      cors: {origin: "*"},
      proxy: {
        '/api': {
          target: "https://a.4cdn.org",
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    plugins: [vue()],
    base: command === "serve" ? "" : "/app-vue/",
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src",
          import.meta.url))
      }
    },
    loaders: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" }
    ],

    preLoaders: [
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { test: /\.js$/, loader: "source-map-loader" }
    ]
  };
});
