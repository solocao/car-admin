<template>
  <div class="service-point">
    <Card :bordered="false">
      <p slot="title">服务网点</p>
      <div slot="extra" class="z-btn">
        <Button type="default" style="marginRight:10px" size="small" @click="spList">刷新</Button>
        <Button type="primary" size="small" @click="visible=true">新增</Button>
      </div>
      <Table :columns="columns" :data="tableData"></Table>
      <Page style="marginTop: 10px" :total="total" size="small" show-elevator show-total @on-change="pageChange" />
    </Card>
    <Modal v-model="visible" title="服务网点新增">
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
  data() {
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
          title: '服务点地址',
          key: 'address'
        },
        {
          title: '纬度',
          key: 'latitude'
        },
        {
          title: '经度',
          key: 'longitude'
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
    async spList() {
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
    // 成功后保存
    async ok() {
      const valid = await this.$refs.form.valid()
      if (!valid) {
        return false
      }
      const params = {
        url: 'service-point/add',
        payload: this.$refs.form.get(),
        auth: true
      }
      const result = await this.post(params)
      if (result.code === 1) {
        // 隐藏模态框
        this.visible = false;
        this.$refs.form.clear();
        this.spList()
      }
    },
    // 取消
    cancel() {
      this.visible = false;
    }
  },
  mounted() {
    this.spList()
  },
  components: {
    ServicePointForm
  }
}
</script>

<style lang="less" scoped>
</style>
