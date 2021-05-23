<template>
  <div>
    <div class="top" v-if="top">
      <!-- 封面 -->
      <img :src="top.coverImgUrl" alt="" />
      <div class="top-right">
        <!-- 标题 -->
        <p>{{ top.name }}</p>
        <!-- 头像名称 -->
        <div style="margin: 10px 0" class="author-wrap">
          <img :src="top.creator.avatarUrl" alt="" />
          <span>{{ top.creator.nickname }} </span>
          <span>{{ top.createTime }}</span>
        </div>
        <!--  播放全部-->
        <div class="button">播放全部</div>
        <!-- 标签 -->
        <p>标签: {{ top.tags[1] }}/{{ top.tags[1] }}/{{ top.tags[2] }}</p>
        <!-- 简介 -->
        <div class="intro">简介：{{ top.description }}</div>
      </div>
    </div>

    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="歌曲列表" name="first">
        <div class="list">
          <div
            style="
              display: flex;
              height: 50px;
              line-height: 50px;
              border-bottom: 1px solid #ccc;
            "
            class="ul"
          >
            <li></li>
            <li></li>
            <li>音乐</li>
            <li>歌手</li>
            <li>专辑</li>
            <li>时长</li>
            <li></li>
          </div>

          <ul
            v-for="(item, index) in list"
            :key="item.id"
            @click="playClick(item.id)"
          >
            <li>{{ index + 1 }}</li>
            <li style="position: relative">
              <!-- <div class="icon"> -->
              <i class="icon el-icon-caret-right"></i>
              <!-- </div> -->
              <img :src="item.al.picUrl" alt="" />
            </li>
            <li style="font-size: 12px; overflow: hidden">{{ item.name }}</li>
            <li>
              {{ item.ar[0].name }}
            </li>
            <li>{{ item.al.name }}</li>
            <li>{{ item.dt | duration }}</li>
          </ul>
        </div>
      </el-tab-pane>

      <el-tab-pane :label="`评论(${total})`" name="fourth">
        <div class="comment-wrap">
          <div class="item" v-for="item in comments" :key="item.id">
            <div class="icon-wrap">
              <!-- 头像 -->
              <img :src="item.user.avatarUrl" alt="" />
            </div>
            <div class="conten">
              <p>
                <!-- nikemame名字 content内容 -->
                {{ item.user.nickname }}：<span>{{ item.content }}</span>
              </p>
              <!-- 时间 -->
              <p style="font-size: 12px; margin-top: 5px; color: #ccc">
                {{ item.time | times }}
              </p>
            </div>
          </div>
        </div>
        <!-- 分页器 -->
        <div class="block">
          <el-pagination
            layout="prev, pager, next"
            :total="total"
            @current-change="currenClick"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
 <script>
import { Tabs, TabPane } from "element-ui";

import "element-ui/lib/theme-chalk/index.css";
import moment from "moment";
import Vue from "vue";
Vue.use(Tabs);
Vue.use(TabPane);
import axios from "axios";
import { mapActions } from "vuex";
// 过滤器 过滤时间
Vue.filter("times", (times) => {
  return moment(times).format(" YYYY-MM-DD");
});
export default {
  data() {
    return {
      activeName: "first",
      // 歌曲数据
      list: [],
      // 头部数据
      top: null,
      // 最新评论的数据
      comments: [],
      // 第几页的数据
      pagin: 1,
      total: 0,
    };
  },
  methods: {
    ...mapActions("play", ["playUrl"]),
    handleClick(tab, event) {
      console.log(tab, event);
    },
    playClick(id) {
      this.playUrl(id);
    },
    currenClick(val) {
      this.pagin = val;
    },
  },
  watch: {
    pagin() {
      axios(
        `https://autumnfish.cn/comment/playlist?id=${
          this.$route.params.id
        }&limit=10&offset=${this.pagin - 1}`
      ).then((res) => {
        // console.log(res.data.comments);
        this.comments = res.data.comments;
      });
    },
  },
  mounted() {
    // 歌曲的数据
    axios({
      url: `https://autumnfish.cn/playlist/detail?id=${this.$route.params.id}`,
    }).then((res) => {
      // console.log(res.data.playlist.tracks);
      this.list = res.data.playlist.tracks;
      console.log(res.data.playlist);
      // 顶部信息的数据
      this.top = res.data.playlist;
    });
    // 最新评论的数据
    axios(
      `https://autumnfish.cn/comment/playlist?id=${
        this.$route.params.id
      }&limit=10&offset=${this.pagin - 1}`
    ).then((res) => {
      // console.log(res.data.comments);
      this.comments = res.data.comments;
      this.total = res.data.total;
    });
  },
};
</script>
<style lang="scss" scoped>
.top {
  height: 270px;
  //   background: #000;
  padding: 10px;
  display: flex;
  img {
    height: 230px;
    width: 230px;
  }
  .top-right {
    margin-left: 30px;
    span,
    p {
      padding: 8px;
    }
    .button {
      width: 100px;
      height: 30px;
      line-height: 30px;
      background-color: cornflowerblue;
      text-align: center;
      border-radius: 18px;
      margin: 10px 0;
    }
    .intro {
      font-size: 14px;
      padding: 8px;
    }
  }
}
.nav {
  height: 40px;
  line-height: 40px;
  border-bottom: 2px solid #ccc;
  ul {
    display: flex;
    li {
      width: 80px;
    }
  }
}

.list {
  font-size: 14px;
  ul,
  .ul {
    cursor: pointer;
    display: flex;
    height: 90px;
    line-height: 90px;
    margin-top: 10px;
    // background: rgba(85, 82, 82, 0.3);

    li {
      width: 50px;
      text-align: center;
      overflow: hidden;
    }
    li:nth-child(3) {
      width: 300px;
    }
    li:nth-child(2) {
      width: 100px;

      font-size: 12px;
    }
    li:nth-child(4) {
      width: 150px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    li:nth-child(5) {
      width: 300px;
    }

    img {
      width: 70px;
      height: 70px;

      vertical-align: middle;
    }
  }
}
ul:nth-child(2n) {
  background: #f4f4f4;
}
ul:hover {
  // background: #ccc;
  background: rgba(0, 0, 0, 0.1);
}
ul:hover .icon {
  opacity: 1;
}
.icon {
  position: absolute;
  top: 30%;
  left: 35px;
  width: 30px;
  height: 30px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  font-size: 30px;
  color: orchid;
  opacity: 0;
  transition: opacity 0.5s;
  -webkit-transition: opacity 0.5s;
  -o-transition: opacity 0.5s;
  -moz-transition: opacity 0.5s;
}
// 顶部的头像部分
.author-wrap {
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    vertical-align: middle;
  }
}
// 评论
.comment-wrap {
  margin: 50px 0;
  .icon-wrap {
    float: left;
    margin-right: 15px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      vertical-align: middle;
    }
  }

  .conten {
    height: 50px;
    padding: 20px;
  }
}
</style>