<template>
  <div class="car-item" @click="edit">
    <div class="car-inner">
      {{data.name}}
      <img :src="data.img" alt="">
    </div>
    <Modal v-model="modal" title="编辑车辆">
      <Form ref="form" :model="form" :label-width="80" :rules="ruleValidate">
        <FormItem label="汽车名称" prop="name">
          <Input v-model="form.name" placeholder="请输入车型名称"></Input>
        </FormItem>
        <FormItem label="汽车图片" prop="img">
          <image-upload :img.sync="form.img" path='car/category'></image-upload>
        </FormItem>
        <FormItem label="款式年份" prop="batch">
          <car-batch-select ref="batchSelect" :batch="data.batch_at"></car-batch-select>
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
import CarBatchSelect from '@components/car/CarBatchSelect'
export default {
  components: {
    ImageUpload,
    CarBatchSelect
  },
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      modal: false,
      form: {
        name: null,
        img: null
      },
      // 验证条件
      ruleValidate: {
        name: [{ required: true, message: '汽车名称', trigger: 'blur' }],
        img: [
          { required: true },
          {            validator(rule, value, callback, source, options) {
              const errors = []
              if (value === undefined) { errors.push('请上传图片') }
              callback(errors)
            }          }
        ]
      }
    }
  },
  methods: {
    edit() {
      this.form = this.data
      console.log(this.form)
      this.modal = true
    },
    cancel() {
      this.modal = false
    },
    // 提交
    async ok() {
      // 更新汽车
      const params = {
        url: 'car',
        payload: {
          car_id: this.form._id,
          img: this.form.img,
          name: this.form.name,
          batch_at: this.$refs.batchSelect.get(0)
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
