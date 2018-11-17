<template>
  <div class="car-brand-add">
    <Modal v-model="modal1" title="创建品牌" @on-ok="ok" @on-cancel="cancel">
      <Form ref="formValidate" :label-width="80">
        <FormItem label="品牌名称" prop="name">
          <Input v-model="name" placeholder="请输入品牌名称"></Input>
        </FormItem>
        <FormItem label="品牌logo" prop="name">
          <car-brand-upload></car-brand-upload>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import CarBrandUpload from '_c/upload/CarBrandUpload'
export default {
  components: {
    CarBrandUpload
  },
  data () {
    return {
      modal1: true,
      name: 'ssfs'
    }
  },
  methods: {
    ok () {

    },
    cancel () {

    }
  }
}
</script>

<style lang="less" scoped>
.car-brand-add {
}
</style>
