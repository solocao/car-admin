<!-- 车辆的款式日期  -->
<template>
  <div class="car-batch-select">
    <span class="batch-tag" :class="{active:item.select}" v-for="(item,index) in batchList" :key="index" @click="switchActive(index)">
      {{item.name}}
    </span>
  </div>
</template>
<script>
export default {
  props: {
    batch: {
      type: Array
    }
  },
  data () {
    return {
      batchList: [
        {
          name: '2018年款',
          select: false
        }, {
          name: '2017年款',
          select: false
        }, {
          name: '2016年款',
          select: false
        }, {
          name: '2015年款',
          select: false
        }, {
          name: '2014年款',
          select: false
        }, {
          name: '2013年款',
          select: false
        }, {
          name: '2012年款',
          select: false
        }, {
          name: '2011年款',
          select: false
        }, {
          name: '2010年款',
          select: false
        }, {
          name: '2009年款',
          select: false
        }, {
          name: '2008年款',
          select: false
        }, {
          name: '2007年款',
          select: false
        }, {
          name: '2006年款',
          select: false
        }, {
          name: '2005年款',
          select: false
        }, {
          name: '2004年款',
          select: false
        }, {
          name: '2003年款',
          select: false
        }, {
          name: '2002年款',
          select: false
        }, {
          name: '2001年款',
          select: false
        }, {
          name: '2000年款',
          select: false
        }, {
          name: '1999年款',
          select: false
        }]

    }
  },
  methods: {
    // 切换状态
    switchActive (index) {
      this.batchList[index].select = !this.batchList[index].select
    },
    // 获取值
    get () {
      const select = this.batchList.filter(x => {
        return x.select
      }).map(x => {
        return x.name
      })
      return JSON.stringify(select)
    },
    // 设置默认值
    set () {
      if (this.batch.length === 0) {
        return false
      }
      this.batchList.forEach(x => {
        if (this.batch.includes(x.name)) {
          x.select = true
        }
      })
    }
  },
  mounted () {
    this.set(this.batch)
  }
}
</script>
<style lang="less" scoped>
  .car-batch-select {
    .batch-tag {
      display: inline-block;
      height: 22px;
      line-height: 22px;
      margin: 2px 4px 2px 0;
      padding: 0 8px;
      border: 1px solid #e8eaec;
      border-radius: 3px;
      background: #f7f7f7;
      font-size: 12px;
      vertical-align: middle;
      opacity: 1;
      overflow: hidden;
      cursor: pointer;
    }
    .active {
      line-height: 20px;
      background: #2d8cf0;
      border-color: #91d5ff;
      color: white;
    }
  }
</style>
