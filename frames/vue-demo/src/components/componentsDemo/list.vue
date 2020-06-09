<template>
    <div>
        <ul>
            <li v-for="item in list" :key="item.id">
                {{item.title}}
                <button @click="deleteItem(item.id)">删除</button>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    // props: ['list'],
    props: {
        list: {
            type: Array,
            default: []
        }
    },
    data() {
        return {

        }
    },
    methods: {
        deleteItem(id) {
            this.$emit('delete', id);
        },
        addTitleHandler(title) {
            console.log('on add title', title);
        }
    },
    created() {
        console.log('list created');
    },
    mounted() {
        // 自定义事件
        // 这么写是便于解绑
        // event.$on('onAddTitle', this.addTitleHandler);

        console.log('list mounted');
    },
    beforeUpdate() {
        console.log('list beforeUpdate');
    },
    updated() {
        console.log('list updated');
    },
    beforeDistroy() {
        // event.$off('onAddTitle', this.addTitleHandler);
        console.log('list beforeDistroy');
    },
    distroyed() {
        console.log('list distroyed');
    }
}
</script>