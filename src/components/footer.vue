<template>
    <Footer class="footer">{{$themeConfig.startYear}}-{{endYear}} &copy; {{$themeConfig.title}}</Footer>
</template>

<script>
    export default {
        name: "footer-component",
        data() {
            return {}
        },
        computed: {
            endYear() {
                return new Date().getFullYear()
            },
        },
        created() {
        },
        methods: {}
    }
</script>

<style scoped>
    .footer {
        width: 100%;
        min-width: 320px;
        text-align: center;
        border-top: 1px solid #d7dde4;
        margin-top: 20px;
    }
</style>