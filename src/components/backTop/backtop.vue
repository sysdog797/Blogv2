<template>
    <!-- <div> -->
        <transition name="back-fade">
            <div class="backtop-btn" v-show="backTop" @click="back">
                <div class="back-top-content">
                    <img class="back-icon" src="../../static/images/backtop.png" alt/>
                </div>
            </div>
        </transition>
    <!-- </div> -->
</template>

<script>
    export default {
        data() {
            return {
                backTop: false,
                height: 400,
                show: true,
            };
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll, false);
            window.addEventListener('resize', this.handleScroll, false);
        },
        beforeDestroy() {
            window.removeEventListener('scroll', this.handleScroll, false);
            window.removeEventListener('resize', this.handleScroll, false);
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