<template>
  <div class="active-form">
    {{form.cover_img}}
    <Form ref="form" :model="form" :label-width="80" :rules="ruleValidate">
      <FormItem label="活动标题" prop="title">
        <Input v-model="form.title" placeholder="请输入活动标题" />
      </FormItem>
      <FormItem label="活动时间" prop="date_range">
        <DatePicker v-model="form.date_range" type="daterange" :options="dateOptions" placement="bottom-end" placeholder="请选择活动时间" style="width: 526px"></DatePicker>
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
      <quill-editor></quill-editor>
    </div>
  </div>
</template>
<script>
import UploadCard from '@c/upload/UploadCard.vue'

import ImageUpload from '@components/upload/ImageUpload.vue'

import QuillEditor from '@components/editor/QuillEditor'
export default {
  components: {
    ImageUpload,
    UploadCard,
    QuillEditor
  },
  data () {
    return {
      // 活动内容
      form: {
        // 活动id
        _id: null,
        // 活动标题
        title: null,
        // 活动时间
        date_range: null,
        // 活动简介
        brief: null,
        // 活动封面图
        cover_img: null,
        // 活动展示图
        show_img: null
      },
      dateOptions: {
        shortcuts: [
          {
            text: '一星期',
            value () {
              const start = new Date()
              const end = start.getTime() + 3600 * 1000 * 24 * 7
              return [start, end]
            }
          },
          {
            text: '一个月',
            value () {
              const start = new Date()
              const end = start.getTime() - 3600 * 1000 * 24 * 30
              return [start, end]
            }
          },
          {
            text: '三个月',
            value () {
              const start = new Date()
              const end = start.getTime() - 3600 * 1000 * 24 * 90
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
          { validator (rule, value, callback, source, options) {
            const errors = ['活动时间不能为空']
            if (value[0] === '') { callback(errors) }
          } }],
        brief: [
          { required: true, message: '活动简介不能为空', trigger: 'blur' }
        ],
        cover_img: [
          { required: true, type: 'array', min: 1, message: '请上传活动封面', trigger: 'blur' }
        ],
        show_img: [
          { required: true, type: 'array', min: 1, message: '请上传展示图片', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    avtiveTag (t) {
      t.active = !t.active
    },
    // 验证表单
    valid () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$Message.success('Success!')
          return true
        } else {
          this.$Message.error('Fail!')
          return false
        }
      })
    },
    // 获取form表单信息
    getForm () {
      // 获取图片
      this.form.img_list = this.$refs.uploadCard.getImageList()
      // 活动标签
      this.form.tag = JSON.stringify(this.tags.filter(x => x.active === true).map(x => { return x._id }))
      // 获取活动内容
      let formCory = JSON.parse(JSON.stringify(this.form))
      const key = Object.keys(formCory).forEach(x => {
        if (formCory[x] === null || formCory[x] === '' || formCory[x] === [] || formCory[x] === '[]') {
          delete formCory[x]
        }
      })
      return formCory
    },
    // 设置form表单信息
    setForm (form) {
      console.log('看看表单信息')
      console.log(form)
      // 设置图片
      this.$refs.uploadCard.setImageList(form.img_list)
      // id
      this.form._id = form._id
      // 标题
      this.form.title = form.title
      // 关键词
      this.form.keyword = form.keyword
      // 描述
      this.form.description = form.description
      // 内容
      this.form.content = form.content
      // 分类 form.category
    },

    // 允许发布之前的权限验证
    canPublish () {
      this.avtiveTags = this.tags.filter(x => x.active === true)
      if (this.avtiveTags.length === 0) {
        this.$Message.error('请选择活动标签')
        return false
      }
      this.activeCatogories = this.$refs.categoryTree.getCheckedNodes()
      if (this.activeCatogories.length === 0) {
        this.$Message.error('请选择活动分类')
        return false
      }
      if (this.title.length === 0) {
        this.$Message.error('请输入活动标题')
        return false
      } else {
        return true
      }
    }

  },
  mounted () {
  }
}
</script>
<style lang="less" scoped>
.active-form {
}
</style>
