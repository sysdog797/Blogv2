<template>
    <!-- <div class="header" :class="{'alt': headerShow, 'reveal': !headerShow}"> -->
    <div>
        <transition name="header-fade">
            <div class="header alt" v-show="headerShow">
                <h1>
                    <router-link to="/" class="logo">Syscoding.cn</router-link>
                    &nbsp;by &nbsp;Sys
                    <!-- <router-link to="/" class="logo">
                        <img :src="logo" alt="logo" class="syscoding-cn"/>
                    </router-link>
                    <span>&nbsp;by &nbsp;Sys</span> -->
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
        </transition>
        <transition name="header-static">
            <div class="header" v-show="!headerShow">
                <h1>
                    <router-link to="/" class="logo">Syscoding.cn</router-link>
                    &nbsp;by &nbsp;Sys
                    <!-- <router-link to="/" class="logo">
                        <img :src="logo" alt="logo" class="syscoding-cn"/>
                    </router-link>
                    <span>&nbsp;by &nbsp;Sys</span> -->
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
        </transition>
    </div>
    
</template>

<script>
    import logo from './sys.cn.png';

    export default {
        props:{
            headerShow: {
                type: Boolean
            }
        },
        data() {
            return {
                logo: logo
            };
        },
        mounted(){
            this.$emit('headerMounted');
        },
        methods: {
            showCard(e) {
                e.stopPropagation();
                this.$emit('showCard');
            }
        }
    };
</script>

<style lang="less" src="./header.less"></style>