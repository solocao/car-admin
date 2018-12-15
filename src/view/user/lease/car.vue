<!-- 租赁商车型库管理 -->
<template>
  <div class="lease-car">
    <Card :bordered="false" class="z-search">
      <p slot="title">租赁商车型库</p>
      <div slot="extra" class="z-btn">
        <Button type="default" style="marginRight:10px" size="small" @click="searchClear">刷新</Button>
        <Button type="primary" size="small" @click="openCarAddModal">新增车型</Button>
      </div>
    </Card>
    <lease-car-add :visible.sync="visible"></lease-car-add>
  </div>
</template>
<script>
import LeaseCarAdd from '@components/modal/LeaseCarAdd'
export default {
  components: {
    LeaseCarAdd
  },
  data() {
    return {
      visible: false
    }
  },
  methods: {
    // 打开车辆新增模态框
    openCarAddModal() {
      this.visible = true;
    }
  }
}
</script>

<style lang="less" scoped>
  .lease-car {
  }
</style>

