<template>
  <div class="safe-wrap">
    <div class="item new-one" @click="openModal('安全类型 新增栏目')">
      新增栏目{{safeListData}}
    </div>

    {{safeListData.length}}

    <Card class="item" title="阿萨法是" icon="ios-options" :padding="0">
      <div slot="extra">
        <ButtonGroup size="small">
          <Button type="primary" @click="openModal('检查类别 新增')">新增</Button>
          <Button type="primary" @click="safeList">刷新</Button>
        </ButtonGroup>
      </div>
      <CellGroup v-if="false">
        <Cell v-for="item in safe.nodes" :title="item.name" :key="item._id">
          <div slot="extra">
            <ButtonGroup size="small">
              <Button @click="()=>{ openModal('检查类别 栏目 编辑')}">编辑</Button>
              <Button>删除</Button>
            </ButtonGroup>
          </div>
        </Cell>
      </CellGroup>
    </Card>
    <Modal v-model="modal" :title="title" @on-ok="ok" @on-cancel="cancel" width="360">
      <Input v-model="value" placeholder="请输入名称" style="width: 325px" />
    </Modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: null,
      modal: false,
      safeListData: [],
      value: null
    }
  },
  methods: {
    async safeList () {
      const params = {
        url: 'setting/safe/list',
        payload: {},
        auth: true
      }
      const result = await this.get(params)
      if (result.code === 1) {
        this.safeListData = result.data
      }
    },
    // mode两个值 add edit
    openModal (title, mode) {
      this.title = title
      this.modal = true
    },
    // 新增根栏目
    async safeAddRoot () {
      const params = {
        url: 'setting/safe/root/add',
        payload: {
          name: this.value
        },
        auth: true
      }
      const result = await this.post(params)
      if (result.code === 1) {
        this.safeList()
      } else {
        this.$Message.error(result.msg)
      }
    },
    // 新增栏目节点
    async  safeNodeAdd () {

    },

    ok () {
      if (this.title == '安全类型 新增栏目') {
        this.safeAddRoot()
      }
    },
    cancel () { }
  },
  created () {
    this.safeList()
  }
}
</script>
<style lang="less" scoped>
.safe-wrap {
  column-count: 2;
  column-gap: 10px;
  .item {
    margin-bottom: 20px;
    break-inside: avoid;
    width: 400px;
    height: 334px;
  }
  .new-one {
    height: 52px;
    border: 1px solid #e5e7e9;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    color: #2781ee;
    cursor: pointer;
  }
}
</style>
