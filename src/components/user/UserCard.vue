<template>
  <div class="user-card">
    <div class="z-box">

    </div>
    <div class="avatar">
      <img src="http://ozwpnu2pa.bkt.clouddn.com/a2.jpg" alt="">
    </div>
    <div class="detail">
      <div>草味</div>
      <div>手机号：17768118595</div>
    </div>
  </div>
</template>
<script>
export default {

}

</script>
<style lang="less">
.user-card {
  width: 33.33%;

  .z-box {
  }
  padding: 10px;
  display: flex;
  border: 1px solid #9e9e9e59;
  float: left;
  &:hover {
    box-shadow: 0px 0 3px 2px rgba(100, 100, 100, 0.21);
  }

  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .detail {
  }
}
</style>
