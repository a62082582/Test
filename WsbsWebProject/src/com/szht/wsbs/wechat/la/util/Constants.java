package com.szht.wsbs.wechat.la.util;

/**
 * 
 * @author liwenxuan
 *
 */
public class Constants {
	/**
	 * APPID
	 */
	public static String APPID = "wx5f6e00a13de8b8e2";
	
	/**
	 * SECRET
	 */
	public static String SECRET = "7fad4f0b7e0921edf0de9cfc43286a7c";
	
	/**
	 * 获取openId
	 */
	public static String GET_SESSIONKEY_URL = 
			"https://api.weixin.qq.com/sns/jscode2session?appid=APPID" 
            + "&secret=APPSECRET&js_code=CODE&grant_type=authorization_code";
	
}
