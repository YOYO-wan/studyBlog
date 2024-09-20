import {NavItem} from "vuepress/config";

export default [
    {
        text: "前端基础知识",
        link: '/前端基础知识/',
        items: [
            {
                text: "HTML和CSS", link: "/前端基础知识/#HTML和CSS",
            },
            {
                text: "JavaScript", link: "/前端基础知识/#javascript",
            },
            {
                text: "前端工程化", link: "/前端基础知识/#前端工程化",
            },
            
        ]
    },
    {
        text: "vue3笔记",
        link: '/vue3笔记/'
    },
    {
        text: "工具用法",
        link: '/工具用法/'
    },
    {
        text: "面试",
        link: '/面试/'
    },
] as NavItem[];
