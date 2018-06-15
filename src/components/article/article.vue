<template>
    <div class="article">
        <v-header :headerShow="false"></v-header>
        <div class="content-wrap">
            <header>
                <div class="icon-wrap">
                    <img :src="'../../static/images/article/pic-'+ picNumber +'.png'" alt/>
                </div>
                <div class="border-2px"></div>
                <h2>{{data.title}}</h2>
            </header>
            <div class="content-main">
                <div class="content" v-html="data.body" v-highlight></div>
            </div>
        </div>
        <backtop></backtop>
    </div>
</template>

<script>
    import header from "../../components/header/header";
    import Remarkable from 'remarkable';
    import backtop from "../../components/backtop/backtop";

    export default {
        data(){
            return{
                data: {},
                title: '',
                subtitle: '',
                backShow: false,
                picNumber: 1
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
                this.picNumber = this.$route.params.id;
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
            backtop
        }
    };
</script>

<style lang="less" src="./article.less"></style>