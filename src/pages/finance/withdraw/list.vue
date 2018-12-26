<template>
  <div class="fin-wit-list">
    <Card :bordered="false">
      <p slot="title">奖励发放列表</p>
      <div slot="extra" class="z-appeal-search">
        <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
          <Checkbox label="未发放"></Checkbox>
          <Checkbox label="已发放"></Checkbox>
        </CheckboxGroup>
        <Button type="primary" @click="rewardList" size="small">搜索</Button>
      </div>
      <Table :columns="columns" :data="data"></Table>
      <Table v-show="false" ref="table" :columns="exportColumns" :data="exportData"></Table>
      <div class="z-with-export">
        <Page style="marginTop: 10px" :total="total" size="small" show-elevator show-total @on-change="pageChange" />
        <Button type="success" size="small" @click="exportExcelData()" style="height:26px">
          <Icon type="ios-download-outline"></Icon> 数据导出为excel
        </Button>
      </div>
    </Card>
  </div>
</template>
<script>
import { timeS } from '@/libs/help.js'
export default {
  data() {
    return {
      state: null,
      checkAllGroup: ['已发放', '未发放'],
      page: 1,
      total: 0,
      data: [],
      columns: [
        {
          title: '收款人',
          key: 'reward',
          width: 120,
          render: (h, params) => {
            const { username } = params.row.hitch
            return <div>
              <div>{username}</div>
            </div>
          }
        },
        {
          title: '支付宝账号',
          key: 'reward',
          render: (h, params) => {
            const { alipay } = params.row.hitch
            return <div>
              <div class="z-alipay">{alipay}</div>
            </div>
          }
        },
        {
          title: '拟发金额',
          key: 'reward',
          width: 100,
          render: (h, params) => {
            const { money } = params.row.reward
            return <div>
              <div>{money}</div>
            </div>
          }
        },
        {
          title: '出账员',
          key: 'reward',
          render: (h, params) => {
            const { username, create_at } = params.row.reward
            const createAt = timeS(create_at)
            return <div>
              <div>{username}</div>
              <div>{createAt}</div>
            </div>
          }
        },
        {
          title: '发款员',
          key: 'reward',
          render: (h, params) => {
            const { checkername, check_at } = params.row.reward
            if (checkername === undefined) {
              return <div>
                <div>等待发款</div>
              </div>
            } else {
              const createAt = timeS(check_at)
              return <div>
                <div>{checkername}</div>
                <div>{createAt}</div>
              </div>
            }
          }
        },
        {
          title: '状态',
          key: 'handler',
          render: (h, params) => {
            const { checkername } = params.row.reward
            if (checkername !== undefined) {
              return <div>
                已确认
              </div>
            }
            return <div>
              <i-button size="small" type="primary" onClick={() => this.rewardConfirm(params.row._id)}>发款确认</i-button>
            </div>
          }
        }
      ],
      exportColumns: [
        {
          title: '收款人',
          key: 'shoukuanren'
        },
        {
          title: '支付宝账号',
          key: 'zhifubao'
        },
        {
          title: '金额',
          key: 'money'
        },
        {
          title: '出账员',
          key: 'chuzhangyuan'
        },
        {
          title: '出账日期',
          key: 'chuzhangri'
        },
        {
          title: '发款员',
          key: 'fakuanyuan'
        },
        {
          title: '发款日期',
          key: 'fakuanri'
        },
        {
          title: '状态',
          key: 'state'
        }
      ],
      exportData: []
    }
  },
  methods: {
    handExportData(data) {
      const handData = data.map(x => {
        return {
          'shoukuanren': x.hitch.username,
          'zhifubao': x.hitch.alipay,
          'money': x.reward.money,
          'chuzhangyuan': x.reward.username,
          'chuzhangri': timeS(x.reward.create_at),
          'fakuanyuan': x.reward.checkername !== undefined ? x.reward.checkername : '等待发款',
          'fakuanri': x.reward.check_at !== undefined ? timeS(x.reward.check_at) : '等待发款',
          'state': x.reward.check_at !== undefined ? '已发放' : '未发放'
        }
      })
      this.exportData = handData
    },
    async  rewardList() {
      const params = {
        url: 'reward/list',
        payload: {
          page: this.page,
          size: 10,
          state: this.state
        },
        auth: true
      }
      const result = await this.post(params)
      if (result.code === 1) {
        this.total = result.paginate.total
        this.data = result.data
        this.handExportData(result.data)
      }
      console.log('看看结果')
      console.log(result)
    },
    async rewardConfirm(hitchId) {
      const params = {
        url: 'reward/confirm',
        payload: {
          hitch_id: hitchId
        },
        auth: true
      }
      const result = await this.post(params)
      if (result.code === 1) {
        this.rewardList()
      }
    },
    searchClear() {
      this.state = null
      this.rewardList()
    },
    pageChange(page) {
      this.page = page
      this.rewardList()
    },
    // 导出excel表格
    exportExcelData() {
      this.$refs.table.exportCsv({
        filename: '奖励发放',
        columns: this.exportColumns,
        data: this.exportDate
      })
    },
    checkAllGroupChange(value) {
      if (this.checkAllGroup.length === 0 || this.checkAllGroup.length === 2) {
        this.state = null
      } else {
        if (this.checkAllGroup[0] == '已发放') {
          this.state = 2
        } else {
          this.state = 1
        }
      }
      console.log(this.state)
    }
  },
  mounted() {
    this.rewardList()
  }
}
</script>

<style lang="less" scoped>
  .fin-wit-list {
  }
  .z-refresh {
    cursor: pointer;
    &:hover {
      color: #2d8cf0;
    }
  }
  .z-alipay {
    color: black;
  }
  .z-appeal-search {
    display: flex;
    // justify-content: center;
    align-items: center;
  }
  .z-with-export {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
