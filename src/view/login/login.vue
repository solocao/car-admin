
<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="submit"></login-form>
          <p class="login-tip">请输入账号和密码，选择登录角色</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/login-form'
import { mapActions, mapMutations } from 'vuex'
const md5 = require('md5')
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapMutations([
      'set'
    ]),
    async submit({ userName, password, role }) {
      const params = {
        url: 'user/login',
        payload: {
          name: userName,
          password: md5(password),
          role: role
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
    }
  }
}
</script>

<style lang="less">
  @import "./login.less";
</style>
