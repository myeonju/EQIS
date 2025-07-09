package com.sample.basic.cmm.security.util;

import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class Aes256 {

	@Value("${aes.secretKey}")
	private String aesSecretKey;
	
	@Value("${tsb.aes.secretKey}")
	private String tsbAesSecretKey;
	
	@Value("${html.aes.secretKey}")
	private String htmlAesSecretKey;
	
	@Value("${aesInterface.secretKey")
	private String aesInterfaceSecretKey;
	
	// 암호화
	public String encrypt(String text) {
		try {
			Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
			cipher.init(Cipher.ENCRYPT_MODE, 
					new SecretKeySpec(aesSecretKey.getBytes(), "AES"), 
					new IvParameterSpec(new byte[16]));
			return new String(Base64.getEncoder().encode(cipher.doFinal(text.getBytes("UTF-8"))));
		} catch (Exception e) {}
		
		return text;
	}
	
	public String encodeURIEncrypt(String text) {
		try {
			Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
			cipher.init(Cipher.ENCRYPT_MODE, 
					new SecretKeySpec(aesSecretKey.getBytes(), "AES"), 
					new IvParameterSpec(new byte[16]));
			
			String encryptedText = new String(Base64.getEncoder().encode(cipher.doFinal(text.getBytes("UTF-8"))));
			return encryptedText.replaceAll("\\%", "\\%25")
								.replaceAll(";", "\\%3B")
								.replaceAll(",", "\\%2C")
								.replaceAll("/", "\\%2F")
								.replaceAll("\\?", "\\%3F")
								.replaceAll(":", "\\%3A")
								.replaceAll("@", "\\%40")
								.replaceAll("&", "\\%26")
								.replaceAll("=", "\\%3D")
								.replaceAll("\\+", "\\%2B")
								.replaceAll("\\$", "\\%24")
								.replaceAll("#", "\\%23")
								.replaceAll("`", "\\%60")
								.replaceAll("\\^", "\\%5E")
								.replaceAll("\\[", "\\%5B")
								.replaceAll("\\]", "\\%5D")
								.replaceAll("\\{", "\\%7B")
								.replaceAll("\\}", "\\%7D")
								.replaceAll("\"", "\\%22")
								.replaceAll("<", "\\%3C")
								.replaceAll(">", "\\%3E")
								.replaceAll("\\\\", "\\%5C")
								.replaceAll("\\|", "\\%7C");
		} catch (Exception e) {}
		
		return text;
	}
	
	public String tsbEncrypt(String text) {
		try {
			Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
			cipher.init(Cipher.ENCRYPT_MODE, 
					new SecretKeySpec(tsbAesSecretKey.getBytes(), "AES"), 
					new IvParameterSpec(tsbAesSecretKey.substring(0, 16).getBytes()));
			return new String(Base64.getEncoder().encode(cipher.doFinal(text.getBytes("UTF-8"))));
		} catch (Exception e) {}
		
		return text;
	}
	
	public String htmlEcrypt(String text) {
		try {
			Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
			cipher.init(Cipher.ENCRYPT_MODE, 
					new SecretKeySpec(htmlAesSecretKey.getBytes(), "AES"), 
					new IvParameterSpec(new byte[16]));
			return new String(Base64.getEncoder().encode(cipher.doFinal(text.getBytes("UTF-8"))));
		} catch (Exception e) {}
		
		return text;
	}
	
	public String ifUrlEncrypt(String text) {
		try {
			Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
			cipher.init(Cipher.ENCRYPT_MODE, 
					new SecretKeySpec(aesInterfaceSecretKey.getBytes(), "AES"), 
					new IvParameterSpec(new byte[16]));
			return new String(Base64.getEncoder().encode(cipher.doFinal(text.getBytes("UTF-8"))));
		} catch (Exception e) {}
		
		return text;
	}
	
	// 복호화
	public String decrypt(String encryptedText) {
		try {
			Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
			cipher.init(Cipher.DECRYPT_MODE, 
					new SecretKeySpec(aesSecretKey.getBytes(), "AES"),
					new IvParameterSpec(new byte[16]));
			
			byte bytes[] = Base64.getDecoder().decode(encryptedText.getBytes("UTF-8"));
			
			return new String(cipher.doFinal(bytes));
		} catch (Exception e) {}
		
		return encryptedText;
	}
	
	public String encodeURIDecrypt(String encryptedText) {
		try {
			return decrypt(encryptedText.replaceAll("\\%25", "\\%")
										.replaceAll("\\%3B", ";")
										.replaceAll("\\%2C", ",")
										.replaceAll("\\%2F", "/")
										.replaceAll("\\%3F", "\\?")
										.replaceAll("\\%3A", ":")
										.replaceAll("\\%40", "@")
										.replaceAll("\\%26", "&")
										.replaceAll("\\%3D", "=")
										.replaceAll("\\%2B", "\\+")
										.replaceAll("\\%24", "\\$")
										.replaceAll("\\%23", "#")
										.replaceAll("\\%60", "`")
										.replaceAll("\\%5E", "\\^")
										.replaceAll("\\%5B", "\\[")
										.replaceAll("\\%5D", "\\]")
										.replaceAll("\\%7B", "\\{")
										.replaceAll("\\%7D", "\\}")
										.replaceAll("\\%22", "\"")
										.replaceAll("\\%3C", "<")
										.replaceAll("\\%3E", ">")
										.replaceAll("\\%5C", "\\\\")
										.replaceAll("\\%7C", "\\|"));
		} catch (Exception e) {}
		
		return encryptedText;
	}
	
	public String paramDecrpyt(String encryptedText) {
		try {
			return decrypt(encryptedText.replaceAll(" ", "\\+")
										.replaceAll("!", "\\%21")
										.replaceAll("'", "\\%27")
										.replaceAll("\\(", "\\%28")
										.replaceAll("\\)", "\\%29")
										.replaceAll("~", "\\%7E"));
		} catch (Exception e) {}
		
		return encryptedText;
	}
	
	public String ifDecrypt(String encryptedText) {
		try {
			Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
			cipher.init(Cipher.DECRYPT_MODE, 
					new SecretKeySpec(aesInterfaceSecretKey.getBytes(), "AES"),
					new IvParameterSpec(new byte[16]));
			
			byte bytes[] = Base64.getDecoder().decode(encryptedText.getBytes("UTF-8"));
			
			return new String(cipher.doFinal(bytes));
		} catch (Exception e) {}
		
		return encryptedText;
	}
	
	public String ifUrlDecrypt(String encryptedText) {
		try {
			Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
			cipher.init(Cipher.DECRYPT_MODE, 
					new SecretKeySpec(aesInterfaceSecretKey.getBytes(), "AES"),
					new IvParameterSpec(new byte[16]));
			
			byte bytes[] = Base64.getUrlDecoder().decode(encryptedText.getBytes("UTF-8"));
			
			return new String(cipher.doFinal(bytes));
		} catch (Exception e) {}
		
		return encryptedText;
	}
	
	public String ifParamDecrypt(String encryptedText) {
		try {
			return ifUrlDecrypt(encryptedText.replaceAll(" ", "\\+")
										.replaceAll("!", "\\%21")
										.replaceAll("'", "\\%27")
										.replaceAll("\\(", "\\%28")
										.replaceAll("\\)", "\\%29")
										.replaceAll("~", "\\%7E"));
		} catch (Exception e) {}
		
		return encryptedText;
	}
	
}
