<style scoped>
    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        display: flex;
        flex-flow: column;
        min-height: 100vh;
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

    .content {
        max-width: 70%;
        margin: 0 auto;
        flex: 1;
    }

    .footer {
        text-align: center;
        border-top: 1px solid #d7dde4;
        margin-top: 50px;
        flex: 0;
    }

    .ivu-table .table-info-row td{
        /*cursor: pointer;*/
        background-color: #2db7f5;
        color:red;
    }
</style>
<template>
    <Layout class="layout">
        <Header>
            <!--            <div class="layout-logo"></div>-->
            <!--<div class="layout-nav">

            </div>-->
            <Breadcrumb :style="{margin: '20px 20%'}">
                <BreadcrumbItem>Home</BreadcrumbItem>
                <BreadcrumbItem>Components</BreadcrumbItem>
                <BreadcrumbItem>Layout</BreadcrumbItem>
            </Breadcrumb>
        </Header>
        <div id="app" class="content">
            <!--                <Row v-for="(item,index) in list" :key="index">-->
            <!--                    <i-col span="12" style="background-color: aqua">{{item.name}}}</i-col>-->
            <!--                    <i-col span="6" style="background-color: darkorchid">{{item.size}}}</i-col>-->
            <!--                    <i-col span="6" style="background-color: greenyellow">{{item.modtime}}}</i-col>-->
            <!--                </Row>-->
            <Table :row-class-name="rowClassName" :columns="columns" :data="list" size="large"
                   @on-row-click="clickRow"></Table>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page :total="total" :page-size="pageSize" @on-page-size-change="changePageSize"
                          @on-change="changePage" show-elevator show-sizer></Page>
                </div>
            </div>
        </div>
        <Footer class="footer">2011-2019 &copy; Bajins</Footer>
    </Layout>
</template>
<script>
    import logger from "./assets/logger.js";
    import http from "./assets/http.js";
    import util from "./assets/util.js";

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
                        key: 'size',
                        width: 150
                    },
                    {
                        title: '最后修改时间',
                        key: 'modtime',
                        width: 200
                    }
                ],
                // 每页显示多少条
                pageSize: 10,
                // 初始化信息总条数
                total: 0,
                // 数据 （MVVM中的Model）
                list: this.getApiData(1),
            }
        },
        methods: {
            getApiData(low, high) {
                if (util.isEmpty(high)) {
                    high = 10;
                }
                let list = [];
                // 发送请求:将数据返回到一个回到函数中
                let _this = this;
                // 并且响应成功以后会执行then方法中的回调函数
                http.get("home/getdirectory", {low: low, high: high}).then(function (result) {
                    // result是所有的返回回来的数据
                    // 包括了响应报文行
                    // 响应报文头
                    // 响应报文体
                    let res = result.data;
                    list = util.mergeArray(_this.list, res.file);
                    _this.total = res.total;
                    logger.debug(list.length);
                }).catch(function () {
                    logger.error("出错了");
                });
                return list;
            },
            rowClassName() {
                return 'table-info-row';
            },
            changePage(index) {
                // 这里直接更改了模拟的数据，真实使用场景应该从服务端获取数据
                this.list = this.getApiData(index, this.pageSize);
            },
            changePageSize(index) {
                this.pageSize = index;
            },
            clickRow(res, index) {
                logger.debug(res);
                logger.debug(index);
                http.get("home/downloadfile", {filePath: res.name}).then(function (result) {
                    logger.debug(result);
                }).catch(function () {
                    logger.error("出错了");
                });
            }
        }
    }

</script>
