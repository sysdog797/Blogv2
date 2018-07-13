<template>
    <div>
        <transition name="back-fade">
            <div class="backtop-btn" v-show="backShow" @click="back">
                <div class="back-top-content">
                    <img class="back-icon" src="../../static/images/backtop.png" alt/>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
  props: {
    backShow: {
      type: Boolean
    }
  },
  data() {
    return {};
  },
  methods: {
    back() {
      window.scrollTo({
        behavior: "smooth",
        top: 0
      });
    }
  }
};
</script>

<style lang="less" src="./backtop.less"></style>