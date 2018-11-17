<template>
  <div class="car-category">
    <div class="c-sider">
      <a href="">
        <img class="c-logo" src="//car2.autoimg.cn/cardfs/series/g26/M0B/AE/B3/100x100_f40_autohomecar__wKgHEVs9u5WAV441AAAKdxZGE4U148.png" alt="">
      </a>
      <div class="c-name">
        <a href="">奥迪</a>
      </div>
    </div>
    <div class="c-content">
      <div class="c-title">一汽-大众奥迪</div>
      <div class="items-wraper">
        <car-item v-for="i in 9"></car-item>
      </div>
      <div class="c-title">Audi Sport</div>
      <div class="items-wraper">
        <car-item v-for="i in 9"></car-item>
      </div>
    </div>

  </div>
</template>
<script>
import CarItem from '_c/car/CarItem.vue'
export default {
  components: { CarItem }
}
</script>

<style lang="less" scoped>
.car-category {
  position: relative;
  width: 100%;

  .c-sider {
    width: 88px;
    float: left;
    text-align: center;
    padding-top: 10px;
    background-color: #fafbfc;
    .c-logo {
      width: 50px;
      height: 50px;
    }
    .c-name {
      a {
        font-size: 14px;
        color: #333;
        margin-bottom: -5px;
      }
    }
  }
}

.c-content {
  margin-left: 88px;
  border-left: 1px solid #e7eaec;
  .c-title {
    font-size: 14px;
    font-weight: bold;
    color: #3b5998;
    margin-left: 20px;
    padding-top: 10px;
  }
  .items-wraper {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
