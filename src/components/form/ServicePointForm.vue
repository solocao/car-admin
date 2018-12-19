<template>
  <div class="service-point-form">
    <Form ref="form" :model="form" :label-width="86" :rules="ruleValidate">
      <FormItem label="服务点名称" prop="name">
        <Input v-model="form.name" placeholder="服务点名称" />
      </FormItem>
      <FormItem label="服务点地址" prop="address">
        <Input v-model="form.address" placeholder="请输入服务点地址" />
      </FormItem>
      <div>经纬度拾取地址
        https://lbs.qq.com/tool/getpoint
      </div>
      <FormItem label="纬度" prop="latitude">
        <Input v-model="form.latitude" placeholder="请输入服务点纬度（31.968980）" />
      </FormItem>
      <FormItem label="经度" prop="longitude">
        <Input v-model="form.longitude" placeholder="请输入服务点经度（118.786270）" />
      </FormItem>
      <FormItem label="服务点图片" prop="img">
        <image-upload :img.sync="form.img" path='service'></image-upload>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import ImageUpload from '@components/upload/ImageUpload'
export default {
  data() {
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
        latitude: [{ required: true, message: '请输入纬度', trigger: 'blur' }],
        longitude: [{ required: true, message: '请输入经度', trigger: 'blur' }],
        img: [
          { required: true, message: '请上传服务点图片', trigger: 'blur' },
          {            validator(rule, value, callback, source, options) {
              const errors = []
              if (value === undefined) { errors.push('请上传服务点图片') }
              callback(errors)
            }          }
        ]
      }
    }
  },
  methods: {
    // 验证表单
    async valid() {
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
    get() {
      let formCopy = JSON.parse(JSON.stringify(this.form))
      return formCopy
    },
    // 清空表单数据，恢复默认
    clear() {
      this.form = {
        name: null,
        address: null,
        img: null,
        latitude: null,
        longitude: null
      }
    }
  },
  components: {
    ImageUpload
  }
}
</script>
<style lang="less" scoped>
</style>
