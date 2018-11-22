<template>
  <div>
    <Row :gutter="20">
      <i-col span="4" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;">
        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
          <count-to :end="infor.count" count-class="count-style" />
          <p>{{ infor.title }}</p>
        </infor-card>
      </i-col>
    </Row>
    <Row v-if="false" :gutter="20" style="margin-top: 20px;">
      <i-col span="8">
        <Card shadow>
          <chart-pie style="height: 300px;" :value="pieData" text="安全隐患统计"></chart-pie>
        </Card>
      </i-col>
      <i-col span="16">
        <Card shadow>
          <chart-bar style="height: 300px;" :value="barData" text="一周问题数量" />
        </Card>
      </i-col>
    </Row>
    <div class="sat-map-wrap">
      <div class="z-map-title">运营车辆地图聚合显示</div>
      <sta-map></sta-map>
    </div>
  </div>
</template>

<script>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import { ChartPie, ChartBar } from '_c/charts'
import Example from './example.vue'
import StaMap from '@/components/statistic/StaMap.vue'
export default {
  name: 'home',
  components: {
    InforCard,
    CountTo,
    ChartPie,
    ChartBar,
    Example,
    StaMap
  },
  data () {
    return {
      inforCardData: [
        { title: '用户总数', icon: 'ios-people', count: 0, color: '#2d8cf0' },
        { title: '今日新增用户', icon: 'ios-person-add', count: 0, color: '#03a9f4' },
        { title: '累计任务', icon: 'md-help-circle', count: 0, color: '#ff9900' },
        { title: '用户在途', icon: 'md-locate', count: 0, color: '#19be6b' },
        { title: '奖励比数', icon: 'logo-yen', count: 0, color: '#ed3f14' },
        { title: '今日产生任务', icon: 'md-information-circle', count: 0, color: '#673ab7' }
      ],
      pieData: [
        { value: 335, name: '机械设备' },
        { value: 310, name: '承重支架' },
        { value: 234, name: '脚手支架' },
        { value: 135, name: '环保水保' },
        { value: 1548, name: '交通安全' }
      ],
      barData: {
        Mon: 13253,
        Tue: 34235,
        Wed: 26321,
        Thu: 12340,
        Fri: 24643,
        Sat: 1322,
        Sun: 1324
      }
    }
  },
  methods: {
    async getStatistic () {
      const params = {
        url: 'statistic/index',
        payload: {},
        auth: true
      }
      const result = await this.get(params)
      if (result.code === 1) {
        const { userCount, todayUserCount, hitchCount, todayHitchCount, appealCount, rewartCount } = result.data
        this.inforCardData[0].count = userCount
        this.inforCardData[1].count = todayUserCount
        this.inforCardData[2].count = hitchCount
        this.inforCardData[3].count = appealCount
        this.inforCardData[4].count = rewartCount
        this.inforCardData[5].count = todayHitchCount
      }
    }
  },

  mounted () {
    // this.getStatistic()
  }
}
</script>

<style lang="less">
.count-style {
  font-size: 50px;
}
.sat-map-wrap {
  height: 580px;
  margin-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 60px;
  background: white;
  border-radius: 4px;
}
.z-map-title {
  background: white;
  font-size: 16px;
  font-weight: bold;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
