<template>
  <div style="display: flex">
    <div class="mv-wrap">
      <h3>mv详情</h3>
      <!-- mv -->
      <div class="mv-video">
        <video controls :src="mvUrl" autoplay></video>
      </div>
      <!-- 头像-作者 -->
      <div class="avatar-wrap">
        <img :src="mvname.cover" alt="" />
        <span>{{ mvname.artistName }}</span>
      </div>
      <!-- 标题 -->
      <h4 style="font-size: 25px; margin: 12px 0">{{ mvname.name }}</h4>
      <!-- 发布日期 播放次数 -->

      <div style="color: #ccc; font-size: 14px; margin-bottom: 8px">
        <span>发布：{{ mvname.publishTime }}</span>
        <span>播放：{{ mvname.playCount }} 次</span>
      </div>
      <p>{{ mvname.desc }}</p>
      <!-- 评论 -->
      <div class="comment-wrap">
        <p>最新评论({{ total }})</p>
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
        <!-- 分页器 -->
        <div class="block">
          <el-pagination
            layout="prev, pager, next"
            :total="total"
            @current-change="currenClick"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- 相关推荐 -->
    <div class="recom">
      <h3>相关推荐</h3>
      <div
        class="recom-items"
        v-for="item in mvRecom"
        :key="item.id"
        @click="routerClick(item.id)"
      >
        <div class="mvimg">
          <img :src="item.cover" alt="" />
          <!-- 鼠标经过显示播放图标 -->
          <div class="video-icon">
            <i class="el-icon-video-play"></i>
          </div>
          <!-- 过滤器没有做 -->
          <span class="el-icon-caret-right">{{ item.playCount }}</span>
          <!-- 时间 过滤器没有做 -->
          <span
            style="
              position: absolute;
              bottom: 5px;
              right: 8px;
              color: #fff;
              font-size: 13px;
            "
            >{{ item.duration | duration }}</span
          >
        </div>
        <div class="mvname">
          <div
            style="
              width: 100%;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            "
          >
            {{ item.name }}
          </div>
          <div style="color: #ccc; font-size: 14xpx">{{ item.artistName }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";
import Vue from "vue";
Vue.filter("times", (times) => {
  return moment(times).format("YYYY/MM/DD");
});
export default {
  data() {
    return {
      // 播放地址
      mvUrl: [],
      mvList: [],
      // 标题 时间
      mvname: [],
      //评论
      comments: [],
      // 相关推荐
      mvRecom: [],
      // 第几页
      pagin: "1",
      // 评论数量
      total: 0,
    };
  },
  mounted() {
    this.mv();
    this.pagins();
  },
  watch: {
    // 当路由发生改变的时候出现请求axios
    $route() {
      this.mv();
      this.pagins();
    },
    pagin() {
      this.pagins();
    },
  },
  methods: {
    mv() {
      // 播放地址${this.$route.params.id}
      axios(`https://autumnfish.cn/mv/url?id=${this.$route.params.id}`).then(
        (res) => {
          // console.log(res.data.data.url);
          this.mvUrl = res.data.data.url;
        }
      );

      // 标题${this.$route.params.id}
      axios(
        `https://autumnfish.cn/mv/detail?mvid=${this.$route.params.id}`
      ).then((res) => {
        // console.log(res.data.data);
        this.mvname = res.data.data;
      });

      // 请求相关mv的数据
      axios(`https://autumnfish.cn/simi/mv?mvid=${this.$route.params.id}`).then(
        (res) => {
          console.log(res.data.mvs);
          this.mvRecom = res.data.mvs;
        }
      );
    },
    pagins() {
      // 请求评论数据
      axios(
        `https://autumnfish.cn/comment/mv?id=${
          this.$route.params.id
        }&limit=15&offset=${(this.pagin - 1) * 15}`
      ).then((res) => {
        // console.log(res.data.comments);
        this.comments = res.data.comments;
        this.total = res.data.total;
      });
    },
    routerClick(id) {
      // this.$router.push(`/mvDetail/${id}`);
      this.$router.replace(`/mvDetail/${id}`);
    },
    // 点击分页器的时候paging赋值
    currenClick(val) {
      this.pagin = val;
    },
  },
};
</script>
<style lang="scss" scoped>
.mv-wrap {
  width: 700px;
  .mv-video {
    width: 100%;
    video {
      width: 100%;
      height: 390px;
      outline: none;
    }
  }
  .avatar-wrap,
  .icon-wrap {
    margin: 15px 0;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      vertical-align: middle;
      margin-right: 10px;
    }
  }
}
.comment-wrap {
  margin: 90px 0;
  .icon-wrap {
    float: left;
    margin-right: 15px;
  }
  .conten {
    height: 50px;
    padding: 20px;
  }
}

.recom {
  margin-left: 20px;
  width: 380px;
  .recom-items {
    height: 105px;
    padding: 15px;
    overflow: hidden;
    cursor: pointer;
    width: 100%;
    .mvimg {
      float: left;
      margin-right: 15px;
      position: relative;
      img {
        width: 180px;
        height: 100px;
        float: left;
        margin-right: 5px;
      }
      // 播放量的图标
      .el-icon-caret-right {
        position: absolute;
        top: 3px;
        right: 5px;
        color: #fff;
        font-size: 14px;
      }
      // 鼠标经过显示的播放图标
    }
    .mvname {
      padding: 25px 0;
      overflow: hidden;
    }
  }
}

.el-icon-video-play {
  opacity: 0;
  transition: opacity 1s;
  -webkit-transition: opacity 1s;
  -o-transition: opacity 1s;
  -moz-transition: opacity 1s;
  position: absolute;
  top: 30px;
  left: 60px;
  font-size: 40px;
  color: rgb(224, 60, 60);
}

.recom-items:hover .el-icon-video-play {
  opacity: 1;
}
.recom-items:hover {
  background-color: #ececec;
}
</style>