<template>
  <div class="safe-wrap">
    <div class="item new-one" @click="openModal('活动类型 新增栏目')">
      新增栏目
    </div>
    {{safeListData}}
    <div v-for="safe in safeListData">
      新增栏目
    </div>
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
      value: null,
      array: [1, 2, 3, 4]
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
        this.safeListData.push('asf')
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
      if (this.title == '活动类型 新增栏目') {
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
