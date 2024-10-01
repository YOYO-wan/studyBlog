# TypeScript基础语法
## typeScript的环境
### 编译环境  
``` sh
npm install typescript -g  # 全局安装
tsc --version  # 查看安装版本
tsc test.ts # 编译文件
```
### 运行环境
#### 方式一：通过webpack
配置本地的ts编译环境和开启一个本地服务器，可以直接运行在浏览器上  
根据文章内容搭建环境：[TypeScript(二)使用Webpack搭建环境](https://mp.weixin.qq.com/s/wnL1l-ERjTDykWM76l4Ajw)  
#### 方式二：ts-node
```sh
# 安装ts-node
npm install ts-node -g
# 另外ts-node需要依赖 tslib 和 @types/node 两个包
npm install tslib @types/node  -g
# 运行ts文件
ts-node main.ts  
```
## 变量
### typeScript变量声明
var/let/const 标识符:数据类型 = 赋值;
```ts
let message:string = "hello"
```
注意：string是小写，与String有区别，string是ts中定义的字符串类型，String是js中定义的一个类  
### typeScript变量的类型推导
```ts
let message = "hello";
message = 19;   // 会报错
```
虽然在message声明时未标记为string类型，但ts根据赋值内容推导出message为string类型  
## JavaScript类型在Ts中的使用
### JavaScript类型—number类型  
Ts中与Js一样不区分整数类型和浮点类型，统一为number类型  
```ts
let num:number = 100
let num2 = 200
num = 6.66
```
### JavaScript类型—boolean类型 
```ts
let flag:boolean = true;
flag = false;
flag = 20>30;
``` 
### JavaScript类型—string类型 
字符串类型，可使用单引号或双引号表示  
```ts
let message:string = "hello";
message="hello2"
```
也支持ES6模板字符串
```ts
let name:string = "haha"
let age:number = 12
const str:string =`姓名：${name},年龄：${age}`
console.log(str)
```
### JavaScript类型—Array类型 
明确指定<数组>类型注释有两种写法  
1. string[]：数组类型，且数组中存放字符串
```ts
let names:string[] = ["aa","bb","cc"]
let nums:number[] = [1,2,3]
```
2. Array\<string\>:泛型写法，数组类型，且数组中存放字符串  
```ts
let names:Array<string> = ["aa","bb","cc"]
```
### JavaScript类型—Object类型 
```ts
let info:{
    name: string,
    age: number
} = {
    name: "hello",
    age: 21
}
// 开发中不要有以下写法
let info2:Object ={
    name: "hello",
    age: 21
}
// 取值时，info2.name会报错
// 因为这样写相当于info2是个空对象
```
### JavaScript类型—null和undefined类型 
```ts
let n:null = null;
let u:undefined = undefined;
```
## 函数
### 函数的参数类型
声明函数后可在每个参数后添加类型注解，以声明函数参数类型  
```ts
function foo(name:string,age:number){
    console.log(name,age)
}
foo("haha",12)
```
### 函数的返回值类型
可添加函数返回值的类型注解
```ts
function foo(num1:number,num2:number):number{
    return num1+num2
}
foo(11,12)
```
通常不需要返回类型注解，ts会根据return的值推导出来
### 匿名函数的参数类型
```ts
const names:string[]=["aa","bb","cc"]
names.forEach(item => { // ts会推导出item的类型为string
    console.log(item)
});
```
匿名函数与函数声明有些不同，当一个函数出现在ts可以确定该函数会被如何调用的地方时，该函数的参数会自动指定类型