<template>
  <div class="mainLogin">
    <div class="from-card">
      <div class="icon"></div>
      <el-form :model="LoginForm" :rules="rules" ref="loginFormRef">
        <el-form-item prop="username">
          <el-input
            v-model="LoginForm.username"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="LoginForm.password"
            prefix-icon="el-icon-unlock"
          ></el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import { loginUser } from '@/api/login'
export default {
  name: 'login',
  created () {

  },
  data () {
    return {
      rules: {
        username: [
          { required: true, message: '用户名不可以为空', trigger: 'blur' },
          { min: 3, max: 8, message: '用户名长度不对', trigger: 'blur' }
        ],
        password: [
          {
            required: true, message: '密码不可以为空', trigger: 'blur'
          },
          {
            min: 3, max: 8, message: '密码长度不对', trigger: 'blur'
          }
        ]
      },
      LoginForm: {
        username: 'admin',
        password: '123456'
      },
      user: []
    }
  },
  methods: {
    reset () {
      // element自带的重置功能
      this.$refs.loginFormRef.resetFields()
    },
    async login () {
      // validate是promise异步操作，需要使用async和try修饰
      try {
        await this.$refs.loginFormRef.validate()
        await this.$store.dispatch('user/getLoginUser', this.LoginForm)
        // console.log(this.$store.state.token)
        this.$router.push('/')
      } catch (err) {
        this.$message.error('表单数据错误')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
.mainLogin {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #f5f6f7;
}
.from-card {
  position: relative;
  width: 450px;
  height: 300px;
  padding: 110px 15px;
  box-sizing: border-box;
  background-color: #fff;
  .btn {
    text-align: right;
  }
  .icon {
    position: absolute;
    top: -60px;
    left: 50%;
    background-image: url("../../assets/logo.png");
    background-size: contain;
    background-position: center;
    transform: translateX(-50%);
    width: 120px;
    height: 120px;
    // background-color: red;
    border-radius: 50%;
  }
}
</style>
