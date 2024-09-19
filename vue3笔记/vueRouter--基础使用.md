# vueRouter--基础使用
## 修改URL页面不刷新的方式
### hash模式
hash模式是通过监听url中的hash值，来实现路由切换和组件渲染的  
URL的hash也就是锚点(#)，本质上是改变window.location的href的属性  
我们可以通过直接赋值windows.location.hash来改变href，但页面不发生刷新  
#### hash的优势
兼容性更好，老版IE中可以运行  
#### hash的缺陷  
URL中有一个#，显得不像真实路径  
### History模式
History模式主要依赖于HTML5新增的historyAPI  
它有6种方法改变URL而不刷新页面  
**replaceState**：替换原来的路径  
**pushState**：使用新的路径  
**popState**：路径的回退  
**go**：向前或向后改变路径  
**forward**：向前改变路径  
**back**：向后改变路径  
## vue-router的基本使用
### 安装vue-router
```sh
npm install vue-router
```
### 创建路由对象  
```js
// router/index.js
import { createRouter,createWebHistory } from "vue-router"
// 导入创建的组件(显示的页面)
import Home from "../view/home.vue"
import About from "../view/about.vue"
const routes = [// 配置路由的映射
    {
        path:"/home",
        name: "home", // 记录路由独一无二的名称
        component: Home,
        meta: { // 自定义数据
            name: "测试"，
            age: 12
        }
    },
    {
        path:"/about",
        name: "about",
        component: About
    }
]
const router = createRouter({
    routes,
    // 传入配置的路由映射:组件和路径映射关系的routes数组
    history: createWebHistory() // history模式
})
export default router
```
### 使用app注册路由对象
``` js
import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"

createApp(App).use(router).mount(#app)
```
### 页面上使用
页面上使用\<router-link\>,\<router-view\>
```html
<template>
    <div id="app">
        <router-link to="/home"></router-link>
        <router-link to="/about"></router-link>
        <router-view></router-view>
    </div>
</template>
```
## 路由的默认路径
如何可以让路径默认跳转到首页？
``` js
const routes = [
    {
        path: "/",
        redirect:"/home"
    },
    {
        path:"/home",
        name: "home",
        component: Home
    },
    {
        path:"/about",
        name: "about",
        component: About
    }
]
```
path配置的是根路径”/“  
redirect是重定向，也就是将路径重定向到‘/home’的路径下  
## router-link
### router-link的常见属性
1. to属性:  
    点击后跳转该地址，to属性可接收字符串或对象  
    `<router-link :to={ path:"/home" }>首页</router-link>`  
    `<router-link to="/home">首页</router-link>`
2. replace属性
    设置replace属性后，点击时，调用router.replace(),而不是router.push()  
    点击跳转后的地址不会被历史记录  
    `<router-link to="/home" replace>首页</router-link>`
3. active-class属性
    设置激活a元素后应用的class，默认是”router-link-active“  
    ```html
    <router-link to="/home" active-class>首页</router-link>
    <style>
        .router-link-active{
            font-size:20px;
            color: red;
        }
    </style>
    ```
    也可以设置具体class名称  
    ```html
    <router-link to="/home" active-class="active">首页</router-link>
    <style>
        .active{
            font-size:20px;
            color: red;
        }
    </style>
    ```
## 路由懒加载
当打包构建应用时，JS包会变得非常大，影响页面加载  
如果能将不同路由对应的组件分割成不同的代码块，当路由被访问的时候才加载对应组件，这样会更高效  
其实这里是对应了[webpack的代码分包知识](/vue3笔记/webpack的代码分包.md)，而vueRouter默认就支持动态导入组件  
```js
import Home from "../view/home.vue"
const routes = [
    {
        path:"/home",
        name: "home",
        component: Home
    },
    {
        path:"/about",
        name: "about",
        component: ()=>import('../view/about.vue')
    }
]
```
component配置可接收一个组件或者一个返回Promise的函数  
import函数返回就是一个Promise  
> **使用webpack注释，把组件按组分块打包**  
> 使用webpack的一些特殊注释，使打包后单独成为一个js文件  
> `import(/*webpackChunkName:"about"*/'../view/about.vue')`
## 动态路由基本匹配 
### 路由params传参
测试