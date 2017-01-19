package com.szht.wsbs.wechat.la.controller;

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

import com.szht.wsbs.wechat.la.util.Constants;
import com.szht.wsbs.wechat.la.util.QRCode;

import net.sf.json.JSONObject;

@Controller
public class WechatLaTestController {
	
	/**
	 *  获取纳税人信息
	 */
	@RequestMapping("wsbsNsrxxDetailAction_checkCode.do")
	@ResponseBody
	public Map<String, String> getNsrglxx(@RequestBody JSONObject requestJson) {
		String nsrsbh = requestJson.getString("nsrsbh");
		
		System.out.println(requestJson);
		
		Map<String, String> map = new HashMap<String, String>();
		map.put("nsrsbh", nsrsbh);
		map.put("nsrmc", "测试名称");
		map.put("step", "0");
		map.put("code", "00");
		return map;
	}
	
	/**
	 * 获取openid
	 * @param requestJson
	 * @return
	 */
	@RequestMapping("wsbsNsrxxDetailAction_getOpenId.do")
	@ResponseBody
	public Map<String, String> getOpenId(@RequestBody JSONObject requestJson) {
		String code = requestJson.getString("code");
		
		Map<String, String> map = new HashMap<String, String>();
		try
		{
			System.out.println(requestJson);
			
			String requestUrl = Constants.GET_OPENID_URL.replace("APPID", Constants.APPID)
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
	@RequestMapping("wsbsNsrxxDetailAction_checkDx.do")
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
	@RequestMapping("wsbsNsrxxDetailAction_checkNsrxx.do")
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
	@RequestMapping("wsbsNsrxxDetailAction_bindNsrxxAndWx.do")
	@ResponseBody
	public Map<String, String> bindNsrxxAndWx(@RequestBody JSONObject requestJson) {
		String nsrsbh = requestJson.getString("nsrsbh");
		
		System.out.println("wsbsNsrxxDetailAction_bindNsrxxAndWx : " + requestJson);
		
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
	@RequestMapping("wsbsNsrxxDetailAction_saveNsrxxSfz.do")
	@ResponseBody
	public Map<String, String> saveNsrxxSfz(@RequestParam("sfzfile")MultipartFile sfzfile, 
			HttpServletRequest request, String nsrsbh, String unionid, String openid,
			String openidType) {
		
		System.out.println("wsbsNsrxxDetailAction_saveNsrxxSfz : unionid = " + unionid + ", openid = "
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
	@RequestMapping("wsbsNsrxxDetailAction_viewBindNsrxx.do")
	@ResponseBody
	public Map<String, String> viewBindNsrxx(@RequestBody JSONObject requestJson) {
		
		String nsrsbh = requestJson.getString("nsrsbh");
		
		System.out.println("wsbsNsrxxDetailAction_viewBindNsrxx : " + requestJson);
		
		Map<String, String> map = new HashMap<String, String>();
		map.put("unionid", "");
		map.put("openid", "123456");
		map.put("openidType", "1");
		map.put("nsrsbh", nsrsbh);
		map.put("nsrmc", "有色金属企业");
		map.put("sjhm", "12345678910");
		map.put("sfzhm", "120103125964520012");
		map.put("nick", "你猜我猜不猜");
		map.put("nsrType", "3");
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
		String url = "https://mp.weixin.qq.com/a/xioPF8PEVJ8qrYd093-U?v=2&nsrsbh="+nsrsbh+"&sessionId="+sessionid;
		QRCode.getInstance().encodeImage(url, response.getOutputStream());
		return null;
	}
}
