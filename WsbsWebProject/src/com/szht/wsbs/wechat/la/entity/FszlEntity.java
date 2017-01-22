package com.szht.wsbs.wechat.la.entity;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class FszlEntity {
	String applicationid = "";
	String businessid = "";
	String businessmc = "";
	String nsrsbh = "";
	String nsrmc = "";
	String rwzt = "";
	
	List<Map<String, String>> zllist = new ArrayList<Map<String, String>>();
	
	public void addZllist(Map<String, String> zlObj) {
		zllist.add(zlObj);
	}

	public String getApplicationid() {
		return applicationid;
	}

	public void setApplicationid(String applicationid) {
		this.applicationid = applicationid;
	}

	public String getBusinessid() {
		return businessid;
	}

	public void setBusinessid(String businessid) {
		this.businessid = businessid;
	}

	public String getBusinessmc() {
		return businessmc;
	}

	public void setBusinessmc(String businessmc) {
		this.businessmc = businessmc;
	}

	public String getNsrsbh() {
		return nsrsbh;
	}

	public void setNsrsbh(String nsrsbh) {
		this.nsrsbh = nsrsbh;
	}

	public String getNsrmc() {
		return nsrmc;
	}

	public void setNsrmc(String nsrmc) {
		this.nsrmc = nsrmc;
	}

	public String getRwzt() {
		return rwzt;
	}

	public void setRwzt(String rwzt) {
		this.rwzt = rwzt;
	}

	public List<Map<String, String>> getZllist() {
		return zllist;
	}

	public void setZllist(List<Map<String, String>> zllist) {
		this.zllist = zllist;
	}
}
