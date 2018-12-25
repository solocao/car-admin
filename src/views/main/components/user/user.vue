<template>
  <div class="user-avator-dropdown">
    <Dropdown @on-click="handleClick">
      <Avatar :src="userAvator" />
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import './user.less'
import { mapMutations } from 'vuex'
export default {
  name: 'User',
  props: {
    userAvator: {
      type: String,
      default: ''
    }
  },
  methods: {
    ...mapMutations([
      'set'
    ]),
    handleClick(name) {
      switch (name) {
        case 'logout':
          this.set({ login: false })
          this.$router.push({
            name: 'login'
          })
          break
      }
    }
  }
}
</script>
