<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="userName">
      <Input v-model="form.userName" placeholder="请输入用户名">
      <span slot="prepend">
        <Icon :size="16" type="ios-person"></Icon>
      </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="form.password" placeholder="请输入密码">
      <span slot="prepend">
        <Icon :size="14" type="md-lock"></Icon>
      </span>
      </Input>
    </FormItem>
    <FormItem>
      <div class="user-option-login">
        <span class="ivu-input-group-prepend user-pre">
          <Icon :size="14" type="ios-construct"></Icon>
        </span>
        <Select v-model="userModel" class="user-select">
          <Option v-for="item in roleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" type="primary" long>登录</Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: 'LoginForm',
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  data() {
    return {
      form: {
        userName: null,
        password: null
      },
      roleList: [
        {
          value: 'admin',
          label: '管理员'
        },
        {
          value: 'advertiser',
          label: '广告主'
        },
        {
          value: 'lease',
          label: '租赁商'
        },
        {
          value: 'service',
          label: '服务点'
        }
      ],
      userModel: 'admin'
    }
  },
  computed: {
    rules() {
      return {
        userName: this.userNameRules,
        password: this.passwordRules
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            userName: this.form.userName,
            password: this.form.password,
            role: this.userModel
          })
        }
      })
    }
  }
}
</script>
<style lang="less">
  .user-option-login {
    display: flex;
    height: 35px;
    overflow: hidden;

    .user-pre {
      width: 31px;
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .user-select {
      flex: 1;
      .ivu-select-selection {
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
      }
    }
  }
</style>

