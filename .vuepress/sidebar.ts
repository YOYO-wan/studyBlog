import {SidebarConfig4Multiple} from "vuepress/config";

import toolUsageSideBar from "./sidebars/toolUsageSideBar";
import interviewUsageSideBar from "./sidebars/interviewUsageSideBar";


// @ts-ignore
export default {
    "/前端基础知识/": ()=>import("./sidebars/basicKnowledgeSideBar"),
    "/vue3笔记/": ()=>import("./sidebars/frameVueSideBar"),
    "/工具用法/": toolUsageSideBar,
    "/面试/": interviewUsageSideBar,
    // 降级，默认根据文章标题渲染侧边栏
    "/": "auto",
} as SidebarConfig4Multiple;
