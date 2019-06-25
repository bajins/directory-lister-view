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
            <Breadcrumb style="margin-left: 20%">
                <Breadcrumb-item v-if="menuItems.length<=0" style="color: blanchedalmond;font-size: 150%">
                    BajinsSoft
                </Breadcrumb-item>
                <Breadcrumb-item v-for="(item,index) in menuItems" :key="index">
                    <a :href="'home/getdirectory?low=1&high=10&path='+item.path"
                       style="color: blanchedalmond;font-size: 120%" v-if="item.path!=''">{{item.name}}</a>
                    <span style="color: blanchedalmond;font-size: 120%" v-if="item.path==''">{{item.name}}</span>
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
            <div style="margin: 1%;overflow: hidden">
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
            clickRow(res) {
                let _this = this;
                // 如果是文件夹
                if (res.isDir) {
                    this.getApiData(1, this.pageSize, res.path);
                    let m = res.path.substring(0, res.path.lastIndexOf("/"));
                    if (util.isEmpty(m)) {
                        _this.menuItems.push({"path": "/", "name": "BajinsSoft"});
                    }
                    let mArray = [];
                    _this.menuItems.forEach(k => {
                        if (k["path"] == "") {
                            mArray.push({"path": m, "name": k["name"]});
                        } else {
                            mArray.push(k);
                        }
                    });
                    let map = {};
                    map["path"] = "";
                    map["name"] = res.name;
                    mArray.push(map);

                    _this.menuItems = [];
                    _this.menuItems = _this.menuItems.concat(mArray);

                    logger.debug("==========", JSON.stringify(_this.menuItems))
                } else {
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
    }

</script>
