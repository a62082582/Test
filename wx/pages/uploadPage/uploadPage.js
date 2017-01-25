const getFszlUrl = require('../../config').getFszlUrl
const saveFszlUrl = require('../../config').saveFszlUrl

Page({
  data: {
    sz:[]
  },
  onLoad: function(option){
    var that = this
    that.setData({
      nsrsbh : option.nsrsbh,
      applicationid : option.applicationid,
      nsrmc : option.nsrmc
    })
    //调用获取附送资料方法
    wx.request({
      url: getFszlUrl, 
      data: {
        nsrsbh: option.nsrsbh ,
        applicationid: option.applicationid,
        openid : wx.getStorageSync('openId')
      },
      header: {
          'content-type': 'application/json'
      },
      method:'POST',
      success: function(res) {
        var result = res.data
        if(result.rwzt == '00'){
          //如果返回成功，则将附送资料存储到全局变量中
          that.setData({
            zlInfo : result
          })
        }else if(result.rwzt == '01'){
          //如果状态是01则提示
          wx.showModal({
            title: '提示',
            content: '您绑定的用户与您此次事项的纳税人不符',
            showCancel:false,
            success: function(res) {
              if (res.confirm) {
                //点击确认后跳转至首页
                wx.redirectTo({
                  url: '../index/index'
                })
              }
            }
          })
        }else if(result.rwzt == '02'){
          wx.showToast({
            title: "二维码对应的任务已经完结或终止",
            // icon: 'error',
            duration: 4000
          })
          
        }
      },
      fail : function(e){
        wx.showToast({
          title: "网络异常",
          // icon: 'error',
          duration: 4000
        })
      }
    })
  },
  upload:function(key){
    var that = this
    wx.chooseImage({
      count: 1,  //数量为1
      sizeType:['compressed'],   //压缩品质
      sourceType: ['album', 'camera'],   //获取方式为从相册选择或拍照
      success: function(res) {
        var tempFilePaths = res.tempFilePaths
        //调用获取处理方式函数
        var clfs = getClfs(that,key.target.id,tempFilePaths[0])
        wx.uploadFile({
          url: saveFszlUrl,
          filePath: tempFilePaths[0],
          name: 'zlFile',
          formData:{
            zl_id: key.target.id,
            nsrsbh : that.data.nsrsbh,
            applicationid : that.data.applicationid,
            clfs : clfs
          },
          success: function(e){
            //获取返回结果并转化为对象
            var data = e.data
            data = JSON.parse(data)
            //如果返回结果是成功，则修改该资料的状态为已上传
            if(data.code == '00'){
              changeZlzt(that,key.target.id)
            }else{
              //否则提示上传失败
              wx.showToast({
                title: '上传失败，请重新上传',
                icon: 'success',
                duration: 4000
              })
            }
          },
          //网络访问失败提示网络异常
          fail: function(res) {
            wx.showToast({
              title: '网络异常，请重新上传',
              icon: 'success',
              duration: 4000
            })
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

//修改资料状态函数
function changeZlzt(that,id){
  var zlInfo = that.data.zlInfo
  //获取资料list
  var list = zlInfo.zllist
  var clfs = ''
  //根据id遍历该list，找到了则将该资料的状态代码设置为00
  for(var i in list){
    if(list[i].zl_id == id){
      list[i].ztdm = '00'
    }
  }
  //将该资料更新至全局变量
  that.setData({
    zlInfo : zlInfo
  })
}

//获取处理方式并显示图片
function getClfs(that,id,picture){
  var zlInfo = that.data.zlInfo
  var list = zlInfo.zllist
  var clfs = ''
  //根据id遍历list，获取处理方式并将该图片的显示开关设置为true
  for(var i in list){
    if(list[i].zl_id == id){
      clfs = list[i].clfs
      list[i].picture = picture
      list[i].show = true
    }
  }
  that.setData({
    zlInfo : zlInfo
  })
  return clfs
}