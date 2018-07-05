<template>
    <div class="banner">
        <div class="wrapper">
            <!-- <h2>Syscoding</h2> -->
            <img class="logo" :src="logo" alt="logo"/>
            <p class="typing-words" ref="slogan" v-bind:style="{width:sloganWidth}">{{msg}}</p>
            <p class="template" ref="template">{{str}}</p>
            <span class="button" v-on:click="handleClick">Learn More</span>
        </div>
    </div>
</template>

<script>
    import logo from './syscoding.svg';

    export default {
        data() {
            return {
                msg: '',
                str: 'My name is Sys. I am a junior web developer.',
                logo: logo,
                sloganWidth: '40.4rem',
                canType: false
            };
        },
        watch: {
            canType: function(e) {
                if(e){
                    setTimeout(() => {
                        this.initTyping();
                    }, 1000);
                }
            }
        },
        mounted(){
            let template = this.$refs.template;
            let slogan = this.$refs.sloagn;
            this.sloganWidth = template.getBoundingClientRect().width + 'px';
            setTimeout(() => {
                this.canType = true;
            }, 1000);
            this.$emit('bannerMounted');
        },
        methods: {
            initTyping() {
                let tmp = '';
                let typing = setInterval(() => {
                    if(tmp.length !== this.str.length){
                        tmp = this.str.substring(0, tmp.length + 1);
                        this.msg = tmp;
                    }else{
                        clearInterval(typing);
                    }
                }, 50)
            },
            handleClick() {
                this.$emit('learnMore');
            }
        }
    };
</script>

<style lang="less" src="./banner.less"></style>