<template>
  <div class="verify-list">
    <Card :bordered="false" class="z-search">
      <p slot="title">搜索条件</p>
      <div slot="extra" class="z-btn">
        <Button type="default" style="marginRight:10px" size="small" @click="searchClear">清空</Button>
        <Button type="primary" size="small" @click="userList">搜索</Button>
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
      <Table :columns="columns" :data="tableData"></Table>
      <Page style="marginTop: 10px" :total="total" size="small" show-elevator show-total @on-change="pageChange" />
    </Card>
    <verify-check :show.sync="verifyShow" :data="verifyData"></verify-check>
  </div>
</template>
<script>
import VerifyCheck from '@c/drawer/VerifyCheck'
import UserCard from '@/components/user/UserCard'
import { timeS, roleName } from '@/libs/help.js'
export default {
  name: 'tables_page',
  components: {
    UserCard,
    VerifyCheck
  },
  data () {
    return {
      total: 0,
      page: 1,
      verifyShow: false,
      verifyData: null,
      columns: [
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '车牌号',
          key: 'car_number'
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
    // 查询用户认证列表
    async verifyList () {
      const params = {
        url: 'verify/list',
        payload: {
          page: this.page,
          size: 10
        }
      }
      const result = await this.post(params)
      if (result.code === 1) {
        this.tableData = result.data
        this.total = result.paginate.total
      }
    },

    modalHide () {
      this.modal = false
    },
    // 打开侧边详细
    openDrawer (row) {
      this.verifyData = row
      this.verifyShow = true
    },

    // 清空搜索条件
    searchClear () {
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
    selectDate (date) {
      if (date !== undefined) {
        this.searchForm.date_range = date
      }
    },
    pageChange (page) {
      this.page = page
      this.userList()
    },
    // 更新用户信息
    async userUpdate () {
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
  mounted () {
    this.verifyList()
  }
}
</script>
<style lang="less" scoped>
.verify-list {
}
</style>
