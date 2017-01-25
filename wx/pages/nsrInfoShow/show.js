const viewBindNsrxxUrl = require('../../config').viewBindNsrxxUrl

Page({
  data: {
    array:['法定代表人','财务负责人','购票人','办税人']
  },
  onLoad: function(option){
    var that = this
    wx.request({
      url: viewBindNsrxxUrl, //仅为示例，并非真实的接口地址
      data: {
        nsrsbh: option.nsrsbh,
        openid: wx.getStorageSync('openId')
      },
      header: {
          'content-type': 'application/json'
      },
      method:'POST',
      success: function(res) {
        var temp = res.data
        that.setData({
          nsrsbh : temp.nsrsbh,
          nsrmc : temp.nsrmc,
          sjhm : temp.sjhm,
          sfzhm : temp.sfzhm,
          nick : temp.nick,
          nsrType : temp.nsrType,
          xm : temp.xm
        })
      },
      fail : function(){
        wx.showToast({
          title: '网络异常',
          icon: 'success',
          duration: 4000
        })
      }
    })
  },
  // disBind:function(e){
  //   var that = this
  //   wx.request({
  //     url: 'http://192.168.0.106:8080/weixinMVC/test/bindInfo.do', //仅为示例，并非真实的接口地址
  //     data: {
  //       xm : info.xm,
  //       sfzhm : info.hm,
  //       sjhm : that.data.sjhm,
  //       nsrType : info.nsrType,
  //       openidType : '1',
  //       nick : userInfo.nickName,
  //       nsrsbh : that.data.nsrsbh
  //     },
  //     header: {
  //         'content-type': 'application/json'
  //     },
  //     //method : 'POST',
  //     success: function(res) {
  //       // console.log(res.data)
  //       wx.redirectTo({
  //         url: '../wxBindStep3/step3?nsrsbh='+that.data.nsrsbh+'&sjhm='+that.data.sjhm
  //       })
  //     }
  //   })  
  // }
})