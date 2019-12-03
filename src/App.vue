<style scoped>
    .layout {
        min-height: 100%;
        background: #fff;
    }

    .layout-logo {
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }

    .header {
        width: 100%;
        position: sticky;
        top: 0;
        z-index: 3;
    }

    .footer {
        width: 100%;
        text-align: center;
        border-top: 1px solid #d7dde4;
        margin-top: 20px;
    }

</style>
<template>
    <Layout class="layout">
        <Header class="header">
            <!--            <div class="layout-logo"></div>-->

        </Header>
        <page-component></page-component>
        <!--        <router-link to="/home"></router-link>-->
        <!-- 路由出口 -->
        <router-view></router-view>
        <Footer class="footer">2011-2019 &copy; {{title}}</Footer>
    </Layout>
</template>
<script>

    import pageComponent from './components/page.vue'

    export default {
        name: 'app',
        components: {
            "page-component": pageComponent,
        },
        data() {
            return {
                title: this.$config.title,
            }
        },
        created() {
            // console.log(this.$route);
        },
        mounted() {
        },
        methods: {}
    }

</script>
