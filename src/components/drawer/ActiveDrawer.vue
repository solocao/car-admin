<template>
  <div class="verify-check">
    <Drawer title="活动详情" :closable="false" v-model="show" @on-close="close" width="640">
      <div class="z-m-item">
        <span class="z-title">活动标题:</span>
        <span>{{data.title}}</span>
      </div>
      <div class="z-m-item">
        <span class="z-title">活动简介:</span>
        <span>{{data.brief}}</span>
      </div>
      <div class="z-m-item">
        <span class="z-title">活动内容:</span>
        <span>{{data.content}}</span>
      </div>
      <div class="z-m-item">
        <span class="z-title">封面图:</span>
        <img class="v-img" :src="data.cover_img" alt="">
      </div>
      <div class="z-m-item">
        <span class="z-title">展示图:</span>
        <img v-for="img in data.show_img" class="v-img" :src="img" alt="">
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
