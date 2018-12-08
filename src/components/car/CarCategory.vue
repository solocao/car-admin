<template>
  <div class="car-category">
    <div class="c-sider">
      <a href="">
        <img class="c-logo" :src="list.logo" alt="">
      </a>
      <div class="c-name">
        <a href="">{{list.name}}</a>
      </div>
    </div>
    <div class="c-content">
      <div class="c-operater">
        <Poptip title="新增子品牌">
          <span>
            点击新增子品牌
          </span>
          <!-- 删除 -->
          <div slot="content">
            <Input size="small" v-model="name" placeholder="请输入子品牌名称" style="width: 120px" />
            <Button type="primary" size="small" class="ml10" @click="addSubBrand()">确定</Button>
          </div>
        </Poptip>
      </div>

      <div v-for="brand in list.brand" :key="brand._id">
        <div class="c-title">
          <span> {{brand.name}}</span>
          <span>
            新增子品牌
          </span>
        </div>
        <div class="items-wraper">
          <car-edit-item :sub_brand_id="brand._id"></car-edit-item>
          <car-item v-for="car in brand.car" :key="car._id" :data="car"></car-item>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CarItem from '_c/car/CarItem.vue'
import CarEditItem from '_c/car/CarEditItem.vue'
export default {
  components: {
    CarItem,
    CarEditItem
  },
  props: {
    list: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      name: null
    }
  },
  methods: {
    // 新增子品牌
    async  addSubBrand () {
      const params = {
        url: 'car/brand/sub',
        payload: {
          list_id: this.list._id,
          name: this.name
        },
        auth: true
      }
      const result = await this.post(params)
      if (result.code === 1) {
        this.list = result.data
      }
      console.log('看看结果')
      console.log(result)
    }

  }
}
</script>

<style lang="less" scoped>
  .car-category {
    position: relative;
    width: 100%;
    min-height: 88px;
    border-bottom: 1px solid #e1e3e8;

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
    // border-left: 1px solid #e7eaec;
    .c-title {
      font-size: 14px;
      font-weight: bold;
      color: #3b5998;
      margin-left: 20px;
      padding-top: 10px;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    .items-wraper {
      display: flex;
      flex-wrap: wrap;
    }
    .c-operater {
      font-size: 14px;
      font-weight: bold;
      color: #3b5998;
      margin-left: 20px;
      padding-top: 10px;

      span {
        cursor: pointer;
        color: #9e9e9e;
      }
    }
  }

  .ml10 {
    margin-left: 10px;
  }
</style>
