<template>
    <!-- 路由出口 -->
    <router-view/>
</template>
<script>

    // https://cn.vuejs.org/v2/api/#%E5%AE%9E%E4%BE%8B%E5%B1%9E%E6%80%A7
    export default {
        name: 'app'
    }

</script>
<style>
    * {
        margin: 0;
        padding: 0;
    }

    html, body {
        height: 100%;
    }
</style>