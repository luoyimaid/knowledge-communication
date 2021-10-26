<template>
    <a :href="url">
        <slot :slotData="website">
            {{website.subtitle}}
        </slot>
    </a>
</template>

<script>
export default {
    props: ['url'],
    data() {
        return {
            website: {
                url: 'http://www.baidu.com',
                title: 'search',
                subtitle: '搜索引擎'
            }
        }
    }
}
</script>