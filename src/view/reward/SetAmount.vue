<template>
  <div class="z-verify">
    <Card>
      <p slot="title">设置金额列表</p>
      <div slot="extra" class="z-appeal-search">
        <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
          <Checkbox label="已设置"></Checkbox>
          <Checkbox label="未设置"></Checkbox>
        </CheckboxGroup>
        <Button type="primary" @click="rewardList" size="small">搜索</Button>
      </div>
      <Table :columns="columns" :data="data"></Table>
      <Page style="marginTop: 10px" :total="total" size="small" show-elevator show-total @on-change="pageChange" />
    </Card>
    <!-- 侧滑 -->
    <Drawer title="详细信息" v-model="hitchDrawer" width="720">
      <hitch-detail v-if="hitchDrawer" :hitchDrawer.sync="hitchDrawer" :data="hitchData"></hitch-detail>
    </Drawer>
  </div>
</template>

<script>

import HitchDetail from '@/components/hitch/HitchDetail.vue'
import Money from '@/view/reward/Money.vue'
import { timeS } from '@/libs/help.js'

export default {
  name: 'tables_page',
  components: {
    HitchDetail
  },
  data() {
    return {
      // 分页
      page: 1,
      total: 0,
      state: null,
      hitchData: null,
      hitchDrawer: false,
      checkAllGroup: ['已设置', '未设置'],
      value: 'w',
      columns: [
        {
          title: '标题',
          key: 'description',
          render: (h, params) => {
            const { title } = params.row.hitch
            return <div>
              <div>{title}</div>
            </div>
          }
        },
        {
          title: '上报人/日期',
          key: 'check',
          render: (h, params) => {
            const createAt = timeS(params.row.create_at)
            const { username } = params.row.hitch
            return <div>
              <div>{username}</div>
              <div>  {createAt}</div>
            </div>
          }
        },
        {
          title: '同意奖励人/日期',
          key: 'check',
          render: (h, params) => {
            const { verify } = params.row
            const createAt = timeS(verify.create_at)

            return <div>
              <div>{verify.username}</div>
              <div>  {createAt}</div>
            </div>
          }
        },

        {
          title: '状态',
          key: 'state',
          width: 100,
          render: (h, params) => {
            const { state } = params.row
            let stateText = ''

            let stateClass = ''

            switch (state) {
              case 0: stateText = '已上报'; stateClass = 'z-state-tag0'; break
              case 1: stateText = '整改提交'; stateClass = 'z-state-tag1'; break
              case 2: stateText = '审核通过'; stateClass = 'z-state-tag2'; break
              case -1: stateText = '上报拒审'; stateClass = 'z-state-tag-1'; break
              case -2: stateText = '重新整改'; stateClass = 'z-state-tag-2'; break
              case -3: stateText = '审核不过'; stateClass = 'z-state-tag-3'; break
              default: stateText = '已上报'; stateClass = 'z-state-tag0'; break
            };
            const tag = <span class={stateClass}>{stateText}</span>
            return <div>
              {tag}
            </div>
          }
        },
        {
          title: '奖励状态',
          key: 'handler',
          width: 100,
          render: (h, params) => {
            const { reward } = params.row
            let rewardState = '未设置'
            if (reward !== undefined) {
              rewardState = '已设置'
            }
            return <div>
              {rewardState}
            </div>
          }

        },
        {
          title: '操作',
          key: 'handler',
          width: 100,
          render: (h, params) => {
            return <div>
              <i-button size="small" onClick={() => this.hitchItem(params.row._id)}>查看</i-button>
            </div>
          }

        },
        {
          title: '奖励金额',
          key: 'money',
          width: 180,
          render: (h, params) => {
            const { reward } = params.row
            const { _id } = params.row
            return <Money reward={reward} hitch_id={_id} />
          }
        }
      ],
      data: [],
      searchForm: {
        address: null,
        description: null,
        report_username: null,
        safe_type: null,
        check_type: null,
        state: '4',
        _id: null,
        departname: null,
        date_range: null
      },
      stateList: [
        {
          value: '4',
          label: '全部'
        },
        {
          value: '0',
          label: '问题上报'
        },
        {
          value: '1',
          label: '问题整改'
        },
        {
          value: '2',
          label: '审核通过'
        },
        {
          value: '-1',
          label: '问题拒审'
        },
        {
          value: '-2',
          label: '重新整改'
        },
        {
          value: '-3',
          label: '整改不通过'
        }
      ]
    }
  },
  methods: {
    // 获取详细信息
    async hitchItem(hitchId) {
      const params = {
        url: `hitch/item/${hitchId}`,
        payload: {

        }
      }
      const result = await this.get(params)
      if (result.code === 1) {
        this.hitchData = result.data
        console.log('看看hitchdata')
        console.log(this.hitchData)
        this.hitchDrawer = true
      }
    },
    checkAllGroupChange(value) {
      if (this.checkAllGroup.length === 0 || this.checkAllGroup.length === 2) {
        this.state = null
      } else {
        if (this.checkAllGroup[0] == '已设置') {
          this.state = 1
        } else {
          this.state = 0
        }
      }
      console.log(this.state)
    },
    async  rewardList() {
      const params = {
        url: 'reward/set/list',
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
      }
      console.log('看看结果')
      console.log(result)
    },
    selectDate(date) {
      if (date !== undefined) {
        this.searchForm.date_range = date
      }
    },
    pageChange(page) {
      this.page = page
      this.rewardList()
    },
    handleDelete(params) {
      console.log(params)
    },
    detail() {
      this.modal = true
    },
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    }
  },
  mounted() {
    this.rewardList()
  }
}
</script>
<style lang="less">
.z-verify {
  .z-search {
    margin-bottom: 10px;
  }
  .z-modal {
    height: 80%;
  }
}
.time {
  font-size: 14px;
  font-weight: bold;
}
.z-m-item {
  margin: 10px 0px;
  display: flex;
  .z-title {
    width: 80px;
    font-weight: bold;
    margin-right: 4px;
  }
}
.my-gallery {
  display: flex;
  figure {
    margin: 5px;
    img {
      width: 150px;
      height: 112.5px;
    }
  }
}
.report-default {
  display: inline-block;
  height: 22px;
  line-height: 22px;
  margin: 2px 4px 2px 0;
  padding: 0 8px;
  border: 1px solid #e8eaec;
  border-radius: 3px;
  background: #f7f7f7;
  font-size: 12px;
  vertical-align: middle;
  opacity: 1;
  overflow: hidden;
  cursor: pointer;
}
.report-success {
}
.report-warning {
}

.z-state-tag0 {
  color: gray;
  background: #f6f6f6;
  padding: 2px 4px;
  border-radius: 3px;
  font-size: 12px;
  border: 1px solid #ebebeb;
}
.z-state-tag1 {
  color: white;
  background: #81c784;
  padding: 2px 4px;
  border-radius: 3px;
  font-size: 12px;
}
.z-state-tag2 {
  color: white;
  background: #4caf50;
  padding: 2px 4px;
  border-radius: 3px;
  font-size: 12px;
}
.z-state-tag-1 {
  font-size: 12px;
  background: #f44336;
  color: white;
  border-radius: 2px;
  padding: 2px 4px;
}
.z-state-tag-2 {
  font-size: 12px;
  background: #2196f3;
  color: white;
  border-radius: 2px;
  padding: 2px 4px;
}
.z-state-tag-3 {
  font-size: 12px;
  background: #060606;
  color: white;
  border-radius: 2px;
  padding: 2px 4px;
}
.z-appeal-search {
  display: flex;
  // justify-content: center;
  align-items: center;
}
</style>
