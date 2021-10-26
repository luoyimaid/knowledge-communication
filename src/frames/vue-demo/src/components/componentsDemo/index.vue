<template>
    <div>
        <!-- <Input @add="addHandler" /> -->
        <List :list="list" @delete="deleteHandler"  />
    </div>
</template>

<script>
import Input from './input';
import List from './list';
export default {
    components: {
        Input,
        List
    },
    data() {
        return {
            list: [
                {id: 'id-1', title: '标题1'},
                {id: 'id-2', title: '标题2'},
                {id: 'id-3', title: '标题3'}
            ]
        }
    },
    methods: {
        addHandler(title) {
            this.list.push({
                id: `id-${Date.now()}`,
                title
            });
        },
        deleteHandler(id) {
            this.list = this.list.filter(item => item.id !== id);
        }
    },
    created() {
        console.log('index created');
    },
    mounted() {
        console.log('index mounted');
    },
    beforeUpdate() {
        console.log('index beforeUpdate');
    },
    updated() {
        console.log('index updated');
    },
    beforeDistroy() {
        // event.$off('onAddTitle', this.addTitleHandler);
        console.log('index beforeDistroy');
    },
    distroyed() {
        console.log('index distroyed');
    }
}
</script>