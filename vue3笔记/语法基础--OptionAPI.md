# 语法基础--OptionAPI
## computed计算属性
当插值语法中使用一些需要复杂处理的data时，可以将逻辑抽离出来，使用computed计算属性  
### 基本写法
``` html
<div id="app">
    <h2>{{handelArrData}}</h2>
</div>
<script>
    const app = Vue.createApp({
        data(){
            return{
                arr:['World','Hello']
            }
        },
        computed:{
            handelArrData(){
                return this.arr.reverse().join(' ')
            }
        }
    }).mount('#app')
</script>
```
### 计算属性与methods的区别
methods中的方法是调用几次就会执行几次  
而计算属性会基于使用数据的依赖关系进行缓存，在数据不发生变化时，计算属性是不需要重新计算的  
但依赖的数据发生变化，在使用时计算属性依然会重新进行计算
### 计算属性的setter和getter
``` js
const app = Vue.createApp({
    data(){
        return {
            arr:['World','Hello']
        }
    },
    computed:{
        handelArr:{
            get:function(){
                return this.arr.reverse().join(' ')
            },
            set:function(newValue){
                this.arr = newValue.split(' ')
            }
        }
    }
}).mount('#app')
```
如代码所示，如果运行this.handelArr = '测试World 测试Hello'  
setter就会调用，arr从而会被改变，又会触发getter的执行  
当想要修改计算属性时，可以使用这种写法  
但getter中只做计算处理，不要改变其它状态或在getter中做异步请求或者更改DOM  
## 侦听器watch
watch选项在每次响应式属性发生变化时触发一个函数
### 基本使用
```js
const app = Vue.createApp({
    data(){
        return {
            message: 'Hello Vue',
            info:{
                name: '哈哈',
                age: 18
            }
        }
    },
    methods:{
        changeMesg(){
            this.message = '你好vue'
            this.info = { name:'YOYO' }
        }
    },
    watch:{
        message(newValue,oldValue){
            console.log('当message发生变化')
            console.log(newValue,oldValue)
        },
        info(newValue,oldValue){
            //如果是对象类型，那么newValue和oldValue拿到的是代理对象
            console.log('当info发生变化'，newValue,oldValue)
            // 如何获取原生对象呢？
            console.log({...newValue}) // 相当于一个新对象
            console.log(vue.toRaw(newValue));
        }
    }
    
}).mount('#app')
```
watch侦听器中，如果侦听的值为对象类型，取到newValue和oldValue为代理对象，如果想使用原生对象，可以使用vue.toRaw(newValue)方法  

> toRaw() 是一个函数，用于获取被代理的原始（非响应式）对象。这个函数可以用来访问被响应式对象所包装的原始数据，而不是获取到的代理对象。  
### watch侦听配置选项
#### 深层侦听
watch默认是浅层的，而嵌套属性的变化不会触发，如果想侦听所有嵌套的变更，需要需用deep:true进行深层侦听    
``` js
watch:{
    info:{
        handel(newValue,oldValue){
            console.log(newValue,oldValue)
        },
        deep:true
    }
}
```
#### 即时回调侦听
watch默认是懒执行，仅当数据源变化时才会执行回调，使用immediate:true选项可立即执行回调  
``` js
watch:{
    info:{
        handel(newValue,oldValue){
            console.log(newValue)
        },
        immediate:true
    }
}
```
#### 创建侦听器
``` js
const app = Vue.createApp({
    data(){
        return {
            info: {
                name: '哈哈',
                age: 18
            },
        }
    },
    created(){
        this.$watch('info',(newValue,oldValue)=>{
            console.log(newValue,oldValue)
        },{ deep: true })
    }
}).mount('#app')
```
可以使用$watch创建一个侦听器  
第一个参数是侦听源  
第二个参数是侦听的回调callback  
第三个参数是额外其他选项  