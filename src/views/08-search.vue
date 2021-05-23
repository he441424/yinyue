<template>
  <div>
    <div class="header">
      <i>{{ $route.params.key }}</i> 共找到{{ total }}个结果
    </div>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- 歌单 -->
      <el-tab-pane label="歌单" name="first">
        <div class="conent">
          <div
            class="box"
            v-for="item in songList"
            :key="item.id"
            @click="songClick(item.id)"
          >
            <!-- 播放量 -->
            <div class="box-top">播放量为{{ item.playCount }}</div>
            <!-- 图片 -->
            <div>
              <img
                :src="item.coverImgUrl"
                width=""
                alt=""
                style="border-radius: 15px"
              />
            </div>
            <!-- 遮罩层 -->
            <div class="layer">
              <i class="el-icon-video-play"></i>
            </div>
            <!-- 名称 -->
            <span
              style="
            display: block;
            height: 20px;
            line-heightl25px;overflow: hidden;
            text-overflow: ellipsis;
    -webkit-box-orient: vertical;

          "
              >{{ item.name }}</span
            >
            <!-- 艺人 -->
            <p style="font-size: 13px margin-top:5px;">{{ item.artistName }}</p>
          </div>
        </div>
      </el-tab-pane>
      <!-- 歌曲 -->
      <el-tab-pane label="歌曲" name="second">
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
            <li>音乐</li>
            <li>歌手</li>
            <li>专辑</li>
            <li>时长</li>
            <li></li>
          </div>

          <ul
            v-for="(item, index) in musicList"
            :key="item.id"
            @click="playClick(item.id)"
          >
            <!-- 第n个 -->
            <li>{{ index + 1 }}</li>
            <!-- 封面 -->
            <!-- <li style="position: relative">
              
              <i class="icon el-icon-caret-right"></i>
              
              <img :src="item.artists.img1v1Url" alt="" />
            </li> -->
            <!-- 歌曲名称 -->
            <li style="font-size: 12px; overflow: hidden">
              {{ item.name }}
            </li>
            <li>
              {{ item.artists[0].name }}
            </li>
            <li>{{ item.album.name }}</li>
            <!-- 时长 -->
            <li>{{ item.duration | duration }}</li>
          </ul>
        </div>
      </el-tab-pane>
      <!-- mv -->
      <el-tab-pane label="mv" name="third">
        <div class="conent">
          <div
            style="width: 278px"
            class="box"
            v-for="item in mvList"
            :key="item.id"
            @click="mvClick(item.id)"
          >
            <!-- 播放量 -->
            <div class="box-top">播放量为{{ item.playCount }}</div>
            <!-- 图片 -->
            <div>
              <img
                :src="item.cover"
                width=""
                alt=""
                style="border-radius: 15px; height: 160px"
              />
            </div>
            <!-- 遮罩层 -->
            <div class="layer2">
              <i class="el-icon-video-play"></i>
            </div>
            <!-- 名称 -->
            <span
              style="
            display: block;
            height: 20px;
            line-heightl25px;overflow: hidden;
            text-overflow: ellipsis;
    -webkit-box-orient: vertical;

          "
              >{{ item.name }}</span
            >
            <!-- 艺人 -->
            <p style="font-size: 13px margin-top:5px;">{{ item.artistName }}</p>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 分页器 -->
    <el-pagination
      :total="total"
      layout="prev, pager, next"
      @current-change="currenClick"
    ></el-pagination>
  </div>
</template>

