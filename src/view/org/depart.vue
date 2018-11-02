<template>
  <div>
    <Card>
      <p slot="title">地区项目部门</p>
      <span slot="extra">
        <Button size="small" type="primary" @click="modalShow(null,'add')">新增</Button>
        <Button style="margin-left:6px" size="small" type="default" @click="departTree">刷新</Button>
      </span>
      <Table :data="tableData" :columns="columns" stripe ref="table2image"></Table>
      <Modal v-model="modal" :title="modelTitle" @on-ok="ok" @on-cancel="cancel">
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
import bidExpand from '@/view/components/depart/bidExpand.vue'
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
          type: 'expand',
          width: 50,
          render: (h, params) => {
            console.log(params.row)
            return h(bidExpand, {
              props: {
                row: params.row
              }
            })
          }
        },
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
            return <div>
              <i-button size="small" type="primary" onClick={() => this.modalShow(params.row, 'add')}>新增</i-button>
              <i-button size="small" style="margin-left:6px" onClick={() => this.modalShow(params.row, 'update')}>编辑</i-button>
            </div>
          }
        }
      ],
      tableData: []
    }
  },
  components: {
    bidExpand
  },
  computed: {
    modelTitle () {
      return this.mode === 'add' ? '新增 地区项目部门' : '编辑 地区项目部门'
    }
  },

  methods: {
    // 显示模型框
    modalShow (row, type) {
      if (type === 'add') {
        this.mode = 'add'
        this.form.name = null
        this.form.slug = null
        this.form.description = null
      }
      if (type === 'update') {
        const { _id, name, slug, description } = row
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
        this.departAdd()
      } else {
        this.rankUpdate()
      }
    },
    // 获取地区部门
    async departTree () {
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
      this.tableData = arr
    },
    async departAdd () {
      const params = {
        url: 'depart/add',
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
        this.departTree()
      }
    },
    async rankUpdate () {
      const params = {
        url: 'depart/update',
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
        this.departTree()
      }
    }
  },

  mounted () {
    // this.rankList()
    this.departTree()
  }
}
</script>

<style lang="less" scoped>
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
