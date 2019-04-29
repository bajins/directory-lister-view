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
    <div class="layout">
        <Layout>
            <Header>
                <div class="layout-logo" v-on:click="getApiData">
                    <button></button>
                </div>
                <!--<div class="layout-nav">

                </div>-->
                <Breadcrumb :style="{margin: '20px 20%'}">
                    <BreadcrumbItem>Home</BreadcrumbItem>
                    <BreadcrumbItem>Components</BreadcrumbItem>
                    <BreadcrumbItem>Layout</BreadcrumbItem>
                </Breadcrumb>
            </Header>
            <div id="app" style="max-width: 65%;margin: 0 auto">
<!--                <Row v-for="(item,index) in list" :key="index">-->
<!--                    <i-col span="12" style="background-color: aqua">{{item.name}}}</i-col>-->
<!--                    <i-col span="6" style="background-color: darkorchid">{{item.size}}}</i-col>-->
<!--                    <i-col span="6" style="background-color: greenyellow">{{item.modtime}}}</i-col>-->
<!--                </Row>-->
                <Table :columns="columns" :data="list" size="large"></Table>
            </div>
            <Footer class="layout-footer-center" style="border-top: 1px solid #d7dde4;margin-top: 50px">2011-2019 &copy; TalkingData</Footer>
        </Layout>
    </div>
</template>
<script>
    import logger from "./assets/logger.js";
    import http from "./assets/http.js";

    export default {
        name: 'app',
        components: {
            // login
        },
        data() {
            return {
                columns: [
                    {
                        title: '文件',
                        key: 'name'
                    },
                    {
                        title: '大小',
                        key: 'size'
                    },
                    {
                        title: '最后修改时间',
                        key: 'modtime'
                    }
                ],
                // 数据 （MVVM中的Model）
                list: []

            }
        },
        methods: {
            getApiData: function () {
                //设置请求路径
                let url = "home/getdirectory";
                // 发送请求:将数据返回到一个回到函数中
                let _this = this;
                // 并且响应成功以后会执行then方法中的回调函数
                http.get(url).then(function (result) {
                    // result是所有的返回回来的数据
                    // 包括了响应报文行
                    // 响应报文头
                    // 响应报文体
                    let res = result.data;
                    logger.info(res.file)
                    _this.list = res.file;
                }).catch(function () {
                    logger.error("出错了");
                });
            },

            postApiData: function () {
                let url = "api/addproduct";
                // post有两个参数
                //参数1:请求的路径
                //参数2:提交的参数
                //提交参数的两种形态:
                //          1.可以直接传入字符串 name=张三&age=19
                //          2.可以以对象的形式传入{name:"三",age:19}
                this.$http.post(url, {name: "拖油瓶前来报道3 "}).then(function (res) {
                    var resData = res.data;
                    if (resData.status == "0") { //0表示成功，1表示失败
                        alert(resData.message);
                    } else {
                        alert(resData.message);
                    }
                }).catch(function () {
                    alert("出错了");
                });
            }
        }
    }

</script>
