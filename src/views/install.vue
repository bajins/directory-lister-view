<template>
    <div>
        <!-- https://iviewui.com/components/tree -->
        <Tree :data="data"></Tree>
    </div>
</template>

<script>
    export default {
        name: "install",
        data() {
            return {
                data: []
            }
        },
    }
</script>

<style scoped>

</style>