<template>
    <div class="about-me" @click="cardClick">
        <div class="header-mask"></div>
        <div class="header-wrap">
            <img src="../../static/images/header/nick.jpg" alt/>
        </div>
        <!-- <p class="slogan">Syscoding</p> -->
        <img :src="slogan" alt="slogan" class="slogan"/>
        <h2>关于我</h2>
        <p>坐标成都，初入职场的初级前端工程师。</p>
        <p>热爱Coding，爱好各类运动，热衷篮球。</p>
        <h2>联系我</h2>
        <p>Github:<a href="https://github.com/sysdog797" target="_blank" class="contact github">&nbsp;&nbsp;sysdog797</a></p>
        <p>微博:<a href="https://weibo.com/u/2964708627?topnav=1&wvr=6&topsug=1" target="_blank" class="contact weibo">&nbsp;&nbsp;学渣型工科男</a></p>
    </div>
</template>

<script>
    import slogan from '../banner/151515.png';

    export default {
        data() {
            return {
                slogan: slogan
            };
        },
        methods: {
            cardClick(e) {
                e.stopPropagation();
                return;
            }
        }
    };
</script>

<style lang="less" src="./card.less"></style>