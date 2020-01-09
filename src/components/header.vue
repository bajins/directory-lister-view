<template>
    <Header class="header">
        <div class="big-nav">
            <a class="navbar-brand" href="../..">
                <!-- https://cli.vuejs.org/zh/guide/html-and-static-assets.html#public-%E6%96%87%E4%BB%B6%E5%A4%B9 -->
                <img :src="`${publicPath}logo.png`" class="header-logo"/>
                <span>{{$themeConfig.title}}</span>
            </a>
            <div class="navbar-toggler" v-on:click="clickNavbarToggler">
                <Icon type="md-menu" :size="50" color="white"/>
            </div>
            <div :class="'navbar-collapse '+show">
                <Menu :mode="headerMenuMode" theme="dark" width="100%">
                    <a href="../..">
                        <MenuItem name="1" class="menu-item">
                            <Icon type="md-home"/>
                            网站首页
                        </MenuItem>
                    </a>
                    <!--listTree-->
                    <router-link to="/indexing">
                        <MenuItem name="2" class="menu-item">
                            <Icon type="md-list"/>
                            文件索引
                        </MenuItem>
                    </router-link>
                    <router-link to="/admin">
                        <MenuItem name="3" class="menu-item">
                            <Icon type="ios-construct"/>
                            文件管理
                        </MenuItem>
                    </router-link>
                </Menu>
            </div>
        </div>
    </Header>
</template>

<script>
    export default {
        name: "header-component",
        data() {
            return {
                publicPath: process.env.BASE_URL,
                headerMenuMode: "horizontal",
                show: ""
            }
        },
        mounted() {
            const that = this;
            that.getScreenWidth();
            window.onresize = () => {
                return (() => {
                    that.getScreenWidth();
                })();
            }
        },
        methods: {
            /**
             * 获取宽度
             */
            getScreenWidth() {
                if (window.innerWidth <= 768) {
                    this.headerMenuMode = "vertical";
                } else {
                    this.headerMenuMode = "horizontal";
                }
                return window.innerWidth;
            },
            clickNavbarToggler() {
                if (this.show == "show") {
                    this.show = "";
                } else {
                    this.show = "show";
                }
            }
        }
    }
</script>

<style scoped>
    .header {
        width: 100%;
        min-width: 320px;
        position: sticky;
        top: 0;
        z-index: 3;
    }

    .big-nav {
        width: 100%;
        max-width: 1140px;
        margin: 0 auto;
        display: flex;
    }

    .navbar-brand {
        display: flex;
        padding-top: .3125rem;
    }

    .navbar-brand span {
        line-height: 2;
        padding: 10px;
        font-size: 1.2rem;
        font-weight: 600;
        color: #2c3e50;
        position: relative;
        text-align: center;
    }

    .header-logo {
        height: 3.2rem;
        text-align: center;
        align-items: center;
        vertical-align: center;
    }

    .navbar-toggler {
        display: none;
        color: rgba(0, 0, 0, .5);
        background-color: transparent;
        line-height: 1;
    }

    .navbar-collapse {
        flex-basis: 100%;
        flex-grow: 1;
        align-items: center;
    }

    @media (max-width: 768px) {
        .header {
            height: auto;
            padding: .5rem 1rem;
        }

        .big-nav {
            width: 100%;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
        }

        .navbar-brand {
            padding-top: 0px;
        }

        .navbar-toggler {
            display: inline-block;
            position: relative;
            top: 0;
            right: 0;
        }

        .navbar-collapse {
            margin-bottom: 10px;
        }

        .navbar-collapse:not(.show) {
            display: none;
        }

        .menu-item {
            padding: 0 !important;
            max-height: 40px !important;
            line-height: 3 !important;
        }
    }
</style>