<!-- 租赁商新增车型模态框 -->
<template>
  <div class="lease-car-add">
    <Modal v-model="visible" title="新增车型" @on-visible-change="visibleChange">
      <Form ref="form" :model="form" :label-width="80" :rules="ruleValidate">
        <FormItem label="车牌号" prop="car_number">
          <Input v-model="form.car_number" placeholder="请输入品牌名称"></Input>
        </FormItem>
        <FormItem label="车型" prop="car_model">
          <Cascader v-model="form.car_model" :data="data4" :load-data="loadData"></Cascader>
        </FormItem>
        <FormItem label="汽车图片" prop="img">
          <image-upload :img.sync="form.img" path='car/category'></image-upload>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancel">取消</Button>
        <Button type="primary" @click="submit">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import ImageUpload from '@components/upload/ImageUpload'
export default {
  components: {
    ImageUpload
  },
  props: {
    // 是否可见
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        // 车牌号
        car_number: null,
        // 车辆型号
        car_model: null,
        // 汽车图片
        img: null
      },
      data4: [
        {
          value: 'beijing',
          label: '北京',
          children: [
          ],
          loading: false
        },
        {
          value: 'hangzhou',
          label: '杭州',
          children: [],
          loading: false
        }
      ],
      // 验证条件
      ruleValidate: {
        car_number: [{ required: true, message: '请输入车牌号', trigger: 'blur' }],
        car_model: [
          { required: true, type: 'array', message: '请选择车型', trigger: 'change' },
          {            validator(rule, value, callback, source, options) {
              const errors = []
              if (value === undefined) { errors.push('请选择车型') }
              console.log(errors)
              callback(errors)
            }          }],
        img: [
          { required: true, message: '请上传图片', trigger: 'blur' },
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
    // 关闭模态框
    close() {
      this.$emit('update:visible', false)

    },
    // 获取级练选择器的第一个参数，汽车品牌列表
    async categoryName() {
      const result = await this.get({
        url: "car/category/all",
        payload: {},
        auth: true
      })
      if (result.code === 1) {
        this.data4 = result.data.map(x => {
          return {
            value: x,
            label: x,
            children: [
            ],
            loading: false
          }
        })
      }
      console.log(result)

    },
    // 加载数据
    async loadData(item, callback) {
      item.loading = true;
      console.log(item)

      const result = await this.get({
        url: `car/brand/${item.value}`,
        payload: {},
        auth: true
      })
      if (result.code === 1) {
        item.children = result.data.map(x => {
          return {
            value: x.name,
            label: x.name,
            children: x.car.map(car => {
              return {
                value: car.name,
                label: car.name,
                children: car.batch_at.map(batch => {
                  return {
                    value: batch,
                    label: batch
                  }
                })
              }
            }),
            loading: false
          }
        })
        item.loading = false;
        callback();
      }
    },
    // 验证表单
    async valid() {
      return this.$refs.form.validate((valid) => {
        if (valid) {
          return true
        } else {
          this.$Message.error('请完善车辆信息')
          return false
        }
      })
    },
    // 提交
    async submit() {
      const valid = await this.valid();
      if (!valid) {
        return false
      }
      const car_model = this.form.car_model;
      const result = await this.post({
        url: 'lease/car/add',
        payload: {
          lease_id: '5c06356709f66523702f46ca',
          car_number: this.form.car_number,
          car_model: JSON.stringify({
            // 大品牌名称
            category_name: car_model[0],
            // 小品牌名称
            brand_name: car_model[1],
            // 车辆名称
            car_name: car_model[2],
            // 日期
            batch_at: car_model[3],
          }),
          img: this.form.img
        },
        auth: true
      })
      if (result.code === 1) {
        this.$Message.info(result.msg);
        this.close();
      }
    },
    // 取消
    cancel() {
      this.$emit('update:visible', false)
    },
    // 模态框变化触发的函数
    visibleChange(value) {
      if (!value) {
        this.close()
      }
    }
  },
  mounted() {
    this.categoryName()
  }
}
</script>

<style lang="less" scoped>
  .lease-car-add {
  }
</style>

