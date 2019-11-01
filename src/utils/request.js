export default function request(options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `https://www.uinav.com${options.url}`, //开发者服务器接口地址",
      data: options.data, //请求的参数",
      method: options.method,
      dataType: options.dataType || 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
      header: options.header,
      success: res => {
        const {
          message,
          meta: { mes, status }
        } = res.data
        if (status === 200) {
          resolve(message)
        }
      },
      fail: err => {
        reject(err)
      },
      complete: () => {}
    })
  })
}
