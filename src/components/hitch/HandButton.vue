<template>
  <div :class="zClass" @click="switchActive">
    <div class="z-title">{{title}}</div>
    <div class="z-desc">{{des}}</div>
  </div>
</template>
<script>
export default {
  props: {
    activeSwitch: {
      type: Boolean
    },
    title: {
      type: String
    },
    des: {
      type: String
    }
  },
  data() {
    return {
    }
  },
  computed: {
    zClass() {
      // 激活状态
      if (this.activeSwitch) {
        return {
          'z-hand-active': true
        }
      } else {
        return {
          'z-hand-default': true
        }
      }
    }

  },
  methods: {
    switchActive() {
      // this.zClass['z-hand-active'] = !this.zClass['z-hand-active']

      this.$emit('update:activeSwitch', !this.activeSwitch)
    }
  }

}
</script>

<style lang="less" scoped>
.z-hand-default {
  width: 186px;
  height: 50px;
  border: 1px solid #2196f3;
  border-radius: 4px;
  &:hover {
    cursor: pointer;
  }

  .z-title {
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 28px;
    color: #2781ee;
  }
  .z-desc {
    display: flex;
    justify-content: center;
  }
}
.z-hand-active {
  width: 186px;
  height: 50px;
  border: 1px solid #2196f3;
  border-radius: 4px;
  background: #2196f3;

  cursor: pointer;
  .z-title {
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 28px;
    color: white;
  }
  .z-desc {
    display: flex;
    justify-content: center;
    color: white;
  }
}
</style>
