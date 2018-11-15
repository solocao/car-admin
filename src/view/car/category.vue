<template>
  <div class="car-category">
    <Card :bordered="false" :padding="0">
      <p slot="title">品牌分类</p>
      <div class="car-wraper">
        <div class="category-initial">A</div>
        <div class="category-list">
          <car-category></car-category>
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
import CarCategory from '_c/car/CarCategory'
export default {
  components: {
    CarCategory
  }

}
</script>
<style lang="less" scoped>
.car-category {
  font-size: 14px;
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
    padding-left: 10px;
    vertical-align: middle;
  }
}

.category-list {
}
</style>
