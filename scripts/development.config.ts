export default {
  entry: "./main.tsx",
  outDir: "./dist",
  title: "react",
  publicPath: "/",
  devServer: {
    port: 8899,
    // proxy: {
    //   "/proxy": {
    //     target: "",
    //     pathRewrite: { "^/proxy": "" },
    //     changeOrigin: true, // 控制服务器接收到的请求头中host字段的值
    //     secure: false,
    //   },
    // },
  },
};
