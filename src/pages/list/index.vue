<template>
  <div>
    <div class="header"
         :style="{position:isScroll?'fixed':'static'}">
      <!-- 搜索框 -->
      <div class="search-header">
        <icon type="search"
              size="18">
        </icon>
        <input type="text"
               v-model="keyword"
               confirm-type="search"
               @confirm="reload">
      </div>
      <!-- 导航 -->
      <ul class="nav">
        <li v-for="(item, index) in navList"
            :key="item"
            @click="activeIndex=index"
            :class="{active:activeIndex===index}">{{item}}</li>
      </ul>
    </div>
    <!-- 列表 -->
    <ul class="goods"
        :style="{marginTop:isScroll?'220rpx':'0'}">
      <li class="goods-list"
          v-for="(item, index) in goodsList"
          :key="item.goods_id">
        <img :src="item.goods_big_logo"
             alt="">
        <div class="goodsItem">
          <p class="line-clamp2">{{item.goods_name}}</p>
          <p class="price">￥<span>{{item.goods_price}}</span>.00</p>
        </div>
      </li>
    </ul>

    <!-- 提示数据加载完毕 -->
    <p class="tip"
       v-show="isLastPage">---我是有底线的---</p>

  </div>
</template>

<script>
const PAGE_SIZE = 6
export default {
  data() {
    return {
      //nav的选项
      navList: ['综合', '销量', '价格'],
      //nav默认下标
      activeIndex: 0,
      //搜索关键字
      keyword: '',
      pagenum: 1,
      //商品列表
      goodsList: [],
      isRuquest: false, //是否请求
      isLastPage: false, //是否最后一页
      isScroll: false //是否滚动 默认不滚动
    }
  },

  onLoad(options) {
    this.keyword = options.keyword
    this.queryGoods()
  },
  //下拉刷新钩子
  onPullDownRefresh() {
    //下拉的时候 页面没有滚动
    this.isScroll = false
    this.reload()
  },
  //上拉加载更多钩子
  onReachBottom() {
    this.pagenum++
    this.queryGoods()
  },
  //页面检测滚动钩子
  onPageScroll() {
    this.isScroll = true
    console.log(this.isScroll)
  },

  methods: {
    //列表请求
    queryGoods() {
      // 如果请求中或者是最后一页，就不发请求
      if (this.isRequest || this.isLastPage) {
        return
      }
      //请求前将isRequest设置为ture
      this.isRequest = true
      this.$request({
        url: '/api/public/v1/goods/search',
        data: {
          query: this.keyword,
          pagesize: PAGE_SIZE,
          pagenum: this.pagenum
        }
      })
        .then(res => {
          console.log(res)
          //追加数据
          this.goodsList = [...this.goodsList, ...res.goods]

          // 判断是否为最后一页 如果是将isLastPage设置为ture
          if (this.goodsList.length === res.total) {
            this.isLastPage = true
          }
        })
        .finally(() => {
          //请求完毕后 将isRequest设置为false
          this.isRequest = false
        })
    },
    //刷新
    reload() {
      //是否最后一页设置为false
      this.isLastPage = false
      //重置页码为1
      this.pagenum = 1
      //清空列表
      this.goodsList = []
      //重新请求
      this.queryGoods()
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  position: relative;
  width: 100%;
  background-color: #fff;
  top: 0;
}

.search-header {
  position: relative;
  height: 120rpx;
  background-color: #eee;
  padding: 0 16rpx;
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    background-color: #fff;
    height: 60rpx;
    width: 100%;
    border-radius: 8rpx;
    padding: 0 80rpx;
    font-size: 24rpx;
  }
  icon {
    position: absolute;
    top: 44rpx;
    left: 46rpx;
  }
}

.nav {
  height: 100rpx;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1rpx solid #ddd;
  li {
    &.active {
      color: #eb4450;
    }
  }
}

.goods-list {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20rpx;
  border-bottom: 1rpx solid #ddd;

  img {
    width: 200rpx;
    height: 200rpx;
    margin-right: 26rpx;
  }
}

.goodsItem {
  flex: 1;
  height: 260rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: 14px;
  .price {
    color: #eb4450;
    margin-top: 24rpx;
    span {
      font-size: 20px;
    }
  }
}

.tip {
  text-align: center;
  color: #ccc;
  font-size: 14px;
}
</style>