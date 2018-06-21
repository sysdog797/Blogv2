<template>
    <div class="box" ref="box" @click="bodyClick">
        <v-header :headerShow="headerShow" v-on:showCard="handleShowCard"></v-header>
        <banner v-on:learnMore="handleLearnMore"></banner>
        <div class="container">
            <div class="intro-card">
                <div class="major">
                    <h2>打怪升级中的初级前端工程师</h2>
                    <p>Slogan写在这里，并没有想好写什么，有待填充</p>
                </div>
                <span class="image">
                    <img src="../../static/images/bg-laptop.jpg" alt/>
                    <div class="mask"></div>
                </span>
            </div>
            <div class="card-wrap" ref="cardwrap">
                <transition-group name="card-fade">
                    <div class="card-box" v-for="data in datas" :key="data.id">
                        <div class="card">
                            <div class="label">
                                <span>Sys</span>
                                / {{data.created_at}}
                            </div>
                            <router-link :to="'/article/' + data.number" class="title" v-bind:class="{'long-title':data.title.length > 30}">{{data.title}}</router-link>
                            <p v-html="data.body" class="content-box"></p>
                            <div class="icon-box">
                                <div v-for="(label, index) in data.labels" class="icon-wrap" :key="index">
                                    <img :src="'../../static/images/article/'+ label.name +'.png'" alt/>
                                </div>
                            </div>
                            <router-link :to="'/article/'+data.number" class="readmore">阅读全文...</router-link>
                        </div>
                    </div>
                </transition-group>
                <loading v-show="loading"></loading>
            </div>
            <transition name="aboutme-fade">
                <card v-show="cardShow"></card>
            </transition>
            <transition name="mask-fade">
                <div class="card-mask" v-show="cardShow"></div>
            </transition>
        </div>
        <backtop></backtop>
    </div>
</template>

<script>
    import header from "../../components/header/header";
    import banner from "../../components/banner/banner";
    import backtop from "../../components/backtop/backtop";
    import loading from "../../components/loading/loading";
    import card from "../../components/card/card";
    import dayjs from 'dayjs';
    import Remarkable from 'remarkable';

    export default {
        data() {
            return {
                datas: [],
                backShow: false,
                headerShow: false,
                headerHeight: 60,  // header高度
                h: 430,
                page: 1,
                loading: false,
                count: 0,
                canLoad: true,
                cardShow: false
            };
        },
        created(){
            const url = 'http://localhost:8088/api/getList/' + this.page;
            this.$http.get(url).then((response) => {
                let rs = response.body;
                for(let i = 0; i < rs.length; i++){
                    rs[i].created_at = dayjs(rs[i].created_at).format("MMMM DD, YYYY");
                    let md = new Remarkable();
                    let body = md.render(rs[i].body);
                    rs[i].body = body;
                }
                this.count = rs[0].number; // article.number == count
                this.datas = rs;
            }, err => {
                // err callback
                console.log(err);
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
                    this.headerShow = true;    
                }else{
                    this.headerShow = false;
                }
                if(scrollTop > document.body.clientHeight){
                    this.backShow = true;
                }else{
                    this.backShow = false;
                }
                if(scrollTop - vh > this.h){
                    this.loadMoreData();
                }
            },
            handleLearnMore() {
                setTimeout(() => {
                    window.scrollTo({
                        behavior: 'smooth',
                        top: this.$refs.cardwrap.offsetTop -422 // consider banner
                    });
                }, 300);
            },
            handleShowCard() {
                console.log('show card...');
                this.cardShow = true;
                document.body.classList.add('abandon-scroll');
            },
            bodyClick() {
                this.cardShow = false;
                document.body.classList.remove('abandon-scroll');
            },
            loadMoreData() {
                if(!this.canLoad) return;
                this.loading = true;
                this.canLoad = false;
                this.page++;
                const url = 'http://localhost:8088/api/getList/' + this.page;
                this.$http.get(url).then((response) => {
                    let rs = response.body;
                    for(let i = 0; i < rs.length; i++){
                        rs[i].created_at = dayjs(rs[i].created_at).format("MMMM DD, YYYY");
                        let md = new Remarkable();
                        let body = md.render(rs[i].body);
                        rs[i].body = body;
                    }
                    setTimeout(() => {
                        this.datas = this.datas.concat(rs);
                        this.loading = false;
                    }, 1000)
                }, err => {
                    // err callback
                    console.log(err);
                });
                this.h += 589;  // 阈值增加后才能监听
                if(this.page * 4 < this.count){
                    this.$nextTick(() => {
                        this.canLoad = true;
                    })
                }else{
                    this.canLoad = false;
                }
            }
        },
        components: {
            "v-header": header,
            banner,
            backtop,
            loading,
            card
        }
    };
</script>

<style lang="less" src="./index.less"></style>
