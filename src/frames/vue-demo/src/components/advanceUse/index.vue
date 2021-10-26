<template>
    <div>
        <p>vue 高级特性</p>
        <hr>

        <!-- 自定义v-model -->
        <!-- <p>{{name}}</p>
        <customVmodel v-model="name"/>
        <br> -->

        <!-- 异步渲染组件 -->
        <!-- <nextTick /> -->

        <!-- 插槽 -->
        <!-- <slotDemo :url="website.url">
            {{website.title}}
        </slotDemo >
        <br> -->
        <!-- 作用域插槽：父组件可以获取到子组件的data -->
        <!-- <scopedSlotDemo :url="website.url">
            <template v-slot="slotProps">
                {{slotProps.slotData.title}}
            </template>
        </scopedSlotDemo> -->

        <!-- 动态组件 -->
        <!-- <component :is="nextTickName" /> -->

        <!-- 动态组件实现新闻页面渲染 -->
        <!-- <div v-for="(value, key) in newsData" :key="key">
            <component :is="value.type" />
        </div> -->

        <!-- 异步组件 -->
        <!-- <formDemo v-if="showFormDemo" />
        <button @click="showFormDemo = true"> show form demo </button> -->

        <!-- <keepAlive /> -->

        <mixinDemo />
    </div>
</template>

<script>
// import customVmodel from "./customVmodel";
// import slotDemo from './slotDemo';
// import scopedSlotDemo from './scopedSlotDemo';
// import nextTick from "./nextTick";
// import keepAlive from "./keepAlive";
import mixinDemo from './mixinDemo';
export default {
    components: {
        // customVmodel,
        // slotDemo,
        // scopedSlotDemo,
        // nextTick,
        // // 按需加载，不直接同步引入
        // formDemo: () => import("../BaseUse/formDemo"),
        // keepAlive
        mixinDemo
    },
    data() {
        return {
            showFormDemo: false,
            name: '罗怡',
            website: {
                url: 'http://imooc.com',
                title: 'imooc',
                subtitle: '程序员的梦工厂'
            },
            nextTickName: 'nextTick',
            newsData: {
                1: {
                    type: 'text'
                },
                2: {
                    type: 'image'
                },
                3: {
                    type: 'text'
                }
            }
        }
    }
}
</script>