<template>
  <div class="car-item">
    <div class="car-inner">
      奥迪A3
      <img src="//car2.autoimg.cn/cardfs/product/g19/M15/AC/7A/s_autohomecar__wKgFWFoAKRCAIW4kAAhC9eEHcg0466.jpg" alt="">
    </div>
  </div>
</template>
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
