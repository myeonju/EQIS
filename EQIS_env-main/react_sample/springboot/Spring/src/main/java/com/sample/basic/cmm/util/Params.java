package com.sample.basic.cmm.util;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Component;

@Component
public class Params {

	/*
	 * 파라미터 분리시키기 (id=gwe&pw=zwc&age=20 -> {id: qwe, pw: zwc, age: 20})
	 */
	public Map<String, String> split(String params, String operator) {
		Map<String, String> map = new HashMap<>();
		
		String operatorSplitStrings[] = params.split(operator);
		for(String operatorSplitString : operatorSplitStrings) {
			String equalSplitString[] = operatorSplitString.split("=");
			map.put(equalSplitString[0], operatorSplitStrings[1]);
		}
		
		return map;
	}
	
	public Map<String, String> split(String params) {
		return split(params, "&");
	}
	
}
