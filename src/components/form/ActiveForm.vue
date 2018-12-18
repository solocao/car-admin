<template>
  <div class="active-form">
    {{form.content}}
    <Form ref="form" :model="form" :label-width="100" :rules="ruleValidate">
      <FormItem label="活动标题" prop="title">
        <Input v-model="form.title" placeholder="请输入活动标题" />
      </FormItem>
      <FormItem label="活动时间" prop="date_range">
        <DatePicker v-model="form.date_range" type="daterange" :options="dateOptions" placement="bottom-end" placeholder="请选择活动时间" style="width: 526px"></DatePicker>
      </FormItem>
      <FormItem label="免打卡天数" prop="free_day">
        <InputNumber :min="0" v-model="form.free_day" placeholder="请输入免打卡天数" style="width:200px"></InputNumber>
      </FormItem>
      <FormItem label="活动简介" prop="brief">
        <Input v-model="form.brief" placeholder="请输入活动简介" />
      </FormItem>
      <FormItem label="活动封面" prop="cover_img">
        <image-upload :img.sync="form.cover_img"></image-upload>
      </FormItem>
      <FormItem label="展示图片" prop="show_img">
        <image-upload :img.sync="form.show_img" :maxNum="5"></image-upload>
      </FormItem>
    </Form>
    <div class="margin-top-20">
      <quill-editor :content.sync="form.content"></quill-editor>
    </div>
  </div>
</template>
<script>
import ImageUpload from '@components/upload/ImageUpload.vue'
import QuillEditor from '@components/editor/QuillEditor'
export default {
  components: {
    ImageUpload,
    QuillEditor
  },
  data() {
    return {
      // 活动内容
      form: {
        // 活动id
        _id: null,
        // 活动标题
        title: null,
        // 活动时间
        date_range: null,
        // 免打卡天数
        free_day: 0,
        // 活动简介
        brief: null,
        // 活动封面图
        cover_img: null,
        // 活动展示图
        show_img: null,
        content: null
      },
      dateOptions: {
        shortcuts: [
          {
            text: '一星期',
            value() {
              const start = new Date()
              const end = new Date(start.getTime() + 3600 * 1000 * 24 * 7)
              return [start, end]
            }
          },
          {
            text: '一个月',
            value() {
              const start = new Date()
              const end = new Date(start.getTime() + 3600 * 1000 * 24 * 30)
              return [start, end]
            }
          },
          {
            text: '三个月',
            value() {
              const start = new Date()
              const end = new Date(start.getTime() + 3600 * 1000 * 24 * 90)
              return [start, end]
            }
          }
        ]
      },
      tags: [],
      // 验证条件
      ruleValidate: {
        title: [{ required: true, message: '活动标题不能为空', trigger: 'blur' }],
        date_range: [{ required: true, type: 'array', message: '活动时间不能为空', trigger: 'change' },
        {          validator(rule, value, callback, source, options) {
            const errors = []
            if (value[0] === '') { errors.push('活动时间不能为空') }
            callback(errors)
          }        }],
        brief: [
          { required: true, message: '活动简介不能为空', trigger: 'blur' }
        ],

        free_day: [{ required: true, type: 'number', message: '请输入免打卡天数', trigger: 'blur' }],
        cover_img: [
          { required: true, message: '请上传活动封面', trigger: 'blur' },
          {            validator(rule, value, callback, source, options) {
              const errors = []
              if (value === undefined) { errors.push('请上传活动封面') }
              callback(errors)
            }          }
        ],
        show_img: [
          { required: true, type: 'array', min: 1, message: '请上传展示图片', trigger: 'blur' }
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
          this.$Message.error('请完善活动内容')
          return false
        }
      })
    },
    // 获取form表单内容
    get() {
      let formCopy = JSON.parse(JSON.stringify(this.form))
      const { date_range } = formCopy
      delete formCopy.date_range
      formCopy.start_at = date_range[0]
      formCopy.end_at = date_range[1]
      formCopy.show_img = JSON.stringify(formCopy.show_img)
      return formCopy
    },
    // 设置form表单信息
    set(form) {
      // 活动标题
      this.form.title = '测试活动'
      // 标题
      this.form.brief = '测试活动简介'

      // 封面图片
      this.form.cover_img = ['http://hehecms.oss-cn-hangzhou.aliyuncs.com/verify…5%A7%202018-11-19%20%E4%B8%8B%E5%8D%884.15.16.png']
      this.form.show_img = ['http://hehecms.oss-cn-hangzhou.aliyuncs.com/verify…5%A7%202018-11-19%20%E4%B8%8B%E5%8D%884.15.16.png']

      this.form.content = '活动内容'
    }

  }
}
</script>
<style lang="less" scoped>
  .active-form {
  }
</style>
