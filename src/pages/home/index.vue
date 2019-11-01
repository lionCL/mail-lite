<template>
  <div>
    <!-- 搜索 -->
    <div class="header-search">
      <div class="hotSearch">
        <icon type="search"
              size="14">
        </icon>
        <span>搜索</span>
      </div>
    </div>
    <!-- 轮播图 -->
    <swiper indicator-dots
            autoplay
            circular
            indicator-color="rgba(255, 255, 255, .3)"
            indicator-active-color="#fff">
      <block v-for="(item, index) in swiperList"
             :key="item.goods_id">
        <swiper-item>
          <img :src="item.image_src"
               alt="">
        </swiper-item>
      </block>
    </swiper>
    <!-- 分类列表 -->
    <div class="catitems">
      <div class="itemImg"
           v-for="(item, index) in catitemsList"
           :key="item.name">
        <img :src="item.image_src"
             alt="">
      </div>
    </div>
    <!-- 楼层区 -->
    <ul class="floor-list">
      <li v-for="(item, index) in floorDataList"
          :key="index">
        <!-- banner栏 -->
        <img class="banner"
             :src="item.floor_title.image_src"
             alt="">
        <!-- 商品展示 -->
        <div class="product_list">
          <div class="left">
            <img :src="item.product_list[0].image_src"
                 alt="">
          </div>
          <div class="right">
            <block v-for="(item2, index2) in item.product_list"
                   :key="index2">
              <!-- 排除title的一张  下边为0的 -->
              <img v-if="index2!==0"
                   :src="item2.image_src"
                   alt="">
            </block>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperList: [],
      catitemsList: [],
      floorDataList: []
    }
  },
  created() {
    this.loadSwiper()
    this.getCatitems()
    this.getFloordata()
  },
  methods: {
    //轮播图
    loadSwiper() {
      this.$request({
        url: '/api/public/v1/home/swiperdata'
      }).then(data => {
        // console.log(res)
        this.swiperList = data
      })
    },
    //分类列表
    getCatitems() {
      this.$request({
        url: '/api/public/v1/home/catitems'
      }).then(res => {
        // console.log(res)
        this.catitemsList = res
      })
    },
    //楼层数据
    getFloordata() {
      this.$request({
        url: '/api/public/v1/home/floordata'
      }).then(res => {
        this.floorDataList = res
      })
    }
  }
}
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

swiper {
  height: 340rpx;
  width: 100%;

  img {
    height: 340rpx;
    width: 100%;
  }
}

.catitems {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 194rpx;

  img {
    width: 128rpx;
    height: 140rpx;
  }
}

.floor-list {
  width: 100%;
  .banner {
    width: 100%;
    height: 88rpx;
  }
  .product_list {
    display: flex;
    padding: 20rpx 17rpx;

    .left > img {
      width: 232rpx;
      height: 386rpx;
    }
    .right {
      display: flex;
      flex-wrap: wrap;
      flex: 1;
      img {
        width: 232rpx;
        height: 188rpx;
        margin: 0 0 10rpx 10rpx;
      }
    }
  }
}
</style>