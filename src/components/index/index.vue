<template>
    <div id="box" class="box" ref="box" @click="bodyClick">
        <v-header :headerShow="headerShow" v-on:showCard="handleShowCard" ref="header"></v-header>
        <banner v-on:arrowClick="handleArrowClick" :arrowShow="arrowShow" ref="banner"></banner>
        <div id="container" class="container">
            <!-- <div class="intro-card">
                <div class="major">
                    <h2>打怪升级中的初级前端工程师</h2>
                    <p>Tips：不想做全栈开发的程序员不是一个好前端</p>
                </div> -->
                <!-- <span class="image">
                    <img src="../../static/images/bg-laptop.jpg" alt/>
                    <div class="mask"></div>
                </span> -->
            <!-- </div> -->
            <div class="egg">Welcome to my world!</div>
            <div class="card-wrap" ref="cardwrap">
                <transition-group name="card-fade">
                    <div class="card-box" v-for="data in datas" :key="data.id">
                        <div class="card">
                            <div class="label">
                                <span>Sys</span>
                                / {{data.created_at}}
                            </div>
                            <router-link :to="'/article/' + data.number" class="title" v-bind:class="{'long-title':data.title.length > 30}">{{data.title}}</router-link>
                            <p v-html="data.body" class="content-box"></p>
                            <div class="icon-box">
                                <div v-for="(label, index) in data.labels" class="icon-wrap" :key="index">
                                    <img :src="'../../static/images/article/'+ label.name +'.png'" alt/>
                                </div>
                            </div>
                            <router-link :to="'/article/'+data.number" class="readmore">阅读全文...</router-link>
                        </div>
                    </div>
                </transition-group>
                <loading v-show="loading"></loading>
            </div>
            <transition name="aboutme-fade">
                <card v-show="cardShow"></card>
            </transition>
            <transition name="alert-fade">
                <div class="browser-alert" v-show="alert">
                    <h1>Warning</h1>
                    <div class="border-1px"></div>
                    <p>使用Chrome浏览器以获取最佳体验！</p>
                    <div class="border-1px"></div>
                    <span v-on:click="alertok">OK</span>
                </div>
            </transition>
            <transition name="mask-fade">
                <div class="card-mask" v-show="cardShow || alert"></div>
            </transition>
        </div>
        <backtop :backShow="backShow" v-on:backTop="handleBackTop"></backtop>
    </div>
</template>

<script>
import header from "../../components/header/header";
import banner from "../../components/banner/banner";
import backtop from "../../components/backtop/backtop";
import loading from "../../components/loading/loading";
import card from "../../components/card/card";
import dayjs from "dayjs";
import Remarkable from "remarkable";

export default {
  data() {
    return {
      datas: [],
      headerShow: false,
      h: 9999,
      page: 1,
      loading: false,
      count: 0,
      canLoad: true,
      cardShow: false,
      alert: false,
      backShow: false,
      arrowShow: true
    };
  },
  created() {
    const url = "http://localhost:8088/api/getList/" + this.page;
    this.$http.get(url).then(
      response => {
        let rs = response.body;
        for (let i = 0; i < rs.length; i++) {
          rs[i].created_at = dayjs(rs[i].created_at).format("MMMM DD, YYYY");
          let md = new Remarkable();
          let body = md.render(rs[i].body);
          body = body.substr(0, 300); // 只保留文章前面部分，显示为文章简介
          rs[i].body = body;
        }
        this.count = rs[0].number; // article.number == count
        this.datas = rs;
      },
      err => {
        // err callback
        console.log(err);
      }
    );
    let userAgent = this.getExploreName();
    //console.log(userAgent);
    if (userAgent !== "Chrome") {
      this.alert = true;
      document.body.classList.add("abandon-scroll");
    }
    this.$nextTick(() => {
      window.addEventListener("scroll", this.handleScroll);
    });
  },
  mounted() {
    setTimeout(() => {
      document.getElementById("app").style.opacity = 1;
      if (document.getElementById("app-loading")) {
        document.body.removeChild(document.getElementById("app-loading"));
      }
    }, 700);
  },
  methods: {
    getExploreName() {
      var userAgent = navigator.userAgent;
      if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
        return "Opera";
      } else if (
        userAgent.indexOf("compatible") > -1 &&
        userAgent.indexOf("MSIE") > -1
      ) {
        return "IE";
      } else if (userAgent.indexOf("Edge") > -1) {
        return "Edge";
      } else if (userAgent.indexOf("Firefox") > -1) {
        return "Firefox";
      } else if (
        userAgent.indexOf("Safari") > -1 &&
        userAgent.indexOf("Chrome") == -1
      ) {
        return "Safari";
      } else if (
        userAgent.indexOf("Chrome") > -1 &&
        userAgent.indexOf("Safari") > -1
      ) {
        return "Chrome";
      } else if (!!window.ActiveXObject || "ActiveXObject" in window) {
        return "IE>=11";
      } else {
        return "Unkonwn";
      }
    },
    handleBackTop() {
      this.$scrollTo("#container", 500, { cancelable: false, offset: -120 });
    },
    alertok() {
      setTimeout(() => {
        this.alert = false;
        document.body.classList.remove("abandon-scroll");
      }, 100);
    },
    handleScroll(e) {
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      let bannerHeight = this.$refs.banner.$el.clientHeight;
      let backHeight = bannerHeight + 400;
      let arrowHeight = bannerHeight / 2;
      // 导航栏样式
      if (scrollTop >= 80) {
        this.headerShow = true;
      } else {
        this.headerShow = false;
      }
      // 回到顶部箭头
      if (scrollTop >= backHeight) {
        this.backShow = true;
      } else {
        this.backShow = false;
      }
      // arrow
      if (scrollTop >= arrowHeight) {
        this.arrowShow = false;
      } else {
        this.arrowShow = true;
      }
      // lazyload
      let boxHeight = window
        .getComputedStyle(this.$refs.box)
        .getPropertyValue("height");
      boxHeight = parseFloat(boxHeight);
      let threshold = boxHeight - window.innerHeight - 5; // 滚动阈值
      this.h = threshold;
      if (scrollTop > this.h) {
        this.loadMoreData();
      }
    },
    handleArrowClick() {
      setTimeout(() => {
        this.$scrollTo("#container", 500, { cancelable: false, offset: -120 });
      }, 300);
    },
    handleShowCard() {
      this.cardShow = true;
      document.body.classList.add("abandon-scroll");
    },
    bodyClick() {
      if (!this.alert) {
        this.cardShow = false;
        document.body.classList.remove("abandon-scroll");
      }
    },
    loadMoreData() {
      if (!this.canLoad) return;
      this.loading = true;
      this.canLoad = false;
      this.page++;
      const url = "http://localhost:8088/api/getList/" + this.page;
      this.$http.get(url).then(
        response => {
          let rs = response.body;
          for (let i = 0; i < rs.length; i++) {
            rs[i].created_at = dayjs(rs[i].created_at).format("MMMM DD, YYYY");
            let md = new Remarkable();
            let body = md.render(rs[i].body);
            rs[i].body = body;
          }
          setTimeout(() => {
            this.datas = this.datas.concat(rs);
            this.loading = false;
            if (this.page * 6 < this.count) {
              this.$nextTick(() => {
                this.canLoad = true;
              });
            } else {
              this.canLoad = false;
            }
          }, 1000);
        },
        err => {
          // err callback
          console.log(err);
        }
      );
    }
  },
  components: {
    "v-header": header,
    banner,
    backtop,
    loading,
    card
  }
};
</script>

<style lang="less" src="./index.less"></style>
