<template>
  <div>
    <el-button type="info" @click="logout">退出登录</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      // 清除token
      window.sessionStorage.clear();
      // 重定向到登录页
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped></style>
