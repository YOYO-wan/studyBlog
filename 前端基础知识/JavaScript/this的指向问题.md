# this的指向问题
this是什么？this是函数作为方法被调用时所指向的对象  
this的绑定和调用的方式以及调用的位置有关系，this是在运行的时候被绑定的  
## this的绑定规则
### 绑定规则一：默认绑定
独立函数调用下使用默认绑定  
独立函数调用可以理解为：函数没被绑定到某个对象上进行调用  
**情况一：普通函数被独立执行**
``` js
function foo (){
    console.log("foo函数的this指向:",this)
}
foo() // this指向windows
```
**情况二：函数定义在对象中，但独立调用**
``` js
var obj = {
    name:"哈哈",
    age: 18,
    bar: function(){
        console.log("this指向:",this)
    }
}
var foo = obj.bar
foo() // this指向windows
```
**情况三：严格模式下，独立调用下的函数中的this指向undefined**
``` js
'use strict'
function foo (){
    console.log("this指向:",this)
}
foo()
```
### 绑定规则二：隐式绑定
隐式绑定就是通过某个对象发起的函数调用  
``` js
function foo (){
    console.log("this指向:",this)
}
var obj = {
    name:"哈哈",
    age: 18,
    bar: foo
}
obj.bar() // this指向obj
```
### 绑定规则三：显式绑定
使用了方法，明确绑定了this指向的对象，称之为显式绑定  
JavaScript中call(),apply(),bind()可以绑定this指向的对象  
```js
function foo(name,age){
    console.log("this指向:",this)
}
var obj = {
    name: "哈哈哈"
}
foo.call(obj,"yoyo",18) // this指向obj
foo.apply(obj,["yoyo",18]) // this指向obj
var p = foo.bind(obj,"yoyo",18)
p() // this指向obj
```
> call(),apply(),bind()三种方法的区别  
> call(),apply()都可以直接调用函数,但该两种方法的第二个传参不同  
> call()的第二个参数以多参数的形式传递，apply()的第二个参数以数组的方式传递  
> 例如：`foo.call(obj,18)`,`foo.apply(obj,[18])`
> bind()方法执行后不调用函数，返回一个绑定了新this的函数  
> `var bar = foo.bind(obj)`
> `bar()`

### 绑定规则四：new绑定
使用new关键字来调用函数  
``` js
function person (name){
    console.log("this指向:",this)
    this.name = name
}
new person("哈哈") // this指向person这个对象
```
使用new时会有如下执行：
1. 创建了一个叫做person的空对象  
2. 将this指向了person这个空对象  
3. 执行person函数中的代码  
4. 如果该函数没有返回值，会默认返回person对象
所以`var foo = new person("哈哈")`,foo为person对象
### 规则优先级
1. 默认绑定优先级最低  
2. 显式绑定高于隐式绑定  
3. new绑定高于隐式绑定  
4. new绑定高于bind

结论：
**new绑定 > bind() >apply()/call() > 隐式绑定 > 默认绑定**
### this绑定之外的情况  
**情况一：显式绑定中传入null或者undefined,this指向windows**
```js
function foo(){
    console.log("this指向:",this)
}
foo.apply(null)      // this指向:windows
foo.call(undefined)  // this指向:windows
```
严格模式下,this指向对应类型
``` js
"use strict"
function foo(){
    console.log("this指向:",this)
}
foo.apply(null)      // this指向:null
foo.call(undefined)  // this指向:undefined
```
**情况二：间接函数引用,this指向windows**

