<template>
    <!-- 例如：可以用自定义v-model来实现颜色选择器 -->
    <!-- 
        1. input使用了 :value绑定动态属性，而不能用v-model
        2. 这里的change事件要和model.event对应起来 
        3. text属性对应
    -->
    <input
        type="text"
        :value="text"
        @input="$emit('change', $event.target.value)"
    >
</template>

<script>
export default {
    model: {
        prop: 'text',    // 与props里的text对应
        event: 'change'
    },
    props: {
        text: String,
        default() {
            return ''
        }
    }
}
</script>