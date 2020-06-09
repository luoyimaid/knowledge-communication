<template>
    <div>
        <p>{{name}} {{mejor}} {{city}}</p>
        <button @click="showName">显示姓名</button>
    </div>
</template>

<script>
import myMixin from './mixin';
export default {
    mixins: [myMixin],
    data() {
        return {
            name: '罗怡',
            mejor: 'web 前端'
        }
    },
    mounted() {
        console.log('mixin demo mounted', this.name)
    }
}
</script>