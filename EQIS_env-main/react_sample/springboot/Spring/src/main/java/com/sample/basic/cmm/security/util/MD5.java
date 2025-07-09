package com.sample.basic.cmm.security.util;

import java.security.MessageDigest;

import org.springframework.stereotype.Component;

/**
 * <pre>
 * MD5
 * </pre>
 * @author user
 * @since 2023.01.01
 * @see
 *
 */

@Component
public class MD5 {

	public String encrypt(String text) {
		try {
			MessageDigest mdMD5 = MessageDigest.getInstance("MD5");
			mdMD5.update(text.getBytes("UTF-8"));
			
			byte[] md5Hash = mdMD5.digest();
			StringBuilder hexMD5hash = new StringBuilder();
			
			for (byte b : md5Hash) {
				String hexString = String.format("%02x", b);
				hexMD5hash.append(hexString);
			}
			
			return hexMD5hash.toString();
			
		} catch (Exception e) {}
		
		return text;
	}
}
