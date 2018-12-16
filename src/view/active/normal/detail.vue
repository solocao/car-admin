<template>
  <div>
    <Row :gutter="20">
      <i-col span="6" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 80px;">
        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
          <count-to :end="infor.count" count-class="count-style1" />
          <p>{{ infor.title }}</p>
        </infor-card>
      </i-col>
    </Row>
    <Card style="marginTop:20px">
      <p slot="title">
        参与用户列表
      </p>
      <Table :columns="columns" :data="tableData"></Table>
      <Page style="marginTop: 10px" :total="total" size="small" show-elevator show-total @on-change="pageChange" />
    </Card>
  </div>
</template>
<script>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
export default {
  components: {
    InforCard,
    CountTo
  },
  data() {
    return {
      total: 0,
      page: 1,
      inforCardData: [
        { title: '参与人数', icon: 'ios-people', count: 0, color: '#2d8cf0' },
        { title: '奖金', icon: 'ios-person-add', count: 0, color: '#03a9f4' },
        { title: '累计任务', icon: 'md-help-circle', count: 0, color: '#ff9900' },
        { title: '用户在途', icon: 'md-locate', count: 0, color: '#19be6b' },
      ],
      columns: [
        {
          title: '参与用户',
          key: 'image',
          render: (h, params) => {
            const { avatar, nickname } = params.row.user
            return <div class="z-table-avatar-name">
              <img src={avatar} />
              <span>{nickname}</span>
            </div>
          }
        },
        {
          title: '参与时间',
          key: 'join_at'
        },
        {
          title: '贴纸时间',
          key: 'paste_at'
        },
        {
          title: '贴纸时间',
          key: 'paste_img',
          render: (h, params) => {
            const { paste_img } = params.row
            const imgItem = <img src={paste_img}></img>
            return (<div class="z-table-img">
              {imgItem}
            </div>)
          }
        },
        {
          title: '打卡次数',
          key: 'car_color'
        },
        {
          title: '车型',
          key: 'car_model'
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
      tableData: [],
    }
  },
  methods: {
    // 活动列表
    async activeUserList() {
      const params = {
        url: 'active/in/user',
        payload: {
          active_id: '5c03d811bb582bd7318a247c',
          page: this.page,
          size: 10
        },
        auth: true
      }
      const result = await this.post(params)
      if (result.code === 1) {
        this.tableData = result.data
        this.total = result.paginate.total
      }
    },


  },
  mounted() {
    this.activeUserList()
  }

}
</script>
<style lang="less" scoped>
  .count-style1 {
    font-size: 50px;
  }
</style>




