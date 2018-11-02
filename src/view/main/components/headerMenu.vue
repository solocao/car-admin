<template>
  <div class="header-menu">
    <Menu mode="horizontal" @on-select="menuSelect" active-name="1">
      <MenuItem name="1">
      <Icon type="ios-paper" />
      首页
      </MenuItem>
      <!-- 广告 -->
      <Submenu name="2">
        <template slot="title">
          <span @click="()=>{this.qqqq()}">
            <Icon type="logo-buffer" />
            广告
          </span>
        </template>
        <MenuGroup title="图片分类">
          <MenuItem name="3-1">新增和启动</MenuItem>
          <MenuItem name="3-2">活跃分析</MenuItem>
          <MenuItem name="3-3">时段分析</MenuItem>
        </MenuGroup>
        <MenuGroup title="视频分类">
          <MenuItem name="3-4">用户留存</MenuItem>
          <MenuItem name="3-5">流失用户</MenuItem>
        </MenuGroup>
        <MenuGroup title="音频分类">
          <MenuItem name="3-4">用户留存</MenuItem>
          <MenuItem name="3-5">流失用户</MenuItem>
        </MenuGroup>
      </Submenu>
      <!-- 会员 -->
      <Submenu name="3">
        <template slot="title">
          <Icon type="ios-people" />
          会员
        </template>
        <MenuGroup title="租赁商">
          <MenuItem name="3-1">新增和启动</MenuItem>
          <MenuItem name="3-2">活跃分析</MenuItem>
          <MenuItem name="3-3">时段分析</MenuItem>
        </MenuGroup>
        <MenuGroup title="广告主">
          <MenuItem name="3-4">用户留存</MenuItem>
          <MenuItem name="3-5">流失用户</MenuItem>
        </MenuGroup>
        <MenuGroup title="普通用户">
          <MenuItem name="3-4">用户留存</MenuItem>
          <MenuItem name="3-5">流失用户</MenuItem>
        </MenuGroup>
      </Submenu>
      <!-- 车辆 -->
      <Submenu name="4">
        <template slot="title">
          <Icon type="ios-car" />
          车辆
        </template>
        <MenuGroup title="图片分类">
          <MenuItem name="3-1">新增和启动</MenuItem>
          <MenuItem name="3-2">活跃分析</MenuItem>
          <MenuItem name="3-3">时段分析</MenuItem>
        </MenuGroup>
        <MenuGroup title="视频分类">
          <MenuItem name="3-4">用户留存</MenuItem>
          <MenuItem name="3-5">流失用户</MenuItem>
        </MenuGroup>
        <MenuGroup title="音频分类">
          <MenuItem name="3-4">用户留存</MenuItem>
          <MenuItem name="3-5">流失用户</MenuItem>
        </MenuGroup>
      </Submenu>
      <!-- 素材 -->
      <Submenu name="5">
        <template slot="title">
          <Icon type="md-images" />
          素材
        </template>
        <MenuGroup title="图片分类">
          <MenuItem name="3-1">新增和启动</MenuItem>
          <MenuItem name="3-2">活跃分析</MenuItem>
          <MenuItem name="3-3">时段分析</MenuItem>
        </MenuGroup>
        <MenuGroup title="视频分类">
          <MenuItem name="3-4">用户留存</MenuItem>
          <MenuItem name="3-5">流失用户</MenuItem>
        </MenuGroup>
        <MenuGroup title="音频分类">
          <MenuItem name="3-4">用户留存</MenuItem>
          <MenuItem name="3-5">流失用户</MenuItem>
        </MenuGroup>
      </Submenu>
      <!-- 账单 -->
      <Submenu name="6">
        <template slot="title">
          <Icon type="ios-list-box" />
          账单
        </template>
        <MenuGroup title="图片分类">
          <MenuItem name="3-1">新增和启动</MenuItem>
          <MenuItem name="3-2">活跃分析</MenuItem>
          <MenuItem name="3-3">时段分析</MenuItem>
        </MenuGroup>
        <MenuGroup title="视频分类">
          <MenuItem name="3-4">用户留存</MenuItem>
          <MenuItem name="3-5">流失用户</MenuItem>
        </MenuGroup>
        <MenuGroup title="音频分类">
          <MenuItem name="3-4">用户留存</MenuItem>
          <MenuItem name="3-5">流失用户</MenuItem>
        </MenuGroup>
      </Submenu>
    </Menu>
    <br>
  </div>
</template>
<script>

import { mapMutations } from 'vuex'

export default {
  data () {
    return {}
  },

  methods: {
    ...mapMutations([
      'setApp'
    ]),
    qqqq () {
      console.log('qqqq')
    },
    menuSelect (name) {
      alert(name)
      switch (parseInt(name)) {
        case 1: this.setApp({ tabMenu: 'home' }); break
        case 2: this.setApp({ tabMenu: 'home1' }); break
        case 3: this.setApp({ tabMenu: 'home2' }); break
        case 4: this.setApp({ tabMenu: 'home3' }); break
      }
    }
  }
}
</script>

<style lang="less" scoped>
.header-menu {
  height: 60px;
  margin-left: 10px;

  .ivu-menu-item-hover {
    border-bottom: 3px solid #2d8cf0 !important;
  }
  .ivu-menu {
    height: 61px;
    background: white;
    border-bottom: 0px solid white;
  }

  // ivu-menu-light
}
</style>
