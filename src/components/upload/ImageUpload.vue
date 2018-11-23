<template>
  <div class="image-upload">
    <!-- <div>
      <img class="up-image" src='https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2645095865,1734395446&fm=11&gp=0.jpg' alt="">
    </div> -->

    <Upload action="//jsonplaceholder.typicode.com/posts/">
      <div class="update-click" @click="aaaa">
        <Icon type="md-image" size="50" color="#ababab" />
        <div class="up-bold">上传图片</div>
      </div>
    </Upload>
  </div>
</template>
<script>
import config from '@config'
export default {

  data () {
    return {
      default_img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2645095865,1734395446&fm=11&gp=0.jpg'
    }
  },
  methods: {
    aaaa () {
      console.log(config)
    }
  }
}
</script>

<style lang="less" scoped>
.image-upload {
  .up-image {
    width: 180px;
    height: 120px;
    border-radius: 6px;
    cursor: pointer;
  }
  .update-click {
    width: 150px;
    height: 100px;
    border-radius: 6px;
    cursor: pointer;
    box-shadow: 0px 0px 4px gray;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .up-bold {
      font-size: 16px;
      font-weight: bold;
      color: #ababab;
    }
  }
}
</style>
