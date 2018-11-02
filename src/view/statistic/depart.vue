<template>
  <div>
    <card>
      <p slot="title">地区项目部 上报问题统计</p>
      <div slot="extra" class="z-btn">
        <Button size="small" @click="getHitchSta">刷新</Button>
      </div>
      <Table :columns="columns" :data="data"></Table>
    </card>
  </div>
</template>
<script>
import { timeS } from '@/libs/help.js'
export default {
  data () {
    return {
      columns: [
        {
          title: '地区项目部',
          key: 'name'
        },
        {
          title: '问题总数',
          key: 'total'
        },
        {
          title: '统计时间',
          key: 'time',
          render: (h, params) => {
            const createAt = timeS(params.row.time)
            return <div>
              {createAt}
            </div>
          }

        }
      ],
      data: []
    }
  },
  methods: {
    async getHitchSta () {
      const params = {
        url: 'statistic/hitch',
        payload: {},
        auth: true
      }
      const result = await this.get(params)
      if (result.code === 1) {
        this.data = result.data
      }
    }

  },
  mounted () {
    this.getHitchSta()
  }
}
</script>
