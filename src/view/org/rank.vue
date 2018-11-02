<template>
  <div>
    <Card>
      <p slot="title">总部管理部门</p>
      <span slot="extra">
        <Button style="margin-left:6px" size="small" type="default" @click="rankTree">刷新</Button>
      </span>
      <Table :data="tableData" :columns="columns" stripe ref="table2image"></Table>
      <Modal v-model="modal" :title="modeText" @on-ok="ok" @on-cancel="cancel">
        <Form :model="form" label-position="top">
          <FormItem v-if="form.parentName !== null" label="父级">
            <Input :readonly="true" v-model="form.parentName"></Input>
          </FormItem>
          <FormItem label="部门名称">
            <Input v-model="form.name"></Input>
          </FormItem>
          <FormItem label="部门别名">
            <Input v-model="form.slug"></Input>
          </FormItem>
          <FormItem label="部门描述">
            <Input type="textarea" v-model="form.description"></Input>
          </FormItem>
        </Form>
      </Modal>
    </Card>
  </div>
</template>

<script>
import { timeS } from '@/libs/help.js'
export default {
  data () {
    return {
      form: {
        _id: null,
        pid: null,
        parentName: null,
        name: null,
        slug: null,
        description: null
      },
      modal: false,
      // 模态框类别 add 新增 update 编辑
      mode: null,
      columns: [
        {
          title: '名称',
          key: 'name',
          render: (h, params) => {
            const { name, level } = params.row
            const span = <span class={'tree-show-' + level}>{name}</span>
            return <div>
              {span}
            </div>
          }

        },
        {
          title: '层次',
          key: 'level'
        },
        {
          title: '别名',
          key: 'slug'
        },
        {
          title: '描述',
          key: 'description'
        },
        {
          title: '创建时间',
          key: 'create_at',
          render: (h, params) => {
            const createAt = timeS(params.row.create_at)
            return <div>
              {createAt}
            </div>
          }
        },
        {
          title: '操作',
          key: 'hand',
          width: 170,
          render: (h, params) => {
            if (params.row.pid === null) {
              return <div>
                <i-button size="small" type="primary" onClick={() => this.modalShow(params.row, 'add')}>新增</i-button>
                <i-button size="small" style="margin-left:6px" onClick={() => this.modalShow(params.row, 'update')}>编辑</i-button>
              </div>
            }
            return <div>
              <i-button size="small" type="primary" onClick={() => this.modalShow(params.row, 'add')}>新增</i-button>
              <poptip trigger="click" title="操作提示">
                <i-button size="small" type="error" style="margin-left:6px">删除</i-button>
                <div slot="content">
                  是否确认删除
                  <i-button size="small" type="primary" style="marginLeft:4px" onClick={() => this.rankDelete(params.row._id)} >确定</i-button>
                </div>
              </poptip>
              <i-button size="small" style="margin-left:6px" onClick={() => this.modalShow(params.row, 'update')}>编辑</i-button>
            </div>
          }
        }
      ],
      tableData: []
    }
  },
  computed: {
    modeText () {
      return this.mode === 'add' ? '新增' : '编辑'
    }
  },
  methods: {
    // 显示模型框
    modalShow (row, type) {
      const { _id, name, slug, description } = row
      if (type === 'add') {
        this.mode = 'add'
        this.form.parentName = name
        this.form.pid = _id
        this.form.name = null
        this.form.slug = null
        this.form.description = null
      }
      if (type === 'update') {
        this.mode = 'update'
        this.form._id = _id
        this.form.pid = null
        this.form.name = name
        this.form.slug = slug
        this.form.description = description
      }
      this.modal = true
    },
    ok () {
      if (this.mode === 'add') {
        this.rankAdd()
      } else {
        this.rankUpdate()
      }
    },
    // 获取层级列表树
    async rankTree () {
      const params = {
        url: 'rank/list',
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
      // 递归实现
      recursiveTraverse(data[0], 1)
      this.tableData = arr
    },
    async rankList () {
      const params = {
        url: 'rank/list',
        payload: {

        }
      }

      const result = await this.post(params)
      if (result.code === 1) {
        this.tableData = result.data
      }
    },
    // 添加部门组织
    async rankAdd () {
      const params = {
        url: 'rank/add',
        payload: {
          name: this.form.name,
          slug: this.form.slug,
          description: this.form.description
        },
        auth: true
      }
      if (this.form.pid !== null) {
        params.payload.pid = this.form.pid
      }
      const result = await this.post(params)
      if (result.code === 1) {
        this.rankTree()
      } else {
        this.$Message.error(result.msg)
      }
    },
    async rankUpdate () {
      const params = {
        url: 'rank/update',
        payload: {
          _id: this.form._id,
          name: this.form.name,
          slug: this.form.slug,
          description: this.form.description
        },
        auth: true
      }
      const result = await this.post(params)
      if (result.code === 1) {
        this.rankTree()
      }
    },
    async rankDelete (rank_id) {
      const params = {
        url: 'rank/delete',
        payload: {
          _id: rank_id
        },
        auth: true
      }
      const result = await this.post(params)
      if (result.code === 1) {
        this.rankTree()
      }
    }

  },

  mounted () {
    // this.rankList()
    this.rankTree()
  }
}
</script>

<style lang="less">
.tree-show-1 {
}
.tree-show-2 {
  margin-left: 20px;
}
.tree-show-3 {
  margin-left: 40px;
}
.tree-show-4 {
  margin-left: 60px;
}
textarea {
  font-size: 12px !important;
}
</style>
