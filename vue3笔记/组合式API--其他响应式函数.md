# 组合式API--其他响应式函数
## setup中使用计算属性
在CompositionAPI中,我们可以在setup函数中使用computed函数，编写一个计算属性  
### 只读的计算属性ref
computed函数接受一个getter函数，返回一个只读的响应式ref对象  
``` js
import { computed,reactive } from 'vue'
export default {
    setup(){
        const obj = reactive({
            name: "Hello",
            name2: "World"
        })
        const handelObj = computed(()=>{
            return obj.name+""+obj.name2
        })
        console.log(handelObj.value)
        return {
            obj,
            handelObj
        }
    }
}
```
### 可写的计算属性ref
``` js
import { computed,reactive } from 'vue'
export default {
    setup(){
        const obj = reactive({
            name: "Hello",
            name2: "World"
        })
        const handelObj = computed({
            get:()=>{
                return obj.name+""+obj.name2
            },
            set:(newValue)=>{
                obj.name = newValue
            }
        })
        handelObj.value = "测试"
        return {
            obj,
            handelObj
        }
    }
}
```
## setup中的侦听器
### watch()
watch( )可以侦听一个或多个响应式数据源，并在数据源变化时调用所给的回调函数  
watch( )默认是懒侦听的源，可以是以下几种  
1. 第一个参数:侦听的源  
* 一个函数，返回一个值  
* 一个ref或reactive  
* 或是以上类型组成的数组  
2. 第二个参数:发生变化时要调用的回调函数
* 该回调函数接受三个参数，新值，旧值，及一个用于注册副作用清理的回调函数  
* 当侦听多个源时，该回调函数接受两个数组，分别对应源数组中的新值和旧值  
3. 第三个参数:一个对象，可含有以下属性
* immediate：侦听器创建时立即触发回调  
* deep：深层侦听  
``` js
// 侦听多个源
let count1 = ref(0)
let count2 = ref(0)
watch([count1,count2],([newValue1,newValue2],[oldValue1,oldValue1])=>{
    console.log('count1的侦听数据',newValue1,oldValue1)
    console.log('count2的侦听数据',newValue2,oldValue2)
})
```
``` js
let info = reactive({
    name: '哈哈',
    age: 18
})
// 侦听一个 getter 函数
watch(()=>info.name,(newValue,oldValue)=>{
    console.log("info.name的数据侦听"，newValue,oldValue)
})
// 当使用 getter 函数作为源时
// 回调只在此函数的返回值变化时才会触发
// 所有需要使用deep
watch(()=>info,(newValue,oldValue)=>{
    console.log("info的数据侦听"，newValue,oldValue)
},{
    deep:true
})
// 当直接侦听一个响应式对象时，侦听器会自动启用深层模式
watch(info,(newValue,oldValue)=>{
    console.log("info的数据侦听"，newValue,oldValue)
})
```
``` js
let count = ref(0)
let info = ref({
    name:"哈哈",
    age: 19
})
// 侦听一个ref
watch(count,(newValue,oldValue)=>{
    console.log("count的数据侦听"，newValue,oldValue)
})
watch(()=>info.value.name,(newValue,oldValue)=>{
    console.log("info.name的数据侦听"，newValue,oldValue)
})
```
### watchEffect()
watchEffect方法传入的函数会被立即执行一次，并在执行的过程中会收集依赖，只有收集的依赖发生变化时，watchEffect传入的函数才会再次执行  
``` js
export default{
    setup(){
        const counter = ref(0)
        const name = ref('why')
        watchEffect(()=>{
            console.log("watchEffect执行")
            console.log(counter.value,name.value)
            // counter.value或name.value发生变化的时候，该函数会再次执行
        })
    }
}
```
如果希望停止侦听，可获得watchEffect的返回值函数，调用该函数停止侦听
``` js
export default{
    setup(){
        const counter = ref(0)
        const stopWatch = watchEffect(()=>{
            if(counter.value >= 10){
                stopWatch()
            }
        })
    }
}
```
## setup中的Provide/Inject函数
提供一个值，可以被后代组件注入  
provide( )接受两个参数：  
第一个参数：属性key值，属性名称  
第二个参数：注入的值  
``` vue
<template>
    <div>
        <show-info></show-info>
    </div>
</template>
<script>
import { ref,provide } from "vue"
import showInfo from "../view/showInfo.vue"
export default {
    name: 'test',
    components: { showInfo },
    setup(){
        const name = ref("哈哈")
        const age = ref(18)
        provide("name",name)
        provide("age",age)
        return {
            name,age
        }
    }
}
</script>
```
``` vue
<template>
    <div>
        name:{{name}}
    </div>
</template>
<script>
import { inject } from "vue"
export default {
    name: 'showInfo',
    inject:["age"],
    // Inject OptionAPT注入的需要解包使用
    setup(){
        const name = inject("name")
        return{
            name
        }
    }
    
}
</script>
```
## setup中获取元素或组件
需要定义一个ref对象，绑定到元素或者组件的ref属性上即可
``` vue
<template>
    <div>
        <h2 ref="titleRef">HelloWorld</h2>
        <show-info ref="showInfoRef"></show-info>
    </div>
</template>
<script>
import { ref,onMounted } from "vue"
import showInfo from "../view/showInfo.vue"
export default {
    name: 'test',
    components: { showInfo },
    setup(){
        const titleRef = ref()
        const showInfoRef = ref()
        console.log(titleRef.value) // undefined
        // 因为当前组件DOM未挂载
        onMounted(()=>{ // mounted的生命周期函数
            console.log(titleRef.value)
            console.log(showInfoRef.value)
            showInfoRef.value.btnClick()
            // 触发showInfo组件中btnClick方法
        })
        return {
            showInfoRef,titleRef
        }
    }
}
</script>
```