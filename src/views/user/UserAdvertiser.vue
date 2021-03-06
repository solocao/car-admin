<template>
  <div class="user-list">
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
            <Select v-model="roleSelect">
              <Option v-for="item in roleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <!-- <Input v-model="searchForm.role" placeholder="选择权限" /> -->
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
    <Modal v-model="modal" title="编辑用户信息">
      <Form :model="form" :label-width="60">
        <FormItem label="头像">
          <img class="z-header" :src="form.avatar" alt="">
        </FormItem>
        <FormItem label="登录账号">
          <Input :readonly="nameDisable" placeholder="请输入登录账号" v-model="form.name"></Input>
        </FormItem>
        <FormItem label="昵称">
          <Input v-model="form.nickname"></Input>
        </FormItem>
        <FormItem label="微信ID">
          <Input v-model="form.openid"></Input>
        </FormItem>

        <FormItem label="手机号">
          <Input v-model="form.mobile"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="default" @click="modalHide">取消</Button>
        <Button type="primary" @click="userUpdate">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>

import UserCard from '@/components/user/UserCard'
import { timeS, roleName } from '@/libs/help.js'
export default {
  name: 'tables_page',
  components: {
    UserCard
  },
  data() {
    return {
      total: 0,
      page: 1,
      roleList: [
        {
          value: 'all',
          label: '全部'
        }, {
          value: '0',
          label: '普通用户'
        },
        {
          value: '1',
          label: '安全生产员'
        },
        {
          value: '2',
          label: '项目经理(普通管理员)'
        },
        {
          value: '3',
          label: '领导(普通管理员)'
        },
        {
          value: '4',
          label: '超级管理员'
        }],
      columns: [
        {
          title: '用户',
          key: 'name',
          render: (h, params) => {
            const { row } = params
            const { avatar, nickname } = row
            const img = <img src={avatar}></img>
            return (<div class="z-name">
              {img}
              <span>{nickname}</span>
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
    modalHide() {
      this.modal = false
    },
    // 打开模态框
    openModal(row) {
      this.modal = true
      const { _id, name, nickname, avatar, openid, mobile } = row
      if (name == '') {
        this.nameDisable = false
      } else {
        this.nameDisable = true
      }
      this.form = {
        upd_user_id: _id,
        name,
        nickname,
        avatar,
        openid,
        mobile
      }
    },
    // 查询用户列表
    async userList() {
      const params = {
        url: 'user/list',
        payload: {
          page: this.page,
          size: 10
        }
      }

      if (this.roleSelect == 'all') {
        this.searchForm.role = null
      } else {
        this.searchForm.role = parseInt(this.roleSelect)
      }

      // 增加查询参数
      Object.keys(this.searchForm).map(x => {
        if (this.searchForm[x] !== null) {
          if (x === 'date_range') {
            params.payload[x] = JSON.stringify(this.searchForm[x])
          } else {
            params.payload[x] = this.searchForm[x]
          }
        }
      })

      const result = await this.post(params)
      if (result.code === 1) {
        this.tableData = result.data
        this.total = result.paginate.total
      }
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
      this.userList()
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
    this.userList()
  },
  watch: {
    roleSelect(newVal) {
      this.userList()
    }
  }
}
</script>
<style lang="less">
  .user-list {
    .z-search {
      @label-width: 60px;
      margin-bottom: 10px;
      font-size: 12px;
      .z-label {
        width: @label-width;
        float: left;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
      .z-content {
        margin-left: @label-width + 10px;
      }
      .z-btn {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
</style>
