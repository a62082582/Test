Page({
  data: {
    //4个纳税人类型数组
    array:['法定代表人','财务负责人','购票人','办税人'],
    index:'0',   //初始索引为0
    outCheck : 'false',    //外部进入小程序标志
    showCheck : 'true'    //前台显示开关
  },
  onLoad: function(option){
    //获取外部进入标志
    var _outCheck = option.outCheck
    if(_outCheck == undefined){
      _outCheck = 'false'
    }
    //存入全局变量
    this.setData({
      nsrsbh : option.nsrsbh,
      nsrmc : option.nsrmc,
      //如果是从第一步跳转而来，则手机号应为第一步输入的手机号，如果纳税人是关联过手机，则使用纳税人关联的手机号显示
      sjhm : (option.sjhm!='undefined'&&option.sjhm!='')?option.sjhm:(wx.getStorageSync('info')).sjhm,
      outCheck : _outCheck
    })
    var that = this
    if(option.outCheck == 'true'){
      //如果从外部进入，首先调用校验二维码方法
      wx.request({
        url: 'http://192.168.0.106:8080/WsbsWebProject/yspCustomerRegisteSmzAction_checkCode.do', 
        data: {
          nsrsbh: option.nsrsbh,
          sessionId: option.sessionId,
          time : option.time
        },
        header: {
            'content-type': 'application/json'
        },
        method:'POST',
        success: function(res) {
          var temp = res.data
          if(temp.code != '00'){
            //如果返回结果不为成功，则将前台显示开关设置为false
            that.setData({
              showCheck : 'false'
            })
            //弹出提示框进行提示
            wx.showModal({
              title: '提示',
              content: '您的二维码已失效',
              showCancel:false,
              success: function(res) {
                if (res.confirm) {
                  //点击确认后跳转至扫描二维码界面
                  wx.redirectTo({
                    url: '../ItemList/ItemList?scanCheck=true&listCheck=false&step=2&sjhm='+that.data.sjhm
                  })
                }
              }
            })
          }     
        },
        fail: function(res) {
          wx.showToast({
            title: '网络异常，请重新上传',
            icon: 'success',
            duration: 4000
          })
        }
      }) 
    }
  },
  formSubmit:function(e){
    var info = e.detail.value
    var that = this
    //首先通过填写的参数调用后台校验纳税人方法
    wx.request({
      url: 'http://192.168.0.106:8080/WsbsWebProject/yspCustomerRegisteSmzAction_checkNsrxx.do', 
      data: {
        nsrsbh : that.data.nsrsbh,
        nsrType : info.nsrType,
        sjhm : info.sjhm
      },
      header: {
          'content-type': 'application/json'
      },
      method : 'POST',
      success: function(res) {
        var temp = res.data
        //获取在缓存中存入的openId和nickName变量
        var nick = wx.getStorageSync('nickName')
        var openId = wx.getStorageSync('openId')
        //如果校验成功
        if(temp.code == '00'){   
          //调用后台绑定纳税人与微信号的方法 
          wx.request({
            url: 'http://192.168.0.106:8080/WsbsWebProject/yspCustomerRegisteSmzAction_bindNsrxxAndWx.do', 
            data: {
              xm : info.xm,
              sfzhm : info.hm,
              sjhm : that.data.sjhm,
              nsrType : info.nsrType,
              openidType : '1',
              nick : nick,
              nsrsbh : that.data.nsrsbh,
              openid : openId
            },
            header: {
                'content-type': 'application/json'
            },
            method : 'POST',
            success: function(res) {
              // console.log(res.data)
              //成功后跳转第三步
              wx.redirectTo({
                url: '../wxBindStep3/step3?nsrsbh='+that.data.nsrsbh
              })
            },
            fail: function(res) {
              wx.showToast({
                title: '网络异常，请重新上传',
                icon: 'success',
                duration: 4000
              })
            }
          })
        }else{
          //失败则弹出消息提示
          wx.showToast({
            title: '校验失败',
            icon: 'success',
            duration: 4000
          })
        }
      },
      fail: function(res) {
        wx.showToast({
          title: '网络异常，请重新上传',
          icon: 'success',
          duration: 4000
        })
      }
    })
  }
})