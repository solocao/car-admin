<template>
  <div class="brand-car">

    <!-- <div class="c-operater">
        <Poptip title="新增子品牌">
          <span>
            点击新增子品牌
          </span>
          <div slot="content">
            <Input size="small" v-model="name" placeholder="请输入子品牌名称" style="width: 120px" />
            <Button type="primary" size="small" class="ml10" @click="addSubBrand()">确定</Button>
          </div>
        </Poptip>
      </div> -->

    <div class="brand-title">
      <span> {{brand.name}}</span>
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
