package com.sample.basic.cmm.util;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sample.basic.cmm.model.Response;

import lombok.extern.slf4j.Slf4j;

/**
 * <pre>
 * 공통 기능을 관리하는 장소
 * </pre>
 * 
 * @author user
 * @since 2023.01.01
 * @see
 *
 */

@Slf4j
public class Function {

	// 클라이언트의 요청에 대한 처리 응답
	public static ResponseEntity<Response> response(Object data, String message, HttpStatus httpStatus) {
		// 응답 내용 저장
		Response response = Response.builder()
									.data(data)
									.message(message)
									.build();
		
		
		return new ResponseEntity<>(response, httpStatus);
	}
	
	// 클라이언트의 IP 추출
	public static String getClientIp() throws Exception {
		String ip = null;
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.currentRequestAttributes()).getRequest();
		
		ip = request.getHeader("X-Forwwarded-For");
		
		if (!StringUtils.hasText(ip) || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		if (!StringUtils.hasText(ip) || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if (!StringUtils.hasText(ip) || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("HTTP-CLIENT-IP");
		}
		if (!StringUtils.hasText(ip) || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("HTTP_X_FORWARDED-FOR");
		}
		if (!StringUtils.hasText(ip) || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("X-Real-IP");
		}
		if (!StringUtils.hasText(ip) || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("X-RealIP");
		}
		if (!StringUtils.hasText(ip) || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("REMOTE_ADDR");
		}
		if (!StringUtils.hasText(ip) || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getRemoteAddr();
		}
		return ip;
	}
	
	// request
	public static HttpServletRequest getRequest() {
		return ((ServletRequestAttributes)RequestContextHolder.currentRequestAttributes()).getRequest();
	}
	
	// json 형태의 String 을 Map 으로 convert
	public static Map<String, Object> json2Map(String json) throws Exception {
		return new ObjectMapper().readValue(json, new TypeReference<Map<String, Object>>(){});
	}
	
	// Boolean to String : "false" => "Y", "true" => "N"
	public static String boolean2String (Object value) {
		String result = "N";
		if ("true".equalsIgnoreCase(String.valueOf(value))) {
			result = "Y";
		} else if ("false".equalsIgnoreCase(String.valueOf(value))) {
			result = "N";
		} else {
			result = null;
		}
		return result;
	}
	
	// Yes, No => Y, N
	public static String yesNo2YN (String value) {
		String result = null;
		
		if ("Yes".equalsIgnoreCase(value)) {
			result = "Y";
		} else if ("No".equalsIgnoreCase(value)) {
			result = "N";
		}
		return result;
	}
	
	// Double null check
	public static Double getDouble (Object value) {
		Double result = null;
		if (value instanceof Double) {
			if ("null".equalsIgnoreCase(String.valueOf(value))) {
				result = null;
			} else {
				result = (Double)value;
			}
		} else if (value instanceof String) {
			String strValue = String.valueOf(value);
			if ("null".equalsIgnoreCase(strValue) || strValue.isEmpty()) {
				result = null;
			} else {
				result = Double.parseDouble(strValue);
			}
		}
		return result;
	}
	
	/**
	 * 무자열을 주어진 byte 값으로 줄인후 줄인 msg 를 추가해서 리턴 (문자열이 매우 클 경우 줄임) 
	 * 
	 * @param str		원본 String
	 * @param maxByte  	허용할 최대 Byte
	 * @param trimByte	자를 Byte
	 * @param moreMsg 	추가할 msg :  trimByte 보다 작은 사이즈의 msg
	 * @return
	 * @see ex> getTrimString("test", 3, 1, " more") : te more
	 */
	public static String getTrimString(String str, int maxByte, int trimByte, String moreMsg) {
		if (str == null || str.getBytes().length < maxByte) return str;
		String subStr = substringByBytes(str, 0, maxByte - trimByte);
		return subStr + moreMsg;
	}
	
	private static String substringByBytes(String str, int beginBytes, int endBytes) {
		if (str == null || str.length() == 0) return "";
		if (endBytes < 1) return "";
		
		if (beginBytes < 0) {
			beginBytes = 0;
		}
		int len = str.length();
		
		int beginIndex = -1;
		int endIndex = 0;
		
		int curBytes = 0;
		String ch = null;
		for (int i = 0; i < len; i++) {
			ch = str.substring(i, i + 1);
			curBytes += ch.getBytes().length;
			if (beginIndex == -1 && curBytes >= beginBytes) {
				beginIndex = i;
			}
			if (curBytes > endBytes) {
				break;
			} else {
				endIndex = i + i;
			}
		}
		return str.substring(beginIndex, endIndex);
				
	}
	
}
