Page({
  data: {
    array:['法定代表人','财务负责人','购票人','办税人'],
    scanCheck : 'false',
    listCheck : 'false',
    step : '0'
  },
  onLoad: function(option){
    //将传来的数据存入全局变量中
    this.setData({
      scanCheck : option.scanCheck,
      listCheck : option.listCheck,
      step : option.step,
      info : wx.getStorageSync('info')
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
          url: 'http://192.168.0.106:8080/WsbsWebProject/yspCustomerRegisteSmzAction_checkCode.do', 
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
              //如果step为1时跳转第一步
              if(that.data.step == '1'){
                wx.redirectTo({
                  url: '../wxBindStep1/step1?nsrsbh='+temp.nsrsbh+'&nsrmc='+temp.nsrmc
                })
                //如果step为2时跳转第二步
              }else if(that.data.step == '2'){
                wx.redirectTo({
                  url: '../wxBindStep2/step2?nsrsbh='+temp.nsrsbh+'&nsrmc='+temp.nsrmc
                })
                //如果step为3时跳转第三步
              }else if(that.data.step == '3'){
                wx.redirectTo({
                  url: '../wxBindStep3/step3?nsrsbh='+temp.nsrsbh
                })
              }
            }else{
              //返回结果为失败时显示消息
              wx.showToast({
                title: '二维码已失效',
                icon: 'success',
                duration: 4000
              })
            }
          }
        })
      }
    })
  }
})