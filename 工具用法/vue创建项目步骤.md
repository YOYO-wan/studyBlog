# vue创建项目步骤
目前有两种创建vue项目的方式  
一种是使用Vue CLI脚手架  
一种是使用create-vue
## Vue CLI脚手架
> Vue CLI 现已处于维护模式!
* 基于webpack工具
* 命令：vue create
```sh
# 安装vue CLI，注意:node需要8.9以上
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```
``` sh
# 使用该命令查看版本
vue -V
```
``` sh
# 创建项目
vue create newproject
```
## create-vue
* 基于vite工具
* 命令：npm create vue@latest
> 需要注意版本，目前vue文档中要求node安装 18.3 或更高版本（不断更新，使用时再次查看更好）
``` sh
npm create vue@latest #vue文档中的命令
# OR
npm init vue@latest
```