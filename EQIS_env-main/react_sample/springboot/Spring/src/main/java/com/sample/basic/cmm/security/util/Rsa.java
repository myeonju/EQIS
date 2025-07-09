package com.sample.basic.cmm.security.util;

import java.io.BufferedReader;
import java.io.FileReader;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.spec.PKCS8EncodedKeySpec;

import javax.crypto.Cipher;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.sample.basic.cmm.exception.CustomException;
import com.sample.basic.cmm.exception.model.ExceptionCode;

@Component
public class Rsa {
	
	@Value("${rsa.sample.key.path}")
	private String rsaEKeyPath;

//	@Value("${rsa.h.key.path}")
//	private String rsaHKeyPath;
//	
//	@Value("${rsa.k.key.path}")
//	private String rsaKKeyPath;
	
	public String decrypt(String encryptedText, String coScnCd) throws Exception {
		// keyPath 구분
		String keyPath = null;
		
		if(!coScnCd.isEmpty()) {
			keyPath = rsaEKeyPath;
		}
		
		if(keyPath == null) {
			throw new CustomException(ExceptionCode.INVALID_RESOURCE);
		}
		
		// key  읽기
		BufferedReader br = new BufferedReader(new FileReader(keyPath));
		StringBuilder sb = new StringBuilder();
		String readLine = null;
		
		while((readLine = br.readLine()) != null) {
			sb.append(readLine);
		}
		
		br.close();
		
		// 복호화
		KeyFactory keyFactory = KeyFactory.getInstance("RSA");
		PKCS8EncodedKeySpec encodeKeySpec = new PKCS8EncodedKeySpec(Base64.decodeBase64(sb.toString()));
		PrivateKey privateKey = keyFactory.generatePrivate(encodeKeySpec);
		
		Cipher cipher = Cipher.getInstance("RSA");
		cipher.init(Cipher.DECRYPT_MODE, privateKey);
		
		return new String(cipher.doFinal(Base64.decodeBase64(encryptedText)), "UTF-8");
	}
	
}
