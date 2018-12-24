<template>
  <div class="header-menu">
    <Menu mode="horizontal" @on-select="menuSelect" active-name="1">
      <MenuItem name="1">
      <Icon type="ios-paper" />
      首页
      </MenuItem>
      <!-- 活动 -->
      <Submenu name="2" v-access="'daeawed'">
        <template slot="title">
          <span @click="()=>{this.menuSwitch('active')}">
            <Icon type="logo-buffer" />
            运营
          </span>
        </template>
        <MenuGroup title="出行活动">
          <MenuItem name="2-1">新增和启动</MenuItem>
          <MenuItem name="2-2">活跃分析</MenuItem>
          <MenuItem name="2-3">服务网点</MenuItem>
        </MenuGroup>
        <MenuGroup title="签到活动">
          <MenuItem name="2-4">用户留存</MenuItem>
          <MenuItem name="2-5">流失用户</MenuItem>
        </MenuGroup>
        <MenuGroup title="音频分类">
          <MenuItem name="2-6">用户留存</MenuItem>
          <MenuItem name="2-7">流失用户</MenuItem>
        </MenuGroup>

      </Submenu>
      <!-- 会员 -->
      <Submenu name="3">
        <template slot="title">
          <span @click="()=>{this.menuSwitch('user')}">
            <Icon type="ios-people" />
            用户
          </span>
        </template>
        <MenuGroup title="租赁商" v-access="lease">
          <MenuItem name="3-1">新增和启动</MenuItem>
          <MenuItem name="3-2">活跃分析</MenuItem>
          <MenuItem name="3-3">时段分析</MenuItem>
        </MenuGroup>
        <MenuGroup title="广告主" v-access="advertiser">
          <MenuItem name="3-4">用户留存</MenuItem>
          <MenuItem name="3-5">流失用户</MenuItem>
        </MenuGroup>
        <MenuGroup title="普通用户" v-access="consumer">
          <MenuItem name="3-4">用户留存</MenuItem>
          <MenuItem name="3-5">流失用户</MenuItem>
        </MenuGroup>
        <MenuGroup title="服务点" v-access="service">
          <MenuItem name="3-4">用户留存</MenuItem>
          <MenuItem name="3-5">流失用户</MenuItem>
        </MenuGroup>
      </Submenu>
      <!-- 车辆 -->
      <Submenu name="4">
        <template slot="title">
          <span @click="()=>{this.menuSwitch('car')}" class="menu-hover">
            <Icon type="ios-car" />
            车辆
          </span>
        </template>
        <MenuGroup title="车型库">
          <MenuItem name="4-1">品牌分类</MenuItem>
          <MenuItem name="4-2">车辆类型</MenuItem>
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
      <!-- 财务 -->
      <Submenu name="6">
        <template slot="title">
          <span @click="()=>{this.menuSwitch('finance')}">
            <Icon type="ios-list-box" />
            财务
          </span>

        </template>
        <MenuGroup title="财务操作">
          <MenuItem name="3-1">新增和启动</MenuItem>
          <MenuItem name="3-2">活跃分析</MenuItem>
          <MenuItem name="3-3">时段分析</MenuItem>
        </MenuGroup>
        <MenuGroup title="财务记录">
          <MenuItem name="3-4">用户留存</MenuItem>
          <MenuItem name="3-5">流失用户</MenuItem>
        </MenuGroup>
        <MenuGroup title="佣金记录">
          <MenuItem name="3-4">用户留存</MenuItem>
          <MenuItem name="3-5">流失用户</MenuItem>
        </MenuGroup>
      </Submenu>
      <!-- 微信 -->
      <Submenu name="7">
        <template slot="title">
          <span @click="()=>{this.menuSwitch('weixin')}">
            <Icon type="md-phone-portrait" />
            微信
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
    </Menu>
    <br>
  </div>
</template>
<script>

import { mapMutations } from 'vuex'

export default {
  data() {
    return {}
  },

  methods: {
    ...mapMutations([
      'setApp'
    ]),
    menuSelect(name) {
      switch (parseInt(name)) {
        case 1: this.setApp({ tabMenu: 'home' }); break
        case 2: this.setApp({ tabMenu: 'home1' }); break
        case 3: this.setApp({ tabMenu: 'home2' }); break
        case 4: this.setApp({ tabMenu: 'home3' }); break
      }
    },
    menuSwitch(tabMenu) {
      // 设置侧边栏
      this.setApp({ tabMenu: tabMenu })
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
  }

  .menu-hover {
    cursor: pointer !important;
  }
</style>
