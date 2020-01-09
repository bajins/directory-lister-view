<template>
    <Layout class="layout">
        <header-component></header-component>
        <page-component></page-component>
        <footer-component></footer-component>
    </Layout>
</template>

<script>

    export default {
        name: "home",
        components: {
            "header-component": () => import('../components/header.vue'),
            "page-component": () => import('../components/page.vue'),
            "footer-component": () => import('../components/footer.vue'),
        },
    }
</script>

<style scoped>
    .layout {
        min-height: 100%;
        background: #fff;
    }
</style>