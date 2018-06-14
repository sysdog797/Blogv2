<template>
    <div class="header" :class="{'alt': headerShow, 'reveal': !headerShow}">
        <h1>
            <router-link to="../">Syscoding.cn</router-link>
            by Sys
        </h1>
        <nav class="nav">
            <ul>
                <li>
                    <router-link to="#">Home</router-link>
                </li>
                <li>
                    <router-link to="#">About me</router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
    export default {
        props:{
            headerShow: {
                type: Boolean
            }
        },
        data() {
            return {
            };
        },
    };
</script>

<style lang="less" src="./header.less"></style>