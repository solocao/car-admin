<template>
  <div class="ope-mes-list">
    <Card>
      <p slot="title">消息列表</p>
      <Table :columns="columns" :data="tableData"></Table>
      <Page style="marginTop: 10px" :total="total" size="small" show-elevator show-total @on-change="pageChange" />
    </Card>

  </div>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        {
          title: '日期',
          key: 'image',
        },
        {
          title: '内容',
          key: 'title'
        },
        {
          title: '发布人',
          key: 'brief'
        }
      ],
      tableData: [],
      total: 0,
      page: 1,
    }
  },
  methods: {
    pageChange(page) {
      this.page = page
    },
  }
}
</script>
<style lang="less" scoped>
</style>


