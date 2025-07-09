package com.sample.basic.cmm.provider;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sample.basic.cmm.exception.CustomException;
import com.sample.basic.cmm.exception.model.ExceptionCode;
import com.sample.basic.cmm.security.util.Aes256;
import com.sample.basic.cmm.util.Function;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtProvider {
	
	@Value("${jwt.secretKey")
	private String jwtSecretKey;
	
	@Value("${jwt.tokenName")
	private String jwtTokenName;
	
	@Autowired
	Aes256 aes256;
	
	private long expireTime = 1000L * 60 * 120;		// 토큰 유효시간 (120분) 
	
	// [Temp comment]
//	public String createToken(EeB eeB, List<AuthInfo> authInfoList) {
//		long currentTime = System.currentTimeMillis();
//		String datetime = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date(currentTime));
//		
//		String token = Jwts.builder()
//							.setHeaderParam("typ", "jwt")
//							.setSubject("token")
//							.setExpiration(new Date(currentTime + expireTime))
//							.claim("eeB",  eeB)
//							.claim("authInfoList", authInfoList)
//							.claim("datetime", datetime)
//							.signWith(SignatureAlgorithm.HS256, jwtSecretKey.getBytes())
//							.compact();
//	}
	
	public String getToken() {
		return aes256.decrypt(Function.getRequest().getHeader(jwtTokenName));
	}
	
	// request 를 통해 조회
	public Map<String, Object> getInfo() throws Exception {
		try {
			return Jwts.parser().setSigningKey(jwtSecretKey.getBytes()).parseClaimsJws(getToken()).getBody();
		} catch (Exception e) {
			throw new CustomException(ExceptionCode.INVALID_AUTH_TOKEN);
		}
	}

	// [Temp comment]
//	public EeB getEeB() throws Exception {
//		return new ObjectMapper().convertValue(getInfo().get("eeB"), EeB.class);
//	}
//	
//	public String getItgEeno() throws Excepton {
//		return getEeB().getItgEeno();
//	}
//	
//	public List<AuthInfo> getAuthInfoList() throws Exception {
//		List<Object> objectList = new ObjectMapper().convertValue(getInfo().get("authInfoList"), List.class);
//		List<AuthInfo> authInfoList = new ArrayList<>();
//		
//		for(Object object : objectList) {
//			authInfoList.add(new ObjectMapper().convertValue(object, AuthInfo.class));
//		}
//		
//		return authInfoList;
//	}
	
	public String getDatetime() throws Exception {
		return (String) getInfo().get("datetime");
	}
	
	// 토큰을 통해 조회
	public Map<String, Object> getInfo(String token) throws Exception {
		try {
			return Jwts.parser().setSigningKey(jwtSecretKey.getBytes()).parseClaimsJws(token).getBody();
		} catch (Exception e) {
			throw new CustomException(ExceptionCode.INVALID_AUTH_TOKEN);
		}
	}
	
	public String getItgEeno(String token) throws Exception {
		return (String) getInfo(token).get("itgEeno");
	}

	// [Temp comment]
//	public List<AuthInfo> getAuthInfoList(String token) throws Exception {
//		List<Object> objectList = new ObjectMapper().convertValue(getInfo(token).get("authInfoList"), List.class);
//		List<AuthInfo> authInfoList = new ArrayList<>();
//		
//		for(Object object : objectList) {
//			authInfoList.add(new ObjectMapper().convertValue(object, AuthInfo.class));
//		}
//		
//		return authInfoList;
//	}
	
	public String getDatetime(String token) throws Exception {
		Map<String, Object> map = getInfo(token);
		return (String) map.get("datetime");
	}
	
	
}
