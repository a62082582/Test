Page({
  data: {
   sjhm:'',
   nsrsbh:'',
   buttonDisable:false,
   second:5,
   buttonValue:'发送'
  },
  onLoad: function(option){
    this.setData({
      nsrsbh : option.nsrsbh,
      nsrmc : option.nsrmc
    })
  },
  formSubmit:function(e){
    var info = e.detail.value
    var that = this
    wx.request({
      url: 'http://192.168.0.106:8080/weixinMVC/test/checkDx.do', //仅为示例，并非真实的接口地址
      // url: 'http://127.0.0.1:8080/weixinMVC/test/checkDx.do', //仅为示例，并非真实的接口地址
      data: {
        yzm : info.yzm,
        nsrsbh : this.data.nsrsbh
      },
      header: {
          'content-type': 'application/json'
      },
      //method : 'POST',
      success: function(res) {
        var result = res.data
        if(result.code == '00'){
          wx.redirectTo({
            url: '../wxBindStep2/step2?nsrsbh='+that.data.nsrsbh+'&sjhm='+info.sjhm+'&nsrmc='+that.data.nsrmc
          })
        }else{
          wx.showToast({
            title: '验证码不正确',
            icon: 'success',
            duration: 4000
          })
        }
      }
    })
    
  },
  resend:function(){
    countdown(this)
  }
})

function countdown(that) {
 var second = that.data.second
 if (second == -1) {
  that.setData({
   second: 5,
   buttonDisable : false,
   buttonValue:'重新发送'
  });
  return ;
 }
 var timer = setTimeout(function(){
  that.setData({
   buttonDisable : true,
   second: second - 1,
   buttonValue:'重新发送('+second+')'
  });
  countdown(that);
 }
 ,1000)
}