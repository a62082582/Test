Page({
  data: {
    switch:{switch:true}
  },
  onLoad : function(option){
    //获取在缓存中存储的openId存入全局变量
    this.setData({
      openId : wx.getStorageSync('openId')
    })
  },
  bind: function() {
    var that = this
    //调用后台方法校验openId
    wx.request({
      url: 'http://192.168.0.106:8080/WsbsWebProject/yspCustomerRegisteSmzAction_checkOpenid.do', //仅为示例，并非真实的接口地址
      // url: 'http://127.0.0.1:8080/weixinMVC/test/checkDx.do', //仅为示例，并非真实的接口地址
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
          //如果返回结果是0，即纳税人从未关联过，跳转页面将扫一扫开关设置为true,step设置为1,信息列表开关设置为false
          wx.navigateTo({
            url: '../ItemList/ItemList?scanCheck=true&listCheck=false&step=1'
          })
        }else if(result.resultCode == '1'){
          //如果返回结果是1，即纳税人关联过但未上传身份证，跳转页面将扫一扫开关设置为true,step设置为3,信息列表开关设置为false
          wx.navigateTo({
            url: '../ItemList/ItemList?scanCheck=true&listCheck=false&step=3'
          })
        }else if(result.resultCode == '2'){
          //如果返回结果是2，即纳税人只绑定过手机，跳转页面将扫一扫开关设置为true,step设置为2,信息列表开关设置为false
          wx.navigateTo({
            url: '../ItemList/ItemList?scanCheck=true&listCheck=false&step=2'
          })
        }else if(result.resultCode == '3'){
          //如果返回结果是3，即纳税人绑定完成，跳转页面将扫一扫开关设置为false,step设置为0（不起作用）,信息列表开关设置为true
          wx.navigateTo({
            url: '../ItemList/ItemList?listCheck=true&scanCheck=false&step=0'
          })
        }
      }
    })
  },
  formSubmit: function(e) {
    this.data.switch = e.detail.value
    console.log(this.data.switch)
  },
  scan:function(){
    wx.scanCode({
      success: (res) => {
        if(this.data.switch.switch){
           wx.showToast({
            title: "您未绑定用户，请在网上办税中绑定",
            // icon: 'error',
            duration: 4000
          })
        }else{
        //console.log(res)
          wx.redirectTo({
            url: '../logs/logs?a=啊&b=不&c=才'
          })
        }
      },
      fail:(res) => {
        var str = ""
        wx.request({
          url: 'http://127.0.0.1:8080/weixinMVC/test/aaa.do', //仅为示例，并非真实的接口地址
          data: {
            x: '' ,
            y: ''
          },
          header: {
              'content-type': 'application/json'
          },
          method:'POST',
          success: function(res) {
            // console.log(res.data)
            var temp = res.data
           
            for(var i in temp){
              str = str + i + "=" + temp[i]+"&"
            }
            
            str = str.substring(0,str.length-1)
            str = '../logs/logs?'+str
            wx.navigateTo({
              url: str
            })
            //  console.log(str)
          }
        }) 
      }
    })
  }
})