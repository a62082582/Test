Page({
  data: {
    //用来存储纳税人选择或者拍摄的照片数组
    imagePath:[]
  },
  onLoad: function(option){
    this.setData({
      nsrsbh : option.nsrsbh
    })
  },
  scan:function(key){
    var that = this
    wx.chooseImage({
      count: 1,  //只能选择1张照片
      sizeType:['compressed'],   //压缩品质
      sourceType: ['album', 'camera'],   //获取方式为从相册选择或拍照
      success: function(res) {
        var tempFilePaths = res.tempFilePaths
        
        
        // wx.saveFile({
        //   tempFilePath: tempFilePaths[0],
        //   success: function(res) {
        //     var savedFilePath = res.savedFilePath
        //   }
        // })
        //将选择的照片存储全局变量用于显示
        that.setData({
            imagePath: tempFilePaths
        })
      }
    })
    
  },
  
  upload : function(){
    var that = this
    //调用上传方法上传纳税人身份证
    wx.uploadFile({
      url: 'http://192.168.0.106:8080/WsbsWebProject/yspCustomerRegisteSmzAction_saveNsrxxSfz.do',
      filePath: that.data.imagePath[0],
      name: 'sfzfile',
      formData:{
        openid : wx.getStorageSync('openId'),
        nsrsbh : that.data.nsrsbh,
        openidType : '1',
        unionid : ''
      },
      success: function(res){
        var data = res.data
        wx.showToast({
          title: '上传成功',
          icon: 'success',
          duration: 4000
        })
        //do something
      },
      fail: function(res) {
        
      }
      
    })
  },
  returnTop:function(){
    // wx.request({
    //   url: 'http://127.0.0.1:8080/weixinMVC/test/aaa.do', //仅为示例，并非真实的接口地址
    //   data: {
    //     x: '' ,
    //     y: ''
    //   },
    //   header: {
    //       'content-type': 'application/json'
    //   },
    //   success: function(res) {
    //     console.log(res.data)
    //   }
    // })
    wx.redirectTo({
      url: '../index/index'
    })
  }
})