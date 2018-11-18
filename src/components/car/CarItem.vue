<template>
  <div class="car-item" @click="edit">
    <div class="car-inner">
      {{name}}
      <img :src="img" alt="">
    </div>
    <Modal v-model="modal" title="车型编辑">
      <Form ref="formValidate" :label-width="80">
        <FormItem label="名称" prop="name">
          <Input v-model="name" placeholder="请输入车型名称"></Input>
        </FormItem>
        <FormItem label="汽车图片" prop="name">
          <car-upload :img.sync="img"></car-upload>
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
  components: {
    CarUpload
  },
  props: {
    car_id: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: 'demo车辆'
    },
    img: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      modal: false
    }
  },
  methods: {
    edit () {
      this.modal = true
    },
    cancel () {
      this.modal = false
    },
    // 提交
    async ok () {
      const params = {
        url: 'car',
        payload: {
          car_id: this.car_id,
          img: this.img,
          name: this.name
        },
        auth: true
      }
      const result = await this.put(params)
      if (result.code === 1) {
        this.modal = false
      }
      console.log(result)
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
    border: 1px solid white;
    cursor: pointer;

    &:hover {
      border: 1px solid #047eff;
    }
    img {
      width: 120px;
      height: 90px;
    }
  }
}
</style>
