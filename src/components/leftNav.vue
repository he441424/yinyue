<template>
  <div>
    <ul>
      <router-link
        v-for="item in list"
        :key="item.id"
        tag="li"
        :to="item.type"
        active-class="active"
      >
        {{ item.title }}
      </router-link>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //   list: ["推荐", "最新", "发现", "排行榜", "mv"],
      list: [
        {
          title: "推荐",
          type: "/recommend",
        },
        { title: "最新", type: "/newest" },
        { title: "发现", type: "/find" },
        // { title: "排行榜", type: "/rakingLine" },
        { title: "mv", type: "/mv" },
      ],
    };
  },
};
</script>
<style scoped lang="scss">
ul {
  li {
    width: 100%;
    height: 80px;
    line-height: 80px;
    text-align: center;
    margin-bottom: 8px;
    // background: rgb(139, 248, 139);
  }
}
li:hover {
  background: rgb(255, 255, 255);
}
.active {
  background: rgb(255, 255, 255);
  color: #000;
}
</style>