<template>
  <div class="z-verify">
    <Card :bordered="false" class="z-search">
      <p slot="title">搜索条件</p>
      <div slot="extra" class="z-btn">
        <Button type="default" style="marginRight:10px" @click="searchClear" size="small">清空</Button>
        <Button type="primary" @click="hitchList" size="small">搜索</Button>
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
            <Input v-model="searchForm.departname" placeholder="输入安全类型关键字" />
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
            <Input v-model="searchForm._id" placeholder="输入安全类型关键字" />
          </div>
          </Col>
          <Col :span="6">
          <span class="z-label">安全类型:</span>
          <div class="z-content">
            <Input v-model="searchForm.safe_type" placeholder="输入安全类型关键字" />
          </div>
          </Col>
          <Col :span="6">
          <span class="z-label">检查类型:</span>
          <div class="z-content">
            <Input v-model="searchForm.check_type" placeholder="输入安全类型关键字" />
          </div>
          </Col>
          <Col :span="6">
          <span class="z-label">地址:</span>
          <div class="z-content">
            <Input v-model="searchForm.address" placeholder="输入安全类型关键字" />
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
      <p slot="title">广告列表</p>
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
  data() {
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
          key: 'title'
        },
        {
          title: '封面图片',
          key: 'image',
          render: (h, params) => {
            const { image } = params.row
            return <div>
              <img class="img123" src={image} />
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
          title: '安全类型/检查类型',
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
      data: [{
        title: '广告标题',
        add_time: 1490062066,
        // 阅读次数
        browse: 0,
        cate_id: '2',
        cate_name: '苹果/Apple',
        collect: 0,
        cost: '0.00',
        description: '哈是佛啊睡觉哦啊',
        ficti: 0,
        give_integral: '0.00',
        id: 463,
        image: 'http://shop.crmeb.net/public/uploads/store/product/s_5abc69eba3f43.jpg',
        keyword: 'crmeb电商系统,客户关系管理电商系统,微信商城开发,小程序商城,公众号商城开发,西安微信开发,西安微信商城定制,微商城定制开发,西安小程序开发',
        like: 0,
        mer_id: 0,
        mer_use: 0,
        ot_price: '58.00',
        postage: '0.00',
        price: '51.00',
        sales: 12,
        sales_attr: 0,
        slider_image: 'http://shop.crmeb.net/public/uploads/store/product/s_5abc69eba3f43.jpg',
        sort: 0,
        stock: 91486,
        stock_attr: true,
        store_info: '集客户关系管理+营销电商系统，能够真正帮助企业基于微信公众号、小程序，实现会员关系管理、数据分析，精准营销的电子商务管理系统。可满足企业零售、批发、分销等各种业务需求。',
        store_name: 'crmeb电商系统',
        unit_name: '件',
        vip_price: '0.00',
        visitor: 0,
        vstock: '91486'      }],
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

    searchClear() {
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
    },
    selectDate(date) {
      if (date !== undefined) {
        this.searchForm.date_range = date
      }
    },
    pageChange(page) {
      this.page = page
    },
    handleDelete(params) {
      console.log(params)
    },
    detail() {
      this.modal = true
    }
  },
  mounted() {
  },
  watch: {

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

.img123 {
  width: 80px;
  height: 80px;
}
</style>
