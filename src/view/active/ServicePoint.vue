<template>
  <div class="service-point">
    <Card :bordered="false">
      <p slot="title">服务网点</p>
      <div slot="extra" class="z-btn">
        <Button type="default" style="marginRight:10px" size="small" @click="searchClear">刷新</Button>
        <Button type="primary" size="small" @click="visible=true">新增</Button>
      </div>
      <Table :columns="columns" :data="tableData"></Table>
      <Page style="marginTop: 10px" :total="total" size="small" show-elevator show-total @on-change="pageChange" />
    </Card>
    <Modal v-model="visible" title="Welcome">
      <service-point-form ref="form"></service-point-form>
      <div slot="footer">
        <Button @click="cancel">取消</Button>
        <Button type="primary" @click="ok">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import ServicePointForm from '@components/form/ServicePointForm'
export default {
  data () {
    return {
      visible: false,
      total: 0,
      page: 1,
      columns: [
        {
          title: '服务点',
          key: 'name'
        },
        {
          title: '活动名称',
          key: 'title'
        },
        {
          title: '活动简介',
          key: 'brief'
        },
        {
          title: '车辆颜色',
          key: 'car_color'
        },
        {
          title: '车型',
          key: 'car_model'
        },
        {
          title: '日期',
          key: 'meta',
          render: (h, params) => {
            return <div>
              {params.row.meta.createdAt}
            </div>
          }
        },
        {
          title: '操作',
          key: 'handle',
          width: 100,
          render: (h, params) => {
            return <div>
              <i-button size="small" type="primary" style="margin-left:6px" onClick={() => this.openDrawer(params.row)}>查看</i-button>
            </div>
          }
        }
      ],
      tableData: []
    }
  },
  methods: {
    async  spList () {
      const params = {
        url: 'service-point/list',
        payload: {
          page: this.page,
          size: 10
        },
        auth: true
      }
      const result = await this.post(params)
      if (result.code === 1) {
        this.tableData = result.data
      }
    },
    ok () {
      if (this.$refs.form.valid()) {
        alert('哈哈哈')
      }
    }
  },
  mounted () {
    this.spList()
  },
  components: {
    ServicePointForm
  }
}
</script>

<style lang="less" scoped>
</style>
