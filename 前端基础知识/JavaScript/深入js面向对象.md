# 深入js面向对象
## 创建对象的方式
### new关键字创建
``` js
var obj = new Object();
obj.name = "哈哈"
obj.age = 19
```
### 字面量创建对象
``` js
var obj = {}
obj.name = "哈哈"
obj.age = 19
```
## 对象属性的操作
需求：对属性进行操作时，进行一些限制  
限制：不允许某一个属性被赋值/不允许某个属性被删除/不允许某个属性被遍历出来  
可以使用Object.defineProperty来对属性进行操作  
Object.defineProperty()方法会直接在一个对象上定义一个新属性或修改一个对象的现有属性，并返回此对象  
Object.defineProperty(对象，属性，属性描述符)  
``` js
var obj = {
    name: "哈哈",
    age: 19
}
// 属性描述符是一个对象
Object.defineProperty(obj,"height",{
    // 有很多配置
    value: 1.88
})
console.log(obj)   // { name: "哈哈", age: 19 }
// height不会被打印出来，该属性目前不可枚举  
console.log(obj.height)  // 1.88
// obj.height访问会显示目前的值，证明已经添加到对象中了
```
### 属性描述符
属性描述符分类：  
* 数据属性描述符  
* 存取属性描述符  

|     | configurable  | enumerable  | value  | writable  | get  | set  |
|  ----  | ----  | ----  | ----  | ----  | ----  | ----  |
| 数据属性描述符  | 可以 | 可以 | 可以 | 可以 | 不可以 | 不可以 |
| 存取属性描述符  | 可以 | 可以 | 不可以 | 不可以 | 可以 | 可以 |

#### 数据属性描述符
``` js
var obj = { name: "哈哈", age: 19 }
Object.defineProperty(obj,"address",{
    value: "北京",
    configurable: false,
    // 该配置使属性通过delete不可删除，也不可重新定义（重新定义属性描述符改为true不会生效）
    enumerable: true,
    // 该配置表示属性是否可以枚举(是否可以打印出来或通过for-in，Object.key()方法获取)
    writable: true,
    // 该配置表示属性是否可以赋值(修改)
})

// 通过字面量来定义的属性，该属性的描述符的配置为：
// 例如： obj.name
// {
//     value: "哈哈",
//     configurable: true,
//     enumerable: true,
//     writable: true
// }

```
当属性描述符传入空对象时,配置参数为默认值
``` js
Object.defineProperty(obj,"address2",{})
// {
//     value: undefined,
//     configurable: false,
//     enumerable: false,
//     writable: false
// }
```
通过字面量来定义的属性，该属性的描述符的配置为：
``` js
var obj = { name: "哈哈" }
// obj.name的配置
{
    value: "哈哈",
    configurable: true,
    enumerable: true,
    writable: true
}
```
#### 存取属性描述符
存取属性描述符一般用于：
1. 隐藏摸一个私有属性，不希望直接被外界使用或赋值  
2. 如果希望截获某一个属性，它访问和设置值的过程，使用存取属性描述符  
``` js
var obj = {
    name: "哈哈",
    age: 19,
    _address: "北京"
}
Object.defineProperty(obj,"address",{
    enumerable: true,
    configurable: true,
    get:function(){
        return this._address
    },
    set: function(value){
        this._address = value
    }
})
console.log(obj.address) // "北京"
// console.log(obj.address)，触发get方法，取到_address的值
obj.address = "上海" // 触发set方法,进行赋值
console.log(obj.address) // "上海"
// 
```
#### 定义多个属性描述符
``` js
var obj = { name: "哈哈",_address: "北京" }
Object.defineProperties(obj,{
    age:{
        value: 12,
        configurable: true,
        enumerable: true,
        writable: true
    },
    address:{
        enumerable: true,
        configurable: true,
        get:function(){
            return this._address
        },
        set: function(value){
            this._address = value
        }
    }
})
```
如果在字面量的时候给属性设置get，set函数,此时enumerable和configurable为默认值false
``` js
var obj = {
    name: "哈哈",
    _address: "北京",
    set address (value){
        this._address = value
    },
    get address (){
        return this._address
    }
}
```
## 创建对象的多种方式
### 字面量创建对象
``` js
var obj = {
    name: "hahah ",
    age: 19
}
```
### 工厂函数创建对象
``` js
function createPerson(name,age){
    var p = {}
    p.name = name
    p.age = age
    p.running = function(){
        console.log("在奔跑")
    }
    return p
}
var p1 = createPerson("哈哈"，19)
var p2 = createPerson("呵呵"，21)
```
### 构造函数创建对象
构造函数：通过new调用的函数都可以称为构造函数
``` js
function Person(name,age){
    this.name = name
    this.age = age
    this.running = function(){
        console.log("在奔跑")
    }
}
var p1 = new Person("哈哈"，19)
var p2 = new Person("呵呵"，21)
```
#### new操作符的作用
1. 在内存中创建一个新对象  
2. 新对象的__proto__属性会被赋值为构造函数的prototype属性  
3. 构造函数内部的this指向新创建出来的对象  
4. 执行构造函数内部代码  
5. 构造函数没有返回值的话，默认返回新对象  

#### 构造函数结合原型进行优化
``` js
function Person(name,age){
    this.name = name
    this.age = age
    Person.property.running = function(){
        console.log(this.name +"在奔跑")
    }
}
var p1 = new Person("哈哈"，19)
var p2 = new Person("呵呵"，21)
```