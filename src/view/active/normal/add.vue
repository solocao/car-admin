
<template>
  <div class="normal-add">
    <Row>
      <Col span="17">
      <Card>
        <active-form ref="form"></active-form>
      </Card>
      </Col>
      <Col span="7" class="padding-left-10">
      <Card>
        <p slot="title">
          <Icon type="paper-airplane"></Icon>
          发布
        </p>
        <p class="margin-top-10">
          <span class="fb-title">状态:</span>
          <Select size="small" style="width:90px" value="草稿">
            <Option v-for="item in articleStateList" :value="item.value" :key="item.value">{{ item.value }}</Option>
          </Select>
        </p>
        <p class="margin-top-10">
          <span class="fb-title" v-if="publishTimeType === 'immediately'">立即发布:</span>
          <span class="fb-title" v-if="publishTimeType !== 'immediately'">定时:</span>
          <span v-if="publishTimeType !== 'immediately'">{{ publishTime }}</span>
          <Button v-show="!editPublishTime" size="small" @click="handleEditPublishTime" type="text">修改</Button>
          <transition name="publish-time">
            <div v-show="editPublishTime" class="publish-time-picker-con">
              <div class="margin-top-10">
                <DatePicker @on-change="setPublishTime" type="datetime" style="width:200px;" placeholder="选择日期和时间"></DatePicker>
              </div>
              <div class="margin-top-10">
                <Button type="primary" @click="handleSavePublishTime">确认</Button>
                <Button @click="cancelEditPublishTime" style="marginLeft:10px">取消</Button>
              </div>
            </div>
          </transition>
        </p>
        <Row class="margin-top-20 publish-button-con">
          <span class="publish-button">
            <Button @click="handleSaveDraft">保存草稿</Button>
          </span>
          <span class="publish-button">
            <Button @click="publicAcitve" :loading="publishLoading" type="primary">发布活动</Button>
          </span>
        </Row>
      </Card>
      <div class="margin-top-10" v-if="false">
        <Card>
          <p slot="title">
            <Icon type="navicon-round"></Icon>
            分类目录
          </p>
          <Tabs type="card">
            <TabPane label="所有分类目录">
              <div class="classification-con">
                <Tree ref="categoryTree" :data="classificationList" @on-check-change="setClassificationInAll" show-checkbox></Tree>
              </div>
            </TabPane>
            <TabPane label="常用目录">
              <div class="classification-con">
                <CheckboxGroup v-model="offenUsedClassSelected" @on-change="setClassificationInOffen">
                  <p v-for="item in offenUsedClass" :key="item.title">
                    <Checkbox :label="item.title">{{ item.title }}</Checkbox>
                  </p>
                </CheckboxGroup>
              </div>
            </TabPane>
          </Tabs>
        </Card>
      </div>

      </Col>
    </Row>
  </div>
</template>

<script>
import ActiveForm from '@c/form/ActiveForm.vue'

