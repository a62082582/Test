const getOpenIdUrl = require('/config').getOpenIdUrl
const decryptNsrxxUrl = require('/config').decryptNsrxxUrl

//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据  
    var openId = wx.getStorageSync('openId')
    if(openId == ''){
      wx.login({
        success: function(res) {
          if (res.code) {
            var code = res.code
            wx.getUserInfo({
              success: function(res) {
                var a = res
                var userInfo = a.userInfo
                wx.request({
                  url: getOpenIdUrl, 
                  data: {
                    code:code
                  },
                  header: {
                      'content-type': 'application/json'
                  },
                  method : 'POST',
                  success: function(result) {
                    // console.log(result)
                    wx.request({
                      url: decryptNsrxxUrl, 
                      data: {
                        encryptedData:a.encryptedData,
                        sessionKey:result.data.sessionKey,
                        iv : a.iv
                      },
                      header: {
                          'content-type': 'application/json'
                      },
                      method : 'POST',
                      success: function(res) {
                        // console.log(res.data)
                        var temp = res.data
                        wx.setStorageSync('nickName', temp.nickName)
                        wx.setStorageSync('openId', temp.openId) 
                        wx.setStorageSync('timestamp', temp.watermark.timestamp)
                        wx.setStorageSync('avatarUrl', temp.avatarUrl)
                      }
                    }) 
                  }
                })
              }
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
})