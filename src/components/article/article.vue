<template>
    <div class="article" @click="bodyClick">
        <v-header :headerShow="headerShow" v-on:showCard="handleShowCard"></v-header>
        <transition name="article-fade">
            <div class="content-wrap" v-if="contentShow">
                <header>
                    <div class="icon-wrap">
                        <img :src="'../../static/images/article/'+ data.labels[0].name +'.png'" alt/>
                    </div>
                    <div class="border-2px"></div>
                    <h2>{{data.title}}</h2>
                </header>
                <div class="content-main">
                    <div class="content" v-html="data.body" v-highlight></div>
                </div>
            </div>
        </transition>
        <div class="loading" v-show="!contentShow">
            <loading></loading>
        </div>
        <backtop></backtop>
        <transition name="aboutme-fade">
            <card v-show="cardShow"></card>
        </transition>
        <transition name="mask-fade">
            <div class="card-mask" v-show="cardShow"></div>
        </transition>
    </div>
</template>

<script>
    import header from "../../components/header/header";
    import backtop from "../../components/backtop/backtop";
    import loading from "../../components/loading/loading";
    import card from "../../components/card/card";
    import Remarkable from 'remarkable';

    export default {
        data(){
            return{
                data: {},
                title: '',
                subtitle: '',
                backShow: false,
                contentShow: false,
                cardShow: false,
                headerShow: true
            }
        },
        created(){
            const url = "http://localhost:8088/api/getArticle/" + this.$route.params.id;
            this.$http.get(url).then((response) => {
                let rs = response.body;
                let md = new Remarkable();
                let body = md.render(rs.body);
                rs.body = body;
                this.data = rs;
                setTimeout(()=>{
                    this.contentShow = true;
                }, 1000);
            }, err => {
                // err callback
                console.log(err);
            });
            this.$nextTick(() => {
                window.addEventListener("scroll", this.handleScroll);
            })
        },
        mounted() {
            setTimeout(()=>{ 
                document.getElementById('app').style.opacity = 1;
                if(document.getElementById('app-loading')){
                    document.body.removeChild(document.getElementById('app-loading'));
                };
            }, 700);
        },
        methods: {
            handleScroll() {
                let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                let vh = document.body.offsetHeight;
                if(scrollTop > document.body.clientHeight){
                    this.backShow = true;
                }else{
                    this.backShow = false;
                }
            },
            backTop() {
                window.scrollTo({
                    behavior: 'smooth',
                    top: 0
                });
            },
            handleShowCard() {
                console.log('show card...');
                this.cardShow = true;
                document.body.classList.add('abandon-scroll');
            },
            bodyClick() {
                this.cardShow = false;
                document.body.classList.remove('abandon-scroll');
            }
        },
        components: {
            "v-header": header,
            backtop,
            loading,
            card
        }
    };
</script>

<style lang="less" src="./article.less"></style>