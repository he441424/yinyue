<template>
  <div>
    <!-- 推荐音乐 -->
    <h3>推荐音乐</h3>
    <div class="box">
      <div
        v-for="item in list"
        :key="item.id"
        class="box-s"
        @click="rountClick(item.id)"
      >
        <div class="name">
          {{ item.copywriter }}
        </div>
        <div><img :src="item.picUrl" alt="" style="border-radius: 15px" /></div>
        <span>{{ item.name }}</span>
        <div class="icon"><i class="el-icon-headset"></i></div>
      </div>
    </div>
    <!-- 最新音乐 -->

    <h3>最新音乐</h3>
    <div class="newMusic">
      <div
        class="musice"
        v-for="music in newMusic"
        :key="music.id"
        @click="playClick(music.id)"
      >
        <!-- 封面 -->
        <img :src="music.picUrl" alt="" />
        <!-- 播放图标 -->
        <div class="video-icon">
          <i class="el-icon-caret-right"></i>
        </div>
        <!-- 歌名 -->
        <span>{{ music.name }}</span>
        <br />
        <!-- 作者 -->
        <span style="color: #474747">{{ music.song.artists[0].name }}</span>
      </div>
    </div>
    <!-- 推荐mv -->
    <h3>推荐mv</h3>
    <div class="recomMv">
      <div
        class="mv-box"
        v-for="item in mv"
        :key="item.id"
        @click="mvClick(item.id)"
      >
        <div class="mv-top">
          <i class="el-icon-caret-right"></i> {{ item.playCount }}
        </div>
        <div>
          <img :src="item.picUrl" width="" alt="" style="border-radius: 15px" />
        </div>

        <span>{{ item.name }}</span>
        <p>{{ item.artistName }}</p>
        <div class="icon mv-icon"><i class="el-icon-video-play"></i></div>
      </div>
    </div>
  </div>
</template>
<script>
import { Pagination } from "element-ui";
import Vue from "vue";
Vue.use(Pagination);
import axios from "axios";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      // 推荐音乐列表
      list: [],
      // 最新音乐的列表
      newMusic: [],
      // mv的列表
      mv: [],
      isShow: false,
      // 一共有多少条数据
      total: 30,
      // 第几页
      pager: 1,
    };
  },
  mounted() {
    this.getList();
    // 最新音乐的接口
    axios.get("/personalized/newsong").then((res) => {
      console.log(res.data.result);
      this.newMusic = res.data.result;
    });
    axios.get("/personalized/mv").then((res) => {
      console.log(res.data.result);
      this.mv = res.data.result;
    });
  },
  methods: {
    ...mapActions("play", ["playUrl"]),
    handChange(val) {
      this.pager = val;
    },
    //推荐音乐的接口
    getList() {
      axios({
        url: "http://catbk.cn:3000/personalized/playlist",
        params: {
          // offset: 30,
          limit: 10,
        },
      }).then((res) => {
        this.list = res.data.result.slice(0, 10);
      });
    },
    playClick(id) {
      // this.$store.Dispatch("playUrl", id);
      this.playUrl(id);
      console.log(id);
    },
    // 跳转路由
    rountClick(id) {
      this.$router.push(`/musicDetail/${id}`);
    },
    mvClick(id) {
      this.$router.push(`/mvDetail/${id}`);
    },
  },
};
</script>
<style lang="scss" scoped>
.box {
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
  // height: 500px;
  overflow: hidden;
  display: -webkit-box;
  margin-bottom: 50px;
  position: relative;
  .box-s {
    width: 200px;
    margin: 10px;
    img {
      width: 200px;
      height: 200px;
    }
  }
}
.name {
  width: 200px;
  height: 30px;
  line-height: 30px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  visibility: hidden;
  overflow: hidden;
  color: #fff;
  font-size: 13px;
  position: absolute;
  top: -20px;
  left: 0;
  -webkit-transition: visibility 5s;
  transition: visibility 5s;
  -moz-transition: visibility 5s;
  -o-transition: visibility 5s;

  -webkit-transition: top 0.5s;
  transition: top 0.5s;
  -moz-transition: top 0.5s;
  -o-transition: top 0.5s;
}
.box-s {
  position: relative;
  text-align: center;
  cursor: pointer;
  span {
    font-size: 12px;
  }
}
.box-s:hover .name {
  display: block;
  visibility: visible;
  top: 0;
}
.box-s:hover .icon {
  opacity: 0.8;
}
.icon {
  position: absolute;
  top: 32%;
  left: 32%;
  width: 80px;
  height: 80px;
  line-height: 80px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 48%;
  opacity: 0;
  transition: opacity 1s;
  -webkit-transition: opacity 1s;
  -moz-transition: opacity 1s;
  -o-transition: opacity 1s;
  text-align: center;
  .el-icon-headset {
    font-size: 50px;
    vertical-align: middle;
  }
}
.newMusic {
  width: 100%;
  height: 500px;
  // background-color: chocolate;
  .musice {
    float: left;
    width: 50%;
    height: 100px;
    line-height: 20px;
    position: relative;
    img {
      width: 80px;
      height: 80px;
      float: left;
    }
    span {
      margin: 10px;
      font-size: 14px;
      display: inline-block;
    }
    p {
      padding: 10px;
    }
    .video-icon {
      position: absolute;
      top: 20px;
      left: 25px;
      width: 30px;
      height: 30px;
      background-color: rgb(175, 243, 175, 0.5);
      border-radius: 50%;
      opacity: 0;
      transition: opacity 1s;
      -webkit-transition: opacity 1s;
      -o-transition: opacity 1s;
      -moz-transition: opacity 1s;
    }
    .el-icon-caret-right {
      font-size: 30px;
      color: rgb(221, 109, 109);
    }
  }
}
.musice:hover .video-icon {
  opacity: 1;
}
.recomMv {
  width: 100%;
  height: 300px;
  .mv-box {
    width: 278px;
    float: left;
    margin-right: 10px;
    margin-bottom: 15px;
    position: relative;
    cursor: pointer;
    img {
      width: 100%;
      height: 160px;
    }
  }
}
.mv-top {
  position: absolute;
  top: 5px;
  right: 20px;
  text-align: right;
  font-size: 14px;
  border-radius: 10px;
  color: #fff;
}
.mv-icon {
  position: absolute;
  top: 25%;
  left: 35%;
  width: 50px;
  height: 50px;
  line-height: 50px;

  background: rgba(207, 116, 139, 0.6);
  .el-icon-video-play {
    font-size: 32px;
    vertical-align: middle;
    color: orangered;
  }
}
.mv-box:hover .icon {
  opacity: 1;
}
</style>