<template>
  <div class="tx-map">
    <div ref='thismap' id="map"></div>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  data () {
    return {
      map: null,
      interval: null
    }
  },
  methods: {
    async init () {
      // 创建地图
      this.map = new qq.maps.Map(this.$refs.thismap, {
        center: new qq.maps.LatLng(39.916527, 116.397128), // 地图的中心地理坐标
        zoom: 16, // 地图缩放级别
        mapStyleId: 'style1' // 该key绑定的style1对应于经典地图样式，若未绑定将弹出无权限提示窗
      })
      Vue.prototype.map = this.map
    },
    // 添加标注点
    addMarker (latitude, longitude) {
      var center = new qq.maps.LatLng(latitude, longitude)
      const marker = new qq.maps.Marker({
        map: this.map,
        position: center
      })
    },
    getMap () {
      return this.map
    }
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {

  }

}
</script>
<style lang="less">
.tx-map {
  position: relative;
  font: 12px/16px Verdana, Helvetica, Arial, sans-serif;
  width: 100%;
  height: 100%;
}
#map {
  width: 100%;
  height: 100%;
}
</style>
