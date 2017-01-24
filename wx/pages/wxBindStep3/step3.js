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
  scanFm:function(key){
    var that = this
    wx.chooseImage({
      count: 1,  //只能选择1张照片
      sizeType:['compressed'],   //压缩品质
      sourceType: ['album', 'camera'],   //获取方式为从相册选择或拍照
      success: function(res) {
        var tempFilePaths = res.tempFilePaths
        //将选择的照片存储全局变量用于显示
        that.setData({
            imagePathFm: tempFilePaths
        })
        wx.uploadFile({
          url: 'http://192.168.0.106:8080/WsbsWebProject/yspCustomerRegisteSmzAction_saveNsrxxSfz.do',
          filePath: that.data.imagePathFm[0],
          name: 'sfzfile',
          formData:{
            openid : wx.getStorageSync('openId'),
            nsrsbh : that.data.nsrsbh,
            openidType : '1',
            unionid : '',
            sfzFlag : '00'
          },
          success: function(res){
            var data = res.data
            wx.showToast({
              title: '上传成功',
              icon: 'success',
              duration: 4000
            })
          },
          fail: function(res) {
            wx.showToast({
              title: '上传失败，请重新上传',
              icon: 'success',
              duration: 4000
            })
          }
        })
      }
    })
  },
  scanZm:function(key){
    var that = this
    wx.chooseImage({
      count: 1,  //只能选择1张照片
      sizeType:['compressed'],   //压缩品质
      sourceType: ['album', 'camera'],   //获取方式为从相册选择或拍照
      success: function(res) {
        var tempFilePaths = res.tempFilePaths
        //将选择的照片存储全局变量用于显示
        that.setData({
            imagePathZm: tempFilePaths
        })
        wx.uploadFile({
          url: 'http://192.168.0.106:8080/WsbsWebProject/yspCustomerRegisteSmzAction_saveNsrxxSfz.do',
          filePath: that.data.imagePathZm[0],
          name: 'sfzfile',
          formData:{
            openid : wx.getStorageSync('openId'),
            nsrsbh : that.data.nsrsbh,
            openidType : '1',
            unionid : '',
            sfzFlag : '01'
          },
          success: function(res){
            var data = res.data
            wx.showToast({
              title: '上传成功',
              icon: 'success',
              duration: 4000
            })
          },
          fail: function(res) {
            wx.showToast({
              title: '上传失败，请重新上传',
              icon: 'success',
              duration: 4000
            })
          }
        })
      }
    })
  },
  returnTop:function(){
    wx.redirectTo({
      url: '../index/index'
    })
  }
})