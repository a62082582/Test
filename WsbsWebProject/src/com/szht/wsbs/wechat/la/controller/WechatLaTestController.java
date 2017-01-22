package com.szht.wsbs.wechat.la.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.szht.wsbs.wechat.la.entity.FszlEntity;
import com.szht.wsbs.wechat.la.util.Constants;
import com.szht.wsbs.wechat.la.util.QRCode;
import com.szht.wsbs.wechat.la.util.SignUtil;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
public class WechatLaTestController {
	
	/**
	 *  获取纳税人信息
	 */
	@RequestMapping("yspCustomerRegisteSmzAction_checkCode.do")
	@ResponseBody
	public Map<String, String> getNsrglxx(@RequestBody JSONObject requestJson) {
		String nsrsbh = requestJson.getString("nsrsbh");
		
		System.out.println("yspCustomerRegisteSmzAction_checkCode: " + requestJson);
		
		Map<String, String> map = new HashMap<String, String>();
		map.put("nsrsbh", nsrsbh);
		map.put("nsrmc", "测试名称");
		map.put("step", "0");
		map.put("code", "00");
		return map;
	}
	
	/**
	 *  checkOpenid
	 */
	@RequestMapping("yspCustomerRegisteSmzAction_checkOpenid.do")
	@ResponseBody
	public Map<String, String> checkOpenid(@RequestBody JSONObject requestJson) {
		String openid = requestJson.getString("openid");
		String unionid = requestJson.getString("unionid");
		String openidType = requestJson.getString("openidType");
		
		System.out.println("yspCustomerRegisteSmzAction_checkOpenid: " +requestJson);
		
		Map<String, String> map = new HashMap<String, String>();
		map.put("unionid", unionid);
		map.put("openid", openid);
		map.put("openidType", openidType);
		
		map.put("nsrsbh", "1111111");
		map.put("nick", "nick111");
		map.put("sjhm", "2222222");
		map.put("nsrType", "0");
		map.put("sfzhm", "120101199001011234");
		
		map.put("nsrmc", "测试名称");
		map.put("xm", "姓名");
		map.put("resulCode", "0");
		return map;
	}
	
