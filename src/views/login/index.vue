<template>
  <div class="login">
    <div class="login-box">
      <h2>用户登录</h2>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model="ruleForm.username" type="text"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" type="password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >登录</el-button
          >
          <el-button type="info" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "@/http/api.js";
export default {
  name: "",
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
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
      },
    };
  },

  props: [],
  components: {},
  mounted() {},
  created() {
    let token = localStorage.getItem("token");
    if (token) {
      this.$router.push("/home");
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          login(this.ruleForm.username, this.ruleForm.password).then((res) => {
            // console.log(res);
            if (res.status == 200) {
              if (res.data.data) {
                const token = res.data.data.token;
                localStorage.setItem("token", token);
              } else {
                this.$message({
                  message: res.data.meta.msg,
                  type: "error",
                });
                return;
              }
              console.log(res.data.data)
              this.$router.push(this.$route.query.redirect?this.$route.query.redirect:'/home');
              this.$notify({
                title: "登录成功",
                message: `欢迎您,${res.data.data.username}`,
                type: "success",
              });
            }
          });
        } else {
          console.log("error submit!!");
          this.$message({
            message: "格式填写不正确",
            type: "error",
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  watch: {},
  computed: {},
};
</script>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100%;
  background: #014a7a;
}
.login-box {
  width: 35%;
  height: 40%;
  background: #fff;
  border-radius: 10px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  text-align: center;
  h2 {
    text-align: center;
    margin: 20px 0;
    font-size: 24px;
    font-weight: bolder;
  }
}
@media screen and (max-width: 850px) {
  .login-box {
    width: 400px;
  }
}
.el-form {
  padding: 10px 60px 0 0;
}
</style>
