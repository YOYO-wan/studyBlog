# 组合式API--声明响应式以及工具函数
## reactive()
reactive()返回一个对象的响应式代理，reactive传入的类型有限制，需要定义一个复杂类型，例如：数组，对象，不然会报警告  
``` js
import { reactive } from "vue";
export default {
    setup(){
        // const message = reactive("hello World")
        // 这样是不对的，会报警告
        const obj = reactive({
            usename: '哈哈'，
            password: '12345'
        })
        return {
            obj
        }
    }
}
```
## ref()
ref()接受一个内部值，返回一个响应式的、可更改的 ref 对象，此对象只有一个指向其内部值的属性 .value。  
```js
import { ref } from 'vue'
export default {
    setup(){
        let message = ref('helloWorld')
        const changeMessage = ()=>{
            message.value = 'hello'
        }
        return {
            changeMessage,
            message
        }
    }
}
```
> 注意:
> 1. template中引入ref的值时，vue会自动进行解包，所以不需要在template中通过ref.value的方式使用  
> 2. 在setup函数内部，它依然是一个ref引入，所以对其操作需要使用ref.value使用  
## readonly()
readonly函数会返回原始对象的只读代理  
### 参数
常见的readonly函数会传入三个类型的参数：  
* 类型一：普通对象  
* 类型二：reactive返回的对象  
* 类型三: ref的对象

### 使用规则
readonly的使用过程中有如下规则：  
readonly返回的对象都是不允许修改的，但经过readonly处理前的原对象可修改  
比如：` const info = readonly(obj)`  
info对象不允许修改，obj对象可进行修改，当obj对象被修改时，readonly返回的info对象也会被修改  

> 其本质上就是readonly返回的对象的setter方法被劫持了而已  

``` js
import { readonly,reactive,ref } from 'vue'
export default {
    setup(){
        // 传入普通对象
        const info1 = readonly({
            name: '哈哈',
            age: 18
        })
        // 传入reactive对象
        const info2 = readonly(reactive({
            name: '哈哈',
            age: 18
        }))
        // 传入ref对象
        const info3 = readonly(ref('hello'))
        return {
            info1,
            info2,
            info3
        }
    }
}
```
## 其他工具函数
### isProxy()
检查对象是否由reactive或readonly创建的proxy  
### isReactive()
检查对象是否由reactive创建的响应式代理  
如果该代理是readonly创建的，但包裹了由reactive创建的另一个代理，它也会返回true  
### isReadonly()
检查对象是否由readonly创建的只读代理  
### isRaw()
返回reactive或readonly代理的原始对象  
(不建议保留对原始对象的持久引用，请谨慎使用)
### shallowReactive()
创建一个响应式代理(浅层相应)
### shallowReadonly()
创建一个proxy，只读(浅层只读)
### toRefs()
如果对reactive返回的对象进行解构赋值，那么修改解构后的变量和修改reactive返回的state对象，数据都不再是响应式  
``` js
const state = reactive({
    name:'哈哈',
    age: 18
})
const { name,age } = state
// name,age,或者直接state对象，都不是响应式数据了
```
如何让解构出来的属性是响应式？
可以使用toRefs()，它可以将reactive返回的对象中的属性都转换成ref  
``` js
const state = reactive({
    name:'哈哈',
    age: 18
})
const { name,age } = toRefs(state)
// name，age本身就为ref了
```
这种做法相当于将state.name与ref.value之间建立了链接，任何一个修改都会引起另外一个的变化  
### toRef()
如果想使reactive对象中的一个属性为ref，可以使用toRef函数
``` js
const obj = reactive({
    name:'哈哈',
    age: 18
})
const ageRef = toRef(obj,"age")
ageRef.value++
console.log(obj.age) // 19
obj.age++
console.log(ageRef.value) // 20
```
### unref()
获取ref引用中的value
``` js
const name = ref('哈哈')
// name.value等同于unref(name)操作
console.log(name.value)
console.log(unref(name))
```
如果参数是一个ref则返回ref.value,否则返回参数本身  
这是`val = isRef(val)?val.value:val`的语法糖函数  
### isRef()
判断值是否是一个ref对象  
### shallowRef()
创建一个浅层ref的对象