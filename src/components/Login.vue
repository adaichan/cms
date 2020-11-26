<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="logo" />
      </div>
      <!-- 登录表单区域 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0" class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <!-- @keyup.enter.native="方法名"用来给表单绑定回车按下的方法 -->
          <el-input @keyup.enter.native="login" v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" type="password"></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 登录表单的数据绑定对象
      loginForm: {
        username: '',
        password: ''
      },
      // 登录表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入您的用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '用户名必须在 3 到 10 个字符之间！', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '密码必须在 6 到 15 个字符之间！', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    // 点击重置按钮，重置登录表单
    resetLoginForm () {
      // console.log(this)
      this.$refs.loginFormRef.resetFields()
    },
    // 判断服务器接口用户数据并返回提示
    login () {
      // 通过this.$refs拿到表单的引用调用element的方法
      this.$refs.loginFormRef.validate(async valid => {
        // console.log(valid) 打印输出true/false
        if (!valid) return
        /* post的返回值是promise，用async和await来简化promise操作，console.log(rst) 发现接收对象的data属性中的数据才是我们需要的，利用解构赋值来解构右边的data属性赋值给变量rst去接收 */
        const { data: rst } = await this.$http.post('login', this.loginForm)
        if (rst.meta.status !== 200) return this.$message.error('密码错误，登录失败！')
        this.$message.success('恭喜你，登陆成功！')
        // 1. token只在当前网站打开期间生效，将登陆成功的token保存在sessionStorage中，提供一个身份验证的信息，使项目的其他API接口在登入后才能访问
        window.sessionStorage.setItem('token', rst.data.token)
        // 2. 通过编程式导航跳转到后台主页，路由地址是/home
        this.$router.push('/home')
      })
    }
  }
};
</script>

<style lang="less" scoped>
//scoped表示样式只在当前组件生效，防止组件间样式冲突
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    bottom: 1px solid #eee;
    border-radius: 50%;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
