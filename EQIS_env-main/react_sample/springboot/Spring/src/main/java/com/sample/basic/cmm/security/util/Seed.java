package com.sample.basic.cmm.security.util;

import java.util.Base64;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class Seed {

	@Value("${seed.secretKey}")
	private String seedSecretKey;
	
	public String encode(String text) {
		try {
			SeedKisa seedKisa = new SeedKisa();
			return Base64.getEncoder().encodeToString(seedKisa.encrypt(text, seedSecretKey.getBytes(), "UTF-8"));
		} catch (Exception e) {}
		
		return text;
	}
}