``` js
var obj1 = {
    name: "obj1",
    foo: function(){
        console.log("this指向：",this)
    }
};
var obj2 = {
    name: "obj2"
};
// 正常情况下
// obj2.foo = obj1.foo
// obj2.foo() // this指向obj2，这是隐式绑定

// 特殊代码下
(obj2.foo = obj1.foo)(); // this指向windows
```
赋值操作`obj2.foo = obj1.foo`返回一个foo函数  
foo函数被独立调用，那么这就是默认绑定  
**情况三：箭头函数**  
箭头函数中并不绑定this，就算是强制绑定也不会生效  
箭头函数中的this查找规则是向上层作用域查找this
```js
var obj = {
    name: "obj",
    foo: function(){
        var bar = ()=>{
            console.log("this指向：",this)
        }
        return bar
    }
}
var obj2 = {
    name: "obj2"
}
var fn = obj.foo()
fn.apply(obj2) // this指向：obj
```
## 面试题
**面试题一：**
``` js
var name = "windows"
var person = {
    name: "person",
    sayName: function(){
        console.log(this.name)
    }
}
function sayName(){
    var test = person.sayName;
    test();                        // windows   独立调用，默认绑定
    person.sayName();              // person    对象调用，隐式绑定
    (person.sayName)();            // person    对象调用，隐式绑定
    var b
    (b = person.sayName)();        // windows   间接函数引用
}
sayName()
```
**面试题二：**
``` js
var name = "windows"
var person1 = {
    name: "person1",
    foo1: function(){
        console.log(this.name)
    },
    foo2:()=>{
        console.log(this.name)
    },
    foo3:function(){
        return function(){
            console.log(this.name)
        }
    },
    foo4:function(){
        return ()=>{
            console.log(this.name)
        }
    }
}
var person2 = { name: "person2" }

person1.foo1();                     // person1  对象调用，隐式绑定  
person1.foo1.call(person2);         // person2  显示绑定
person1.foo2();                     // windows  箭头函数查找上层作用域
person1.foo2.call(person2);         // windows  箭头函显式绑定无效
person1.foo3()();                   // windows  独立执行，默认绑定
person1.foo3.call(person2)();       // windows  独立调用，改变的是foo3函数的指向
person1.foo3().call(person2);       // person2  显示绑定
person1.foo4()();                   // person1  箭头函数查找上层作用域
person1.foo4.call(person2)();       // person2  箭头函数查找上层作用域,然后显示绑定
person1.foo4().call(person2);       // person1  箭头函显式绑定无效
```
**面试题三：**
``` js
var name = "windows"
function Preson(name){
    this.name = name;
    this.foo1 = function(){
        console.log(this.name)
    }
    this.foo2 = ()=>{ console.log(this.name) }
    this.foo3 = function(){
        return function(){
            console.log(this.name)
        }
    }
    this.foo4 = function (){
        return ()=>{
            console.log(this.name)
        }
    }
}
var preson1 = new Preson("preson1")
var preson2 = new Preson("preson2")

preson1.foo1();                  // preson1 隐式绑定
preson1.foo1.call(preson2);      // preson2 显式绑定

preson1.foo2();                  // preson1 箭头函数查找上层作用域
preson1.foo2.call(preson2);      // preson1 箭头函数强制绑定不生效

preson1.foo3()();                // windows 独立调用
preson1.foo3.call(preson2)();    // windows 独立调用
preson1.foo3().call(preson2);    // preson2 显示绑定

preson1.foo4()();                // preson1 箭头函数查找上层作用域
preson1.foo4.call(preson2)();    // preson2 显式绑定,箭头函数查找上层作用域
preson1.foo4().call(preson2);    // preson1 箭头函数强制绑定不生效
```
**面试题四：**
```js
var name = "windows"
function Preson(name){
    this.name = name;
    this.obj = {
        name: "obj",
        foo1: function(){
            return function(){
                console.log(this.name)
            }
        },
        foo2: function(){
            return () => {
                console.log(this.name)
            }
        }
    }
}
var preson1 = new Preson("preson1");
var preson2 = new Preson("preson2");

preson1.obj.foo1()();                // windows 独立调用 
preson1.obj.foo1.call(preson2)();    // windows 独立调用 
preson1.obj.foo1().call(preson2);    // preson2 显式绑定
preson1.obj.foo2()();                // obj  箭头函数查找上层作用域
preson1.obj.foo2.call(preson2)();    // preson2 显式绑定,箭头函数查找上层作用域
preson1.obj.foo2().call(preson2);    // obj  箭头函数强制绑定不生效
```