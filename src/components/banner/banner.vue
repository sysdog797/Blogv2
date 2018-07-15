<template>
    <div class="banner" id="banner">
        <div class="banner-mask"></div>
        <div class="wrapper">
            <!-- <h2>Syscoding</h2> -->
            <img class="logo" :src="logo" alt="logo"/>
            <p class="typing-words" ref="slogan" v-bind:style="{width:sloganWidth}">{{msg}}</p>
            <p class="template" ref="template">{{str}}</p>
            <!-- <span class="button" v-on:click="handleClick">Learn More</span> -->
        </div>
        <transition name="arrow-fade">
            <div class="arrow-box" v-show="arrowShow" v-on:click="handleClick">
                <img class="arrow" :src="arrow" alt="arrow"/>
            </div>
        </transition>
    </div>
</template>

<script>
import logo from "./syscoding.svg";
import arrow from "./arrow.svg";

export default {
  props: {
    arrowShow: {
      type: Boolean
    }
  },
  data() {
    return {
      msg: "",
      str: "My name is Sys. I am a junior web developer.",
      logo: logo,
      sloganWidth: "404px",
      canType: false,
      arrow: arrow
    };
  },
  watch: {
    canType: function(e) {
      if (e) {
        setTimeout(() => {
          this.initTyping();
        }, 1000);
      }
    }
  },
  mounted() {
    let template = this.$refs.template;
    let slogan = this.$refs.sloagn;
    let tmpWidth = Math.ceil(template.getBoundingClientRect().width * 10) / 10;
    this.sloganWidth = tmpWidth + "px";
    setTimeout(() => {
      this.canType = true;
    }, 1000);
  },
  methods: {
    initTyping() {
      let tmp = "";
      let typing = setInterval(() => {
        if (tmp.length !== this.str.length) {
          tmp = this.str.substring(0, tmp.length + 1);
          this.msg = tmp;
        } else {
          clearInterval(typing);
        }
      }, 50);
    },
    handleClick() {
      this.$emit("arrowClick");
    }
  }
};
</script>

<style lang="less" src="./banner.less"></style>