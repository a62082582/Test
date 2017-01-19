Page({
  data: {
    array:['法定代表人','财务负责人','购票人','办税人'],
    index:'0'
  },
  onLoad: function(option){
    this.setData({
      nsrsbh : option.nsrsbh,
      nsrmc : option.nsrmc,
      sjhm : option.sjhm
    })
  },
  bindPickerChange:function(e){
    this.setData({
      index: e.detail.value
    })
  },
  formSubmit:function(e){
    var info = e.detail.value
    var that = this
    wx.getUserInfo({
      success: function(res) {
        var userInfo = res.userInfo
        wx.request({
          url: 'http://192.168.0.106:8080/weixinMVC/test/bindInfo.do', //仅为示例，并非真实的接口地址
          data: {
            xm : info.xm,
            sfzhm : info.hm,
            sjhm : that.data.sjhm,
            nsrType : info.nsrType,
            openidType : '1',
            nick : userInfo.nickName,
            nsrsbh : that.data.nsrsbh
          },
          header: {
              'content-type': 'application/json'
          },
          //method : 'POST',
          success: function(res) {
            // console.log(res.data)
            wx.redirectTo({
              url: '../wxBindStep3/step3?nsrsbh='+that.data.nsrsbh+'&sjhm='+that.data.sjhm
            })
          }
        })
      },
      fail : function(){
        wx.login({
          success: function(res) {
            if (res.code) {
              //发起网络请求
              console.log('111' + res.code)
            } else {
              console.log('获取用户登录态失败！' + res.errMsg)
            }
          }
        });
      }
    })
  },
})