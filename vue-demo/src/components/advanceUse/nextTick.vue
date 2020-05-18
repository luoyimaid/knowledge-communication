<template>
    <div id='app'>
        <ul ref="ul1">
            <li v-for="(item, index) in list" :key="index">
                {{item}}
            </li>
        </ul>
        <button @click="addItem">添加一项</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: ['a', 'b', 'c']
        }
    },
    methods: {
        addItem() {
            this.list.push(`${Date.now()}`);
            this.list.push(`${Date.now()}`);
            this.list.push(`${Date.now()}`);

            this.$nextTick(() => {
                const ulElement = this.$refs.ul1;
                // data改变的时候，DOM节点不会立刻去变
                console.log(ulElement.childNodes.length);
            });
        }
    }
}
</script>

<style scoped>
li {
    list-style: none;
}
</style>