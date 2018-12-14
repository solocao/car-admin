<template>
  <div class="lease-user-add">
    <Card :bordered="false" class="z-search">
      <p slot="title">新增租赁商</p>
      <Form ref="form" :model="form" :label-width="100" :rules="ruleValidate">
        <FormItem label="租赁商名称" prop="name">
          <Input v-model="form.name" placeholder="请输入租赁商名称" />
        </FormItem>
        <FormItem label="登录密码" prop="password">
          <Input v-model="form.password" type="password" placeholder="请输入租赁商登录密码" />
        </FormItem>
        <FormItem label="租赁商LOGO" prop="logo">
          <image-upload :img.sync="form.logo" :path="path"></image-upload>
        </FormItem>
        <FormItem label="租赁商地址" prop="address">
          <Input v-model="form.address" placeholder="请输入活动简介" />
        </FormItem>
        <FormItem label="联系人" prop="contact">
          <Input v-model="form.contact" placeholder="请输入联系人姓名" />
        </FormItem>
        <FormItem label="联系人头像" prop="avatar">
          <image-upload :img.sync="form.avatar" :path="path"></image-upload>
        </FormItem>
        <FormItem label="联系方式" prop="mobile">
          <Input v-model="form.mobile" placeholder="请输入联系人电话" />
        </FormItem>
      </Form>
      <div class="btn-submit">
        <Button type="primary" @click="submit">确认提交</Button>
      </div>
    </Card>
  </div>
</template>
<script>
import ImageUpload from '@components/upload/ImageUpload.vue'
const md5 = require('md5')
export default {
  data() {
    return {
      // 租赁商
      form: {
        // 租赁商名称
        name: null,
        // 登录密码
        password: null,
        // 公司logo
        logo: null,
        // 租赁公司地址
        address: null,
        // 联系人
        contact: null,
        // 联系电话
        mobile: null,
        // 联系人头像
        avatar: null
      },
      path: 'lease',
      // 验证条件
      ruleValidate: {
        name: [{ required: true, message: '租赁商名称不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '登录密码不能为空', trigger: 'blur' }],
        logo: [
          { required: true, message: '请上传租赁商logo', trigger: 'blur' },
          {            validator(rule, value, callback, source, options) {
              const errors = []
              if (value === undefined) { errors.push('请上传租赁商logo') }
              callback(errors)
            }
          }
        ],
        address: [{ required: true, message: '租赁商地址不能为空', trigger: 'blur' }],
        contact: [{ required: true, message: '联系人不能为空', trigger: 'blur' }],
        mobile: [{ required: true, message: '手机号不能为空', trigger: 'blur' }],
        avatar: [
          { required: true, message: '请上传用户头像封面', trigger: 'blur' },
          {            validator(rule, value, callback, source, options) {
              const errors = []
              if (value === undefined) { errors.push('请上传用户头像封面') }
              callback(errors)
            }
          }
        ]
      }
    }
  },
  methods: {
    valid() {
      return this.$refs.form.validate((valid) => {
        if (valid) {
          return true
        } else {
          this.$Message.error('请完善活动内容')
          return false
        }
      })
    },
    async submit() {
      const valid = await this.valid()
      if (!valid) {
        return false
      }
      const formCopy = JSON.parse(JSON.stringify(this.form))
      formCopy.password = md5(formCopy.password)
      const params = {
        url: 'lease/user/add',
        payload: formCopy,
        auth: true
      }
      const result = await this.post(params)
      if (result.code === 1) {
        this.$Message.info(result.msg);
        this.$router.push({
          name: 'user/lease/list'
        })
      }
    }
  },
  components: {
    ImageUpload
  }
}
</script>
<style lang="less" scoped>
  .lease-user-add {
    .btn-submit {
      display: flex;
      justify-content: flex-end;
    }
  }
</style>
