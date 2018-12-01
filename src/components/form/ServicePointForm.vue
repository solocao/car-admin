<template>
<div class="service-point-form">
    <Form ref="form" :model="form" :label-width="86" :rules="ruleValidate">
      <FormItem label="服务点名称" prop="name">
        <Input v-model="form.name" placeholder="服务点名称" />
      </FormItem>
      <FormItem label="服务点地址" prop="address">
          <Input v-model="form.address" placeholder="请输入服务点地址" />
      </FormItem>
      <FormItem label="服务点图片" prop="img">
        <image-upload :img.sync="form.img"></image-upload>
      </FormItem>
    </Form>
</div>
</template>
<script>
import ImageUpload from '@components/upload/ImageUpload'
export default {
  data () {
    return {
      form: {
        // 服务点名称
        name: null,
        // 服务点地址
        address: null,
        // 服务点照片
        img: null,
        // 纬度
        latitude: null,
        // 经度
        longitude: null
      },
      // 验证条件
      ruleValidate: {
        name: [{ required: true, message: '服务点名称不能为空', trigger: 'blur' }],
        address: [{ required: true, message: '服务点地址不能为空', trigger: 'blur' }],
        img: [
          { required: true, type: 'array', min: 1, message: '请上传服务点图片', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 验证表单
    async valid () {
      return this.$refs.form.validate((valid) => {
        if (valid) {
          return true
        } else {
          this.$Message.error('请完善服务点信息')
          return false
        }
      })
    },
    // 获取form表单内容
    get () {
      let formCopy = JSON.parse(JSON.stringify(this.form))
      formCopy.img = formCopy.img[0]
      return formCopy
    }
  },
  components: {
    ImageUpload
  }
}
</script>
<style lang="less" scoped>
</style>
