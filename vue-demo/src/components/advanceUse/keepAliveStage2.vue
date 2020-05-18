<template>
    <p>state B</p>
</template>

<script>
export default {
    mounted() {
        console.log('B mounted');
    },
    destroyed() {
        console.log('B distroyed');
    }
}
</script>