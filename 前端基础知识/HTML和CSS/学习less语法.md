# 学习less语法
## 环境
> 学习中如何编译less文件
### 使用less工具
```sh
npm install less -g
# 全局安装
npm install less --save -dev 
# 将在项目文件中安装，并加在package.json的devDependencies配置段中
```
使用lessc命令来执行文件进行编译  
```sh
lessc test.less test.css
# 将test.less文件编译成test.css文件
```
### 使用vscode中的easy less插件
安装插件后，less文件在自动保存后，会在当前文件夹下生产编译文件
### 引入CDN地址进行编译  
```html
<link rel="stylesheet/less" href="./less/test.less">
<script src="https://cdn.jsdelivr.net/npm/less@4"></script>
```
### 将CDN地址代码拷贝到本地
将CDN地址的代码拷贝到本地的一个js文件，然后再在index.html文件中引入  
## Less语法
### 变量(Variables)
在less中使用“ @变量:变量值; ”格式来定义变量  
```less
@themeColor: #f3c258;
@mainFontSize: 12px;
.box {
    color: @themeColor;
    font-size: @mainFontSize;
}
```
### 嵌套
```html
<div class="box">
    <p>
        <span class="link">测试link</span>
    </p>
</div>
```
**使用普通的css:**  
```css
.box p .link {
    color: red;
}
```
**使用less语法:**  
```less
.box {
    .link {
        color: red;
    }
}
```
**使用特殊符号&，表示代替上一层选择器的意思**   
```less
.box {
    .link {
        color: red;
        &:hover{
            color: yellow;
        }
    }
}
```
### 运算(Operations)
在less中，算术运算符+、-、*、/可以对任何数字，颜色或变量进行运算  
算术运算符在加，减或比较之前会进行单位换算，计算的结果以最左侧操作数的单位为准  
如果单位换算无效或者失去意义，则忽略单位  
```less
.box {
    width: 100px +100px;
    height: 200px *50%;
}
```
### 混入(Mixins)
混入(Mixins)是一种将一组属性从一个规则集(或混入)到另一个规则集的方法  
#### 1. 基本使用
**普通css代码:**
```html
<div class="box1 nowrap_ellipsis">
    哈哈哈box1
</div>
<div class="box2 nowrap_ellipsis">
    哈哈哈box2
</div>
```
```css
.nowrap_ellipsis{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.box1 {
    width: 100px;
}
.box2 {
    width: 200px;
}
```
**使用less的混入：**  
```html
<div class="box1">
    哈哈哈box1
</div>
<div class="box2">
    哈哈哈box2
</div>
```
```less
.nowrap_ellipsis{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.box1 {
    width: 100px;
    .nowrap_ellipsis();
}
.box2 {
    width: 200px;
    .nowrap_ellipsis();
}
```
#### 2. 混入的传参
```less
.box_border(@borderWidth: 5px,@borderColor: purple) {
    border:@borderWidth solid @borderColor;
}
.box {
    width: 100px;
    .box_border(10px,orange);
}
```
#### 3. 混入和映射结合使用
作用：弥补less中不能自定义函数的缺陷
```less
.box_size {
    width: 100px;
    height: 100px;
}
.box {
    width: .box_size()[width];
    color: red;
}
```
例子：将px单位转换成rem
```less
.pxToRem(@px){
    result: (@px/@htmlFontSize)*1rem;
}
.box {
    width: .pxToRem(100)[result];
    font-size: .pxToRem(18)[result];
}
```
### 继承(Extend)
和混入(Mixins)作用类似，用于复用代码  
和混入(Mixins)类似，继承代码最终会转换成并集选择器  
**普通的css代码**
```less

```