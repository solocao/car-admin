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
      <div>一汽-大众奥迪</div>
      <div>
        啊沙发上
      </div>
    </div>

  </div>
</template>
<script>
export default {

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
    border-right: 1px solid #ccd3e4;
    background-color: #fafbfc;
    .c-logo {
      width: 50px;
      height: 50px;
    }
    .c-name {
      font-size: 12px;
    }
  }
  .c-content {
    background: yellowgreen;
    margin-left: 88px;
  }
}
</style>
