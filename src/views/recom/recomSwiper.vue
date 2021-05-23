<template>
  <el-carousel :interval="4000" type="card" height="220px">
    <el-carousel-item v-for="item in imgList" :key="item.id">
      <img :src="item.imageUrl" alt="" />
    </el-carousel-item>
  </el-carousel>
</template>
<script>
import { Carousel, carouselItem } from "element-ui";
import Vue from "vue";
Vue.use(Carousel).use(carouselItem);
import axios from "axios";
export default {
  data() {
    return {
      imgList: [],
    };
  },
  mounted() {
    axios({
      url: "https://autumnfish.cn/banner",
      // method: "get",
    }).then((res) => {
      console.log();
      this.imgList = res.data.banners.slice(0, 5);
    });
  },
};
</script>
<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
</style>