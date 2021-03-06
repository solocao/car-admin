<template>
  <div class="active-list">
    <Card :bordered="false" class="z-search" v-if="false">
      <p slot="title">搜索条件</p>
      <div slot="extra" class="z-btn">
        <Button type="default" style="marginRight:10px" size="small" @click="searchClear">清空</Button>
        <Button type="primary" size="small" @click="activeList">搜索</Button>
      </div>
      <div>
        <Row>
          <Col :span="6">
          <span class="z-label">用户名:</span>
          <div class="z-content">
            <Input v-model="searchForm.name" placeholder="输入账号名或用户昵称" />
          </div>
          </Col>
          <Col :span="6">
          <span class="z-label">权限:</span>
          <div class="z-content">

          </div>
          </Col>
          <Col :span="6">
          <span class="z-label">手机号:</span>
          <div class="z-content">
            <Input v-model="searchForm.mobile" placeholder="输入手机号" />
          </div>
          </Col>
          <Col :span="6">
          <span class="z-label">注册日期:</span>
          <div class="z-content">
            <DatePicker type="daterange" confirm placement="bottom-end" placeholder="注册时间" style="width: 100%" @on-change="selectDate"></DatePicker>
          </div>
          </Col>
        </Row>
      </div>
    </Card>
    <Card>
      <p slot="title">活动列表</p>
      <div slot="extra" class="z-btn">
        <Button type="default" style="marginRight:10px" size="small" @click="userList">刷新</Button>
      </div>
      <Table :columns="columns" :data="tableData"></Table>
      <Page style="marginTop: 10px" :total="total" size="small" show-elevator show-total @on-change="pageChange" />
    </Card>
    <active-drawer :show.sync="activeShow" :data="activeData"></active-drawer>
  </div>
</template>
<script>

import ActiveDrawer from '@components/drawer/ActiveDrawer'
import UserCard from '@/components/user/UserCard'
import { timeS, roleName } from '@/libs/help.js'
export default {
  name: 'tables_page',
  components: {
    UserCard,
    ActiveDrawer
  },
  data() {
    return {
      total: 0,
      page: 1,
      activeShow: false,
      activeData: null,
      columns: [
        {
          title: '封面图片',
          key: 'image',
          render: (h, params) => {
            const { cover_img } = params.row
            return <div class="table-img">
              <img src={cover_img} />
            </div>
          }
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
              <i-button size="small" type="primary" style="margin-left:6px" onClick={() => this.openDrawer(params.row)}>运营</i-button>
            </div>
          }
        }
      ],
      tableData: [],
      modal: false,
      roleSelect: 'all',
      searchForm: {
        name: null,
        role: null,
        mobile: null,
        date_range: null
      },
      form: {
        user_id: null,
        // 登录账号
        name: null,
        avatar: null,
        nickname: null,
        password: null,
        // 所属层级结构
        rank: null
      },
      nameDisable: true
    }
  },
  methods: {
    // 活动列表
    async activeList() {
      const params = {
        url: 'active/list',
        payload: {
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

    modalHide() {
      this.modal = false
    },
    // 打开侧边详细
    openDrawer(row) {
      this.activeData = row
      this.activeShow = true
    },

    // 清空搜索条件
    searchClear() {
      this.roleSelect = 'all'
      this.searchForm = {
        name: null,
        mobile: null,
        role: null,
        date_range: null
      }
      this.verifyList()
    },
    // 时间选择
    selectDate(date) {
      if (date !== undefined) {
        this.searchForm.date_range = date
      }
    },
    pageChange(page) {
      this.page = page
      this.userList()
    },
    // 更新用户信息
    async userUpdate() {
      const copyForm = JSON.parse(JSON.stringify(this.form))
      // 如果账号名称是已经存在的了，就不需要更新了
      if (this.nameDisable) {
        delete copyForm.name
      }
      const params = {
        url: 'user/update',
        payload: copyForm,
        auth: true
      }
      const result = await this.post(params)
      if (result.code === 1) {
        this.$Message.info('用户资料修改成功')
        this.userList()
      } else {
        this.$Message.console.error(result.msg)
      }
      this.modal = false
    }
  },
  mounted() {
    this.activeList()
  }
}
</script>
<style lang="less" scoped>
  .active-list {
  }
</style>
