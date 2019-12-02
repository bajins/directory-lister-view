<style scoped>
    .content {
        width: 70vw;
        height: 100vh;
        margin: 0 auto;
        flex: 1;
    }

    .breadcrumb {
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        font-family: "Microsoft YaHei", "微软雅黑", "黑体", "宋体", sans-serif;
        font-size: 14px;
        line-height: 1.42857143;
        color: #24292e;
        margin: 10px 0px 20px 0px;
        box-sizing: border-box;
        padding: 8px 15px;
        list-style: none;
        background-color: #f5f5f5;
        border-radius: 4px;
    }

    .table {
        border-width: 1px;
        border-style: solid;
        border-color: #e6e6e6;
    }
</style>

<template id="pageTemplate">
    <div class="content">
        <div class="breadcrumb">
            <Breadcrumb>
                <Breadcrumb-item>
                    <a href="/">
                        <Icon type="ios-home-outline"></Icon>
                        {{title}}
                    </a>
                </Breadcrumb-item>
                <span v-for="(item,index) in menuItems" :key="index">
                    <Breadcrumb-item v-if="index!=0 && index==menuItems.length-1">
                        <span>{{item.name}}</span>
                    </Breadcrumb-item>
                    <Breadcrumb-item v-else-if="index!=0">
                        <a :href="item.path">{{item.name}}</a>
                    </Breadcrumb-item>
                </span>
            </Breadcrumb>
        </div>
        <!--                <Row v-for="(item,index) in list" :key="index">-->
        <!--                    <i-col span="12" style="background-color: aqua">{{item.name}}}</i-col>-->
        <!--                    <i-col span="6" style="background-color: darkorchid">{{item.size}}}</i-col>-->
        <!--                    <i-col span="6" style="background-color: greenyellow">{{item.modtime}}}</i-col>-->
        <!--                </Row>-->
        <Table :row-class-name="rowClassName" :columns="columns" :data="files" size="large" class="table"></Table>
        <!--        <div style="margin: 1%;overflow: hidden" v-if="list.length>0">-->
        <!--            <div style="float: right;">-->
        <!--                <Page :total="total" :page-size="pageSize" @on-page-size-change="changePageSize"-->
        <!--                      @on-change="changePage" show-elevator show-sizer></Page>-->
        <!--            </div>-->
        <!--        </div>-->
    </div>
</template>

<script>
    // import Vue from "vue";
    import log from "../assets/log.js";
    import http from "../assets/http.js";
    import util from "../assets/util.js";

    // Vue.component("pageComponent", {
    //     template: "#pageTemplate"
    // });


    export default {
        name: 'home',
        components: {},
        data() {
            return {
                title: this.$config.title,
                columns: [
                    {
                        title: '文件',
                        key: 'name',
                        render: (h, params) => {
                            // https://www.jianshu.com/p/4c8028a198d6
                            return h('a', {
                                style: {
                                    "color": "#246bb7",
                                    "text-decoration": "none",
                                    "background-color": "transparent",
                                },
                                attrs: {
                                    href: params.row.path,
                                },
                                // on: {
                                //     click: () => {
                                //         console.log(params)
                                //     }
                                // }
                            }, params.row.name);
                        }
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
                files: [],
                menuItems: []
            }
        },
        created() {
            // this.getApiData();
        },
        // 监控数据变化，随时更新DOM
        mounted() {
            this.getApiData();
        },
        methods: {
            // 获取当前页数据
            getApiData() {
                console.log(this.$route.path)
                let _this = this;
                // 并且响应成功以后会执行then方法中的回调函数
                this.$axios.get(this.$route.path).then(function (result) {
                    let data = result.data.data;
                    _this.files = data.file;
                    _this.menuItems = data.links;

                    // 创建一个数组用来存储符合权限的路由
                    let dataRouter = [];
                    // 循环遍历动态路由表的每一个路由
                    data.file.forEach((item) => {
                        let data = {};
                        if (item.isDir) {
                            data['path'] = item.path;
                            data['name'] = item.name;
                            // () => import("@/components/page.vue")
                            data['component'] = util.getViews("/components/page");
                            dataRouter.push(data);
                        }
                    })

                    console.log(this.$route.query);
                    // http://auan.cn/front/1740.html
                    // https://blog.csdn.net/xp541130126/article/details/81513651
                    // https://blog.csdn.net/qq_39651981/article/details/86701676
                    // http://www.imooc.com/article/286102
                    // 动态添加路由信息
                    this.$router.addRoutes(dataRouter);
                }.bind(this)).catch(function (err) {
                    _this.$Message.error({content: err.toString(), duration: 10});
                });
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

                    log.debug("==========", JSON.stringify(_this.menuItems))
                } else {
                    // 是文件
                    http.download("home/downloadfile", {filePath: res.path}).catch(function (err) {
                        if (err.response) {
                            // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                            log.debug(err.response.data);
                            log.debug(err.response.status);
                            log.debug(err.response.headers);
                        } else {
                            log.debug(err)
                            _this.$Message.error("访问出错了" + err, 3);
                        }
                    })
                }
            }
        }
    }
</script>