export default {
  name: 'artical-publish',
  components: {
    ActiveForm
  },
  data () {
    return {
      editorOption: {
        // some quill options
      },
      // 标题
      title: '',
      tags: null,
      avtiveTags: null,
      activeCatogories: null,
      // 关键字
      keyword: '',
      // 描述
      description: '',
      articleError: '',
      showLink: false,
      fixedLink: '',
      articlePath: '',
      articlePathHasEdited: false,
      editLink: false,
      editPathButtonType: 'ghost',
      editPathButtonText: '编辑',
      articleStateList: [{ value: '草稿' }, { value: '正式' }],
      editOpenness: false,
      Openness: '公开',
      currentOpenness: '公开',
      topArticle: false,
      publishTime: '',
      publishTimeType: 'immediately',
      editPublishTime: false, // 是否正在编辑发布时间
      articleTagSelected: [], // 文章选中的标签
      classificationList: [],
      classificationSelected: [], // 在所有分类目录中选中的目录数组
      offenUsedClass: [],
      offenUsedClassSelected: [], // 常用目录选中的目录
      classificationFinalSelected: [], // 最后实际选择的目录
      publishLoading: false,
      addingNewTag: false, // 添加新标签
      newTagName: '' // 新建标签名
    }
  },
  methods: {
    // 获取分类列表树
    async categoryList () {
      const params = {
        url: 'category/list',
        payload: {}
      }
      const result = await this.post(params)
      const data = result.data
      function nodeTree (tree) {
        tree.forEach(e => {
          e.title = e.name
          e.expand = true
          if (e.children === undefined) {

          } else {
            nodeTree(e.children)
          }
        })
      }
      nodeTree(data)
      this.classificationList = data
    },
    editArticlePath () {
      this.editLink = !this.editLink
      this.editPathButtonType = this.editPathButtonType === 'ghost' ? 'success' : 'ghost'
      this.editPathButtonText = this.editPathButtonText === '编辑' ? '完成' : '编辑'
    },
    handleEditOpenness () {
      this.editOpenness = !this.editOpenness
    },
    handleSaveOpenness () {
      this.Openness = this.currentOpenness
      this.editOpenness = false
    },
    cancelEditOpenness () {
      this.currentOpenness = this.Openness
      this.editOpenness = false
    },
    handleEditPublishTime () {
      this.editPublishTime = !this.editPublishTime
    },
    handleSavePublishTime () {
      this.publishTimeType = 'timing'
      this.editPublishTime = false
    },
    cancelEditPublishTime () {
      this.publishTimeType = 'immediately'
      this.editPublishTime = false
    },
    setPublishTime (datetime) {
      this.publishTime = datetime
    },
    setClassificationInAll (selectedArray) {
      this.classificationFinalSelected = selectedArray.map(item => {
        return item.title
      })
      localStorage.classificationSelected = JSON.stringify(this.classificationFinalSelected) // 本地存储所选目录列表
    },
    setClassificationInOffen (selectedArray) {
      this.classificationFinalSelected = selectedArray
    },
    handleAddNewTag () {
      this.addingNewTag = !this.addingNewTag
    },
    // 保存草稿
    saveActiveDraft () {

    },
    async handlePublish () {
      if (!this.$refs.form.validForm) {
        return false
      }
      const formData = this.$refs.form.getForm()
      this.publishLoading = true
      const params = {
        url: '/article/add',
        payload: Object.assign({}, formData, {
          category: JSON.stringify(this.$refs.categoryTree.getCheckedNodes().map(x => { return x._id })) }),
        auth: true
      }
      const result = await this.post(params)
      this.publishLoading = false
      if (result.code === 1) {
        this.$Notice.success({
          title: '发送成功',
          desc: '文章《' + this.title + '》保存成功',
          duration: 3
        })
      } else {
        this.$Notice.success({
          title: '发送失败',
          desc: '请联系管理员',
          duration: 3
        })
      }
    },
    // 发布活动
    async publicAcitve () {
      this.$refs.form.valid()
    },
    handleSelectTag () {
      localStorage.tagsList = JSON.stringify(this.articleTagSelected) // 本地存储文章标签列表
    }
  },
  computed: {
    completeUrl () {
      let finalUrl = this.fixedLink + this.articlePath
      localStorage.finalUrl = finalUrl // 本地存储完整文章路径
      return finalUrl
    }
  },
  mounted () {
    // this.categoryList()
    this.classificationList = [
      {
        title: 'Vue实例',
        expand: true,
        children: [
          {
            title: '数据与方法',
            expand: true
          },
          {
            title: '生命周期',
            expand: true
          }
        ]
      },
      {
        title: 'Class与Style绑定',
        expand: true,
        children: [
          {
            title: '绑定HTML class',
            expand: true,
            children: [
              {
                title: '对象语法',
                expand: true
              },
              {
                title: '数组语法',
                expand: true
              },
              {
                title: '用在组件上',
                expand: true
              }
            ]
          },
          {
            title: '生命周期',
            expand: true
          }
        ]
      },
      {
        title: '模板语法',
        expand: true,
        children: [
          {
            title: '插值',
            expand: true
          },
          {
            title: '指令',
            expand: true
          },
          {
            title: '缩写',
            expand: true
          }
        ]
      }
    ]
    this.offenUsedClass = [
      {
        title: 'vue实例'
      },
      {
        title: '生命周期'
      },
      {
        title: '模板语法'
      },
      {
        title: '插值'
      },
      {
        title: '缩写'
      }
    ]
  }

}
</script>
<style lang="less" scoped>
@import "../../../style/common.less";
.article-link-con {
  height: 32px;
  width: 100%;
}

.fixed-link-enter {
  opacity: 0;
}

.fixed-link-enter-active,
.fixed-link-leave-active {
  transition: opacity 0.3s;
}

.fixed-link-enter-to {
  opacity: 1;
}

.openness-radio-con {
  margin-left: 40px;
  padding-left: 10px;
  height: 130px;
  border-left: 1px dashed #ebe9f3;
  overflow: hidden;
}

.publish-time-picker-con {
  margin-left: 40px;
  padding-left: 10px;
  height: 100px;
  border-left: 1px dashed #ebe9f3;
  overflow: hidden;
}

.openness-con-enter {
  height: 0;
}

.openness-con-enter-active,
.openness-con-leave-active {
  transition: height 0.3s;
}

.openness-con-enter-to {
  height: 130px;
}

.openness-con-leave {
  height: 130px;
}

.openness-con-leave-to {
  height: 0;
}

.publish-button-con {
  border-top: 1px solid #f3eff1;
  padding-top: 14px;
}

.publish-button {
  float: right;
  margin-left: 10px;
}

.publish-time-enter {
  height: 0;
}

.publish-time-enter-active,
.publish-time-leave-active {
  transition: height 0.3s;
}

.publish-time-enter-to {
  height: 100px;
}

.publish-time-leave {
  height: 100px;
}

.publish-time-leave-to {
  height: 0;
}

.classification-con {
  height: 200px;
  margin-top: -16px;
  border-left: 1px solid #dddee1;
  border-right: 1px solid #dddee1;
  border-bottom: 1px solid #dddee1;
  border-radius: 0 0 3px 3px;
  padding: 10px;
  overflow: auto;
}

.add-new-tag-con {
  margin-top: 20px;
  border-top: 1px dashed #dbdddf;
  padding: 20px 0;
  height: 60px;
  overflow: hidden;
}

.add-new-tag-enter {
  height: 0;
  margin-top: 0;
  padding: 0px 0;
}

.add-new-tag-enter-active,
.add-new-tag-leave-active {
  transition: all 0.3s;
}

.add-new-tag-enter-to {
  height: 60px;
  margin-top: 20px;
  padding: 20px 0;
}

.add-new-tag-leave {
  height: 60px;
  margin-top: 20px;
  padding: 20px 0;
}

.add-new-tag-leave-to {
  height: 0;
  margin-top: 0;
  padding: 0px 0;
}

.fb-title {
  width: 68px;
  display: inline-block;
}
</style>
