<template>
  <div class="header-menu">
    <Menu mode="horizontal" active-name="1">
      <MenuItem name="1">
      <Icon type="ios-paper" />
      首页
      </MenuItem>
      <MenuItem name="2">
      <Icon type="ios-people" />
      活动
      </MenuItem>
      <Submenu name="3">
        <template slot="title">
          <Icon type="ios-stats" />
          车辆
        </template>
        <MenuGroup title="使用">
          <MenuItem name="3-1">新增和启动</MenuItem>
          <MenuItem name="3-2">活跃分析</MenuItem>
          <MenuItem name="3-3">时段分析</MenuItem>
        </MenuGroup>
        <MenuGroup title="留存">
          <MenuItem name="3-4">用户留存</MenuItem>
          <MenuItem name="3-5">流失用户</MenuItem>
        </MenuGroup>
      </Submenu>
      <MenuItem name="4">
      <Icon type="ios-construct" />
      订单
      </MenuItem>
    </Menu>
    <br>
  </div>
</template>
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
