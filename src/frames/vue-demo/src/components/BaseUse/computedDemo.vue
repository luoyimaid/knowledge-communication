<template>
    <div>
        <p>num {{num}}</p>
        <p>double1 {{double1}}</p>
        <input v-model="double2" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            num: 20
        }
    },
    computed: {
        double1() {
            return this.num * 2;
        },
        double2: {
            // 双向数据绑定时，一定要有get和set两个方法
            get() {
                return this.num * 2;
            },
            set(val) {
                this.num = val/2;
            }
        }
    }
}
</script>