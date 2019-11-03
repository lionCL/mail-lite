<template>
  <div class="header-search">
    <div class="hotSearch">
      <icon type="search"
            size="14">
      </icon>
      <span>搜索</span>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.header-search {
  padding: 20rpx 16rpx;
  background-color: #eb4450;

  .hotSearch {
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #bbb;
    height: 60rpx;
    border-radius: 4rpx;

    span {
      font-size: 14px;
      margin-left: 16rpx;
    }
  }
}
</style>