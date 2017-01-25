const checkCodeUrl = require('../../config').checkCodeUrl
const checkOpenidUrl = require('../../config').checkOpenidUrl

Page({
  data: {
    
  },
  onLoad : function(option){
    var that = this
    //获取在缓存中存储的openId存入全局变量
    this.setData({
      openId : wx.getStorageSync('openId')
    })
    //如果是从外部进入，则网址中必须包含nsrsbh,sessionId,applicationid和time字段，如果全都有则判断此次请求是从外部进入资料上传
    if(option.nsrsbh != undefined && option.sessionId != undefined && option.time != undefined && option.applicationid != undefined){
      //从外部进入首先先校验openid
      wx.request({
        url: checkOpenidUrl,
        data: {
          openid : that.data.openId,
          unionid : '',
          openidType : '1'
        },
        header: {
            'content-type': 'application/json'
        },
        method : 'POST',
        success: function(res) {
          var result = res.data
          if(result.resultCode == '3'){
            wx.navigateTo({
              url: '../uploadPage/uploadPage?nsrsbh='+option.nsrsbh+'&applicationid='+option.applicationid+'&nsrmc='+result.nsrmc
            })
          }else{
            wx.showToast({
              title: "您还未完成用户认证，请先进行用户认证",
              // icon: 'error',
              duration: 4000
            })
          }
        },
        fail:function(e){
          wx.showToast({
            title: "网络异常",
            // icon: 'error',
            duration: 4000
          })
        }
      })
    }
    //如果是从外部进入，则网址中必须包含nsrsbh,sessionId和time字段，如果全都有则判断此次请求是从外部进入用户绑定
    else if(option.nsrsbh != undefined && option.sessionId != undefined && option.time != undefined){
      //从外部进入首先先校验openid
      wx.request({
        url: checkOpenidUrl,
        data: {
          openid : that.data.openId,
          unionid : '',
          openidType : '1'
        },
        header: {
            'content-type': 'application/json'
        },
        method : 'POST',
        success: function(res) {
          var result = res.data
          if(result.resultCode == '0'){
            //如果返回结果是0，即纳税人从未关联过，跳转至第一步首先绑定手机
            wx.navigateTo({
              url: '../wxBindStep1/step1?nsrsbh='+result.nsrsbh+'&nsrmc='+result.nsrmc+'&outCheck=true'
            })
          }else if(result.resultCode == '1'){
            //如果返回结果是1，即纳税人关联过但未上传身份证，跳转页面至上传身份证信息页面
            wx.navigateTo({
              url: '../wxBindStep3/step3?nsrsbh='+result.nsrsbh+'&bz=Y'
            })
          }else if(result.resultCode == '2'){
            //如果返回结果是2，即纳税人只绑定过手机，跳转页面第二步
            wx.navigateTo({
              url: '../wxBindStep2/step2?nsrsbh='+result.nsrsbh+'&nsrmc='+result.nsrmc+'&sjhm='+result.sjhm+'&outCheck=true&sessionId='+option.sessionId+'&time='+option.time
            })
          }else if(result.resultCode == '3'){
            //如果返回结果是3，跳转到纳税人信息显示页面
            wx.navigateTo({
              url: '../nsrInfoShow/show?nsrsbh='+result.nsrsbh
            })
          }
        }
      })
    }
    
  },
  bind: function() {
    var that = this
    //调用后台方法校验openId
    wx.request({
      url: checkOpenidUrl,
      data: {
        openid : that.data.openId,
        unionid : '',
        openidType : '1'
      },
      header: {
          'content-type': 'application/json'
      },
      method : 'POST',
      success: function(res) {
        var result = res.data
        //将获取到的纳税人信息的json对象存入缓存，以备使用
        wx.setStorageSync('info', result)
        if(result.resultCode == '0'){
          //如果返回结果是0，即纳税人从未关联过，跳转页面至发送手机验证码页面
          wx.navigateTo({
            url: '../wxBindStep1/step1?nsrsbh='+result.nsrsbh+'&nsrmc='+result.nsrmc
          })
        }else if(result.resultCode == '1'){
          //如果返回结果是1，即纳税人关联过但未上传身份证，跳转页面将扫一扫开关设置为true,step设置为3,信息列表开关设置为false
          wx.navigateTo({
            url: '../ItemList/ItemList?bindCheck=false'
          })
        }else if(result.resultCode == '2'){
          //如果返回结果是2，即纳税人只绑定过手机，跳转页面将扫一扫开关设置为true,step设置为2,信息列表开关设置为false
          wx.navigateTo({
            url: '../ItemList/ItemList?bindCheck=true'
          })
        }else if(result.resultCode == '3'){
          //如果返回结果是3，即纳税人绑定完成，跳转页面将扫一扫开关设置为false,step设置为0（不起作用）,信息列表开关设置为true
          wx.navigateTo({
            url: '../ItemList/ItemList?bindCheck=false'
          })
        }
      },
      fail:function(e){
        wx.showToast({
          title: "网络异常",
          // icon: 'error',
          duration: 4000
        })
      }
    })
  },
  //事项上传资料方法
  scan:function(){
    var that = this
    //首先判断openid
    wx.request({
      url: checkOpenidUrl,
      data: {
        openid : that.data.openId,
        unionid : '',
        openidType : '1'
      },
      header: {
          'content-type': 'application/json'
      },
      method : 'POST',
      success: function(res) {
        var result = res.data
        //如果返回结果是3，即纳税人全部资料绑定完成
        if(result.resultCode == '3'){
          wx.scanCode({
            // success: (res) => {
              
            //   if(this.data.switch.switch){
            //     wx.showToast({
            //       title: "您未绑定用户，请在网上办税中绑定",
            //       // icon: 'error',
            //       duration: 4000
            //     })
            //   }else{
            //   //console.log(res)
            //     wx.redirectTo({
            //       url: '../logs/logs?a=啊&b=不&c=才'
            //     })
            //   }
            // },
            fail:(res) => {
              var nsrsbh = '120103103064277'
              var sessionId = 'sessionId'
              var time = 'time'
              var applicationid = 'applicationid'
              wx.request({
                url: checkCodeUrl, 
                data: {
                  nsrsbh: nsrsbh ,
                  seesionId: sessionId,
                  time : time
                },
                header: {
                    'content-type': 'application/json'
                },
                method:'POST',
                success: function(res) {
                  var temp = res.data
                  //如果返回结果是是00，即成功，则跳转上传页面
                  if(temp.code == '00'){
                    wx.navigateTo({
                      url: '../uploadPage/uploadPage?nsrsbh='+nsrsbh+'&applicationid='+applicationid+'&nsrmc='+temp.nsrmc
                    })
                  }else{
                    //否则显示二维码失效
                    wx.showToast({
                      title: "二维码已失效",
                      icon: 'success',
                      duration: 4000
                   })
                  }
                },
                fail : function(e){
                  wx.showToast({
                    title: "网络异常",
                    // icon: 'error',
                    duration: 4000
                  })
                }
              }) 
            }
          })
        }else{
          //其他返回结果情况都提示未完成认证
          wx.showToast({
            title: "您还未完成用户认证，请先进行用于认证",
            // icon: 'error',
            duration: 4000
          })
        }
      },
      fail:function(){
        wx.showToast({
          title: "网络异常",
          // icon: 'error',
          duration: 4000
        })
      }
    })
  }
})