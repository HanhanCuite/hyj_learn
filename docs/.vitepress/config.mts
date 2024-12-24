import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/hyj_learn/",
  title: "胡英俊的学习笔记",
  description: "胡英俊的学习笔记",
  head: [["link", { rel: "icon", href: "/hyj_learn/favicon.ico" }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: "Home", link: "/" }],
    sidebar: [
      {
        text: "vue",
        items: [
          { text: "输入框限制输入数字", link: "/vue/input-number" },
          { text: "自动字体大小指令", link: "/vue/autofont-size" },
          { text: "jsPDF 使用指南", link: "/vue/jspdf" },
          { text: "Axios 上传进度监听与取消上传", link: "/vue/axios" },
          {
            text: "navigator.sendBeacon 与 fetch+keepalive 对比",
            link: "/vue/fetch-sendBeacon",
          },
        ],
        collapsed: true,
      },
      {
        text: "js",
        items: [
          { text: "获取准确时间", link: "/js/准确时间" },
          { text: "流式文件下载", link: "/js/流文件下载" },
        ],
        collapsed: true,
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],

    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
  },
});
