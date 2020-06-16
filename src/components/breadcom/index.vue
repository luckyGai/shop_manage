<template>
  <!-- 面包屑导航 -->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{lavel1}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{lavel2}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: "myBread",
  data() {
    return {};
  },
  props: {
    lavel1:{
      type:String,
      default:"一级"
    },
    lavel2:{
      type:String,
      default:"二级"
    }
  },
  components: {},
  mounted() {},
  created() {},
  methods: {},
  watch: {},
  computed: {},
};
</script>

<style scoped></style>
