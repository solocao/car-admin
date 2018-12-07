<!-- 新增汽车分类模态框 -->
<template>
  <div>
    <Modal v-model="visiable" title="新增品牌" @on-ok="categoryAdd" @on-cancel="cancel">
      <Form ref="form" :model="form" :label-width="86" :rules="ruleValidate">
        <FormItem label="品牌名称" prop="name">
          <Input v-model="form.name" placeholder="请输入品牌名称" />
        </FormItem>
        <FormItem label="品牌logo" prop="logo">
          <image-upload :img.sync="form.logo" path='car/category'></image-upload>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancel">取消</Button>
        <Button type="primary" @click="ok">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import ImageUpload from '@components/upload/ImageUpload'
export default {
  props: {
    visiable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        name: null,
        logo: null
      },
      // 验证条件
      ruleValidate: {
        name: [{ required: true, message: '请输入品牌名称', trigger: 'blur' }],
        logo: [
          { required: true, type: 'array', min: 1, message: '请上传品牌logo', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 验证表单
    async  valid() {
      return this.$refs.form.validate((valid) => {
        if (valid) {
          return true
        } else {
          this.$Message.error('请完善品牌内容')
          return false
        }
      })
    },
    // 取消
    cancel() {
      this.$emit('update:visiable', false)
    },
    // 确定
    async ok() {
      const valid = await this.valid()
      // 没有通过验证
      if (!valid) {
        return false
      }
      const formCopy = JSON.parse(JSON.stringify(this.form))
      formCopy.logo = formCopy.logo[0]
      const params = {
        url: 'car/category',
        payload: formCopy,
        auth: true
      }
      const result = await this.post(params)
      if (result.code === 1) {
        alert('成功啦')
      }
    }
  },
  components: {
    ImageUpload
  }
}
</script>
