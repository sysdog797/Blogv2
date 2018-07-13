<template>
    <!-- <div> -->
        <transition name="back-fade">
            <div class="backtop-btn" v-show="backStatus" @click="back">
                <div class="back-top-content">
                    <img class="back-icon" src="../../static/images/backtop.png" alt/>
                </div>
            </div>
        </transition>
    <!-- </div> -->
</template>

<script>
    export default {
        props:{
            backShow: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                backTop: false,
                height: 400,
            };
        },
        computed:{
            backStatus: function(){
                return (this.backTop && !this.backShow)
            }
        },
        methods: {
            handleScroll() {
                this.backTop = window.pageYOffset >= this.height;
            },
            back() {
                window.scrollTo({
                    behavior: 'smooth',
                    top: 0
                });
            }
        }
    };
</script>

<style lang="less" src="./backtop.less"></style>