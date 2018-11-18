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
          <car-upload :img="img"></car-upload>
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
import CarUpload from '_c/upload/CarUpload.vue'
export default {
  components: { CarUpload },
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
    ok () {
      this.modal = false
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
