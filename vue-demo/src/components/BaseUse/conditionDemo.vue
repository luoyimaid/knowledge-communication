<template>
    <div>
        <p v-if="type === 'a'">a</p>
        <p v-else-if="type === 'b'">b</p>
        <p v-else>other</p>

        <p v-show="type === 'a'">A by v-show</p>
        <p v-show="type === 'b'">B by v-show</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            type: 'a'
        }
    }
}
</script>