<template>
  <div class="car-item">
    <div class="car-inner" @click="modal=true">
      <div class="add-icon">
        <Icon type="md-add" :size="60" color="#696D6D" />
      </div>
      <div> 新增车型</div>
    </div>
    <Modal v-model="modal" title="新增车辆">
      <Form ref="form" :model="form" :label-width="80" :rules="ruleValidate">
        <FormItem label="汽车名称" prop="name">
          <Input v-model="form.name" placeholder="请输入车型名称"></Input>
        </FormItem>
        <FormItem label="汽车图片" prop="img">
          <image-upload :img.sync="form.img" path='car/category'></image-upload>
        </FormItem>
        <FormItem label="款式年份" prop="batch">
          <car-batch-select ref="batchSelect"></car-batch-select>
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
  components: { ImageUpload, CarBatchSelect },
  props: {
    brand_id: {
      type: String,
      default: null
    },
    getCarByCategory: {
      type: Function
    }
  },
  data () {
    return {
      modal: false,
      name: null,
      img: null,
      form: {
        name: null,
        img: null,
        batch_at: []
      },
      // 验证条件
      ruleValidate: {
        name: [{ required: true, message: '汽车名称', trigger: 'blur' }],
        img: [
          { required: true, type: 'array', min: 1, message: '请上传汽车图片', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 取消
    cancel () {
      this.modal = false
    },
    // 验证表单
    async  valid () {
      return this.$refs.form.validate((valid) => {
        if (valid) {
          return true
        } else {
          this.$Message.error('请完善汽车信息')
          return false
        }
      })
    },
    // 确认提交
    async  ok () {
      const valid = await this.valid()
      if (!valid) {
        return false
      }
      const params = {
        url: 'car',
        payload: {
          brand_id: this.brand_id,
          name: this.form.name,
          img: this.form.img[0],
          batch_at: this.$refs.batchSelect.get()
        },
        auth: true
      }
      const result = await this.post(params)
      if (result.code === 1) {
        this.getCarByCategory()
        this.modal = false
      }
    },
    tagClick () {
      alert('哈哈哈')
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
