<template>
    <div class="header" :class="{'alt': headerShow, 'reveal': !headerShow}">
        <h1>
            <router-link to="/">Syscoding.cn</router-link>
            by Sys
        </h1>
        <nav class="nav">
            <ul>
                <li>
                    <a href="/" class="item">Home</a>
                </li>
                <li>
                    <span class="item" @click="showCard">About me</span>
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
        methods: {
            showCard() {
                this.$emit('showCard');
            }
        }
    };
</script>

<style lang="less" src="./header.less"></style>