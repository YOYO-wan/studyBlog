# webpack的代码分包
默认的打包过程:  
在构建整个组件树的过程中，因为组件和组件之间是通过模块化直接依赖的，那么webpack在打包时就会将组件模块打包在一起(成一个app.js)  
随着项目的不断庞大，app.js文件的内容过大，会造成首屏的渲染速度变慢  
所以我们可以将不需要立即使用的组件，单独进行拆分成小的js文件，当有需要再从服务器下载运行  
## 使用import函数分包
```js
// 在main.js文件中
import {sun} from './utils/math.js'
sun(20,30)
```
这样导入js文件，会使webpack打包时将math.js文件和main.js文件打包在一起  
可以使用import函数异步导入
``` js
// 在main.js文件中
import('./utils/math.js').then((res)=>{ // 异步导入
res.sun(20,30)
})
```
import函数可以让webpack对导入文件进行分包处理  
## 组件代码分包处理
某些组件可以通过异步的方式来进行加载(目的：是可对其进行分包处理)  
vue中提供了一个函数defineAsyncComponent  
defineAsyncComponent接受两种类型的参数
### 类型一：工厂函数
该工厂函数需要返回一个Promise对象  
``` js
import { defineAsyncComponent } from 'vue'
const AsyncHome = defineAsyncComponent(()=>import('./AsyncHome.vue'))
export default {
    components:{
        home:AsyncHome
    }
}
```
### 类型二：接受一个对象类型
对异步函数进行配置  
``` js
import { defineAsyncComponent } from 'vue'
import Loading from './Loading.vue'
import Error from './Error.vue'
const AsyncHome = defineAsyncComponent({
    loader:()=>import('./AsyncHome.vue'),
    loadingComponent: Loading, // 加载过程中显示的组件
    errorComponent: Error,// 加载失败时显示的组件
    delay: 2000, // 延时(ms:毫秒)
})
```