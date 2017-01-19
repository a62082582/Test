package com.szht.wsbs.wechat.la.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import net.sf.json.JSONObject;

@Controller
public class WechatLaTestController {
	
	/**
	 *  获取纳税人信息
	 */
	@RequestMapping("getNsrglxx.do")
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
	 * 保存身份证影响
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
	
	@RequestMapping("test.do")
	@ResponseBody
	public void test() {
		System.out.println("test");
	}
}
