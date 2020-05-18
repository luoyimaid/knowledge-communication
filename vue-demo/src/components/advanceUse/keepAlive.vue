<template>
    <div>
        <button @click="changeState('A')">A</button>
        <button @click="changeState('B')">B</button>
        <button @click="changeState('C')">C</button>

        <keep-alive>
            <keepAliveStage1 v-if="state === 'A'" />
            <keepAliveStage2 v-if="state === 'B'" />
            <keepAliveStage3 v-if="state === 'C'" />
        </keep-alive>
    </div>
</template>

<script>
import keepAliveStage1 from './keepAliveStage1';
import keepAliveStage2 from './keepAliveStage2';
import keepAliveStage3 from './keepAliveStage3';

export default {
    components: {
        keepAliveStage1,
        keepAliveStage2,
        keepAliveStage3
    },
    data() {
        return {
            state: 'A'
        }
    },
    methods: {
        changeState(state) {
            this.state = state;
        }
    }
}
</script>