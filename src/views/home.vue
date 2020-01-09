<template>
    <Layout class="layout">
        <header-component></header-component>
        <router-view class="content"/>
        <footer-component></footer-component>
    </Layout>
</template>

<script>

    export default {
        name: "home",
        components: {
            "header-component": () => import('../components/header.vue'),
            "footer-component": () => import('../components/footer.vue'),
        },
    }
</script>

<style scoped>
    .layout {
        min-height: 100%;
        background: #fff;
    }

    .content {
        /* 填满屏幕 */
        flex: 1;
        width: 100%;
        max-width: 1140px;
        min-width: 320px;
        height: 100%;
        margin: 0 auto;
    }

    @media (max-width: 768px) {
        .content {
            width: 100%;
            padding: 15px;
            margin: 0 auto;
        }
    }
</style>