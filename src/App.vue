<template>
  <div>
    <!-- header -->

    <div class="header">
      <headers></headers>
    </div>

    <!-- nav -->
    <div class="nav">
      <nav-left></nav-left>
    </div>
    <!-- main -->
    <div class="main">
      <div class="conent">
        <router-view></router-view>
      </div>
    </div>
    <!-- footer -->
    <div class="footer">
      <div class="player">
        <!-- autoplay 自动播放 -->
        <!-- <span>name</span> -->
        <audio :src="playId" controls autoplay></audio>
      </div>
    </div>
  </div>
</template>
<script>
import headers from "./components/header";
import navLeft from "./components/leftNav";
import { mapState } from "vuex";
export default {
  components: {
    headers,
    navLeft,
  },
  computed: {
    ...mapState("play", ["playId"]),
  },
  data() {
    return {
      // url: ,
      show: false,
    };
  },
};
</script>
<style scoped lang="scss">
.header {
  width: 100%;
  height: 60px;
  line-height: 60px;
  position: fixed;
  z-index: 99;
  background: rgba(0, 0, 0, 0.8);
  background: url("http://pic.bizhi360.com/bbpic/89/8489.jpg");

  text-align: center;
}
.nav {
  color: #fff;
  margin-top: 60px;
  cursor: pointer;
  width: 20%;
  max-width: 200px;
  float: left;
  background: #ccc;
  position: fixed;
  left: 0px;
  // top: 60px;
  height: 100%;
  background: url("http://sj.bizhi360.com/upfiles/202103/631wcelkhko0hugnf9_view.jpg");
}

.main {
  margin: 60px 0;
  width: 85%;
  float: right;
  // background-color: rgba(0, 0, 0, 0.1);
  background: url("http://pic.bizhi360.com/bbpic/84/8484.jpg") center;

  .conent {
    padding: 15px;
  }
}
.footer {
  overflow: hidden;
  width: 100%;
  height: 50px;
  // background: yellow;
  position: fixed;
  bottom: 0;
  .player audio {
    width: 100%;
  }
}
</style>