<%@ page language="java" contentType="text/html; charset=utf-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>生成二维码</title>
<script type="text/javascript">
	var baseurl = "<%=request.getContextPath()%>";
	function scewm()
	{
		document.getElementById("imgEwm").src 
			= baseurl + "/nsrxxQRcode.do?nsrsbh=" 
					+ document.getElementById("nsrsbh").value 
					+ "&sessionid=" + document.getElementById("sessionid").value ;
	}
</script>
</head>
<body>
	<table>
		<tr>
			<td>nsrsbh : </td>
			<td><input type="text" id="nsrsbh" value="11111"></td>
		</tr>
		<tr>
			<td>sessionid : </td>
			<td><input type="text" id="sessionid" value="22222"></td>
		</tr>
	</table>
	<input type="button" onclick="scewm();" value="生成二维码">
	<div align="center" style="margin-top:5px;">
		<img id="imgEwm"  alt=""  width="150px;"  height="150px;"/>
	</div>
</body>
</html>