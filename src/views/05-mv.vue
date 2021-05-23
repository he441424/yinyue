<template>
  <div>
    <div class="nav">
      <ul>
        <li>区域：</li>
        <li @click="area = '全部'" :class="{ active: area == '全部' }">全部</li>
        <li @click="area = '内地'" :class="{ active: area == '内地' }">内地</li>
        <li @click="area = '港台'" :class="{ active: area == '港台' }">港台</li>
        <li @click="area = '欧美'" :class="{ active: area == '欧美' }">欧美</li>
        <li @click="area = '日本'" :class="{ active: area == '日本' }">日本</li>
        <li @click="area = '韩国'" :class="{ active: area == '韩国' }">韩国</li>
      </ul>

      <ul>
        <li>类型：</li>
        <li @click="type = '全部'" :class="{ active: type == '全部' }">全部</li>
        <li @click="type = '官方版'" :class="{ active: type == '官方版' }">
          官方版
        </li>
        <li @click="type = '原声'" :class="{ active: type == '原声' }">原声</li>
        <li @click="type = '现场版'" :class="{ active: type == '现场版' }">
          现场版
        </li>
        <li @click="type = '网易出品'" :class="{ active: type == '网易出品' }">
          网易出品
        </li>
      </ul>
      <ul>
        <li @click="order = '最新'" :class="{ active: order == '最新' }">
          最新
        </li>
        <li @click="order = '最热'" :class="{ active: order == '最热' }">
          最热
        </li>
      </ul>
    </div>
    <div class="conent">
      <div
        class="box"
        v-for="item in list"
        :key="item.id"
        @click="routerClick(item.id)"
      >
        <!-- 播放量 -->
        <div class="box-top">播放量为{{ item.playCount }}</div>
        <!-- 图片 -->
        <div>
          <img :src="item.cover" width="" alt="" style="border-radius: 15px" />
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
    <!-- 分页器 -->
    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :total="1000"
        background:true
        @current-change="pagerClick"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  mounted() {
    this.mvList();
  },
  data() {
    return {
      list: [],
      // 地区
      area: "全部",
      //  类型
      type: "全部",
      // 排序
      order: "最新",
      // 第几页
      pager: 1,
    };
  },
  watch: {
    // 监听数据改变的时候就请求axios
    area() {
      this.mvList();
    },
    type() {
      this.mvList();
    },
    order() {
      this.mvList();
    },
    pager() {
      this.mvList();
    },
  },
  methods: {
    mvList() {
      axios({
        url: " https://autumnfish.cn/mv/all",
        params: {
          // 排序
          order: this.order,
          // 类型
          type: this.type,
          // 区域
          area: this.area,
          // 一次获取第三条数据
          limit: 8,
          // 第几页的数据
          offset: (this.pager - 1) * 8,
        },
      }).then((res) => {
        console.log(res.data.data);
        this.list = res.data.data;
      });
    },
    // 点击分页的时候切换数据
    pagerClick(val) {
      this.pager = val;
    },
    // 点击跳转路由
    routerClick(id) {
      console.log(id);
      this.$router.push(`/mvDetail/${id}`);
      // this.$router.replace(`/mvDetail/${id}`);
    },
  },
};
</script>
<style lang="scss" scoped>
ul {
  display: flex;
  height: 40px;
  line-height: 40px;
  margin-bottom: 15px;
  li {
    width: 80px;
    text-align: center;
  }
}
.active {
  background: green;
  color: #fff;
  // height: 30px;
}
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
    width: 278px;
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
.box:hover .layer {
  // display: block;
  opacity: 1;
}
.block {
  text-align: center;
}
</style>