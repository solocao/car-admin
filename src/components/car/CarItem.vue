<template>
  <div class="car-item">
    <div class="car-inner">
      {{name}}
      <img :src="img" alt="">
    </div>
  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: 'demo车辆'
    },
    img: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="less" scoped>
.car-item {
  width: 160px;
  padding: 10px;

  .car-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 10px;
    border: 1px solid white;
    cursor: pointer;

    &:hover {
      border: 1px solid #047eff;
    }
    img {
      width: 120px;
      height: 90px;
    }
  }
}
</style>
