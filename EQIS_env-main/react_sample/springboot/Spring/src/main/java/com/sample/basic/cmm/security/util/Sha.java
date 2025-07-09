package com.sample.basic.cmm.security.util;

import java.security.MessageDigest;
import java.util.Base64;

import org.springframework.stereotype.Component;

@Component
public class Sha {

	public String encrypt(String text) {
		try {
			MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
			messageDigest.update(text.getBytes("UTF-8"));
			
			return new String(Base64.getEncoder().encode(messageDigest.digest()));
		} catch (Exception e) { }
		
		return text;
	}
}
