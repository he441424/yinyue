<template>
  <div>
    <el-input
      v-model="input"
      placeholder="请输入内容"
      clearable
      maxlength="200px"
      @change="chan"
    ></el-input>
  </div>
</template>
<script>
import { input } from "element-ui";
import Vue from "vue";
Vue.use(input);
export default {
  data() {
    return {
      input: "",
    };
  },
  methods: {
    chan(value) {
      this.$router.push(`/search/${value}`);
    },
  },
};
</script>
<style lang="scss" scoped>
.el-input {
  max-width: 300px;
  text-align: center;
}
</style>