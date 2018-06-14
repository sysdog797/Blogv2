<template>
    <div class="article">
        <v-header :headerShow="false"></v-header>
        <div class="content-wrap">
            <header>
                <div class="icon-wrap">
                    <img src="../../static/images/article/react.svg" alt/>
                </div>
                <div class="border-2px"></div>
                <h2>{{data.title}}</h2>
            </header>
            <div class="content-main">
                <div class="content" v-html="data.body" v-highlight></div>
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
    import Remarkable from 'remarkable';

    export default {
        data(){
            return{
                data: {},
                title: '',
                subtitle: '',
                backShow: false
            }
        },
        created(){
            //const url = "/api/getArticle/" + this.$route.params.id;
            const url = './../mock-data.json';
            this.$http.get(url).then((response) => {
                response = response.body;
                let rs = response[response.length - this.$route.params.id];
                let body = rs.body;
                var md = new Remarkable();
                body = md.render(body);
                rs.body = body;
                this.data = rs;
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
            "v-header": header
        }
    };
</script>

<style lang="less" src="./article.less"></style>