<template>
    <div>
        <div class="breadcrumb">
            <Breadcrumb>
                <Breadcrumb-item>
                    <a href="/">
                        <Icon type="ios-home-outline"/>
                        {{$themeConfig.title}}
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
                    <a v-if="row.isDir" :href="`?dir=${row.link}`">{{ row.name }}</a>
                    <a v-else :href="`download${row.link}`" v-on:click.prevent="downloadFile(`download${row.link}`)">
                        {{ row.name }}
                    </a>
                </template>
            </Table>
        </div>
    </div>
</template>

<script>
    import log from "../assets/log.js";
    import http from "../assets/http.js";

    export default {
        name: 'page',
        components: {},
        data() {
            return {
                columns: [
                    {
                        title: '文件',
                        key: 'name',
                        slot: 'name',
                        minWidth: 200,
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
                        minWidth: 100,
                    },
                    {
                        title: '最后修改时间',
                        key: 'modTime',
                        minWidth: 170,
                    }
                ],
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
            //const that = this;
            window.onresize = () => {
                return (() => {

                })();
            }
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
                    }.bind(this)).catch(function (err) {
                        _this.$Message.error({content: err.toString(), duration: 10});
                    });
                } else {
                    _this.downloadFile(url);
                }
            },
            downloadFile(url) {
                let _this = this;
                http.download(url).catch(function (err) {
                    _this.$Message.error({content: err.message, duration: 10});
                })
            }
        }
    }
</script>

<style scoped>
    .breadcrumb {
        tap-highlight-color: rgba(0, 0, 0, 0);
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

    .table a:hover {
        text-decoration: underline;
    }

</style>