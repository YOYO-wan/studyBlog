# ES6--类的使用
## class定义类的方式与特点  
### 类的声明  
``` js
class Person{
    ......
}
```
### 类的表达式  
``` js
var Person = class {
    ......
}
```
### 类的特点  
类和构造函数大致相同  
``` js
class Person {
    ......
}
console.log(Person.prototype)  // {}
console.log(Person.prototype.__proto__) // [Object:null prototype]
console.log(Person.prototype.constructor) // [class Person]
console.log(typeof Person) // function

var p = new Person();
console.log(p.__proto__ === Person.prototype)  // true
```
## class的构造方法  
思考：构造函数可以接受参数，那么class如何接受参数  
可以使用类的构造方法进行传参  
注意：一个类只能有一个构造方法，如果包含多个构造方法，会抛出异常  
``` js
code Person {
    // 类的构造方法  
    constructor(name,age){
        this.name = name
        this.age = age
    }
}

var p1 = new Person("haha",11)
var p2 = new Person("hehe",18)
```
## 类中的定义的方法  
### 类的实例方法  
``` js
class Person {
    constructor (name,age){
        this.name = name
        this.age = age
    }
    running(){
        console.log(this.name + 'running~')
    }
    eating(){
        console.log(this.name + 'eating~')
    }
}
console.log(Ovject.getOwnPropertyDescriptors(Person.prototype))
```
running函数和eating函数都挂在了原型上面  
### 类的访问器方法  
``` js
class Person {
    constructor (name,age){
        this.name = name
        this.age = age
        this._address = "北京"
    }
    running(){
        console.log(this.name + 'running~')
    }
    eating(){
        console.log(this.name + 'eating~')
    }
    get address(){
        console.log("拦截访问操作")
        return this._address
    }
    set address(naeValue){
        console.log("拦截设置操作")
        this._address = naeValue
    }
}
```
### 类的静态方法(类方法)
实例方法和访问器方法一般都是创建出来的对象进行访问的  
如：`var p1 = new Person();``p1.running()`  
静态方法是通过类名去访问的，如：`Person.createPerson()`  
``` js
class Person {
    constructor (name,age){
        this.name = name
        this.age = age
        this._address = "北京"
    }
    running(){
        console.log(this.name + 'running~')
    }
    eating(){
        console.log(this.name + 'eating~')
    }
    static createPerson(){
        return new Person("初始名字",10)
    }
}
var p1 = Person.createPerson()
```
## 类中实现继承
使用extends关键字继承一个父类
```js
class Person {
    constructor(name,age){
        this.name = name
        this.age = age
    }
    running(){
        console.log(this.name + 'running~')
    }
    eating(){
        console.log(this.name + 'eating~')
    }
    static createPerson(){
        return new Person("初始名字",10)
    }
}
class Student extends Person { // student类继承于Person
    constructor(name,age,num){
        super(name,age)
        this.num = num
    }
    running(){ // 重写父类running的函数
        super.running() // 先执行一下父类中running函数的代码
        console.log(this.name + '子类running~' + this.num)
    }
}

var stu = new Student()
stu.eating()
stu.running()
console.log(stu.name,stu.age,stu.num)
```
> super关键字  
> 在子类的构造函数中使用this之前或者返回默认对象前，必须通过super调用父类的构造函数  
> super的使用位置：子类的构造方法、实例方法、静态方法  

## 继承内置类  
可以在内置类的基础上拓展一些自己使用的方法  
比如创建一个新的类，继承Array中所有方法，再创建一些新方法  
``` js
class NewArray extends Array {
    firstItem(){
        return this[0]
    }
    latsItem(){
        return this[this.length - 1]
    }
}
var arr = new NewArray(1,2,3)
arr.firstItem()
arr.latsItem()
```
## 类中的混入
因为只能继承一个父类，当需要多个父类结合继承的时候，就难以实现了
``` js
class Person {
    ......
}
class Runner {
    running(){
        ......
    }
}
// 类只能扩展一个类（这是一个错误写法）
class Student extends Person,Member{

}
```
当遇到这种情况，我们可以使用js实现混入的效果
``` js

class Person {
 
}
function mixinRunder(BaseClass){
    class NewClass extends BaseClass {
        running(){
        }
    }
    return NewClass
}
 
var NewClass = mixinRunder(Person)
var runner = new NewClass()

```
