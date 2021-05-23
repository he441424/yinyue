<template>
  <div>
    <div
      class="header"
      :style="{ background: 'url(' + topLists.coverImgUrl + ')' }"
    >
      <img v-if="topLists.coverImgUrl" :src="topLists.coverImgUrl" alt="" />
      <div class="nr">
        <div class="jp">精品歌单</div>
        <span style="color: #fff">{{ topLists.name }}</span>
        <div class="into">
          {{ topLists.description }}
        </div>
      </div>
    </div>
    <div class="nav">
      <ul>
        <li @click="tag = '全部'" :class="{ active: tag == '全部' }">全部</li>
        <li @click="tag = '欧美'" :class="{ active: tag == '欧美' }">欧美</li>
        <li @click="tag = '华语'" :class="{ active: tag == '华语' }">华语</li>
        <li @click="tag = '流行'" :class="{ active: tag == '流行' }">流行</li>
        <li @click="tag = '说唱'" :class="{ active: tag == '说唱' }">说唱</li>
        <li @click="tag = '摇滚'" :class="{ active: tag == '摇滚' }">摇滚</li>
        <li @click="tag = '民谣'" :class="{ active: tag == '民谣' }">民谣</li>
        <li @click="tag = '电子'" :class="{ active: tag == '电子' }">电子</li>
        <li @click="tag = '轻音乐'" :class="{ active: tag == '轻音乐' }">
          轻音乐
        </li>
        <li @click="tag = '影视原声'" :class="{ active: tag == '影视原声' }">
          影视原声
        </li>
        <li @click="tag = 'ACG'" :class="{ active: tag == 'ACG' }">ACG</li>
        <li @click="tag = '怀旧'" :class="{ active: tag == '怀旧' }">怀旧</li>
        <li @click="tag = '治愈'" :class="{ active: tag == '治愈' }">治愈</li>
        <li @click="tag = '旅行'" :class="{ active: tag == '旅行' }">旅行</li>
      </ul>
    </div>
    <div class="conten">
      <div
        class="box"
        v-for="item in lists"
        :key="item.id"
        @click="routerClick(item.id)"
      >
        <div class="box-top">播放量{{ item.playCount }}</div>
        <div>
          <img
            :src="item.coverImgUrl"
            width=""
            alt=""
            style="border-radius: 15px"
          />
        </div>
        <span>{{ item.name }}</span>
        <div class="layer">
          <i class="el-icon-video-play"></i>
        </div>
      </div>
    </div>
    <div class="block">
      <span class="demonstration"></span>
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        @current-change="currenClick"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      // 当前的标签
      tag: "全部",
      // 数据的列表
      lists: [],
      // 顶部数据
      topLists: [],
      // 总数量
      total: 1,
      // 第几页
      pager: "1",
    };
  },
  watch: {
    //数据改变的时候调用接口
    tag() {
      this.topList();
      this.list();
      // this.pager = 1;
    },
    pager() {
      // this.topList();
      this.list();
    },
  },
  mounted() {
    // 页面dom完成的时候调用接口
    this.topList();
    this.list();
  },
  methods: {
    topList() {
      axios({
        // 顶部的推荐歌单
        url: "https://autumnfish.cn/top/playlist/highquality",
        params: {
          // 获取多少条数据

          // 当前标签的数据
          cat: this.tag,
        },
      }).then((res) => {
        // console.log(res.data.playlists[0]);
        this.topLists = res.data.playlists[0];
      });
    },
    list() {
      axios({
        url: " https://autumnfish.cn/top/playlist/",
        params: {
          // 获取多少条数据
          limit: 10,
          // 那个标签的数据
          cat: this.tag,
          // 第几页(页数-1)*limit
          offset: (this.pager - 1) * 10,
        },
      }).then((res) => {
        // console.log(res.data.total);
        this.lists = res.data.playlists;
        this.total = res.data.total;
      });
    },
    // 点击分页换新数据
    currenClick(val) {
      // console.log(val);
      this.pager = val;
    },
    // 跳转页面带id

    routerClick(id) {
      this.$router.push(`/musicDetail/${id}`);
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  background: url("../../public/bj.jpg");
  // width: 500px;
  height: 200px;
  color: #fff;
  width: 100%;
  position: relative;

  img {
    width: 184px;
    height: 184px;
    padding: 8px;
    float: left;
  }
  .nr {
    width: 82%;
    float: right;
    height: 100%;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 200px;
  }
  .jp {
    margin: 5px 0;
    color: #fff;
    border: 3px solid yellow;
    width: 80px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    color: yellow;
    // float: left;
  }
  span {
    overflow: hidden;
    // float: left;
  }
  .into {
    font-size: 13px;
    color: #b8adad;
    text-indent: 2em;
    color: #888482;
    font-size: 14px;
    padding-top: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
  }
}
.nav {
  margin: 20px 0;
  ul {
    display: flex;
    li {
      font-size: 12px;
      margin-right: 20px;
      height: 30px;
      line-height: 30px;
      cursor: pointer;
    }
  }
}
.active {
  color: red;
}
.conten {
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
  // height: 500px;
  overflow: hidden;
  display: -webkit-box;
  margin-bottom: 50px;
  .box {
    width: 200px;
    margin: 10px;
    position: relative;
    cursor: pointer;
    img {
      width: 200px;
      height: 200px;
    }
  }
}
.box-top {
  position: absolute;
  top: -20px;
  visibility: hidden;

  left: 0;
  width: 100%;
  height: 20px;
  background-color: rgba(0, 0, 0, 0.8);
  // background: #000;
  text-align: center;
  font-size: 14px;
  border-radius: 10px;
  color: orange;

  -webkit-transition: visibility 5s;
  transition: visibility 5s;
  -moz-transition: visibility 5s;
  -o-transition: visibility 5s;

  -webkit-transition: top 0.5s;
  transition: top 0.5s;
  -moz-transition: top 0.5s;
  -o-transition: top 0.5s;
}
.layer {
  width: 200px;
  height: 200px;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  left: 0;
  top: 0;
  // display: none;
  opacity: 0;
  -webkit-transition: opacity 0.5s;
  -o-transition: opacity 0.5s;
  transition: opacity 0.5s;
  border-radius: 15px;

  text-align: center;
  line-height: 200px;
  .el-icon-video-play {
    font-size: 50px;
    color: yellow;
  }
}
.box:hover .layer {
  // display: block;
  opacity: 1;
}
.box:hover .box-top {
  // display: block;
  top: 0;
  visibility: visible;
}
</style>