<template>
    <div>
        <input v-model="name">
        <input v-model="info.city">
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: '罗怡',
            info: {
                city: '北京'
            }
        }
    },
    watch: {
        name(oldVal, val) {
            // 值类型，可正常拿到old value
            console.log('watch name', oldVal, val);
        },
        info: {
            handler(oldVal, val) {
                // 监听引用类型，拿不到old value，因为指针是相同的,此时已经指向了新的value
                console.log('watch name', oldVal, val);
            },
            deep: true  // 深度监听
        }
    }
}
</script>