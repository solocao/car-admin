<template>
  <div class="car-category">
    <Card :bordered="false" class="car-card" :padding="0">
      <p slot="title">品牌分类</p>
      <div slot="extra" class="z-btn">
        <Button type="primary" size="small" @click="userList">新增品牌</Button>
      </div>
      <div class="car-wraper">
        <div v-for="item in carlist" :key="item._id">
          <div class="category-initial">
            <span> {{item.initial}}</span>
            <span class="c-btn">折叠/展开</span>
          </div>
          <div class="category-list">
            <car-category :list="cat" v-for="cat in item.list" :key="cat._id"></car-category>
          </div>
        </div>
      </div>
      <div v-if="false" class="car-wraper">
        <div>
          <div class="category-initial">A</div>
          <div class="category-list">
            <car-category></car-category>
          </div>
        </div>
      </div>
    </Card>
    <car-brand-add></car-brand-add>
  </div>
</template>
<script>
import CarCategory from '_c/car/CarCategory'
import CarBrandAdd from '_c/modal/CarBrandAdd'
export default {
  components: {
    CarCategory,
    CarBrandAdd
  },
  data () {
    return {
      carlist: []

    }
  },
  methods: {
    // 获取汽车列表
    async getCarList () {
      const params = {
        url: '/car/category/qwe',
        payload: {},
        auth: true
      }
      const result = await this.get(params)

      if (result.code === 1) {
        this.carlist = result.data
      }
    }

  },
  created () {
    this.getCarList()
  }

}
</script>
<style lang="less" scoped>
  .car-category {
    font-size: 14px;
    .car-card {
      padding-left: 16px;
      padding-right: 16px;
    }
    .car-wraper {
    }
    .category-initial {
      height: 30px;
      line-height: 30px;
      border: solid 1px #047eff;
      border-top: solid 2px #047eff;
      color: #047eff;
      font-size: 16px;
      font-weight: bold;
      padding: 0px 10px;
      vertical-align: middle;
      display: flex;
      justify-content: space-between;
      .c-btn {
        font-size: 12px;
        color: #047eff;
        cursor: pointer;
      }
    }
  }

  .category-list {
  }
</style>
