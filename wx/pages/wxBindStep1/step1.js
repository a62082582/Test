const checkDxUrl = require('../../config').checkDxUrl

Page({
  data: {
   sjhm:'',
   nsrsbh:'',
   buttonDisable:false,    //发送按钮disable开关
   second:5,   //发送按钮默认可以重发的时间
   buttonValue:'发送',  //发送按钮显示文字
   outCheck : 'false'  //从外部进入小程序的标志，默认为false
  },
  onLoad: function(option){
    //获取页面传递来的变量
    var _outCheck = option.outCheck
    //如果页面没传递这个变量，则设置为false
    if(_outCheck == undefined){
      _outCheck = 'false'
    }
    //保存全局变量
    this.setData({
      nsrsbh : option.nsrsbh,
      nsrmc : option.nsrmc,
      outCheck : _outCheck
    })
  },
  formSubmit:function(e){
    var info = e.detail.value
    var that = this
    //调用后台校验短信方法
    wx.request({
      url: checkDxUrl,
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
          //如果是小程序内部进入
          if(that.data.outCheck == 'false'){
            //如果成功则跳转第二步同时传参
            wx.redirectTo({
              url: '../ItemList/ItemList?bindCheck=true&nsrsbh='+that.data.nsrsbh+'&sjhm='+info.sjhm+'&nsrmc='+that.data.nsrmc
            })
          }else{
            //从外部进入，则不需要扫码，直接跳转第二步
            wx.redirectTo({
              url: '../wxBindStep2/step2?nsrsbh='+that.data.nsrsbh+'&sjhm='+info.sjhm+'&nsrmc='+that.data.nsrmc
            })
          }
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


//发送按钮倒计时函数
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