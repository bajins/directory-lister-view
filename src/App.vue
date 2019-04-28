<style scoped>
    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
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

    .layout-nav {
        width: 420px;
        margin: 0 auto;
        margin-right: 20px;
    }

    .layout-footer-center {
        text-align: center;
    }
</style>
<template>
    <div class="layout" id="app">
        <Layout>
            <Header>
                    <div class="layout-logo"></div>
                    <!--<div class="layout-nav">

                    </div>-->
                <Breadcrumb :style="{margin: '20px 20%'}">
                    <BreadcrumbItem>Home</BreadcrumbItem>
                    <BreadcrumbItem>Components</BreadcrumbItem>
                    <BreadcrumbItem>Layout</BreadcrumbItem>
                </Breadcrumb>
            </Header>
            <Row>
                <i-col span="12" style="background-color: aqua">i-col-12</i-col>
                <i-col span="6" style="background-color: darkorchid">i-col-12</i-col>
                <i-col span="6" style="background-color: greenyellow">i-col-12</i-col>
            </Row>
            <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
        </Layout>
    </div>
</template>
<script>
    // import login from './views/login' // 引入login.vue组件
    export default {
        name: 'app',
        components: {
            // login
        }
    }
</script>
