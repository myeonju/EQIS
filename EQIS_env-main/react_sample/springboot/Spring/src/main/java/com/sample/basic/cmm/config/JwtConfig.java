package com.sample.basic.cmm.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * <pre>
 * Statements
 * </pre>
 * 
 * @author user
 * @sinnce 2023.01.01
 * @see
 *
 */
@Configuration
public class JwtConfig implements WebMvcConfigurer {
	
	@Value("${jwt.tokenName")
	private String jwtTokenName;
	
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		// jwtTokenName header 추출 활성화
		registry.addMapping("/**")
				.allowedOrigins(new String[] {
						// 로컬
						"http://localhost",
						// 개발
						"https://dev.sample.co.kr",				
						// 운영
						"https://prd.sample.co.kr"
				})
				.allowedMethods(new String[] {
						"OPTIONS",
						"GET",
						"POST"
				})
				.allowedHeaders("*")
				.exposedHeaders(jwtTokenName);
	}
}
