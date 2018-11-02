<template>
  <div class="sta-map">
    <tx-map ref="map"></tx-map>
  </div>
</template>
<script>
import TxMap from '@/components/TxMap.vue'
export default {
  components: {
    TxMap
  },
  data () {
    return {
      data: [],
      map: null
    }
  },
  methods: {
    async getLocationData () {
      const params = {
        url: 'statistic/hitch/point',
        payload: {},
        auth: true
      }
      const result = await this.get(params)
      if (result.code === 1) {
        this.data = result.data.filter(x => x.latitude !== undefined && x.longitude !== undefined).map(x => {
          return [x.latitude, x.longitude]
        })
      }
    },
    async createCluster () {
      await this.getLocationData()

      const Marker = qq.maps.Marker
      const LatLng = qq.maps.LatLng
      const MVCArray = qq.maps.MVCArray
      const MarkerCluster = qq.maps.MarkerCluster

      this.map = this.$refs.map.getMap()

      const markers = new MVCArray()

      for (var i = 0; i < this.data.length; i++) {
        const latLng = new LatLng(this.data[i][0], this.data[i][1])
        var marker = new Marker({
          'position': latLng,
          map: this.map
        })
        markers.push(marker)
      }
      const markerClusterer = new MarkerCluster({
        map: this.map,
        minimumClusterSize: 2, // 默认2
        markers: markers,
        zoomOnClick: true, // 默认为true
        gridSize: 30, // 默认60
        averageCenter: true, // 默认false
        maxZoom: 18 // 默认18
      })
    }
  },
  mounted () {
    setTimeout(this.createCluster, 200)
  }
}
</script>
<style lang="less" scoped>
.sta-map {
  width: 100%;
  height: 100%;
}
</style>
