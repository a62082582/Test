Page({
  data: {
    imagePath:[]
  },
  onLoad: function(option){
    this.setData({
      nsrsbh : option.nsrsbh
    })
    // console.log(this.data.sz)
  },
  scan:function(key){
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType:['compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        var tempFilePaths = res.tempFilePaths
        
        
        // wx.saveFile({
        //   tempFilePath: tempFilePaths[0],
        //   success: function(res) {
        //     var savedFilePath = res.savedFilePath
        //   }
        // })
        that.setData({
            imagePath: tempFilePaths
        })
      }
    })
    
  },
  upload : function(){
    var that = this
    wx.uploadFile({
      url: 'http://192.168.0.106:8080/weixinMVC/test/saveNsrxxSfz.do',
      // url: 'http://192.168.31.204:8080/weixinMVC/uploadPic.do',
      //url: 'http://o163w39369.51mypc.cn/weixinMVC/uploadPic.do',
      //url: 'http://2406da5b.nat123.cc/weixinMVC/uploadPic.do', //上传路径
      filePath: that.data.imagePath[0],
      name: 'sfzfile',
      formData:{
        openid : 'key.target.id',
        nsrsbh : that.data.nsrsbh,
        openidType : '1'
      },
      success: function(res){
        var data = res.data
        //do something
      },
      fail: function(res) {
        wx.showToast({
          title: '上传成功',
          icon: 'success',
          duration: 4000
        })
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