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

    .ivu-table .table-info-row td {
        /*cursor: pointer;*/
        background-color: #2db7f5;
        color: red;
    }
</style>
<template>
    <Layout class="layout">
        <Header>
            <!--            <div class="layout-logo"></div>-->
            <Breadcrumb style="margin-left: 200px">
                <Breadcrumb-item style="color: blanchedalmond;font-size: 150%">BajinsSoft</Breadcrumb-item>
                <Breadcrumb-item v-for="(item,index) in menuItems" :key="index"
                                 style="color: blanchedalmond;font-size: 120%">{{item}}
                </Breadcrumb-item>
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
                        key: 'modTime',
                        width: 200
                    }
                ],
                // 每页显示多少条
                pageSize: 10,
                // 初始化信息总条数
                total: 0,
                // 数据 （MVVM中的Model）
                list: this.getApiData(1),
                path: "",
                menuItems: []
            }
        },
        methods: {
            // 获取当前页数据
            getApiData(low, high, path) {
                if (util.isEmpty(high)) {
                    high = 10;
                }
                let list = [];
                // 发送请求:将数据返回到一个回到函数中
                let _this = this;
                if (!util.isEmpty(path)) {
                    _this.list = [];
                    _this.total = 0;
                }
                // 并且响应成功以后会执行then方法中的回调函数
                http.get("home/getdirectory", {low: low, high: high, path: path}).then(function (result) {
                    // result是所有的返回回来的数据
                    // 包括了响应报文行
                    // 响应报文头
                    // 响应报文体
                    let res = result.data.data;
                    list = util.mergeArray(_this.list, res.file);
                    _this.total = res.total;
                    logger.debug("获取到" + list.length);
                }).catch(function (err) {
                    _this.$Message.error("访问出错了" + err, 3);
                });
                return list;
            },
            // 设置每行class
            rowClassName() {
                return 'table-info-row';
            },
            // 切换页码
            changePage(index) {
                this.list = this.getApiData(index, this.pageSize);
            },
            // 切换一页显示数据条数
            changePageSize(index) {
                this.pageSize = index;
                this.list = this.getApiData(1, this.pageSize);
            },
            // 点击当前行操作
            clickRow(res, index) {
                let _this = this;
                logger.debug("点击第" + index + "行");
                // 如果是文件夹
                if (res.isDir) {
                    this.getApiData(1, this.pageSize, res.path);
                    this.path = res.path;
                    logger.debug(res.path.split("/"))
                    res.path.split("/").forEach(v => {
                        let map = {};
                        if (util.isEmpty(v)) {
                            map["path"] = "/";
                            map["name"] = "BajinsSoft";
                        } else {
                            let m = res.path.substring(res.path.indexOf(v));
                            map["path"] = m;
                            map["name"] = v;
                        }
                        _this.menuItems.forEach(k => {
                            if (k["path"] != map["path"]) {
                                _this.menuItems.push(map);
                            }
                        })
                    });
                    logger.debug(_this.menuItems)
                    return;
                }
                // 是文件
                http.download("home/downloadfile", {filePath: res.path}).catch(function (err) {
                    if (err.response) {
                        // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                        logger.debug(err.response.data);
                        logger.debug(err.response.status);
                        logger.debug(err.response.headers);
                    } else {
                        logger.debug(err)
                        _this.$Message.error("访问出错了" + err, 3);
                    }
                })
            }
        }
    }

</script>
