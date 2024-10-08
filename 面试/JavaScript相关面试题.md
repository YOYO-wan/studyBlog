# JavaScript相关面试题

## 对于数组基本操作方法  
`let arr = [1,3,4,2,6]` 
1. 获取数组长度  
2. 在数组的最后一位添加元素  
3. 在数组的第一位添加元素  
4. 把数组的第一位元素弹出  
5. 把数组的最后一位元素弹出  
6. 原数组的第3位到第4位元素删除/增加/替换，原数组是否发生改变？  
7. 原数组不改变，提取数组从第2位到第4位的元素  
8. 用字符“-”将数组中元素进行拼接  
9. 将arr与["11","22"]进行拼接，不改变arr数组  
10. 将数组元素反转,是否改变原数组？  
11. 将数组元素从小到大排序，是否改变原数组？

答案：
1. `arr.lenght`  
2. `arr.push(4)`，返回数组长度  
3. `arr.unshift(3)`，返回数组长度  
4. `arr.shift()`,返回被弹出的元素  
5. `arr.pop()`,返回被弹出的元素  
6. splice(开始位置,替换个数,替换内容),该方法改变原数组  
`arr.splice(3,2)`,返回被删除的元素数组  
`arr.splice(3,0,"新增")`,返回空数组
`arr.splice(3,2,6,7)`,返回替换元素的数组  
7. `arr.slice(2,5)`  
8. `arr.join('-')`  
9. `var newArr = arr.concat(["11","22"])`
10. `arr.reverse()`,改变了原数组
11. `arr.sort((v1,v2)=>v1-v2)`,改变了原数组

## 对于字符串基本操作方法
1. 获取字符串"hello Word"的长度
2. 三种方法，截取字符串"0123456789"中"0123"，三种方法是否会改变本身字符串  
3. 将字符串"hello Word"中"Word"替换成"Vue",是否改变本身字符串？
4. 字符串"01234596789"，从头查找"9"的索引，如果没找到返回什么？
5. 字符串"01234596789"，从尾部开始查找"9"的索引，如果没找到返回什么？
6. 删除字符串"   hello   "两端空白的方法？  
7. 将字符串"hello"转换成大写？  
8. 将字符串"HELLO"转换成小写？  
9. 将字符串"11,22,33,44"根据逗号转换成数组?

答案：  
1. `str.length`
2. `str.slice(0,4)`,slice(开始位置,结束位置+1)  
`str.substring(0,4)`,substring(开始位置,结束位置+1)  
`str.substr(0,4)`,substring(开始位置,长度)  
三种方法均不改变本身  
3. `str.replace(/Word/g,"Vue")`,不改变字符串本身  
4. `str.indexOf('9')`,返回下标10,没找到返回-1  
5. `str.lastIndexOf('9')`,返回下标10,没找到返回-1  
6. `str.trim()`
7. `str.toUpperCase()`
8. `str.toLowerCase()`  
9. `str.split(',')`

## this是什么？this的指向规则？规则的优先级？
this是函数作为方法被调用时所指向的对象  
this的指向规则一:
1. 默认绑定：独立调用函数  
2. 隐式绑定：通过某个对象发起函数调用  
3. 显式绑定：bind，apply，call方法，绑定this后调用函数  
4. new关键字调用函数

规则优先级为：
new调用函数 > bind > apply/call > 隐式绑定 > 默认绑定

this的指向规则之外的情况：
1. 显式绑定中传入null或undefined,this指向windows(严格模式下指向null或者undefined)
2. 间接函数引用,this指向windows
3. 箭头函数中的this指向上层作用域，对箭头函数使用强制绑定不生效

## this指向面试题
**面试题一**
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
    test();                        
    person.sayName();            
    (person.sayName)();     
    var b
    (b = person.sayName)(); 
}
sayName()
```
**面试题二**
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

person1.foo1();                    
person1.foo1.call(person2);        
person1.foo2();                     
person1.foo2.call(person2);         
person1.foo3()();                   
person1.foo3.call(person2)();      
person1.foo3().call(person2);     
person1.foo4()();                  
person1.foo4.call(person2)();     
person1.foo4().call(person2);
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

preson1.foo1();
preson1.foo1.call(preson2);

preson1.foo2();
preson1.foo2.call(preson2);

preson1.foo3()();
preson1.foo3.call(preson2)();
preson1.foo3().call(preson2);

preson1.foo4()();
preson1.foo4.call(preson2)();
preson1.foo4().call(preson2);
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

preson1.obj.foo1()();  
preson1.obj.foo1.call(preson2)(); 
preson1.obj.foo1().call(preson2); 
preson1.obj.foo2()();                
preson1.obj.foo2.call(preson2)();    
preson1.obj.foo2().call(preson2);  
```

