const BASE_URL = 'https://www.uinav.com'

export default function request(options) {
  return new Promise((resolve, reject) => {
    //当有noLoading的时候不显示加载动画
    if (!options.noLoading) {
      wx.showLoading({
        title: '', //提示的内容,
        mask: true //显示透明蒙层，防止触摸穿透,
      })
    }
    wx.request({
      url: `${BASE_URL}${options.url}`, //开发者服务器接口地址",
      data: options.data || {}, //请求的参数",
      method: options.method,
      dataType: options.dataType || 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
      header: options.header,
      success: res => {
        const {
          message,
          meta: { status }
        } = res.data
        if (status === 200) {
          resolve(message)
        }
      },
      fail: err => {
        reject(err)
      },
      complete: () => {
        //关闭加载
        if (!options.noLoading) {
          wx.hideLoading()
        }
      }
    })
  })
}
