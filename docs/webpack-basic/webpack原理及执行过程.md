> webpack基础配置：https://juejin.im/post/6844903887795650573

> webpack高级配置：https://juejin.im/post/6844903893827059725

> webpack原理：
>> **https://imweb.io/topic/5baca58079ddc80f36592f1a**
>> https://juejin.im/post/6844903957769224206

**- 插播require导入模块机制**

node模块分为核心模块(node提供) & 文件模块(用户编写)
1. 分析文件路径
2. 定位文件位置
3. 编译执行文件

#### 1. 区分环境配置打包文件
    项目开发时一般需要使用两套配置文件、用于开发阶段打包(不压缩代码、不优化代码增加效率)和上线阶段打包(压缩代码、优化代码，打包后直接上线使用)

- 抽取三个配置文件
1. webpack.base.js
2. webpack.prod.js
3. webpack.dev.js

- 实现步骤

1. 将开发环境和生产环境公用的配置放入base中，不同的配置内容放置到各自的prod或者dev文件中，如mode
2. 在dev和prod中使用 webpack-merge 把自己的配置和base的配置进行合并后导出
3. 将package.json中的脚本参数进行修改，通过 —config 手动指定特定的配置文件

#### 2. webpack运行机制
**初始化配置参数 -> 绑定事件钩子回调 -> 确定Entry逐一遍历 -> 使用loader编译文件 -> 输出文件**
##### 2.1 webpack事件流

Webpack 就像一条生产线，要经过一系列处理流程后才能将源文件转换成输出结果。 

这条生产线上的每个处理流程的职责都是单一的，多个流程之间有存在依赖关系，只有完成当前处理后才能交给下一个流程去处理。 

插件就像是一个插入到生产线中的一个功能，在特定的时机对生产线上的资源做处理。

Webpack 通过 Tapable 来组织这条复杂的生产线。

Webpack 在运行过程中会广播事件，插件只需要监听它所关心的事件，就能加入到这条生产线中，去改变生产线的运作。 

Webpack 的事件流机制保证了插件的有序性，使得整个系统扩展性很好。

**tapable原理就是发布订阅模式：https://juejin.im/post/6844903588112629767**

##### 2.2 webpack运行流程详解
- 首先，webpack会读取你在命令行传入的配置以及项目里的 webpack.config.js 文件，初始化本次构建的配置参数，并且执行配置文件中的插件实例化语句，生成Compiler传入plugin的apply方法，为webpack事件流挂上自定义钩子。
- 接下来到了entryOption阶段，webpack开始读取配置的Entries，递归遍历所有的入口文件
- Webpack进入其中一个入口文件，开始compilation过程。先使用用户配置好的loader对文件内容进行编译（buildModule），我们可以从传入事件回调的compilation上拿到module的resource（资源路径）、loaders（经过的loaders）等信息；之后，再将编译好的文件内容使用acorn解析生成AST静态语法树（normalModuleLoader），分析文件的依赖关系逐个拉取依赖模块并重复上述过程，最后将所有模块中的require语法替换成__webpack_require__来模拟模块化操作。
- emit阶段，所有文件的编译及转化都已经完成，包含了最终输出的资源，我们可以在传入事件回调的compilation.assets 上拿到所需数据，其中包括即将输出的资源、代码块Chunk等等信息

![image](http://note.youdao.com/yws/res/5236/82E37B042C2848FC81F834174663025A)
**转换成AST的目的就是将我们书写的字符串文件转换成计算机更容易识别的数据结构**