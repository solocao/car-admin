<!-- 汽车分类模态框 新增和编辑-->
<template>
  <div class="car-category-modal">
    <Modal v-model="visiable" :title="title" @on-ok="categoryAdd" @on-cancel="cancel">
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
    // 是否显示
    visiable: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'add'
    },
    form: {
      type: Object,
      default: () => {
        return {
          name: null,
          logo: null
        }
      }
    }
  },
  data () {
    return {
      // 验证条件
      ruleValidate: {
        name: [{ required: true, message: '请输入品牌名称', trigger: 'blur' }],
        logo: [
          { required: true },
          { validator (rule, value, callback, source, options) {
            const errors = []
            if (value === undefined) { errors.push('请上传图片') }
            callback(errors)
          } }
        ]
      }
    }
  },
  computed: {
    title () {
      if (this.type == 'add') {
        return '新增品牌'
      } else {
        return '编辑品牌'
      }
    }
  },
  methods: {
    // 验证表单
    async  valid () {
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
    cancel () {
      this.$emit('update:visiable', false)
    },
    // 确定
    async ok () {
      const valid = await this.valid()
      // 没有通过验证
      if (!valid) {
        return false
      }
      const formCopy = JSON.parse(JSON.stringify(this.form))
      const params = {
        url: 'car/category',
        payload: formCopy,
        auth: true
      }

      // 新增
      if (this.type == 'add') {
        const result = await this.post(params)
        if (result.code === 1) {
          this.$Message.info(result.msg)
          this.$emit('update:visiable', false)
          return true
        }
      }

      if (this.type == 'edit') {
        const result = await this.put(params)
        if (result.code === 1) {
          this.$Message.info(result.msg)
          this.$emit('update:visiable', false)
          return true
        }
      }
    }
  },
  mounted () {

  },
  components: {
    ImageUpload
  }
}
</script>
