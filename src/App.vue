<style scoped>
    .layout {
        min-height: 100%;
        background: #fff;
    }

    .header {
        width: 100%;
        padding: 0;
        position: sticky;
        top: 0;
        z-index: 3;
    }

    .big-nav {
        width: 70%;
        margin: 0 auto;
        display: flex;
    }

    .navbar-brand {
        display: inline-block;
        line-height: 1;
        padding-top: .3125rem;
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
        padding: .25rem .75rem;
        font-size: 1.25rem;
        line-height: 1;
        background-color: transparent;
        border: 1px solid transparent;
        border-radius: .25rem;
    }

    .navbar-collapse {
        flex-basis: 100%;
        flex-grow: 1;
        align-items: center;
    }

    .footer {
        width: 100%;
        text-align: center;
        border-top: 1px solid #d7dde4;
        margin-top: 20px;
    }


    @media (max-width: 768px) {
        .header {
            height: auto;
        }

        .big-nav {
            width: 95%;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
        }

        .navbar-toggler {
            display: block;
            position: absolute;
            top: 0;
            right: 0;
        }

        .navbar-collapse:not(.show) {
            display: none;
        }
    }

</style>
<template>
    <Layout class="layout">
        <Header class="header">
            <div class="big-nav">
                <a class="navbar-brand" href="./">
                    <img src="https://www.bajins.com/images/icons/logo.png" class="header-logo"/>
                </a>
                <div class="navbar-toggler" v-on:click="clickNavbarToggler()">
                    <Icon type="md-menu" :size="50" color="white"/>
                </div>
                <div :class="'navbar-collapse '+show">
                    <Menu :mode="headerMenuMode" theme="dark" width="100%">
                        <MenuItem name="1">
                            <Icon type="ios-paper"/>
                            内容管理
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="ios-people"/>
                            用户管理
                        </MenuItem>
                        <MenuItem name="3">
                            <Icon type="ios-construct"/>
                            综合设置
                        </MenuItem>
                    </Menu>
                </div>
            </div>
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
                headerMenuMode: "horizontal",
                show: ""
            }
        },
        created() {
            // console.log(this.$route);
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
                const that = this;
                window.screenWidth = document.body.clientWidth;
                that.screenWidth = window.screenWidth;
                if (that.screenWidth <= 768) {
                    that.headerMenuMode = "vertical";
                } else {
                    that.headerMenuMode = "horizontal";
                }
                return that.screenWidth;
            },
            clickNavbarToggler() {
                this.show = "show";
            }
        }
    }

</script>
