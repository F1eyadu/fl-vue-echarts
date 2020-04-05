<template>
    <div>
        <Wrapper :disPlayInterVal="false" :leftWidth="leftWidth" leftOffset="20" rightOffset="30">
            <template v-slot:left>
                <left></left>
            </template>
            <template v-slot:right>
                <right></right>
                <right1></right1>
            </template>
        </Wrapper>
    </div>
</template>
<script>
import api from '@src/server/index'
import test from '@src/libs/test.ts'
import collor from '@src/libs/collor.ts'
import left from './left.vue'
import right from './right.vue'
import right1 from './right1.vue'
// import Index from '@src/libs/index.js'
export default {
    components: {
        left,
        right,
        right1
    },
    data() {
        return {
            lists: [],
            a: 0,
            leftWidth: '400px',
        }
    },
    inject: ['app'],
    computed: {
        getA() {
            return this.app.a
        }
    },
    watch: {
        getA: {
            handler(newVal) {
                console.log(newVal)
            },
            immediate: true
        }
    },
    methods: {
        async _getLists() {
            try {
                let res = await api.getData()
            }catch(err) {
                console.log(err)
            }
        }
    }
}
</script>
<style scoped>

</style>