<script>
import { tabs, tabPane } from "element-ui";
import Vue from "vue";
import axios from "axios";
import { mapActions } from "vuex";
Vue.use(tabs).use(tabPane);
export default {
  data() {
    return {
      // 默认第一个先显示
      activeName: "first",
      // 歌单列表
      songList: [],
      //当前显示的标签为 歌单为1000 歌曲为1 mv为1004
      tag: 1000,
      //   歌曲列表
      musicList: [],
      //   mv
      mvList: [],
      //   总的数量
      total: 0,
      // 搜索的名称
      searchName: "",
      //   页数
      pagin: 1,
    };
  },
  mounted() {
    // axios(
    //   `/search?keywords=${this.$route.params.key}&limit=10&offset=0&type=1000`
    // ).then((res) => {
    //   //   console.log(res.data.result.playlists);
    //   this.songList = res.data.result.playlists;
    // });
    this.axiosList();
  },
  watch: {
    //   监听路由发生改变就重新请求axios
    $route() {
      this.axiosList();
    },
    // 监听切换的标签
    tag() {
      this.axiosList();
    },
    // 监听第几页
    pagin() {
      this.axiosList();
    },
  },
  methods: {
    //   请求数据
    axiosList() {
      axios(
        `/search?keywords=${this.$route.params.key}&limit=10&offset=${
          (this.pagin - 1) * 10
        }&type=${this.tag}`
      ).then((res) => {
        // console.log(res.data.result.playlists);
        if (this.tag == 1000) {
          // 数据
          this.songList = res.data.result.playlists;
          // 数量
          this.total = res.data.result.playlistCount;
        } else if (this.tag == 1) {
          //   console.log(res.data.result.songs);
          // 数据
          this.musicList = res.data.result.songs;
          // 数量
          this.total = res.data.result.songCount;
        } else if (this.tag == 1004) {
          // 数据
          this.mvList = res.data.result.mvs;
          // 数量
          this.total = res.data.result.mvCount;
        }
      });
    },
    // 展开vuex的actions
    ...mapActions("play", ["playUrl"]),
    // 点击tabs切换的时候tag赋值
    handleClick(tab) {
      if (tab.label == "歌单") {
        this.tag = 1000;
      } else if (tab.label == "歌曲") {
        this.tag = 1;
      } else if (tab.label == "mv") {
        this.tag = 1004;
      }
    },
    // 跳转mv详情
    mvClick(id) {
      this.$router.push(`/mvDetail/${id}`);
    },
    // 歌单详情页
    songClick(id) {
      this.$router.push(`/musicDetail/${id}`);
    },
    // 播放音乐
    playClick(id) {
      this.playUrl(id);
    },
    // 分页器
    currenClick(val) {
      this.pagin = val;
    },
  },
};
</script>
<style lang="scss" scoped>
// 歌单
.conent {
  text-align: center;
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
  // height: 500px;
  overflow: hidden;
  display: -webkit-box;
  margin-bottom: 50px;
  width: 100%;
  p {
    color: #ccc;
    font-size: 12px;
  }
  .box {
    width: 210px;
    margin-right: 10px;
    margin-bottom: 15px;
    position: relative;
    cursor: pointer;
    img {
      width: 100%;
      height: 200px;
    }
  }
}
.box-top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 20px;
  background-color: rgba(0, 0, 0, 0.3);
  // background: #000;
  text-align: center;
  font-size: 12px;
  border-radius: 10px;
  color: orange;
}
.layer {
  width: 210px;
  height: 200px;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  left: 0;
  top: 0;
  // display: none;
  opacity: 0;
  -webkit-transition: opacity 0.9s;
  transition: opacity 0.9s;
  -o-transition: opacity 0.9s;
  -moz-transition: opacity 0.9s;
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

// 歌曲
.list {
  font-size: 14px;
  ul,
  .ul {
    cursor: pointer;
    display: flex;
    height: 60px;
    line-height: 60px;
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

// mv

.layer2 {
  width: 278px;
  height: 160px;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  left: 0;
  top: 0;
  // display: none;
  opacity: 0;
  -webkit-transition: opacity 0.9s;
  transition: opacity 0.9s;
  -o-transition: opacity 0.9s;
  -moz-transition: opacity 0.9s;
  border-radius: 15px;

  text-align: center;
  line-height: 200px;
  .el-icon-video-play {
    font-size: 50px;
    color: yellow;
  }
}
.box:hover .layer2 {
  // display: block;
  opacity: 1;
}
.block {
  text-align: center;
}
</style>