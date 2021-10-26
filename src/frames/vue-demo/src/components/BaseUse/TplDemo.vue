<template>
    <div>
        <p>文本插值{{message}}</p>
        <p>JS表达式 {{flag ? 'yes' : 'no'}} 这里只能是表达式，不能是JS语句</p>

        <p :id="dynamicId">动态属性ID</p>

        <hr />

        <p v-html="rawHtml">
            <span> 这里会有XSS风险 </span>
            <span>【注意】使用v-html之后，会覆盖子元素 </span>
        </p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            message: 'hello vue',
            flag: true,
            rawHtml: '指令，原始html <b>加粗</b> <i>斜体</i>',
            dynamicId: `id-${Date.now()}`
        }
    }
}
</script>