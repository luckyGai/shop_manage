<template>
  <div class="">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card el-card">
      <el-input
        placeholder="请输入内容"
        v-model="query"
        clearable
        class="search"
      >
        <el-button slot="append" icon="el-icon-search"></el-button
      ></el-input>
      <el-button type="primary">添加用户</el-button>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="#" width="40"> </el-table-column>
        <el-table-column prop="username" label="姓名" width="100">
        </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{
              scope.row.create_time | date
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="" label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作"> </el-table-column>
      </el-table>
      <!-- 添加分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.pagenum"
        :page-sizes="[3, 5, 10, 20]"
        :page-size="3"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { userList } from "@/http/api.js";
export default {
  name: "",
  data() {
    return {
      query: "",
      tableData: [],
      pageInfo: {
        query: "",
        pagenum: 1,//当前页码
        pagesize: 3,//每页显示的条数
      },
      total: 0,
      value: false,
    };
  },
  props: [],
  components: {},
  mounted() {},
  created() {
    this.getUserList();
  },
  methods: {
    //获取用户列表
    getUserList() {
      userList(this.pageInfo).then((res) => {
        // console.log(res);
        let {
          data: { pagenum, total, users },
          meta: { msg, status },
        } = res.data;
        // console.log(total)
        if (status === 200) {
          this.tableData = users;
          this.pageInfo.pagenum = pagenum;
          this.total = total;
          this.$message({
            message: msg,
            type: "success",
          });
        } else {
          this.$message({
            message: msg,
            type: "error",
          });
        }
      });
    },
    //分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageInfo.pagesize=val;
        this.getUserList()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pageInfo.pagenum=val
        this.getUserList()
      }
  },
  watch: {},
  computed: {},
};
</script>

<style lang="scss" scoped>
.el-card {
  margin-top: 20px;
}
.search {
  width: 300px;
  margin-right: 10px;
  margin-bottom: 20px;
}
</style>
