<template>
    <div @click="handleClick">我是左边</div>
</template>
<script>
export default {
    methods: {
        handleClick() {
            this.$parent.resolveEmit(1231231)
        }
    }
}
</script>