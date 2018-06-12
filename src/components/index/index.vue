<template>
    <div class="box" ref="box">
        <v-header :headerShow="headerShow"></v-header>
        <banner v-on:learnMore="handleLearnMore"></banner>
        <div class="container">
            <div class="intro-card">
                <div class="major">
                    <h2>打怪升级中的初级前端工程师</h2>
                    <p>此处有待填充一条装B却又不失低调的Slogan...</p>
                </div>
                <span class="image">
                    <img src="../../static/images/homepage-banner-may-18.jpg" alt/>
                </span>
            </div>
            <div class="card-wrap" ref="cardwrap">
                <div class="card" v-for="data in datas" :key="data.id">
                    <div class="icon-wrap">
                        <img src="../../static/images/article/react.svg" alt/>
                    </div>
                    <div class="content">
                        <router-link :to="'/article/'+data.number" class="title">{{data.title}}</router-link>
                        <p>{{data.body}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="backShow" class="back-top" @click="backTop">
            <div class="back-top-content">
                <img class="back-icon" src="../../static/images/backtop.png" alt/>
            </div>
        </div>
    </div>
</template>

<script>
    import header from "../../components/header/header";
    import banner from "../../components/banner/banner";

    export default {
        data() {
            return {
                datas: [],
                backShow: false,
                headerShow: true,
                headerHeight: 50  // header高度
            };
        },
        created(){
            //const url = 'https://api.github.com/repos/sysdog797/syscoding/issues';
            const url = 'mock-data.json';
            this.$http.get(url).then((response) => {
                response = response.body;
                this.datas = response;
                console.log(response);
            });
            this.$nextTick(() => {
                window.addEventListener("scroll", this.handleScroll);
            })
        },
        methods: {
            handleScroll() {
                let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                let vh = document.body.offsetHeight;
                if(scrollTop > this.headerHeight){
                    this.headerShow = false;    
                }else{
                    this.headerShow = true;
                }
                if(scrollTop > document.body.clientHeight){
                    this.backShow = true;
                }else{
                    this.backShow = false;
                }
            },
            handleLearnMore() {
                window.scrollTo({
                    behavior: 'smooth',
                    top: this.$refs.cardwrap.offsetTop - 60 // consider banner
                });
            },
            backTop() {
                window.scrollTo({
                    behavior: 'smooth',
                    top: 0
                });
            }
        },
        components: {
            "v-header": header,
            banner
        }
    };
</script>

<style lang="less" src="./index.less"></style>
