<template>
  <div>
    <!-- 搜索框 -->
    <SearchBar />
    <!-- 展示区 -->
    <div class="content">
      <ul class="left">
        <li v-for="(cate1, index) in categoryList"
            :key="cate1.cat_id"
            @click="activeIndex=index"
            :class="{active:activeIndex===index}">{{cate1.cat_name}}</li>
      </ul>
      <div class="right">
        <img src="../../../static/images/icon/titleImage.png"
             alt="">
        <ul class="cate-list"
            v-if="categoryList[activeIndex]">
          <li v-for="cate2 in categoryList[activeIndex].children"
              :key="cate2.cat_id">
            <p class="title">/<span>{{cate2.cat_name}}</span>/</p>
            <ul class="cate3"
                v-if="cate2.children">
              <li v-for="(cate3, index3) in cate2.children"
                  :key="cate3.cat_id"
                  @click="toList(cate3.cat_name)">
                <img :src="cate3.cat_icon"
                     alt="">
                <p>{{cate3.cat_name}}</p>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar'
export default {
  components: {
    SearchBar
  },
  data() {
    return {
      categoryList: [],
      //当前点击的第一级目录下标
      activeIndex: 0
    }
  },

  onLoad() {
    this.getCategories()
  },
  methods: {
    //获取分类查询数据
    getCategories() {
      this.$request({
        url: '/api/public/v1/categories'
      }).then(data => {
        // console.log(data)
        this.categoryList = data
      })
    },
    //点击三类 跳转到详情页面
    toList(name) {
      //注意路径pages前面的 /
      wx.navigateTo({ url: `/pages/list/main?keyword=${name}` })
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  display: flex;
  position: absolute;
  top: 100rpx;
  left: 0;
  right: 0;
  bottom: 0;
}

.left {
  background-color: #f4f4f4;
  width: 198rpx;
  overflow: auto;
  li {
    width: 198rpx;
    height: 100rpx;
    border-bottom: 1rpx solid #eee;
    text-align: center;
    line-height: 100rpx;
    // 点击选中时的样式 用伪类来写
    &.active {
      background-color: #fff;
      color: #eb4450;
      position: relative;
      &::before {
        position: absolute;
        content: '';
        width: 8rpx;
        height: 60rpx;
        background-color: #eb4450;
        top: 20rpx;
        left: 0;
      }
    }
  }
}

.right {
  flex: 1;
  overflow: auto;
  padding: 20rpx 16rpx;
  img {
    width: 520rpx;
    height: 180rpx;
  }

  .title {
    height: 110rpx;
    line-height: 110rpx;
    text-align: center;
    color: #e0e0e0;
    span {
      margin: 0 30rpx;
      color: #333;
      font-size: 18px;
    }
  }
}

.cate3 {
  display: flex;
  flex-wrap: wrap;

  li {
    width: 33.33%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 40rpx;
    img {
      width: 120rpx;
      height: 120rpx;
    }
    p {
      font-size: 14px;
      margin-top: 20rpx;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>