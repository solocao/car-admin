<template>
  <div class="bid-expand">
    <div class="z-bid-header">
      <span>标段列表</span>
      <div class="z-extra">
        <Input size="small" v-model="bidName" style="width: 160px;marginTop:-2px;marginRight:4px">
        <span slot="prepend">标段</span>
        </Input>
        <Button slot="append" type="primary" size="small" @click="addBid">新增</Button>
      </div>
    </div>

    <div class="z-splice">
      <div class="z-header-border"> </div>
    </div>

    <div class="z-container">
      <div class="z-bid" v-for="bid in bids" :key="bid._id">
        <div class="z-dot"></div>
        <span class="z-name"> {{bid.name}}</span>
        <div class="z-operate">
          <Poptip title="删除标段">
            <Button size="small" type="text" style="width:18px;padding:0px">
              <Icon type="md-trash" />
            </Button>
            <!-- 删除 -->
            <div slot="content">
              是否确定删除？
              <Button type="error" size="small" @click="bidDelete(bid._id)">删除</Button>
            </div>
          </Poptip>
          <Poptip title="修改标段">
            <Button size="small" type="text" style="width:18px;padding:0px">
              <Icon type="md-create" />
            </Button>
            <div slot="content">
              <!-- 更新 -->
              <Input v-model="value" size="small" :placeholder="bid.name" style="width: 100px;marginRight:3px" />
              <Button type="primary" size="small" @click="bidUpdate(bid._id)">确定</Button>
            </div>
          </Poptip>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    row: {
      type: Object
    }
  },
  data () {
    return {
      bidName: null,
      bids: [],
      value: null
    }
  },
  methods: {
    async addBid () {
      const params = {
        url: 'depart/bid/add',
        payload: {
          depart_id: this.row._id,
          name: this.bidName
        },
        auth: true
      }
      const result = await this.post(params)
      if (result.code === 1) {
        this.bidName = null
        this.bids = result.data.bid
      } else {
        this.$Message.error(result.msg)
      }
    },
    async bidUpdate (bid_id) {
      const params = {
        url: 'depart/bid/update',
        payload: {
          depart_id: this.row._id,
          bid_id: bid_id,
          name: this.value
        },
        auth: true
      }
      const result = await this.post(params)
      if (result.code === 1) {
        this.bids = result.data.bid
      }
      this.$Message.error(result.msg)
    },
    async bidDelete (bid_id) {
      const params = {
        url: 'depart/bid/delete',
        payload: {
          depart_id: this.row._id,
          bid_id: bid_id
        },
        auth: true
      }
      const result = await this.post(params)
      if (result.code === 1) {
        this.bids = result.data.bid
      }
      this.$Message.error(result.msg)
    }
  },
  mounted () {
    this.bids = this.row.bid
  }
}
</script>
<style lang="less" scoped>
.bid-expand {
  position: relative;
  background: white;
  padding: 10px;
  .z-bid-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    font-weight: bold;

    .z-extra {
      display: flex;
      width: 200px;
      justify-content: flex-end;
      align-items: center;
    }
  }

  .z-splice {
    width: 100%;
    overflow: hidden;
    .z-header-border {
      width: calc(100vw);
      height: 8px;
      margin-left: -16px;
      border-bottom: 1px solid #e5e7e9;
    }
  }

  .z-container {
    padding-top: 10px;
    display: flex;
    flex-wrap: wrap;

    .z-bid {
      border: 1px solid #80808029;
      box-shadow: 2px 2px 2px #9e9e9e61;
      margin: 4px;
      padding: 2px 5px;
      display: flex;
      align-items: center;

      .z-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #2781ee;
        margin-left: 4px;
        margin-right: 4px;
      }
      .z-name {
        margin-left: 10px;
        margin-right: 10px;
      }

      .z-operate {
        margin-left: 3px;
        margin-right: 3px;
      }
    }
  }
}
</style>
