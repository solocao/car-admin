<template>
  <div class="report-modal">
    <Timeline>
      <TimelineItem>
        <p class="time">上报{{location}}</p>
        <div>
          <tx-map ref="map"></tx-map>
          <Row :gutter="16">
            <Col span="12">
            <div class="z-m-item">
              <span class="z-title">问题描述:</span>
              <span>{{data.description}}</span>
            </div>
            </Col>
            <Col span="12">
            <div class="z-m-item">
              <span class="z-title">地点描述:</span>
              <span>{{data.address}}</span>
            </div>
            </Col>
          </Row>
          <Row>
            <Col span="24">
            <div class="z-m-item">
              <span class="z-title">现场佐证图片:</span>
              <vue-preview :slides="imgSlide(data.img_list)"></vue-preview>
            </div>
            </Col>
          </Row>
          <Row :gutter="16">
            <Col span="12">
            <div class="z-m-item">
              <span class="z-title">联系人:</span>
              <span>{{data.username}}</span>
            </div>
            </Col>
            <Col span="12">
            <div class="z-m-item">
              <span class="z-title">联系电话:</span>
              <span>{{data.mobile}}</span>
            </div>
            </Col>
          </Row>
          <Row :gutter="16">
            <Col span="12">
            <div class="z-m-item">
              <span class="z-title">问题发送至:</span>
              <span>{{data.to}}</span>
            </div>
            </Col>
            <Col span="12">
            <div class="z-m-item">
              <span class="z-title">检查类别:</span>
              <span>{{data.check}}</span>
            </div>
            </Col>
          </Row>
          </Row>

        </div>
      </TimelineItem>
      <TimelineItem>
        <p class="time">审核</p>
        <div>
          <Row :gutter="16">
            <Col span="12">
            <div class="z-m-item">
              <span class="z-title">审核人:</span>
              <span>{{data.check_name}}</span>
            </div>
            </Col>
            <Col span="12">
            <div class="z-m-item">
              <span class="z-title">审核人电话:</span>
              <span>{{data.check_mobile}}</span>
            </div>
            </Col>
          </Row>
          <Row>
            <Col span="24">
            <div class="z-m-item">
              <span class="z-title">现场确认图片:</span>
              <vue-preview :slides="imgSlide(data.check_imgs)"></vue-preview>
            </div>
            </Col>
          </Row>

        </div>
      </TimelineItem>
      <TimelineItem>
        <p class="time">结束</p>
      </TimelineItem>
    </Timeline>
  </div>
</template>
<script>
import TxMap from '@/components/TxMap.vue'
export default {
  components: {
    TxMap
  },
  props: {
    data: {
      type: Object
    }
  },
  computed: {
    location () {
      return {
        latitude: this.data.latitude,
        longitude: this.data.longitude
      }
    }
  },
  data () {
    return {

    }
  },
  methods: {
    imgSlide (imgList) {
      if (imgList === undefined) {
        return []
      }
      const slide = imgList.map(x => {
        return {
          src: x.url,
          msrc: x.url,
          alt: 'picture1',
          title: 'Image Caption 1',
          w: 1200,
          h: 900
        }
      })
      return slide
    }
  },
  mounted () {

  },
  watch: {
    location (curVal, oldVal) {
      this.$refs.map.addMarker(curVal.latitude, curVal.longitude)
    }
  }
}
</script>
