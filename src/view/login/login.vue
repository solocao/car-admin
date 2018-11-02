<style lang="less">
@import "./login.less";
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">输入任意用户名和密码即可</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions, mapMutations } from 'vuex'
const md5 = require('md5')
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'set',
      'handleLogin',
      'getUserInfo'
    ]),
    ...mapMutations([
      'set'
    ]),
    async  handleSubmit ({ userName, password }) {
      const params = {
        url: 'user/login',
        payload: {
          name: userName,
          password: md5(password)
        }
      }
      const result = await this.post(params)
      if (result.code === 1) {
        this.set({ login: true, info: result.data })
        this.$router.push({
          name: 'home'
        })
      } else {
        this.$Message.error(result.msg)
      }
      console.log(result)

      // this.handleLogin({ userName, password }).then(res => {
      //   this.getUserInfo().then(res => {
      //     this.$router.push({
      //       name: 'home'
      //     })
      //   })
      // })
    }
  }
}
</script>

<style>
</style>
