<template>
  <div class="z-verify">
    <Card :bordered="false" class="z-search">
      <p slot="title">搜索条件</p>
      <div slot="extra" class="z-btn">
        <Button type="default" style="marginRight:10px" @click="searchClear">清空</Button>
        <Button type="primary" @click="hitchList">搜索</Button>
      </div>
      <div>
        <Row>
          <Col :span="6">
          <span class="z-label">标题:</span>
          <div class="z-content">
            <Input v-model="searchForm.description" placeholder="请输入标题关键字" />
          </div>
          </Col>
          <Col :span="6">
          <span class="z-label">上报人:</span>
          <div class="z-content">
            <Input v-model="searchForm.report_username" placeholder="输入账号名或用户昵称" />
          </div>
          </Col>
          <Col :span="6">
          <span class="z-label">项目部门:</span>
          <div class="z-content">
            <Input v-model="searchForm.departname" placeholder="输入活动类型关键字" />
          </div>
          </Col>
          <Col :span="6">
          <span class="z-label">日期范围:</span>
          <div class="z-content">
            <DatePicker type="daterange" confirm placement="bottom-end" @on-change="selectDate" placeholder="Select date" style="width: 100%"></DatePicker>
          </div>
          </Col>
        </Row>
        <Row style="marginTop:16px">
          <Col :span="6">
          <span class="z-label">编号:</span>
          <div class="z-content">
            <Input v-model="searchForm._id" placeholder="输入活动类型关键字" />
          </div>
          </Col>
          <Col :span="6">
          <span class="z-label">活动类型:</span>
          <div class="z-content">
            <Input v-model="searchForm.safe_type" placeholder="输入活动类型关键字" />
          </div>
          </Col>
          <Col :span="6">
          <span class="z-label">检查类型:</span>
          <div class="z-content">
            <Input v-model="searchForm.check_type" placeholder="输入活动类型关键字" />
          </div>
          </Col>
          <Col :span="6">
          <span class="z-label">地址:</span>
          <div class="z-content">
            <Input v-model="searchForm.address" placeholder="输入活动类型关键字" />
          </div>
          </Col>
        </Row>
        <Row style="marginTop:16px">
          <Col :span="6">
          <span class="z-label">状态:</span>
          <div class="z-content">
            <Select v-model="searchForm.state" style="width:100%">
              <Option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
          </Col>
        </Row>
      </div>
    </Card>
    <Card>
      <p slot="title">问题列表</p>
      <span slot="extra">
        <Button style="margin-left:6px" size="small" type="default" @click="hitchList">刷新</Button>
      </span>
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
import { timeS } from '@/libs/help.js'

export default {
  name: 'tables_page',
  components: {
    HitchDetail
  },
  data () {
    return {
      // 分页
      page: 1,
      total: 0,
      hitchData: null,
      hitchDrawer: false,
      slide1: [
        {
          src: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
          msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
          alt: 'picture1',
          title: 'Image Caption 1',
          w: 1200,
          h: 900
        },
        {
          src: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg',
          msrc: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg',
          alt: 'picture2',
          title: 'Image Caption 2',
          w: 1200,
          h: 900
        }
      ],
      value: 'w',
      mData: {
      },
      columns: [
        {
          title: '标题',
          key: 'description',
          render: (h, params) => {
            const { title } = params.row.hitch
            return <div>
              <div class="text-over-nowarap">{title}</div>
            </div>
          }
        },
        {
          title: '项目部门/抄送总部',
          key: 'description',
          width: 200,
          render: (h, params) => {
            const { departname, toname } = params.row.hitch
            return <div>
              <div>{departname}</div>
              <div>{toname}</div>
            </div>
          }
        },
        {
          title: '活动类型/检查类型',
          key: 'safe',
          width: 180,
          render: (h, params) => {
            const { safe_type: safeType, check_type: checkType } = params.row.hitch
            return <div>
              <div>{safeType}</div>
              <div>{checkType}</div>
            </div>
          }
        },
        {
          title: '上报人/日期',
          key: 'check',
          width: 180,
          render: (h, params) => {
            const createAt = timeS(params.row.hitch.create_at)
            const { username } = params.row.hitch
            return <div>
              <div>{username}</div>
              <div>  {createAt}</div>
            </div>
          }
        },
        {
          title: '状态',
          key: 'state',
          width: 120,
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
          title: '操作',
          key: 'handler',
          width: 100,
          render: (h, params) => {
            return <div>
              <i-button size="small" onClick={() => this.hitchItem(params.row._id)}>查看</i-button>
            </div>
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
    async hitchItem (hitchId) {
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

    async hitchList () {
      const params = {
        url: 'hitch/list',
        payload: {
          page: this.page,
          size: 10
        },
        auth: true
      }

      // 增加查询参数
      Object.keys(this.searchForm).map(x => {
        if (x === 'state') {
          if (this.searchForm[x] !== '4') {
            params.payload[x] = JSON.stringify([parseInt(this.searchForm[x])])
          }
        } else {
          if (this.searchForm[x] !== null) {
            if (x === 'date_range') {
              params.payload[x] = JSON.stringify(this.searchForm[x])
            } else {
              params.payload[x] = this.searchForm[x]
            }
          }
        }
      })

      const result = await this.post(params)
      if (result.code === 1) {
        this.total = result.paginate.total
        this.data = result.data
      }
    },
    searchClear () {
      this.searchForm = {
        description: null,
        address: null,
        report_username: null,
        safe_type: null,
        check_type: null,
        state: '4',
        _id: null,
        departname: null,
        date_range: null
      }
      this.hitchList()
    },
    selectDate (date) {
      if (date !== undefined) {
        this.searchForm.date_range = date
      }
    },
    pageChange (page) {
      this.page = page
      this.hitchList()
    },
    handleDelete (params) {
      console.log(params)
    },
    detail () {
      this.modal = true
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    }
  },
  mounted () {
    this.hitchList()
  },
  watch: {
    hitchDrawer (newVal) {
      if (newVal == false) {
        this.hitchList()
      }
    }
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
</style>
