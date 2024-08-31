# 组件化基础--混入Mixin
在开发中，组件和组件之间有时候会存在相同的代码逻辑，会希望对相同的代码逻辑进行抽取  
Vue2和Vue3中都支持的一种方式是使用Mixin完成  
Mixin提供了一种非常灵活的方式，来分发Vue组件中的可复用的功能  
一个Mixin对象可以包含任何组件选项  
当组件使用Mixin对象时，所有Mixin对象的选项将被混合进入该组件本身的选项中  
## 基本使用
``` js
// 以下为sayHello.js文件中代码
export default {
    created(){
        this.sayHello()
    },
    data(){
        return {
            message:'测试'
        }
    },
    methods:{
        sayHello(){
            console.log('Hello Mixin')
        }
    }
}
// 组件引入sayHello.js文件
import sayHelloMixin from './view/Mixin/sayHello.js'
export default {
    mixins:[sayHelloMixin],
    created(){
        // 会输出'Hello Mixin'
    },
    mounted(){
        console.log(this.message)  // 输出’测试‘
    },
}
```
## Mixin的合并规则  
如果Mixin对象中的选项和组件对象中的选项发生冲突，Vue会如何执行  
### 情况一:data返回对象中属性名冲突
data返回值对象默认情况下会进行合并，如果data返回对象中属性名冲突，会保留组件自身的数据  
例如，组件和mixin中的data对象中都存在了title数据变量，title将返回组件中定义的值  
### 情况二:都含有对象选项(methods,components,directives)
mixin和组件中都存在methods选项，且其中都定义了方法，它们会被合并，都会生效  
如果对象的key相同，比如：mixin和组件的methods选项中都含有handleBtnClick的这个方法  
那么组件中methods选项中的handleBtnClick会生效  
 
> Mixin 钩子的调用顺序与提供它们的选项顺序相同，且会在组件自身的钩子前被调用。
