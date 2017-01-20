package com.szht.wsbs.wechat.la.util;

import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;

import javax.imageio.ImageIO;

import org.apache.commons.lang.StringUtils;

import jp.sourceforge.qrcode.QRCodeEncoder;

/**
 * <p>二维码编码解码工具 </p>
 *
 * @author LWang 创建日期(2010-07-28)
 */

public class QRCode {
	private static final String JPEG_TYPE = "jpeg";
	private static QRCode instance = null;
	private QRCode() {}
	public static QRCode getInstance() {
		if (instance == null) {
			synchronized (QRCode.class) {
				if (instance == null) {
					instance = new QRCode();
				}
			}
		}
		return instance;
	}
	/**
	 * 
	 * <p>将指定内容进行图像编码，并将结果已返回参数的形式返回给调用者 </p>
	 *
	 * @param str 要编码的内容
	 * @param backColor 图像背景色
	 * @param faceColor 图像前景色
	 * @param refOutputStream 可返回的输出流对象
	 * @throws Exception
	 */
	public void encodeImage(String str, Color backColor, Color faceColor,
			OutputStream refOutputStream) throws Exception {
		if (StringUtils.isEmpty(str)) {
			throw new NullPointerException("待编码内容为空！");
		}
		if (refOutputStream == null) {
			throw new NullPointerException("未指定输出流！");
		}
		byte[] codeBytes = str.getBytes("GBK");
		if (codeBytes.length > 2320) { // 编码级别13级，内容长度最多为2320个字节
			throw new Exception("待编码内容过长！");
		}
		//		2032
		QRCodeEncoder encoder = new QRCodeEncoder();
		encoder.setQrcodeErrorCorrect('L');
		encoder.setQrcodeEncodeMode('B');
		encoder.setQrcodeVersion(7);
		boolean[][] s = encoder.calQrcode(codeBytes);

		int imageWidth = (s.length * 6 % 10 == 0 ? s.length * 6
				: (s.length * 6 / 10 + 1) * 10) + 2; // 向右 向下增加2个像素的
		int imageHeight = imageWidth;

		BufferedImage bufferImage = new BufferedImage(imageWidth, imageHeight,
				BufferedImage.TYPE_BYTE_BINARY);
		Graphics2D graphics = bufferImage.createGraphics();
		graphics.setBackground(backColor);
		graphics.clearRect(0, 0, imageWidth, imageHeight);
		graphics.setColor(faceColor);
		for (int i = 0; i < s.length; i++) {
			for (int j = 0; j < s[i].length; j++) {
				if (s[j][i]) {
					graphics.fillRect(j * 6 , i * 6 , 6, 6);
				}
			}
		}
		graphics.dispose();
		bufferImage.flush();
		ImageIO.write(bufferImage, JPEG_TYPE, refOutputStream);
	}

	/**
	 * 
	 * <p>将指定内容进行图像编码，采用默认颜色（黑/白），并将结果已返回参数的形式返回给调用者 </p>
	 *
	 * @param str 要编码的内容
	 * @param refOutputStream 可返回的输出流对象
	 * @throws Exception
	 */
	public void encodeImage(String str, OutputStream refOutputStream)
			throws Exception {
		encodeImage(str, Color.WHITE, Color.BLACK, refOutputStream);
	}

	/**
	 * 
	 * <p>将指定内容进行图像编码，并将结果已输出到指定文件 </p>
	 *
	 * @param str 要编码的内容
	 * @param backColor 图像背景色
	 * @param faceColor 图像前景色
	 * @param imageFile 图像文件
	 * @param replaceFile TRUE：如果文件已存在直接覆盖；FALSE：如果文件已存抛出异常
	 * @throws Exception
	 */
	public void encodeImage(String str, Color backColor, Color faceColor,
			File imageFile, boolean replaceFile) throws Exception {
		if (imageFile == null) {
			throw new NullPointerException("未指定输出文件！");
		}
		if (imageFile.isDirectory()) {
			throw new Exception("指定的路径为文件夹！");
		}
		if (imageFile.exists() && !replaceFile) {
			throw new Exception("指定文件已存在！");
		}
		if (!imageFile.exists()) {
			imageFile.createNewFile();
		}
		FileOutputStream fileOutputStream = new FileOutputStream(imageFile);
		encodeImage(str, backColor, faceColor, fileOutputStream);
		fileOutputStream.flush();
		fileOutputStream.close();
	}
	
	/**
	 * 
	 * <p>将指定内容进行图像编码，并将结果已输出到指定文件，如果文件已存抛出异常 </p>
	 *
	 * @param str 要编码的内容
	 * @param backColor 图像背景色
	 * @param faceColor 图像前景色
	 * @param imageFile 图像文件
	 * @throws Exception
	 */
	public void encodeImage(String str, Color backColor, Color faceColor,
			File imageFile) throws Exception {
		encodeImage(str, backColor, faceColor, imageFile, false);
	}

