<template>
  <div class="login-container">
    <img class="logo-img" src="" alt="" />
    <!-- :rules="rules" 表单验证, ref 相当于 id，:model 表单数据对象, label-width 表单域标签的的宽度 -->

    <h2 class="login-title">欢迎使用后台管理系统</h2>
    <el-form
      :rules="rules"
      ref="form"
      :model="form"
      label-width="80px"
      class="login-form"
    >
      <!-- 注意： prop 是加在 el-form-item 组件上 -->
      <div class="login-form-box">
        <el-form-item class="login-form-item" prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入帐号"
          ></el-input>
        </el-form-item>
        <el-form-item class="login-form-item" prop="password">
          <el-input
            type="password"
            v-model="form.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="formy">
          <el-button class="login-btn" type="primary" @click="submitForm('form')"
            >登录</el-button
          >
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
// import loginApi from "../../api/login";

export default {
  data() {
    return {
      // 表单校验
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          // 对应el-form-item 的 prop 值
          { required: true, message: "请输入有效帐号", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入有效密码", trigger: "blur" },
        ],
      },
    };
  },

  methods: {
    // 注意：按钮上调用的函数名要一致 submitForm
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(valid);
            // 验证帐号和密码是否通过，
            console.log(this.form.username);

        //   loginApi.getList(this.form.username, this.form.password)
        //       .then(response => {
        //         const resp = response.data;
        //         localStorage.setItem("adminToken", resp.data.token);
        //           console.log(resp)

        //         if (resp.code) {
        //           //通过token,在加上调用用户信息接口获取数据
        //           loginApi.getInfo().then(response => {
        //             console.log(response)
        //             const respUser = response.data;

        //             if (resp.code) {
        //               //将用户信息存储到本地
        //               localStorage.setItem("adminInfo",JSON.stringify(respUser.data));
        //               //将token存储到本地

        //               //跳转到首页
        //               this.$router.push("/");
        //             } else {
        //               this.$message({
        //                 duration: 1 * 1000,
        //                 showClose: true,
        //                 message: resp.message,
        //                 type: "warning"
        //               });
        //             }
        //           });
        //         } else {
        //           // 未通过,弹出警告
        //           this.$message({
        //             duration: 1 * 3000,
        //             showClose: true,
        //             message: "未通过",
        //             type: "warning"
        //           });
        //         }
        //       });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.logo-img {
  width: 260px;
  height: 160px;
  margin: 0px auto;
  display: block;
}
.login-btn {
  width: 340px;
  margin-top: 20px;
}
.login-form {
  width: 500px;
  margin: 10px auto;
}
.login-container {
  width: 100%;
  height: 100%;
  background: url("../assets/login_bg.jpg");
  background-size: 100% 100%;
  padding-top: 80px;

}
.login-title {
  font-size: 20px;
  margin: 40px 0;
  width: 100%;
  text-align: center;
  color: rgb(0, 89, 255);
}
.login-form-item {
  margin-right:80px;
}
</style>
