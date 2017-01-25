/**
 * 小程序配置文件
 */

// 此处主机域名是腾讯云解决方案分配的域名
// 小程序后台服务解决方案：http://www.qcloud.com/solution/la

var host = "192.168.0.106:8080/WsbsWebProject"

var config = {

    // 下面的地址配合云端 Server 工作
    host,

    // 登录地址，用于建立会话
    checkCodeUrl: `http://${host}/yspCustomerRegisteSmzAction_checkCode.do`,

    // 测试的请求地址，用于测试会话
    checkOpenidUrl: `http://${host}/yspCustomerRegisteSmzAction_checkOpenid.do`,

    // 用code换取openId
    viewBindNsrxxUrl: `http://${host}/yspCustomerRegisteSmzAction_viewBindNsrxx.do`,

    // 测试的信道服务接口
    getFszlUrl: `http://${host}/wxFszlAction_getFszl.do`,

    // 生成支付订单的接口
    saveFszlUrl: `http://${host}/wxFszlAction_saveFszl.do`,

    // 发送模板消息接口
    checkDxUrl: `http://${host}/yspCustomerRegisteSmzAction_checkDx.do`,

    // 上传文件接口
    bindNsrxxAndWxUrl: `http://${host}/yspCustomerRegisteSmzAction_bindNsrxxAndWx.do`,

    // 下载示例图片接口
    saveNsrxxSfzUrl: `http://${host}/yspCustomerRegisteSmzAction_saveNsrxxSfz.do`,

    // 下载示例图片接口
    getOpenIdUrl: `http://${host}/yspCustomerRegisteSmzAction_getOpenId.do`,

    // 下载示例图片接口
    decryptNsrxxUrl: `http://${host}/yspCustomerRegisteSmzAction_decryptNsrxx.do`,

    // 下载示例图片接口
    checkNsrxxUrl: `http://${host}/yspCustomerRegisteSmzAction_checkNsrxx.do`
};

module.exports = config