	/**
	 * 
	 * <p>将指定内容进行图像编码，采用默认颜色（黑/白），并将结果已输出到指定文件 </p>
	 *
	 * @param str 要编码的内容
	 * @param imageFile 图像文件
	 * @param replaceFile TRUE：如果文件已存在直接覆盖；FALSE：如果文件已存抛出异常
	 * @throws Exception
	 */
	public void encodeImage(String str, File imageFile, boolean replaceFile)
			throws Exception {
		encodeImage(str, Color.WHITE, Color.BLACK, imageFile, replaceFile);
	}

	/**
	 * 
	 * <p>将指定内容进行图像编码，采用默认颜色（黑/白），并将结果已输出到指定文件，如果文件已存抛出异常 </p>
	 *
	 * @param str 要编码的内容
	 * @param imageFile 图像文件
	 * @throws Exception
	 */
	public void encodeImage(String str, File imageFile) throws Exception {
		encodeImage(str, Color.WHITE, Color.BLACK, imageFile, false);
	}

	/**
	 * 
	 * <p>将指定内容进行图像编码，并将结果已输出到指定文件 </p>
	 *
	 * @param str 要编码的内容
	 * @param backColor 图像背景色
	 * @param faceColor 图像前景色
	 * @param imageFilePath 图像文件路径
	 * @param replaceFile TRUE：如果文件已存在直接覆盖；FALSE：如果文件已存抛出异常
	 * @throws Exception
	 */
	public void encodeImage(String str, Color backColor, Color faceColor,
			String imageFilePath, boolean replaceFile) throws Exception {
		if (StringUtils.isEmpty(imageFilePath)) {
			throw new NullPointerException("未指定输出文件");
		}
		File imageFile = new File(imageFilePath);
		encodeImage(str, backColor, faceColor, imageFile, replaceFile);
	}

	/**
	 * 
	 * <p>将指定内容进行图像编码，并将结果已输出到指定文件，如果文件已存抛出异常 </p>
	 *
	 * @param str 要编码的内容
	 * @param backColor 图像背景色
	 * @param faceColor 图像前景色
	 * @param imageFilePath 图像文件路径
	 * @throws Exception
	 */
	public void encodeImage(String str, Color backColor, Color faceColor,
			String imageFilePath) throws Exception {
		encodeImage(str, backColor, faceColor, imageFilePath, false);
	}
	
	/**
	 * 
	 * <p>将指定内容进行图像编码，采用默认颜色（黑/白），并将结果已输出到指定文件 </p>
	 *
	 * @param str 要编码的内容
	 * @param imageFilePath 图像文件路径
	 * @param replaceFile TRUE：如果文件已存在直接覆盖；FALSE：如果文件已存抛出异常
	 * @throws Exception
	 */
	public void encodeImage(String str, String imageFilePath,
			boolean replaceFile) throws Exception {
		encodeImage(str, Color.WHITE, Color.BLACK, imageFilePath, replaceFile);
	}

	/**
	 * 
	 * <p>将指定内容进行图像编码，采用默认颜色（黑/白），并将结果已输出到指定文件，如果文件已存抛出异常 </p>
	 *
	 * @param str 要编码的内容
	 * @param imageFilePath 图像文件路径
	 * @throws Exception
	 */
	public void encodeImage(String str, String imageFilePath) throws Exception {
		encodeImage(str, Color.WHITE, Color.BLACK, imageFilePath, false);
	}
	
//	/**
//	 * 
//	 * <p>解码图像  <font color="red">注：只能解码JPEG图像</font> </p>
//	 *
//	 * @param imageFile 图像文件
//	 * @return
//	 * @throws Exception
//	 */
//	public String decodeImage(File imageFile) throws Exception{
//		if (imageFile == null){
//			throw new NullPointerException("未指定待解码文件！");
//		}
//		QRCodeDecoder decoder = new QRCodeDecoder();
//		FileInputStream fis = new FileInputStream(imageFile);
//		JPEGImageDecoderImpl decode = new JPEGImageDecoderImpl(fis);
//		BufferedImage image1 = decode.decodeAsBufferedImage();
//		String decodedString = new String(decoder.decode(new J2SEImage(image1)), "ISO-8859-1");
//		decodedString = ContentConverter.convert(decodedString);
//		return decodedString;
//	}
//	
//	/**
//	 * 
//	 * <p>解码图像  <font color="red">注：只能解码JPEG图像</font> </p>
//	 *
//	 * @param imageFilePath 图像文件路径
//	 * @return
//	 * @throws Exception
//	 */
//	public String decodeImage(String imageFilePath) throws Exception{
//		if (StringUtils.isEmpty(imageFilePath)){
//			throw new NullPointerException("未指定待解码文件路径！");
//		}
//		File imageFile = new File(imageFilePath);
//		if(!imageFile.exists() || imageFile.isDirectory()){
//			throw new Exception("请指定正确的文件！");
//		}
//		return decodeImage(imageFile);
//	}
}
