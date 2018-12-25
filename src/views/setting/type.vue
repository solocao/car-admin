<template>
  <div class="z-setting">
    <Tabs :animated="false">
      <TabPane label="检查类别">
        <Card class="item" title="检查类别 栏目" icon="ios-options" :padding="0">
          <div slot="extra">
            <ButtonGroup size="small">
              <Button type="primary" @click="()=>{value=null;openModal('检查类别 新增')}">新增</Button>
              <Button @click="checkList">刷新</Button>
            </ButtonGroup>
          </div>
          <CellGroup>
            <Cell v-for="check in checkListData" :title="check.name" :key="check._id">
              <div slot="extra">
                <ButtonGroup size="small">
                  <Button @click="()=>{value=check.name;check_id=check._id; openModal('检查类别 栏目 编辑')}">编辑</Button>
                  <Button>删除</Button>
                </ButtonGroup>
              </div>
            </Cell>
          </CellGroup>
        </Card>
      </TabPane>
    </Tabs>
    <Modal v-model="modal" :title="title" @on-ok="ok" @on-cancel="cancel" width="360">
      <Input v-model="value" placeholder="请输入名称" style="width: 325px" />
    </Modal>
  </div>
</template>
<script>
import SafeTab from './SafeTab.vue'
export default {
  components: {
    SafeTab
  },
  data () {
    return {
      switchValue: true,
      checkName: null,
      modal: false,
      title: null,
      value: null,
      // add new
      mode: null,
      // check safe
      type: null,
      checkListData: [],
      check_id: null,
      safeListData: [],
      safe_id: null,
      node_id: null
    }
  },
  methods: {
    cancel () { },
    async  checkList () {
      const params = {
        url: 'setting/check/list',
        payload: {}
      }
      const result = await this.get(params)
      if (result.code === 1) {
        this.checkListData = result.data
      }
      console.log(result)
    },
    // 检查类别新增
    async checkAdd () {
      const params = {
        url: 'setting/check/add',
        payload: {
          name: this.value
        },
        auth: true
      }
      const result = await this.post(params)
      if (result.code === 1) {
        this.$Message.info(result.msg)
        this.checkList()
      } else {
        this.$Message.error(result.msg)
      }
    },
    async checkUpdate () {
      const params = {
        url: 'setting/check/update',
        payload: {
          check_id: this.check_id,
          name: this.value
        },
        auth: true
      }
      const result = await this.post(params)
      if (result.code === 1) {
        this.checkList()
      } else {
        this.$Message.error(result.msg)
      }
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
        this.$Message.info(result.msg)
      } else {
        this.$Message.error(result.msg)
      }
    },
    // 新增栏目节点
    async  safeNodeAdd () {
      const params = {
        url: 'setting/safe/node/add',
        payload: {
          safe_id: this.safe_id,
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
    // 修改safe的某个栏目名称
    async safeRootName () {
      const params = {
        url: 'setting/safe/root/name',
        payload: {
          safe_id: this.safe_id,
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
    // 修改safe的某个选择名称
    async safeNodeName () {
      const params = {
        url: 'setting/safe/node/name',
        payload: {
          safe_id: this.safe_id,
          node_id: this.node_id,
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
    // 直接删除safe的一个栏目
    async safeRootDelete () {
      const params = {
        url: 'setting/safe/root/delete',
        payload: {
          safe_id: this.safe_id,
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

    // mode两个值 add edit
    openModal (title, mode) {
      this.title = title
      this.modal = true
    },
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
    ok () {
      if (this.title == '检查类别 新增') {
        this.checkAdd()
        return
      }
      if (this.title == '检查类别 栏目 编辑') {
        this.checkUpdate()
        return
      }
      if (this.title == '活动类型 新增栏目') {
        this.safeAddRoot()
      }
      if (this.title == '活动类型 选择项 新增') {
        this.safeNodeAdd()
      }
      if (this.title == '活动类型 栏目名称 编辑') {
        this.safeRootName()
      }
      if (this.title == '活动类型 选择项 编辑') {
        this.safeNodeName()
      }
      if (this.title == '活动类型 栏目 删除') {
        this.safeRootDelete()
      }
    }
  },
  mounted () {
    this.checkList()
    this.safeList()
  }
}
</script>

<style lang="less" scoped>
.z-setting {
  background: white;
  padding: 20px;
  .z-item {
    margin-bottom: 10px;
  }
}

.quick-header {
  font-weight: bold;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 4px;
}
</style>
