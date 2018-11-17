<template>
  <div class="car-brand-upload">
    <Upload :data="path" action="http://api.caowei.wang/ali-oss/upload/img" :on-success="handleSuccess" :on-remove="handRemove">
      <div class="car-upload" v-if="cover==null">
        <div>
          <Icon :size="30" type="ios-cloud-upload-outline" />
        </div>
        <div>
          请上传logo
        </div>
      </div>
      <div v-else class="car-img">
        <img :src="cover" alt="">
      </div>
    </Upload>
  </div>
</template>
<script>
export default {
  data () {
    return {
      url: null,
      cover: null,
      path: {
        // 汽车品牌图片保存文件路径
        path: 'car/brand'
      }
    }
  },
  methods: {
    // 上传成功
    handleSuccess (res, file) {
      if (res.code === 1) {
        this.url = res.data.url
        this.cover = res.data.cover
      }
    },
    // 删除文件
    handRemove (file) {
      this.url = null
      this.cover = null
    }
  }
}
</script>

<style lang="less" scoped>
.car-brand-upload {
  .car-upload {
    width: 80px;
    height: 80px;
    background: #fbfbfb;
    box-shadow: 0px 0px 1px #9e9e9e;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
  }

  .car-img {
    width: 80px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>
