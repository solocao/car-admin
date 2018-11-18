<template>
  <div class="car-brand-add">
    <Modal v-model="modal" title="创建品牌">
      <Form ref="formValidate" :label-width="80">
        <FormItem label="品牌名称" prop="name">
          <Input v-model="name" placeholder="请输入品牌名称"></Input>
        </FormItem>
        <FormItem label="品牌logo" prop="name">
          <car-brand-upload :logo="logo"></car-brand-upload>
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
import CarBrandUpload from '_c/upload/CarBrandUpload'

export default {
  components: {
    CarBrandUpload
  },
  props: {
    modal: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      name: null,
      logo: null
    }
  },
  methods: {
    validate () {
      if (this.name == null) {
        this.$Message.warning('请输入品牌名称')
        return false
      }
      if (this.logo == null) {
        this.$Message.warning('请上传品牌logo')
        return false
      }
      return true
    },
    // 确定提交
    async ok () {
      if (this.validate()) {
        const params = {
          url: 'car/brand',
          payload: {
            name: this.name,
            logo: this.logo
          },
          auth: true
        }
        const result = await this.post(params)
        console.log(result)
      }
    },
    // 取消
    cancel () {
      this.modal = false
    }
  }
}
</script>

<style lang="less" scoped>
.car-brand-add {
}
</style>
