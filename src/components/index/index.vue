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
                    <img src="../../static/images/bg-laptop.jpg" alt/>
                    <div class="mask"></div>
                </span>
            </div>
            <div class="card-wrap" ref="cardwrap">
                <div class="card-box" v-for="data in datas" :key="data.id">
                    <div class="card">
                        <div class="label">
                            <span>Sys</span>
                            / {{data.created_at}}
                        </div>
                        <router-link :to="'/article/'+data.number" class="title" v-bind:class="{'long-title':data.title.length>30}">{{data.title}}</router-link>
                        <p>{{data.body}}</p>
                        <div class="icon-box">
                            <div v-for="(label, index) in data.labels" class="icon-wrap" :key="index">
                                <img :src="'../../static/images/article/'+ label.name +'.png'" alt/>
                            </div>
                        </div>
                        <router-link :to="'/article/'+data.number" class="readmore">阅读全文...</router-link>
                    </div>
                </div>
            </div>
        </div>
        <backtop></backtop>
    </div>
</template>

<script>
    import header from "../../components/header/header";
    import banner from "../../components/banner/banner";
    import backtop from "../../components/backtop/backtop";
    import dayjs from 'dayjs';

    export default {
        data() {
            return {
                datas: [],
                len: 1,
                backShow: false,
                headerShow: true,
                headerHeight: 50  // header高度
            };
        },
        created(){
            //const url = 'mock-data.json';
            const url = '/api/getList/'
            this.$http.get(url).then((response) => {
                console.log(response);
                response = response.body;
                this.datas = response;
                this.len = this.datas.length;
                for(let i = 0; i < this.len; i++){
                    this.datas[i].created_at = dayjs(this.datas[i].created_at).format("MMMM DD, YYYY");
                }
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
            }
        },
        components: {
            "v-header": header,
            banner,
            backtop
        }
    };
</script>

<style lang="less" src="./index.less"></style>
