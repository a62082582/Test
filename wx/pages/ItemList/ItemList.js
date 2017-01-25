const checkCodeUrl = require('../../config').checkCodeUrl

Page({
  data: {
    avatarUrl : wx.getStorageSync('avatarUrl'),
    nickName : wx.getStorageSync('nickName')
  },
  onLoad: function(option){
    //将传来的数据存入全局变量中
    this.setData({
      info : wx.getStorageSync('info'),
      sjhm : option.sjhm,
      bindCheck : option.bindCheck
    })
  },
  onShow:function(){
    var backFlag = wx.getStorageSync('backFlag') 
    if(backFlag != ''){
      wx.removeStorageSync('backFlag')
    }
    var _bindCheck = this.data.bindCheck
    if(backFlag){
      if(_bindCheck == 'true'){
        _bindCheck = 'false'
      }else{
        _bindCheck = 'true'
      }
    }
    this.setData({
      bindCheck : _bindCheck
    })
  },
  bind:function(e){
    var that = this
    //扫描二维码获取信息
    wx.scanCode({
      fail: (res) => {
        // console.log(res)
        // var result = res.result
        // //在网址中截取纳税人识别号，sessionId和time变量值
        // var obj = (result.split('?'))[1].split('&')
        // var info = {}
        // for(var i in obj){
        //   var temp = obj[i].split('=')
        //   if(temp[0] == 'nsrsbh'){
        //     info.nsrsbh = temp[1]
        //   }else if(temp[0] == 'sessionId'){
        //     info.sessionId = temp[1]
        //   }else if(temp[0] == 'time'){
        //     info.time = temp[1]
        //   }
        // }
        // var nsrsbh = info.nsrsbh
        // var sessionId = info.sessionId
        var nsrsbh = '1231654564'
        var sessionId = 'info.sessionId'
        var time = '20170117152542'
        //使用扫码获得的值校验传到后台校验二维码
        wx.request({
          url: checkCodeUrl, 
          data: {
            nsrsbh: nsrsbh,
            sessionId: sessionId,
            time : time
          },
          header: {
              'content-type': 'application/json'
          },
          method:'POST',
          success: function(res) {
            var temp = res.data
            //如果返回结果成功时
            if(temp.code == '00'){
              //跳转至第二步
              wx.navigateTo({
                url: '../wxBindStep2/step2?nsrsbh='+temp.nsrsbh+'&nsrmc='+temp.nsrmc+'&sjhm='+that.data.sjhm
              })
            }else{
              //返回结果为失败时显示消息
              wx.showToast({
                title: '二维码已失效',
                icon: 'success',
                duration: 4000
              })
            }
          },
          fail:function(e){
            wx.showToast({
              title: '网络异常',
              icon: 'success',
              duration: 4000
            })
          }
        })
      }
    })
  },
  //用户信息
  yhxx : function(e){
    wx.navigateTo({
      url: '../nsrInfoShow/show?nsrsbh='+this.data.info.nsrsbh
    })
  },
  //影像上传
  yxcj : function(e){
    wx.navigateTo({
      url: '../wxBindStep3/step3?nsrsbh='+this.data.info.nsrsbh+'&bz=Y'
    })
  }
})