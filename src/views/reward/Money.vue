<template>
  <div>
    <div v-if="money!==false">
      <Input v-model="money" readonly prefix="logo-yen" size="small" style="width: 80px" />
    </div>
    <div v-else>
      <Poptip trigger="hover">
        <Input v-model="setMoney" prefix="logo-yen" size="small" placeholder="输入金额" style="width: 100px" />
        <div slot="content">
          <div class="quick-header">快速设置</div>
          <div class="quick-item">
            <span class="z-choose-money" @click="setMoney=10">10元</span>
            <span class="z-choose-money" @click="setMoney=20">20元</span>
          </div>
          <div class="quick-item">
            <span class="z-choose-money" @click="setMoney=50">50元</span>
            <span class="z-choose-money" @click="setMoney=100">100元</span>
          </div>
        </div>
      </Poptip>
      <Button size="small" style="marginLeft:4px" @click="hitchReward">确定</Button>
    </div>

  </div>
</template>
<script>
export default {
  props: {
    hitch_id: {
      type: String
    },
    reward: {
      type: Object
    },
    // 刷新列表
    rewardList: {
      type: Function
    }
  },
  data () {
    return {
      setMoney: null
    }
  },
  computed: {
    money () {
      if (this.reward !== undefined) {
        return this.reward.money + '  元'
      } else {
        return false
      }
    }
  },
  methods: {
    async hitchReward () {
      if (this.setMoney == null) {
        this.$Message.info('请输入金额')
        return
      }
      const params = {
        url: 'hitch/reward',
        payload: {
          hitch_id: this.hitch_id,
          money: this.setMoney
        },
        auth: true
      }
      const result = await this.post(params)
      if (result.code === 1) {
        this.reward = result.data.reward
        this.$Message.info('金额设置成功')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.quick-header {
  width: 100%;
  display: flex;
  justify-content: center;
}

.quick-item {
  display: flex;
  justify-content: space-around;
  .z-choose-money {
    display: flex;
    font-size: 12px;
    width: 50px;
    height: 20px;
    margin: 2px 5px;
    border: 1px solid #ff00009e;
    border-radius: 3px;
    justify-content: center;
    align-items: center;
    color: #ff00009e;
    cursor: pointer;
    &:hover {
      background: #ff00009e;
      color: white;
    }
  }
}
</style>
