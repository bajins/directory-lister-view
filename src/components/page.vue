<style scoped>
    .content {
        /* 填满屏幕 */
        flex: 1;
        width: 70%;
        margin: 0 auto;
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
        border: 1px solid #e6e6e6;
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
                        <a :href="'?dir='+item.path">{{item.name}}</a>
                    </Breadcrumb-item>
                </span>
            </Breadcrumb>
        </div>
        <div class="table">
            <Table :columns="columns" :data="files" :stripe="true">
                <template slot-scope="{ row }" slot="name">
                    <a v-if="row.isDir" :href=" `?dir=${row.link}`">{{ row.name }}</a>
                    <a v-else :href="row.link" download="">{{ row.name }}</a>
                </template>
            </Table>
        </div>
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
                        slot: 'name',
                        /*render: (h, params) => {
                            // https://www.jianshu.com/p/4c8028a198d6
                            return h('a', {
                                style: {
                                    "color": "#246bb7",
                                    "text-decoration": "none",
                                    "background-color": "transparent",
                                },
                                attrs: {
                                    href: params.row.isDir ? `?dir=${params.row.link}` : params.row.link,
                                },
                                // on: {
                                //     click: () => {
                                //         this.$router.push({ path:""});
                                //     }
                                // }
                            }, params.row.name);
                        }*/
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
            this.getApiData();
        },
        // 监控数据变化，随时更新DOM
        mounted() {
            // this.getApiData();
        },
        methods: {
            // 获取当前页数据
            getApiData() {
                let url = this.$route.fullPath;
                log.debug(url, this.$route.query.dir);
                let _this = this;
                if (url == "/" || this.$route.query.dir) {
                    // 并且响应成功以后会执行then方法中的回调函数
                    this.$axios.get(url).then(function (result) {
                        if (result.data.code != 200) {
                            _this.$Message.error({content: result.data.message, duration: 10});
                            return;
                        }
                        let data = result.data.data;
                        _this.files = data.file;
                        _this.menuItems = data.links;

                        // 创建一个数组用来存储符合权限的路由
                        let dataRouter = [];
                        // 循环遍历动态路由表的每一个路由
                        data.file.forEach((item) => {
                            let data = {};
                            if (item.isDir) {
                                data['path'] = item.link;
                                data['name'] = item.name;
                                // () => import("@/components/page.vue")
                                data['component'] = util.getViews("/components/page");
                                dataRouter.push(data);
                            }
                        });
                        if (dataRouter.length != 0) {
                            // http://auan.cn/front/1740.html
                            // https://blog.csdn.net/xp541130126/article/details/81513651
                            // https://blog.csdn.net/qq_39651981/article/details/86701676
                            // http://www.imooc.com/article/286102
                            // 动态添加路由信息
                            this.$router.addRoutes(dataRouter);
                        }
                    }.bind(this)).catch(function (err) {
                        _this.$Message.error({content: err.toString(), duration: 10});
                    });
                } else {
                    http.download(url).catch(function (err) {
                        if (err.response) {
                            // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                            log.debug(err.response.data);
                            log.debug(err.response.status);
                            log.debug(err.response.headers);
                        } else {
                            log.error(err)
                            _this.$Message.error({content: err.toString(), duration: 10});
                        }
                    })
                }
            }
        }
    }
</script>
