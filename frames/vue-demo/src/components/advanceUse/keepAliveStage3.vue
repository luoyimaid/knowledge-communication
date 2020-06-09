<template>
    <p>state C</p>
</template>

<script>
export default {
    mounted() {
        console.log('C mounted');
    },
    destroyed() {
        console.log('C distroyed');
    }
}
</script>