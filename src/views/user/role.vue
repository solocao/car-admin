<template>
  <div class="z-role">
    <!-- <img :src="form.avatar" alt="" @click="switchAvatar"> -->
    <div class="z-menu">
      <Menu active-name="3" @on-select="switchMenu">
        <MenuGroup title="系统权限">
          <MenuItem name="4">
          <Icon type="md-document" /> 超级管理员
          </MenuItem>
          <MenuItem name="3">
          <Icon type="md-chatbubbles" /> 领导（普通管理员）
          </MenuItem>
          <MenuItem name="2">
          <Icon type="md-chatbubbles" /> 项目经理（普通管理员）
          </MenuItem>
          <MenuItem name="1">
          <Icon type="md-chatbubbles" /> 安全生产员
          </MenuItem>
          <MenuItem name="0">
          <Icon type="md-chatbubbles" /> 普通用户
          </MenuItem>
        </MenuGroup>
      </Menu>
    </div>
    <div class="z-content">
      <Card style="height:100%" :bordered="false">
        <p slot="title">{{roleTitle}}</p>
        <span slot="extra">
          <Button size="small" type="primary" @click="openUserModal">新增</Button>
          <Button style="margin-left:6px" size="small" type="default" @click="roleList">刷新</Button>
        </span>
        <p> {{roleDescription}}</p>
        <div class="user-list">
          <Table :columns="columns" :data="tableData"></Table>
          <Page style="marginTop: 10px" :total="total" size="small" show-elevator show-total @on-change="pageChange" />
        </div>
      </Card>
    </div>
    <Modal v-model="modal" :title="modalTitle" @on-ok="ok" @on-cancel="cancel">
      <Form ref="formValidate" :model="form" :rules="ruleValidate" :label-width="90">
        <FormItem label="头像">
          <img class="z-header" :src="form.avatar" alt="">
        </FormItem>
        <FormItem prop="name" required label="登录账号">
          <Input :readonly="mode=='update'" placeholder="请输入登录账号" v-model="form.name"></Input>
        </FormItem>
        <FormItem prop="password" required v-if="mode!=='update'" label="登录密码">
          <Input v-model="form.password" placeholder="请输入登录密码"></Input>
        </FormItem>
        <FormItem prop="nickname" label="用户昵称">
          <Input :readonly="mode=='update'" placeholder="请输入用户昵称" v-model="form.nickname"></Input>
        </FormItem>
        <FormItem label="账号权限">
          <Select v-model="form.role">
            <Option v-for="item in roleSelectList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="权限描述">
          <Input placeholder="请输入用户权限描述" v-model="form.description"></Input>
        </FormItem>
        <FormItem label="地区项目部门">
          <Select v-model="form.depart" multiple>
            <Option v-for="item in departList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <div class="z-treeselect-form">
          <span class="z-label">总部管理部门</span>
          <treeselect class="z-select" v-model="form.rank" :multiple="true" :options="options" />
        </div>
      </Form>
      <div slot="footer">
        <Button type="default" @click="modalHide">取消</Button>
        <Button type="primary" @click="ok">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import UserCard from '@/components/user/UserCard'
