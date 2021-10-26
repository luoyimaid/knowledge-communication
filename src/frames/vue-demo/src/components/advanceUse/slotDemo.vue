<template>
    <a :href="url">
        <slot>
            默认内容（父组件不设置内容时，显示这个内容）
        </slot>
    </a>
</template>

<script>
export default {
    props: ['url'],
    data() {
        return {
            
        }
    }
}
</script>