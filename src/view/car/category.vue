<template>
  <div class="car-category">
    <Card :bordered="false" class="car-card" :padding="0">
      <p slot="title">品牌分类</p>
      <div slot="extra" class="z-btn">
        <Button type="primary" size="small" @click="openCategoryAddModal">新增品牌</Button>
      </div>
      <div class="car-wraper">
        <!-- 左侧分类 -->
        <div class="c-category">
          <div v-for="(item,index) in categoryList" :key="index">
            <div class="c-cate">
              {{item.initial}}
            </div>
            <div class="c-category-list" v-for="(category,index) in item.category" :key="index">
              <div class="c-show" @click="switchCategory(category)">
                <img :src="category.logo" alt="">
                <span> {{category.name}}</span>
              </div>
              <div class="c-edit">
                <ButtonGroup>
                  <Button size="small" icon="md-close" @click="openCategoryDeleteModal(category._id)"></Button>
                  <Button size="small" icon="md-create" @click="openCategoryEditModal"></Button>
                </ButtonGroup>
              </div>
            </div>
          </div>
        </div>
        <!-- 右侧详情 -->
        <div class="c-detail">
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
                <Button type="primary" size="small" class="ml10" @click="addBrand()">确定</Button>
              </div>
            </Poptip>
          </div>
          <category-car :brand="brand" :getCarByCategory="getCarByCategory" v-for="(brand,index) in brandList" :key="index"></category-car>
        </div>
      </div>
    </Card>
    <car-brand-add></car-brand-add>
    <div>
      <category-modal :visiable.sync="categoryModal" :type="categoryModalType" :form="categoryModalForm"></category-modal>
      <Modal v-model="modal" title="操作" @on-ok="categoryDelete" @on-cancel="cancel">
        <p>是否确认删除品牌</p>
      </Modal>
    </div>
  </div>
</template>
<script>
import CarBrandAdd from '_c/modal/CarBrandAdd'
import CategoryCar from '@components/car/CategoryCar'
import CategoryModal from '@components/modal/car/CategoryModal.vue'
export default {
  components: {
    CategoryCar,
    CarBrandAdd,
    CategoryModal
  },
  data() {
    return {
      carlist: [],
      categoryList: [],
      // 品牌列表
      brandList: [],
      category: {
        name: null
      },
      name: null,
      // ------------------------是否显示模态框
      categoryModal: false,
      // 模态框类型 add edit
      categoryModalType: 'add',
      // 数据
      categoryModalForm: {
        name: null,
        logo: null
      },
      // -------------------------是否显示模态框
      deleteCategoryId: null,
      modal: false
    }
  },

  methods: {
    // 获取汽车品牌列表
    async getCategoryList() {
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
    switchCategory(category) {
      this.category = category
      this.getCarByCategory()
    },
    // 获取一个分类汽车详情
    async getCarByCategory() {
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
    // 新详细品牌
    async  addBrand() {
      const params = {
        url: 'car/brand',
        payload: {
          category_id: this.category._id,
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
    async categoryDelete(category) {
      const params = {
        url: 'car/category',
        payload: {
          category_id: this.deleteCategoryId
        },
        auth: true
      }

      const result = await this.delete(params)
      if (result.code == 1) {

      }
    },
    // 打开大品牌编辑模态框
    openCategoryEditModal() {
      this.categoryModal = true
      this.categoryModalType = 'edit'
      this.categoryModalForm = JSON.parse(JSON.stringify(this.category))
    },
    // 打开大品牌新增模态框
    openCategoryAddModal() {
      this.categoryModal = true
      this.categoryModalType = 'add'
      this.categoryModalForm = {
        name: null,
        logo: null
      }
    },
    // 打开大品牌删除模态框
    openCategoryDeleteModal(categoryId) {
      this.deleteCategoryId = categoryId
      this.modal = true
    }
  },
  created() {
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

          .c-category-list {
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
