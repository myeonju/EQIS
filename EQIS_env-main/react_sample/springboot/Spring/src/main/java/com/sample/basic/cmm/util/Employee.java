package com.sample.basic.cmm.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.sample.basic.cmm.provider.JwtProvider;

@Component
public class Employee {

	private String baseEmail = "@gmail.com";
	
	@Autowired
	private JwtProvider jwtProvider;
	
	public String getEmail() throws Exception {
		return "test" + baseEmail;
		// [Temp comment]
//		return jwtProvider.getEeB().getItgEeno() + baseEmail;
	}
	
	public String getEmail(String itgEeno) {
		return itgEeno + baseEmail;
	}
}
