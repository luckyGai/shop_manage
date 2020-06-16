<template>
  <div class="">
    <myBread lavel1="权限管理" lavel2="权限列表"></myBread>
    <el-card>
      <el-table :data="rightList" border style="width: 100%">
        <el-table-column type="index" label="#" width="80"> </el-table-column>
        <el-table-column prop="authName" label="权限名称" width="180">
        </el-table-column>
        <el-table-column prop="path" label="路径" width="180">
        </el-table-column>
        <el-table-column prop="level" label="等级">
          <template slot-scope="scope">
            <el-tag type="success">
              {{scope.row.row.level | levelFn}}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getRightList } from "@/http/api.js";
export default {
  name: "",
  data() {
    return {
      rightList: [],
    };
  },
  props: {},
  //   components: {myBread},
  mounted() {},
  created() {
    this.getRightList();
  },
  methods: {
    //获取权限列表
    async getRightList() {
      // 获取权限列表接口
      const res = await getRightList();
      console.log(res);
      this.rightList = res.data.data;
    },
  },
  watch: {},
  computed: {},
};
</script>

<style scoped>
.el-card {
  margin-top: 20px;
}
</style>
