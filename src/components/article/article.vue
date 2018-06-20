<template>
    <div class="article">
        <v-header :headerShow="false"></v-header>
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
        <div class="loading" v-show="!contentShow">
            <loading></loading>
        </div>
        <backtop></backtop>
    </div>
</template>

<script>
    import header from "../../components/header/header";
    import Remarkable from 'remarkable';
    import backtop from "../../components/backtop/backtop";
    import loading from "../../components/loading/loading";

    export default {
        data(){
            return{
                data: {},
                title: '',
                subtitle: '',
                backShow: false,
                contentShow: false
            }
        },
        created(){
            const url = "/api/getArticle/" + this.$route.params.id;
            //const url = './../mock-data.json';
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
            }
        },
        components: {
            "v-header": header,
            backtop,
            loading
        }
    };
</script>

<style lang="less" src="./article.less"></style>