<template>
  <div class="image-upload">
    <div class="up-image" v-for="(img, index) in uploadList" :key="index">
      <Icon class="delete-img" type="md-close-circle" size="20" color="#ababab" @click="deleteImg(index)" />
      <img :src="img" alt="">
    </div>
    <Upload v-if="uploadList.length<this.maxNum" :action="uploadUrl" :data="uploadPath" :on-success="uploadSuccess" :show-upload-list="false">
      <div class="update-click">
        <Icon type="md-image" size="50" color="#ababab" />
        <div class="up-bold">上传图片</div>
      </div>
    </Upload>
  </div>
</template>
<script>
import config from '@config'
import dayjs from 'dayjs'
export default {
  props: {
    // 需要改变的img
    img: {
      type: Array
    },
    // 最大支持图片数量
    maxNum: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      uploadUrl: config.apiUrl + '/ali-oss/upload/img',
      uploadPath: {
        path: 'verify/' + dayjs().format('YYYY-MM-DD')
      },
      // 上传列表
      uploadList: []
    }
  },
  methods: {
    uploadSuccess (response) {
      if (response.code === 1) {
        this.$Message.info('图片上传成功')
        this.uploadList.push(response.data.url)
        console.log(this.uploadList)
      }
    },
    // 根据索引 删除图片
    deleteImg (index) {
      this.uploadList.splice(index, 1)
    },
    // 获取图片
    getImg () {
      return this.uploadList
    }
  },
  watch: {
    uploadList (val) {
      this.$emit('update:img', val)
    }
  }
}
</script>

<style lang="less" scoped>
.image-upload {
  display: flex;
  flex-wrap: wrap;

  .up-image {
    width: 150px;
    height: 100px;
    border-radius: 6px;
    box-shadow: 0px 0px 2px gray;
    margin-right: 10px;
    margin-top: 10px;
    overflow: hidden;
    position: relative;
    &:hover {
      .delete-img {
        visibility: visible;
      }
    }

    img {
      width: 100%;
      height: 100%;
    }

    .delete-img {
      position: absolute;
      right: 4px;
      top: 4px;
      cursor: pointer;
      visibility: hidden;
    }
  }
  .update-click {
    width: 150px;
    height: 100px;
    border-radius: 6px;
    cursor: pointer;
    box-shadow: 0px 0px 2px gray;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    margin-top: 10px;

    .up-bold {
      font-size: 16px;
      font-weight: bold;
      color: #ababab;
    }
  }
}
</style>
