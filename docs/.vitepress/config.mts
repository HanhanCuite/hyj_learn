import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/hyj_learn/",
  title: "胡英俊的学习笔记",
  description: "胡英俊的学习笔记",
  head: [["link", { rel: "icon", href: "/hyj_learn/favicon.ico" }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭'
                }
              }
            }
          }
        }
      }
    },
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
      { icon: "github", link: "https://www.bilibili.com/video/BV1ct4y1n7t9/?spm_id_from=333.337.search-card.all.click&vd_source=de1fa82faffa30ec04b78858060adfc6" },
    ],

    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
  },
});