	/**
	 * 获取openid
	 * @param requestJson
	 * @return
	 */
	@RequestMapping("yspCustomerRegisteSmzAction_getOpenId.do")
	@ResponseBody
	public Map<String, String> getSessionId(@RequestBody JSONObject requestJson) {
		String code = requestJson.getString("code");
		
		Map<String, String> map = new HashMap<String, String>();
		try
		{
			System.out.println("yspCustomerRegisteSmzAction_getOpenId: " + requestJson);
			
			String requestUrl = Constants.GET_SESSIONKEY_URL.replace("APPID", Constants.APPID)
					.replace("APPSECRET" , Constants.SECRET).replace("CODE" , code);
			HttpClient client = new DefaultHttpClient();
			HttpGet get = new HttpGet(requestUrl);
			HttpResponse res = client.execute(get);
			String responseContent = null; // 响应内容
			HttpEntity entity = res.getEntity();
			responseContent = EntityUtils.toString(entity, "UTF-8");
			JSONObject jsonObject = JSONObject.fromObject(responseContent);
			
			String openid = jsonObject.getString("openid");
			System.out.println("openid = " + openid);
			
			map.put("code", code);
			map.put("openid", openid);
			map.put("sessionKey", jsonObject.getString("session_key"));
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		
		return map;
	}
	
	/**
	 * 校验短信验证码
	 * @param requestJson
	 * @return
	 */
	@RequestMapping("yspCustomerRegisteSmzAction_checkDx.do")
	@ResponseBody
	public Map<String, String> checkDx(@RequestBody JSONObject requestJson) {
		String nsrsbh = requestJson.getString("nsrsbh");
		
		System.out.println("wsbsNsrxxDetailAction_checkDx : " + requestJson);
		
		Map<String, String> map = new HashMap<String, String>();
		map.put("nsrsbh", nsrsbh);
		map.put("code", "00");
		return map;
	}
	
	/**
	 * 校验金三纳税人信息
	 * @param requestJson
	 * @return
	 */
	@RequestMapping("yspCustomerRegisteSmzAction_checkNsrxx.do")
	@ResponseBody
	public Map<String, String> checkNsrxx(@RequestBody JSONObject requestJson) {
		String nsrsbh = requestJson.getString("nsrsbh");
		
		System.out.println("wsbsNsrxxDetailAction_checkNsrxx : " + requestJson);
		
		Map<String, String> map = new HashMap<String, String>();
		map.put("nsrsbh", nsrsbh);
		map.put("code", "00");
		return map;
	}
	
	/**
	 * 绑定纳税人和微信
	 * @param requestJson
	 * @return
	 */
	@RequestMapping("yspCustomerRegisteSmzAction_bindNsrxxAndWx.do")
	@ResponseBody
	public Map<String, String> bindNsrxxAndWx(@RequestBody JSONObject requestJson) {
		String nsrsbh = requestJson.getString("nsrsbh");
		
		System.out.println("yspCustomerRegisteSmzAction_bindNsrxxAndWx : " + requestJson);
		
		Map<String, String> map = new HashMap<String, String>();
		map.put("nsrsbh", nsrsbh);
		map.put("code", "00");
		return map;
	}
	
	/**
	 * 保存身份证影像
	 * @param requestJson
	 * @return
	 */
	@RequestMapping("yspCustomerRegisteSmzAction_saveNsrxxSfz.do")
	@ResponseBody
	public Map<String, String> saveNsrxxSfz(@RequestParam("sfzfile")MultipartFile sfzfile, 
			HttpServletRequest request, String nsrsbh, String unionid, String openid,
			String openidType) {
		
		System.out.println("yspCustomerRegisteSmzAction_saveNsrxxSfz : unionid = " + unionid + ", openid = "
				+ openid + ", openidType = " + openidType + ", nsrsbh = " + nsrsbh);
		
		Map<String, String> map = new HashMap<String, String>();
		map.put("nsrsbh", nsrsbh);
		map.put("code", "00");
		return map;
	}
	
	/**
	 * 查询绑定微信用户信息
	 * @param requestJson
	 * @return
	 */
	@RequestMapping("yspCustomerRegisteSmzAction_viewBindNsrxx.do")
	@ResponseBody
	public Map<String, String> viewBindNsrxx(@RequestBody JSONObject requestJson) {
		
		String nsrsbh = requestJson.getString("nsrsbh");
		
		System.out.println("yspCustomerRegisteSmzAction_viewBindNsrxx : " + requestJson);
		
		Map<String, String> map = new HashMap<String, String>();
		map.put("unionid", "");
		map.put("openid", "123456");
		map.put("openidType", "1");
		map.put("nsrsbh", nsrsbh);
		map.put("nsrmc", "有色金属企业");
		map.put("sjhm", "12345678910");
		map.put("sfzhm", "120103125964520012");
		map.put("nick", "你猜我猜不猜");
		map.put("nsrType", "2");
		map.put("xm", "你猜我叫啥");
		return map;
	}
	
	@RequestMapping("test.do")
	@ResponseBody
	public void test() {
		System.out.println("test");
	}
	
	@RequestMapping("nsrxxQRcode.do")
	@ResponseBody
	public String nsrxxQRcode(String nsrsbh, String sessionid, HttpServletResponse response)throws Exception{
		String url = "https://mp.weixin.qq.com/a/xioPF8PEVJ8qrYd093-U?v=2&nsrsbh="+nsrsbh+"&sessionId="+sessionid
			+ "&time=" + new Date().getTime();
		QRCode.getInstance().encodeImage(url, response.getOutputStream());
		return null;
	}
	
	
	/**
	 * 获取wsbsNsrxxDetailAction_decryptNsrxx
	 * @param requestJson
	 * @return
	 */
	@RequestMapping("yspCustomerRegisteSmzAction_decryptNsrxx.do")
	@ResponseBody
	public JSONObject decryptNsrxx(@RequestBody JSONObject requestJson) {
		JSONObject jsonObject = new JSONObject(); 
		
		try {
			String sessionKey = requestJson.getString("sessionKey");
			String encryptedData = requestJson.getString("encryptedData");
			String iv = requestJson.getString("iv");
			
			String deString = SignUtil.decrypt(encryptedData, sessionKey, iv);
			
			jsonObject = JSONObject.fromObject(deString); 
			System.out.println(jsonObject);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return jsonObject;
		
	}
	
	/**
	 * 
	 * @param requestJson
	 * @return
	 */
	/*
	@RequestMapping("/wxFszlAction_checkDbsx.do")
	@ResponseBody
	public Map<String, String> checkDbsx(@RequestBody JSONObject requestJson) {
		String nsrsbh = requestJson.getString("nsrsbh");
		String applicationid = requestJson.getString("applicationid");
		
		System.out.println("wxFszlAction_checkDbsx: " + requestJson);
		
		Map<String, String> map = new HashMap<String, String>();
		map.put("nsrsbh", nsrsbh);
		map.put("applicationid", applicationid);
		map.put("code", "00");
		return map;
	}
	*/
	
	@RequestMapping("/wxFszlAction_getFszl.do")
	@ResponseBody
	public JSONObject getFszl(@RequestBody JSONObject requestJson) {
		System.out.println("wxFszlAction_getFszl: " + requestJson);
		
		String nsrsbh = requestJson.getString("nsrsbh");
		String applicationid = requestJson.getString("applicationid");
		
		FszlEntity obj = new FszlEntity();
		
		obj.setApplicationid(applicationid);
		obj.setBusinessid("businessid");
		obj.setBusinessmc("Businessmc");
		obj.setNsrsbh(nsrsbh);
		obj.setNsrmc("nsrmc");
		obj.setRwzt("00");
		
		Map<String, String> map = new HashMap<String, String>();
		map.put("zl_id", "1");
		map.put("mc", "mc1");
		map.put("clfs", "00");
		map.put("ztdm", "01");
		
		Map<String, String> map1 = new HashMap<String, String>();
		map1.put("zl_id", "2");
		map1.put("mc", "mc2");
		map1.put("clfs", "00");
		map1.put("ztdm", "00");
		
		obj.addZllist(map);
		obj.addZllist(map1);
		
		JSONObject respJson = JSONObject.fromObject(obj);
		
		System.out.println(respJson);
		return respJson;
	}
	
	@RequestMapping("wxFszlAction_saveFszl.do")
	@ResponseBody
	public Map<String, String> saveNsrxxSfz(@RequestParam("zlfile")MultipartFile zlfile, 
			String applicationid, String zl_id, String nsrsbh,
			String clfs) {
		
		System.out.println("wxFszlAction_saveFszl: applicationid = " + applicationid + ", zl_id = "
				+ zl_id + ", clfs = " + clfs + ", nsrsbh = " + nsrsbh);
		
		Map<String, String> map = new HashMap<String, String>();
		map.put("nsrsbh", nsrsbh);
		map.put("zl_id", zl_id);
		map.put("code", "00");
		return map;
	}
}