import Treeselect from '@riophae/vue-treeselect'
import '@/components/@riophae/vue-treeselect/src/style.less'
import { roleName, roleDescription, timeS } from '@/libs/help.js'
const randomAvatar = require('random-avatar')
const md5 = require('md5')
export default {
  data() {
    return {
      // add 新增   update 更新
      mode: null,
      value: null,
      departList: [],
      roleSelectList: [
        {
          value: 4,
          label: '超级管理员'
        },
        {
          value: 3,
          label: '领导'
        },
        {
          value: 2,
          label: '项目经理'
        },
        {
          value: 1,
          label: '安全生产员'
        },
        {
          value: 0,
          label: '普通用户'
        }
      ],
      total: 0,
      page: 1,
      // define options
      options: [],
      modal: false,
      columns: [
        {
          title: '用户',
          key: 'name',
          render: (h, params) => {
            const { row } = params
            const { avatar, name, nickname } = row
            const img = <img src={avatar}></img>
            return (<div class="z-name">
              {img}
              <span>{name || nickname}</span>
            </div>)
          }        },
        { title: '手机号', key: 'mobile' },
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
          width: 300,
          render: (h, params) => {
            return <div>
              <i-button size="small" type="primary" style="margin-left:6px" onClick={() => this.openUserModal('update', params.row)} >编辑</i-button>
            </div>
          }
        }
      ],
      tableData: [],
      role: 3,
      // 模态框的类型 4超级管理员 3领导 2项目经理 1安全生产员 0普通人
      form: {
        _id: null,
        avatar: 'http://img0.imgtn.bdimg.com/it/u=2488160422,3313950858&fm=26&gp=0.jpg',
        name: null,
        password: null,
        // 地区项目部门
        depart: null,
        // 所属层级结构
        rank: null,
        role: null,
        // 权限描述
        description: null
      },
      ruleValidate: {
        name: [
          { required: true, message: '请填写用户账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '请填用户昵称', trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    UserCard,
    Treeselect
  },
  computed: {
    roleTitle() {
      return roleName(this.role)
    },
    roleDescription() {
      return roleDescription(this.role)
    },
    modalTitle() {
      let type = ''
      if (this.mode === 'add') {
        type = '新增'
      }
      if (this.mode === 'update') {
        type = '编辑'
      }

      const modalTitle = type + ' ' + roleName(this.role)
      return modalTitle
    }
  },
  methods: {
    switchAvatar() {
      this.form.avatar = randomAvatar()
    },
    modalHide() {
      this.modal = false
    },
    // 打开用户modeal
    openUserModal(mode, row) {
      if (mode === 'update') {
        this.mode = 'update'
        this.modal = true
        this.form._id = row._id
        this.form.avatar = row.avatar
        this.form.name = row.name === '' ? '未设置' : row.name
        this.form.nickname = row.nickname
        this.form.role = row.role.class
        this.form.rank = row.rank
        this.form.depart = row.depart
      } else {
        this.mode = 'add'
        this.form.role = this.role
        this.form.name = null
        this.form.nickname = null
        this.form.password = null
        this.form.rank = null
        this.modal = true
      }
    },
    ok() {
      if (this.mode == 'add') {
        this.userAdd()
      } else {
        this.userRoleUpdate()
      }
    },
    // 组织tree-select插件
    async rankTreeSelect() {
      const params = {
        url: 'rank/list',
        payload: {}
      }
      const result = await this.post(params)
      if (result.code === 1) {
        const data = result.data[0]
        const recursiveTraverse = function (node) {
          if (!node) { return }
          node.label = node.name
          delete node.create_at
          delete node.pid
          delete node.create_user
          delete node.description
          delete node.extends
          delete node.slug
          delete node._id
          delete node.__v
          delete node.name

          if (!node.children) { return }
          node.children.forEach(function (item, index) {
            recursiveTraverse(item)
          })
        }
        recursiveTraverse(data)
        this.options = [data]
        console.log('kankandatsa')
        console.log([data])
      }
    },
    // 创建管理员
    async  userAdd() {
      const valid = await this.$refs['formValidate'].validate()
      if (valid === false) {
        return
      }
      const { name, nickname, password, avatar, rank, depart } = this.form
      const params = {
        url: 'user/add',
        payload: {
          name: name,
          nickname: nickname,
          password: md5(password),
          avatar: avatar,
          // 权限
          role: this.role,
          // 地区项目部
          depart: JSON.stringify(depart),
          // 总部
          rank: JSON.stringify(rank)
        },
        auth: true
      }
      const result = await this.post(params)
      if (result.code === 1) {
        this.modal = false
        // 刷新列表
        this.roleList()
        this.$Message.info('用户创建成功')
      } else {
        this.$Message.info(result.msg)
      }
    },
    // 切换菜单栏
    switchMenu(role) {
      this.page = 1
      this.role = parseInt(role)
      this.roleList()
    },

    // 获取地区部门选择列表数据
    async getDepartList() {
      const params = {
        url: 'depart/list',
        payload: {}
      }
      const result = await this.post(params)
      let data = result.data
      const arr = []
      const recursiveTraverse = function (node, level) {
        if (!node) { return }
        node.level = level
        arr.push(node)
        if (!node.children) { return }
        node.children.forEach(function (item, index) {
          recursiveTraverse(item, level + 1)
        })
      }
      data.forEach(x => {
        // 递归实现
        recursiveTraverse(x, 1)
      })
      this.departList = arr.map(x => { return { value: x._id, label: x.name } })
    },

    async roleList() {
      const params = {
        url: 'user/list',
        payload: {
          role: this.role,
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
    pageChange(page) {
      this.page = page
      this.roleList()
    },
    async delete(user_id) {
      const params = {
        url: 'user/role',
        payload: {
          user_id: user_id,
          name: '普通用户',
          description: '普通用户',
          class: 0
        }
      }
      const result = await this.post(params)
      if (result.code === 1) {
        alert('删除成功')
      }
    },
    // 设置用户权限
    async userRoleUpdate() {
      const params = {
        url: 'user/role/update',
        payload: {
          user_id: this.form._id,
          role_class: this.form.role,
          role_name: roleName(this.form.role),
          role_description: this.form.description,
          depart: JSON.stringify(this.form.depart),
          rank: JSON.stringify(this.form.rank)
        },
        auth: true
      }
      const result = await this.post(params)
      if (result.code === 1) {
        this.$Message.info(result.msg)
        this.modal = false
        this.roleList()
      }
    }
  },
  mounted() {
    this.rankTreeSelect()
    this.roleList()
    this.getDepartList()
  }
}
</script>

<style lang="less">
.z-role {
  background: white;
  width: 100%;
  height: 100%;
  display: flex;
  .z-menu {
    width: 240px;
  }
  .z-content {
    width: calc(100vw);
    .user-list {
      margin-top: 18px;
    }
  }
}

.z-header {
  width: 80px;
  height: 80px;
}
.z-treeselect-form {
  width: 100%;
  .z-label {
    width: 90px;
    height: 34px;
    display: flex;
    align-items: center;
    padding-left: 4px;
    float: left;
  }
  .z-select {
    margin-left: 90px;

    // width: calc(100vw - 50px);
    // width: 100px;
    // background: red;
  }
}
</style>
