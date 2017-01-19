Page({
  data: {
    switch:{switch:true}
  },
  bind: function() {
    wx.scanCode({
      fail: (res) => {
        var nsrsbh = '120103103064277'
        var sessionId = 'sessionId'
        var time = '20170117152542'
        wx.request({
          url: 'http://127.0.0.1:8080/weixinMVC/test/checkNsr.do', //仅为示例，并非真实的接口地址
          data: {
            nsrsbh: nsrsbh ,
            sessionId: sessionId,
            time : time
          },
          header: {
              'content-type': 'application/json'
          },
          //method:'POST',
          success: function(res) {
            var temp = res.data
            if(temp.code == '00'){
              if(temp.step == '0'){
                wx.navigateTo({
                  url: '../wxBindStep1/step1?nsrsbh='+temp.nsrsbh+'&nsrmc='+temp.nsrmc
                })
              }else if(temp.step == '2'){
                wx.navigateTo({
                  url: '../nsrInfoShow/show?nsrsbh='+temp.nsrsbh+'&openid='+'openid'
                })
              }else if(temp.step == '1'){
                wx.navigateTo({
                  url: '../wxBindStep3/step3?nsrsbh='+temp.nsrsbh+'&openid='+'openid'
                })
              }
            }else{
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