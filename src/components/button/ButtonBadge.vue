<template>
  <button class="button-badge" :class="classObject">
    {{title}}
    <span v-if="number!==0" class="badge" :style="{background:badgeColor}">{{number}}</span>
  </button>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: null
    },
    number: {
      type: Number,
      default: 0
    },
    active: {
      type: Boolean,
      default: false
    },
    badgeColor: {
      type: String,
      default: '#ff5722'
    }
  },
  data () {
    return {

    }
  },
  computed: {
    classObject: function () {
      return {
        'button-active': this.active
      }
    }
  }
}
</script>

<style lang="less" scoped>
.button-badge {
  border: 1px solid #c9c9c9;
  background-color: #fff;
  color: #555;
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  font-size: 12px;
  white-space: nowrap;
  text-align: center;
  border-radius: 2px;
  margin-right: 10px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:hover {
    border-color: #549ff2;
  }
  .badge {
    margin-left: 5px;
    height: 18px;
    line-height: 18px;
    position: relative;
    display: inline-block;
    padding: 0 6px;
    font-size: 12px;
    text-align: center;
    color: #fff;
    border-radius: 2px;
  }
}
.button-active {
  background: #0480f7;
  color: #fff;
}
</style>
