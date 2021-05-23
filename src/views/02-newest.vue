<template>
  <div>
    <div class="tab">
      <span @click="tag = '0'" :class="{ active: tag == '0' }">全部</span>
      <span @click="tag = '7'" :class="{ active: tag == '7' }">华语</span>
      <span @click="tag = '96'" :class="{ active: tag == '96' }">欧美</span>
      <span @click="tag = '8'" :class="{ active: tag == '8' }">日本</span>
      <span @click="tag = '16'" :class="{ active: tag == '16' }">韩国</span>
    </div>

    <div>
      <!-- <th>1</th>
        <th>2</th>
        <th>音乐</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>时长</th> -->
      <ul style="display: flex">
        <li></li>
        <li></li>
        <li>音乐</li>
        <li>歌手</li>
        <li>专辑</li>
        <li>时长</li>
        <li></li>
      </ul>
    </div>
    <div>
      <ul
        v-for="(item, index) in list"
        :key="item.id"
        @click="playClick(item.id)"
      >
        <li>{{ index + 1 }}</li>
        <li><img :src="item.album.picUrl" alt="" /></li>
        <li>{{ item.name }}</li>
        <li>{{ item.album.artists["0"].name }}</li>
        <li>{{ item.album.name }}</li>
        <li>{{ item.duration | duration }}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Vue from "vue";
import { mapActions } from "vuex";
// 处理数据转换成分秒
Vue.filter("duration", (val) => {
  // 假定 	350750 毫秒
  // 秒 350750/1000  350秒
  // 分 350 /60
  // 秒 350 % 60
  let min = parseInt(val / 1000 / 60);
  let sec = parseInt((val / 1000) % 60);
  min < 10 ? (min = "0" + min) : min;
  sec < 10 ? (sec = "0" + sec) : sec;
  return `${min}:${sec}`;
});
export default {
  data() {
    return {
      list: [],
      tag: "0",
    };
  },
  watch: {
    tag() {
      console.log(22);
      axios({
        url: "https://autumnfish.cn/top/song",

        method: "get",
        params: {
          // limit: 10,
          type: this.tag,
        },
      }).then((res) => {
        console.log(res.data.data);
        this.list = res.data.data.splice(0, 10);
      });
    },
  },
  mounted() {
    axios({
      url: "https://autumnfish.cn/top/song",

      method: "get",
      params: {
        // limit: 10,
        type: this.tag,
      },
    }).then((res) => {
      this.list = res.data.data;
    });
  },
  methods: {
    ...mapActions("play", ["playUrl"]),
    playClick(id) {
      this.playUrl(id);
    },
  },
};
</script>
<style lang="scss" scoped>
.tab {
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  span {
    margin-right: 20px;
    font-size: 15px;
    cursor: pointer;
  }
}
.active {
  color: red;
}
ul:hover {
  background: rgba(0, 0, 0, 0.1);
}
ul {
  cursor: pointer;
  display: flex;
  height: 70px;
  line-height: 70px;
  margin-top: 10px;
  // background: rgba(85, 82, 82, 0.3);

  li {
    width: 50px;
    text-align: center;
  }
  li:nth-child(3) {
    width: 300px;
  }
  li:nth-child(2) {
    width: 100px;
    overflow: hidden;
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
  }
}
</style>