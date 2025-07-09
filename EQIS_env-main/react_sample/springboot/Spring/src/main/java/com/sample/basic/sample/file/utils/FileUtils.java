package com.sample.basic.sample.file.utils;

import java.util.HashMap;
import java.util.Map;

import org.springframework.util.StringUtils;



public class FileUtils {

	public static Map<String, String> getQueryMap(String query) {
		if(!StringUtils.hasText(query)) return null;
		
		Map<String, String> map = new HashMap<>();
		
		String[] pairs = query.split(",");
		for (String pair : pairs) {
			int idx = pair.indexOf("=");
			map.put(pair.substring(0, idx), pair.substring(idx+1));
		}
		
		return map;
	}
}
