package com.sample.basic.cmm.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
public class Lang {

	@Value("${lang.codeName}")
	private String langCodeName;
	
	public String getLangCd() {
		String langCd = Function.getRequest().getHeader(langCodeName);
		if(!StringUtils.hasText(langCd)) {
			langCd = Constant.LANG_KO;
			System.out.println("langCd: " + langCd);
		}
		return langCd;
	}
}
