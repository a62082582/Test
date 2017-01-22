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
    //调用后台校验短信方法
    wx.request({
      url: 'http://192.168.0.106:8080/WsbsWebProject/yspCustomerRegisteSmzAction_checkDx.do',
      data: {
        yzm : info.yzm,
        nsrsbh : this.data.nsrsbh,
        sjhm : info.sjhm
      },
      header: {
          'content-type': 'application/json'
      },
      method : 'POST',
      success: function(res) {
        var result = res.data
        if(result.code == '00'){
          //如果成功则跳转第二步同时传参
          wx.redirectTo({
            url: '../wxBindStep2/step2?nsrsbh='+that.data.nsrsbh+'&sjhm='+info.sjhm+'&nsrmc='+that.data.nsrmc
          })
        }else{
          //如果失败则弹出消息提示
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