## apply,call,bind三种方法的区别？
call(),apply()都可以直接调用函数,但该两种方法的第二个传参不同  
call()的第二个参数以多参数的形式传递，apply()的第二个参数以数组的方式传递 
`foo.call(obj,18),foo.apply(obj,[18])`   
bind()方法执行后不调用函数，返回一个绑定了新this的函数  

## new 操作符具体干了什么?
new操作符用于给一个构造函数创建实例对象  
1. 创建一个空对象  
2. 将构造函数的this绑定到这个空对象上  
3. 执行构造函数中的代码  
4. 如果构造函数没有返回值，将默认返回创建的对象  

## JavaScript 原型，原型链是什么？
原型：
1. 每个对象都会有个__proto__属性  
2. 函数也是一个对象，作为对象来说它拥有__proto__属性(隐式原型)  
3. 函数作为函数来说，它还拥有一个prototype属性(显示原型)  

原项链：
1. 每个对象都会拥有__proto__属性，称为原型，该原型是一个对象，那么原型对象也会拥有__proto__属性，所以这一层一层的关系称之为原型链。  
2. 原项链的顶层就是Object的原型对象，为null


## 剩余题目
1. 介绍 JavaScript 的基本数据类型?

2. 浅谈 JavaScript 中变量和函数声明的提升?

3. 什么是闭包，闭包有什么特性？

4. 说说对闭包的理解和闭包的作用
6. 事件模型的理解

7. new 操作符具体干了什么?

8. 说说栈和堆的理解，以及它们的区别?

9. JS 数组和对象的遍历方式，以及几种方式的比较

10. map 与 forEach 的区别

11. 谈一谈箭头函数与普通函数的区别?

12. JavaScript 定义类的 4 种方法

13. JavaScript 实现继承的 3 种方法

14. 对原生 Javascript 了解程度

15. Js 动画与 CSS 动画区别及相应实现

16. 谈一谈你理解的函数式编程

17. 说说你对作用域链的理解

18. JavaScript 原型，原型链 ? 有什么特点？

19. 说说什么是事件代理?

20. 说说 ajax 原理?

21. 说说如何解决跨域问题?

22. 异步加载 JS 的方式有哪些?

23. 那些操作会造成内存泄漏?

24. 介绍 JS 有哪些内置对象?

25. 说几条写 JavaScript 的基本规范

26. eval 是做什么的?

27. null 和 undefined 的区别

28. 说说同步和异步的区别?

29. defer 和 async ?

30. ["1", "2", "3"].map(parseInt) 答案是多少?

31. use strict 的理解和作用?

32. 说说严格模式的限制?

33. 说说严格模式的限制?

34. 说说 JSON 的了解?

35. 说说 JS 延迟加载的方式有哪些?

36. 说说 attribute 和 property 的区别是什么?

37. 说说 let 的区别是什么?

38. 如何通过 JS 判断一个数组?

38. 说说 let、var 、 const 的理解

39. 正则表达式的使用

40. Javascript 中 callee 和 caller 的作用

41. 说说 window.onload 和$(document).ready 的区别?

42. Javascript 数组去重方法汇总

43. 浏览器缓存

44. 防抖/节流的理解

45. JavaScript 变量提升

46. 实现 Storage，使得该对象为单例，以及使用方式

47. 说说你对事件流的理解

48. 说说从输入 URL 到看到页面发生的全过程

49. 做一个 Dialog 组件，说说你设计的思路?它应该有什么功能?

50. 说说 ajax、fetch、axios 之间的区别

50. 说说内存泄漏

51. JavaScript 自定义事件

52. JavaScript 数组排序的几种方式?

53. JavaScript 数组一行代码去重方法?

54. JavaScript 如何判断一个对象是否为数组?

55. script 引入方式?

56. 变量对象?

57. babel 编译原理?

58. 数组(array)?

59. 说几条写 JavaScript 的基本规范?

60. JavaScript 有几种类型的值?

61. JavaScript 有几种类型的值?

62. JavaScript 深浅拷贝?