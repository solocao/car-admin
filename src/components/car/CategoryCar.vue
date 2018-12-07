<template>
  <div class="brand-car">
    <div class="brand-title">
      <span> {{brand.name}}</span>
      <Poptip placement="right">
        <span class="brand-delete">删除</span>
        <div slot="content">
          <span>是否确认删除该品牌</span>
          <Button type="primary" size="small" class="ml10" @click="deleteSubBrand(brand._id)">确定</Button>
        </div>
      </Poptip>
    </div>
    <div class="items-wraper">
      <car-edit-item :sub_brand_id="brand._id"></car-edit-item>
      <car-item v-for="car in brand.car" :key="car._id" :name="car.name" :img="car.img" :car_id="car._id"></car-item>
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
    // 品牌
    brand: {
      type: Object,
      default: null
    },
    getCarByCategory: {
      type: Function
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
    },
    // 彻底删除 子品牌
    async  deleteSubBrand (subId) {
      const params = {
        url: 'car/brand/sub/delete',
        payload: {
          sub_id: subId
        },
        auth: true
      }
      const result = await this.post(params)
      if (result.code === 1) {
        this.getCarByCategory()
      }
    }

  }
}
</script>

<style lang="less" scoped>
  .brand-car {
    position: relative;
    width: 100%;
    border-bottom: 1px solid #e1e3e8;

    .brand-title {
      font-size: 14px;
      font-weight: bold;
      color: #3b5998;
      margin-left: 10px;
      padding-top: 10px;

      .brand-delete {
        margin-left: 10px;
        font-size: 12px;
        color: grey;
        cursor: pointer;
      }
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
