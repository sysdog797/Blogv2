<template>
    <div class="banner">
        <div class="wrapper">
            <h2>Syscoding</h2>
            <p>{{msg}}</p>
            <span class="button" v-on:click="handleClick">Learn More</span>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            typing: {
                type: Boolean
            }
        },
        data() {
            return {
                msg: '',
                str: 'My name is Sys. I am a junior web developer.'
            };
        },
        watch: {
            typing: function(e) {
                if(e){
                    setTimeout(()=>{
                       this.initTyping();
                    }, 500);
                };
            }
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