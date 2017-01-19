Page({
  data: {
    sz:[]
  },
  onLoad: function(option){
    console.log(option)
    var tesz = []
    for(var i in option){
      var temp = {}
      temp.key = i
      temp.val = option[i]
      tesz.push(temp)
    }
    // console.log(tesz)
    this.data.sz = tesz
    this.setData({
      sz : this.data.sz
    })
    // console.log(this.data.sz)
  },
  upload:function(key){
    // console.log(key);
    // wx.showToast({
    //   title: key.target.id,
    //   icon: 'success',
    //   duration: 2000
    // })\
    wx.chooseImage({
      count: 1,
      success: function(res) {
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'http://127.0.0.1:8080/weixinMVC/uploadPic.do',
          // url: 'http://192.168.31.204:8080/weixinMVC/uploadPic.do',
          //url: 'http://o163w39369.51mypc.cn/weixinMVC/uploadPic.do',
          //url: 'http://2406da5b.nat123.cc/weixinMVC/uploadPic.do', //上传路径
          filePath: tempFilePaths[0],
          name: 'file',
          formData:{
            'zlId': key.target.id
          },
          success: function(res){
            var data = res.data
            //do something
          },
          fail: function(res) {
            console.log(res)
          }
        })
        // wx.saveFile({
        //   tempFilePath: tempFilePaths[0],
        //   success: function(res) {
        //     var savedFilePath = res.savedFilePath
        //   }
        // })
      }
    })
  },
  getup:function(){
    wx.request({
      url: 'http://127.0.0.1:8080/weixinMVC/test/aaa.do', //仅为示例，并非真实的接口地址
      data: {
        x: '' ,
        y: ''
      },
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
      }
    })
  }
})