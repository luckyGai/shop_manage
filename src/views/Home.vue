<template>
  <div class="home">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="3"
            ><div class="grid-content bg-purple">
              <img class="logo-img" src="../assets/login_bg.jpg" alt="" /></div
          ></el-col>
          <el-col :span="18"
            ><div class="grid-content bg-purple">后台管理系统</div></el-col
          >
          <el-col :span="3"
            ><div class="grid-content bg-purple">
              <!-- 退出登录弹框 -->
              <el-button type="paimary" @click="outLogin">退出</el-button>
            </div></el-col
          >
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-col :span="24">
            <el-menu
              default-active="/userlist"
              class="el-menu-vertical-demo el-menu"
              @open="handleOpen"
              @close="handleClose"
              background-color="#0b2d5a"
              text-color="#fff"
              active-text-color="#ffd04b"
              :unique-opened="true"
              :router="true"
            >
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-user"></i>
                  <span>用户管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/userlist">
                    <i class="el-icon-s-grid"></i>
                    用户列表
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-s-tools"></i>
                  <span>权限管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/rolelist">
                    <i class="el-icon-location"></i>
                    角色列表
                  </el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="/rightlist">
                    <i class="el-icon-location"></i>
                    权限列表
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-s-goods"></i>
                  <span>商品管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/goodslist">
                    <i class="el-icon-location"></i>
                    商品列表
                  </el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="3-2">
                    <i class="el-icon-location"></i>
                    分类参数
                  </el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="3-3">
                    <i class="el-icon-location"></i>
                    商品分类
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-s-order"></i>
                  <span>订单管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="4-1">
                    <i class="el-icon-location"></i>
                    订单列表
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="5">
                <template slot="title">
                  <i class="el-icon-s-marketing"></i>
                  <span>数据统计</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="5-1">
                    <i class="el-icon-location"></i>
                    数据报表
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "home",
  components: {},
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    //退出登录
    outLogin() {
      this.$confirm("此操作将退出登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          localStorage.removeItem("token");
          this.$router.push('/')
          this.$message({
            type: "warning",
            message: "用户退出登录!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "用户取消操作",
          });
        });
    },
  },
};
</script>
<style lang="scss" scope>
.home {
  width: 100%;
  height: 100%;
}

.logo-img {
  width: 70px;
  height: 40px;
  margin-top: 10px;
}
.el-header,
.el-footer {
  background-color: #0b2d5a;
  color: #fff;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #0b2d5a;
  color: #fff;
  text-align: left;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}

.home > .el-container {
  height: 100%;
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-menu{
  border-right: none !important;
}
</style>
