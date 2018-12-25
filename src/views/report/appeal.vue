<template>
  <div class="z-verify">
    <Card>
      <p slot="title">申诉列表</p>
      <div slot="extra" class="z-appeal-search">
        <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
          <Checkbox label="已处理"></Checkbox>
          <Checkbox label="未处理"></Checkbox>
        </CheckboxGroup>
        <Button type="default" style="marginRight:10px" @click="appealList" size="small">刷新</Button>
        <Button type="primary" @click="appealList" size="small">搜索</Button>
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
      checkAllGroup: ['已处理', '未处理'],
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
          key: 'title',
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
          title: '申诉',
          key: 'state',
          render: (h, params) => {
            const { state } = params.row.appeal
            let stateText = ''

            let stateClass = ''

            switch (state) {
              case 1: stateText = '未处理'; stateClass = 'z-state-tag0'; break
              case 2: stateText = '已处理'; stateClass = 'z-state-tag2'; break
              default: stateText = '未处理'; stateClass = 'z-state-tag0'; break
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
      state: [1, 2]
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
    checkAllGroupChange (value) {
      if (value.length == 0 || value.length == 2) {
        this.state = [1, 2]
      } else {
        this.state = value == '未处理' ? [1] : [2]
      }
    },
    async appealList () {
      const params = {
        url: 'hitch/appeal/list',
        payload: {
          page: this.page,
          size: 10,
          state: JSON.stringify(this.state)
        },
        auth: true
      }

      const result = await this.post(params)
      if (result.code === 1) {
        this.total = result.paginate.total
        this.data = result.data
      }
    },
    pageChange (page) {
      this.page = page
      this.appealList()
    },
    detail () {
      this.modal = true
    }
  },
  mounted () {
    this.appealList()
  },
  watch: {
    hitchDrawer (newVal) {
      if (newVal == false) {
        this.appealList()
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
.z-appeal-search {
  display: flex;
  // justify-content: center;
  align-items: center;
}
</style>
