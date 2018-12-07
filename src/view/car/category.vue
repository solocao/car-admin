<template>
  <div class="car-category">
    <Card :bordered="false" class="car-card" :padding="0">
      <p slot="title">品牌分类</p>
      <div slot="extra" class="z-btn">
        <Button type="primary" size="small" @click="categoryAddModal=true">新增品牌</Button>
      </div>
      <div class="car-wraper">
        <!-- 左侧分类 -->
        <div class="c-category">
          <div v-for="(item,index) in categoryList" :key="index">
            <div class="c-cate">
              {{item.initial}}
            </div>
            <div class="c-brand" v-for="(category,index) in item.category" :key="index">
              <div class="c-show" @click="switchCategory(category)">
                <img :src="category.logo" alt="">
                <span> {{category.name}}</span>
              </div>
              <div class="c-edit">
                <ButtonGroup>
                  <Button size="small" icon="md-close"></Button>
                  <Button size="small" icon="md-create"></Button>
                </ButtonGroup>
              </div>
            </div>
          </div>
        </div>
        <!-- 右侧详情 -->
        <div class="c-detail" v-if="brandList.length!==0">
          <div class="c-header">
            <span class="c-name">
              <span>
                {{category.name}}
              </span>
            </span>
            <Poptip placement="left">
              <span class="c-ope">
                新增子品牌
              </span>
              <!-- 删除 -->
              <div slot="content">
                <Input size="small" v-model="name" placeholder="请输入子品牌名称" style="width: 120px" />
                <Button type="primary" size="small" class="ml10" @click="addSubBrand()">确定</Button>
              </div>
            </Poptip>
          </div>
          <brand-car :brand="brand" :getCarBybrand="getCarBybrand" v-for="(brand,index) in brandList" :key="index"></brand-car>
        </div>
      </div>
    </Card>
    <car-brand-add></car-brand-add>
    <div>
      <category-add :visiable.sync="categoryAddModal"></category-add>
      <Modal v-model="modal1" title="是否确认删除品牌" @on-ok="categoryDelete" @on-cancel="cancel">
        <p>确认删除</p>
      </Modal>
    </div>
  </div>
</template>
<script>
import CarBrandAdd from '_c/modal/CarBrandAdd'
import BrandCar from '@components/car/BrandCar'
import CategoryAdd from '@components/modal/car/CategoryAdd.vue'
export default {
  components: {
    BrandCar,
    CarBrandAdd,
    CategoryAdd
  },
  data () {
    return {
      carlist: [],
      categoryList: [],
      // 品牌列表
      brandList: [],
      category: {
        name: null
      },
      name: null,
      categoryAddModal: false
    }
  },
  methods: {
    // 获取汽车品牌列表
    async getCategoryList () {
      const params = {
        url: '/car/category/list',
        payload: {},
        auth: true
      }
      const result = await this.get(params)

      if (result.code === 1) {
        this.categoryList = result.data
      }
    },
    // 切换汽车分类
    switchCategory (category) {
      this.category = category
      this.getCarBybrand()
    },
    // 获取一个分类汽车详情
    async getCarBybrand () {
      const params = {
        url: `car/${this.category._id}`,
        payload: {},
        auth: true
      }
      const result = await this.get(params)
      if (result.code === 1) {
        this.brandList = result.data
      }
    },
    // 新增子品牌
    async  addSubBrand () {
      const params = {
        url: 'car/brand/sub',
        payload: {
          list_id: this.category._id,
          name: this.name
        },
        auth: true
      }
      const result = await this.post(params)
      if (result.code === 1) {
        this.$Message.info(result.msg)
        this.brandList = result.data.brand
      }
    },
    // 删除汽车分类
    async categoryDelete () {

    }
  },
  created () {
    this.getCategoryList()
  }

}
</script>
<style lang="less" scoped>
  .car-category {
    font-size: 14px;
    height: 100%;
    position: relative;
    .car-card {
      height: 100%;
      .car-wraper {
        position: absolute;
        top: 51px;
        bottom: 0px;

        width: 100%;
        flex: 1;
        display: flex;
        overflow: scroll;

        .c-category {
          width: 200px;
          height: 100%;
          overflow: scroll;

          .c-cate {
            height: 30px;
            background: #f2f2f2;
            display: flex;
            align-items: center;
            padding-left: 10px;
          }

          .c-brand {
            background: white;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            .c-show {
              height: 100%;
              display: flex;
              align-items: center;
              flex: 1;
              img {
                width: 40px;
                height: 40px;
              }
            }
            .c-edit {
              padding: 2px;
              background: #9e9e9e3b;
              border-radius: 2px;
            }
          }
        }
        .c-detail {
          height: 100%;
          overflow: scroll;
          flex: 1;
          .c-header {
            padding-left: 10px;
            padding-right: 10px;
            height: 30px;
            background: #f2f2f2;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .c-name {
              color: #0254a1;
            }
            .c-ope {
              cursor: pointer;
              font-size: 12px;
            }
          }
        }
      }
    }
  }

  .ml10 {
    margin-left: 10px;
  }
</style>
