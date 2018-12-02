
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
          活动发布
        </p>
        <p class="margin-top-10 fb-p">
          <span class="fb-title">数量:</span>
          <InputNumber class="fb-content" :max="10" :min="1" v-model="count"></InputNumber>
        </p>
        <p class="margin-top-10 fb-p">
          <span class="fb-title">单价:</span>
          <InputNumber class="fb-content" :min="1" v-model="price" :formatter="value => `¥ ${value}`"></InputNumber>
        </p>
        <p class="margin-top-10 fb-p">
          <span class="fb-title">合计:</span>
          <InputNumber class="fb-content" v-model="total" :formatter="value => `¥ ${value}`"></InputNumber>
        </p>
        <p class="margin-top-10 fb-p">
          <span class="fb-title">状态:</span>
          <Select class="fb-content" value="草稿">
            <Option v-for="item in articleStateList" :value="item.value" :key="item.value">{{ item.value }}</Option>
          </Select>
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
      // 数量
      count: 100,
      // 价格
      price: 100,
      // 标题
      title: '',
      tags: null,
      avtiveTags: null,
      activeCatogories: null,
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
      publishLoading: false
    }
  },
  computed: {
    total () {
      return this.count * this.price
    }
  },
  methods: {
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
      const valid = await this.$refs.form.valid()
      if (valid) {
        const payload = this.$refs.form.get()
        const params = {
          url: 'active',
          payload: payload,
          auth: true
        }
        const result = await this.post(params)
        if (result.code === 1) {
          this.$Message.info('保存成功')
        }
      }
    }
  },

  mounted () {
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

  .fb-p {
    display: flex;
    align-items: center;
    .fb-title {
      width: 68px;
      display: inline-block;
    }
    .fb-content {
      flex: 0.5;
    }
  }
</style>
