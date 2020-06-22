<template>
  <div class="">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片布局 -->
    <el-card class="box-card el-card">
      <!-- 搜索用户 -->
      <el-input
        placeholder="请输入内容"
        v-model.trim="pageInfo.query"
        clearable
        class="search"
        @input="searchUser"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="searchUser"
        ></el-button
      ></el-input>
      <!-- 添加用户 -->
      <el-button type="primary" @click="addUser">添加用户</el-button>

      <!-- 用户信息展示及编辑 -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align="center" type="index" label="#" width="40"> </el-table-column>
        <el-table-column align="center" prop="username" label="姓名" width="100">
        </el-table-column>
        <el-table-column align="center" prop="email" label="邮箱"> </el-table-column>
        <el-table-column align="center" prop="mobile" label="电话"> </el-table-column>
        <el-table-column align="center" prop="role_name" label="角色"> </el-table-column>
        <el-table-column align="center" label="创建时间">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{
              scope.row.create_time | date
            }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="" label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="editUserState(scope.row.id, scope.row.mg_state)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="" label="操作" width="170">
          <template slot-scope="scope">
            <!-- 编辑按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="editUser(scope.row)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="deleteUser(scope.row.id)"
            ></el-button>

            <!-- 权限管理按钮 -->
            <el-button
              type="warning"
              icon="el-icon-star-off"
              circle
              @click="setRoleDia(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
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
    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="userInfo" :rules="rules" ref="adduser">
        <el-form-item
          label="用户名"
          :label-width="formLabelWidth"
          prop="username"
        >
          <el-input v-model="userInfo.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          :label-width="formLabelWidth"
          prop="password"
        >
          <el-input v-model="userInfo.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="userInfo.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth" prop="mobile">
          <el-input
            v-model.number="userInfo.mobile"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserData('adduser')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 编辑用户 -->
    <el-dialog title="编辑用户" :visible.sync="editFormVisible">
      <el-form :model="userInfo" :rules="rules" ref="editusers">
        <el-form-item
          label="用户名"
          :label-width="formLabelWidth"
          prop="username"
        >
          <el-input
            v-model="userInfo.username"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input
            v-model="userInfo.email"
            value="userInfo.email"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth" prop="mobile">
          <el-input
            v-model.number="userInfo.mobile"
            autocomplete="off"
            :value="phone"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserData('editusers')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 分配角色 -->
    <el-dialog title="分配角色" :visible.sync="dialogFormRole">
      <el-form>
        <el-form-item label="当前用户:" label-width="120px">
          {{ setRoleUser }}
        </el-form-item>
        <el-form-item label="分配角色" label-width="120px">
          <el-select v-model="roleId" placeholder="请选择角色">
            <el-option
              v-for="(item, index) in roles"
              :key="index"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormRole = false">取 消</el-button>
        <el-button type="primary" @click="setUserRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  userList,
  addUser,
  deleteUser,
  editUser,
  findUser,
  editUserState,
  getRoleList,
  getUserRoleInfo,
  setUserRole,
} from "@/http/api.js";
import _ from "lodash";
export default {
  name: "",
  data() {
    return {
      phone: 123,
      tableData: [],
      pageInfo: {
        query: "",
        pagenum: 1, //当前页码
        pagesize: 3, //每页显示的条数
      },
      userInfo: {
        username: "",
        password: "",
        email: "",
        mobile: "",
        mg_state: "",
      },
      total: 0,
      value: false,
      // 添加用户规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur"],
          },
        ],
        mobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          // { min: 11, max: 12, message: "请输入正确格式的手机号", trigger: "blur" },
          { type: "number", message: "手机号必须为数字值", trigger: "blur" },
        ],
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "70px",
      editFormVisible: false,
      //编辑用户id
      id: null,
      //分配角色弹框
      dialogFormRole: false,
      roleId: "",
      setRoleUser: "",
      roles: [],
      setUserId: "",
    };
  },
  props: [],
  components: {},
  mounted() {},
  created() {
    // console.dir(_);
    this.getUserList();
  },
  methods: {
    //获取用户列表
    getUserList() {
      userList(this.pageInfo).then((res) => {
        // console.log(res);
        let {
          data: { pagenum, total, users, mg_state },
          meta: { msg, status },
        } = res.data;
        // console.log(total)
        if (status === 200) {
          this.tableData = users;
          this.pageInfo.pagenum = pagenum;
          this.total = total;
          this.pageInfo.mg_state = mg_state;
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
      this.pageInfo.pagesize = val;
      this.getUserList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageInfo.pagenum = val;
      this.getUserList();
    },
    // 搜索用户,防抖处理
    searchUser: _.debounce(function() {
      this.getUserList();
    }, 300),
    //显示添加用户弹框
    addUser() {
      this.dialogFormVisible = true;
    },
    //添加用户请求接口

    addUserData(adduser) {
      this.$refs[adduser].validate((valid) => {
        if (valid) {
          addUser(this.userInfo).then((res) => {
            // console.log(res)
            const {
              meta: { msg, status },
            } = res.data;
            if (status === 201) {
              this.$message({
                message: msg,
                type: "success",
              });
              this.userInfo = {
                username: "",
                password: "",
                email: "",
                mobile: "",
              };
              this.dialogFormVisible = false;
              this.getUserList();
            }
            if (status === 400) {
              this.$message({
                message: msg,
                type: "error",
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //删除用户
    deleteUser(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteUser(id).then((res) => {
            // console.log(res)
            const {
              meta: { msg, status },
            } = res.data;
            if (status === 200) {
              this.getUserList();
            } else {
              this.$message({
                message: msg,
                type: "error",
              });
            }
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //更改用户状态
    editUserState(id, state) {
      editUserState(id, state).then((res) => {
        const {
          meta: { msg, status },
        } = res.data;
        if (status === 200) {
          this.$message({
            message: msg,
            type: "success",
          });
          this.getUserList();
        } else {
          this.$message({
            message: msg,
            type: "error",
          });
        }
      });
    },
    //编辑用户弹框
    editUser(user) {
      this.id = user.id;
      this.userInfo.username = user.username;
      this.userInfo.mobile = user.mobile;
      this.userInfo.email = user.email;
      this.editFormVisible = true;
    },
    //编辑用户
    editUserData() {
      editUser(this.id, this.userInfo.mobile, this.userInfo.email).then(
        (res) => {
          const {
            meta: { msg, status },
          } = res.data;
          if (status === 200) {
            this.$message({
              message: msg,
              type: "success",
            });
            this.editFormVisible = false;
            this.getUserList();
          } else {
            this.$message({
              message: msg,
              type: "error",
            });
          }
        }
      );
    },
    //分配角色弹框
    async setRoleDia(user) {
      // console.log(user);
      this.setRoleUser = user.username;
      this.setUserId = user.id;
      let res = await getRoleList();
      // console.log(res)
      this.roles = res.data.data;
      let res1 = await findUser(user.id);
      const {
        meta: { msg, status },
      } = res1.data;
      if (status === 200) {
        let roleid = res1.data.data.rid;
        getUserRoleInfo(roleid).then((result) => {
          // console.log(result);
          if (!result.data.data) {
            this.$message({
              message: "用户没有分配到角色",
              type: "error",
            });
          }
        });
        this.$message({
          message: msg,
          type: "success",
        });
      }

      this.dialogFormRole = true;
    },
    //分配用户角色
    setUserRole() {
      setUserRole(this.setUserId, { rid: this.roleId }).then((res) => {
        // console.log(res);
        if (res.status === 200) {
          if (res.data.data) {
            this.$message({
              message: res.data.meta.msg,
              type: "success",
            });
          } else {
            this.$message({
              message: res.data.meta.msg,
              type: "error",
            });
          }
          this.dialogFormRole = false;
        }
      });
    },
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
.el-table{
  background: yellowgreen;
}
</style>
