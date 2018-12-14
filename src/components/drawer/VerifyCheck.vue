<template>
  <div class="verify-check">
    <Drawer title="用户认证" :closable="false" v-model="show" @on-close="close" width="640">
      <div class="z-m-item">
        <span class="z-title">姓名:</span>
        <span>{{data.name}}</span>
      </div>
      <div class="two-50-percent">
        <div class="item">
          <span class="title">身份证图:</span>
          <img class="v-img" :src="data.user_id_number_img" alt="">
        </div>
        <div class="item">
          <span class="title">身份证号:</span>
          <span>{{data.user_id_number}}</span>
        </div>
      </div>
      <div class="two-50-percent">
        <div class="item">
          <span class="title">车牌号:</span>
          <span>{{data.car_number}}</span>
        </div>
        <div class="item">
          <span class="title">车型:</span>
          <div class="vc-brand-name">{{data.car_model.brand_name}}</div>
          <div>{{data.car_model.car_name}} {{data.car_model.batch_at}}</div>
        </div>
      </div>

      <div class="two-50-percent">
        <div class="item">
          <span class="title">车辆封面图:</span>
          <img class="v-img" :src="data.car_cover_img" alt="">
        </div>
        <div class="item">
          <span class="title">车辆颜色:</span>
          <span>{{data.car_color}}</span>
        </div>
      </div>
      <div class="two-50-percent">
        <div class="item">
          <span class="title">驾驶证:</span>
          <img class="v-img" :src="data.driver_licence_img" alt="">
        </div>
        <div class="item">
          <span class="title">驾驶证号:</span>
          <span>{{data.driver_licence}}</span>
        </div>
      </div>
      <div class="two-50-percent">
        <div class="item">
          <span class="title">行驶证:</span>
          <img class="v-img" :src="data.driving_licence_img" alt="">
        </div>
        <div class="item">
          <span class="title">行驶证号:</span>
          <span>{{data.driving_licence}}</span>
        </div>
      </div>
      <div class="z-m-item">
        <span class="z-title">操作:</span>
        <div>
          <Button type="primary">审核通过</Button>
          <Button style="marginLeft:10px">审核不通过</Button>
        </div>
      </div>

    </Drawer>
  </div>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object
    }
  },
  methods: {
    close() {
      this.$emit('update:show', false)
    }
  }

}
</script>

<style lang="less" scoped>
  .verify-check {
    width: 100%;
    display: flex;
  }
  .z-m-item {
    margin-bottom: 20px;
    display: flex;
    .z-title {
      width: 80px;
      font-weight: bold;
      margin-right: 4px;
    }
  }

  .two-50-percent {
    margin-bottom: 20px;
    display: flex;
    width: 100%;
    .item {
      display: flex;
      .title {
        display: block;
        width: 80px;
        font-weight: bold;
        margin-right: 4px;
      }
    }
  }
  .two-50-percent :first-child {
    width: 50%;
  }
  .two-50-percent :last-child {
    width: 50%;
  }

  .v-img {
    height: 110px !important;
    border-radius: 6px;
  }

  .ope-btn {
    display: flex;
    justify-content: center;
  }
</style>
