<template>
  <div class="car-item">
    <div class="car-inner" @click="modal=true">
      <div class="add-icon">
        <Icon type="md-add" :size="60" color="#696D6D" />
      </div>
      <div> 新增车型</div>
    </div>
    <Modal v-model="modal" title="新增车型">
      <Form ref="formValidate" :label-width="80">
        <FormItem label="名称" prop="name">
          <Input v-model="name" placeholder="请输入车型名称"></Input>
        </FormItem>
        <FormItem label="汽车图片" prop="name">
          <car-upload :img.sync="img"></car-upload>
        </FormItem>
        {{img}}
      </Form>
      <div slot="footer">
        <Button @click="cancel">取消</Button>
        <Button type="primary" @click="ok">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import CarUpload from '_c/upload/CarUpload.vue'
export default {
  components: { CarUpload },
  props: {
    sub_brand_id: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      modal: false,
      name: null,
      img: null
    }
  },
  methods: {
    cancel () {
      this.modal = false
    },
    valid () {
      if (this.name == null) {
        this.$Message.warning('请输入车型名称')
        return false
      }
      if (this.img == null) {
        this.$Message.warning('请上传图片')
        return false
      }
      return true
    },
    async  ok () {
      if (this.valid()) {
        const params = {
          url: 'car',
          payload: {
            sub_brand_id: this.sub_brand_id,
            name: this.name,
            img: this.img
          },
          auth: true
        }
        const result = await this.post(params)
        if (result.code === 1) {
          this.modal = false
        }
      }
    }

  }
}
</script>

<style lang="less" scoped>
.car-item {
  width: 160px;
  padding: 10px;

  .car-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 10px;
    border: 1px solid #047eff;
    cursor: pointer;

    .add-icon {
      width: 120px;
      height: 90px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
