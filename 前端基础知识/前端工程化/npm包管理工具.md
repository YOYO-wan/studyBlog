# npm包管理工具
## package配置文件
项目中一般都会有package.json文件，这是一个配置文件，一般自动生成  
这个配置文件会记录着你项目的名称，版本号，项目描述等，也会记录项目所依赖的其他库的信息和版本号  
### 常见属性———基础
* **name**是项目名称
* **version**是当前项目的版本号
* **desoription**是描述信息
* **author**是作者相关信息(发布时用到)
* **license**是开源协议(发布时用到)
* **private**是记录当前项目是否是私有的，当前值为true时，npm是不能发布它的
* **main**是设置程序入口
### 常见属性———重要
* **script**属性用于配置一些脚本命令，以键值对的形式存在  
配置后可通过npm run命令key值来执行命令，例如：npm run start  
* **dependencise**属性是指无论开发环境还是生产环境都需要依赖的包  
* **devDependencise**是指一些在生产环境中不需要的依赖会写在该属性中  
* **peerDependencise**指对等依赖，依赖的一个包必须是以另外一个宿主包为前提  
例如：element-plus是依赖于vue3的，peerDependencise中会存在vue3的版本号  
* **engines**属性用于指定npm和Node的版本号，安装项目时，会先检查对应的版本，如果不符合会报错  