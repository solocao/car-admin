<!-- 租赁商车型库管理 -->
<template>
  <div class="lease-car">
    <Card :bordered="false" class="z-search">
      <p slot="title">租赁商车型库</p>
      <div slot="extra" class="z-btn">
        <Button type="default" style="marginRight:10px" size="small" @click="searchClear">刷新</Button>
        <Button type="primary" size="small" @click="openCarAddModal">新增车型</Button>
      </div>
      <Table :columns="columns" :data="tableData"></Table>
      <Page style="marginTop: 10px" :total="total" size="small" show-elevator show-total @on-change="pageChange" />
    </Card>
    <lease-car-add :visible.sync="visible"></lease-car-add>
  </div>
</template>
<script>
import LeaseCarAdd from '@components/modal/LeaseCarAdd'
export default {
  components: {
    LeaseCarAdd
  },
  data() {
    return {
      // 新增模态框是否可见
      visible: false,
      total: 0,
      page: 1,
      columns: [
        {
          title: '车辆',
          key: 'img',
          render: (h, params) => {
            const { row } = params
            const { img } = row
            const imgItem = <img src={img}></img>
            return (<div class="z-table-img">
              {imgItem}
            </div>)
          }
        },
        {
          title: '登录账号',
          key: 'name'
        },
        {
          title: '权限等级',
          key: 'role',
          render: (h, params) => {
            return <div>
              <span>{roleName(params.row.role.class)}</span>
            </div>
          }
        },
        {
          title: '手机号', key: 'mobile'        },
        {
          title: '注册日期',
          key: 'createTime',
          render: (h, params) => {
            const { create_at } = params.row
            const createAt = timeS(create_at)
            return <div>
              <div>{createAt}</div>
            </div>
          }
        },
        {
          title: '操作',
          key: 'handle',
          width: 100,
          render: (h, params) => {
            return <div>
              <i-button size="small" type="primary" style="margin-left:6px" onClick={() => this.openModal(params.row)}>编辑</i-button>
            </div>
          }
        }
      ],
      tableData: [],
    }
  },
  methods: {
    // 打开车辆新增模态框
    openCarAddModal() {
      this.visible = true;
    },
    // 车辆列表
    async  carList() {
      const result = await this.post({
        url: 'lease/car/list',
        payload: {
          lease_id: '5c06356709f66523702f46ca',
          page: this.page,
          size: 10
        },
        auth: true
      })
      if (result.code === 1) {
        this.tableData = result.data
        this.total = result.paginate.total
      }
    }
  },
  mounted() {
    this.carList()
  },
}
</script>

<style lang="less" scoped>
  .lease-car {
  }
</style>

