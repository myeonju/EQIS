package com.sample.basic.cmm.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.sample.basic.cmm.interceptor.AuthInterceptor;
import com.sample.basic.cmm.interceptor.CsrfInterceptor;
import com.sample.basic.cmm.interceptor.JwtInterceptor;
import com.sample.basic.cmm.util.Path;

/**
 * <pre>
 * Interceptor를 등록하는 설정 파일
 * </pre>
 * 
 * @author user
 * @since 2023.01.01
 * @see
 *
 */

@Configuration
@EnableWebMvc
public class InterceptorConfig implements WebMvcConfigurer {
	
	@Autowired
	CsrfInterceptor csrfInterceptor;
	
	@Autowired
	JwtInterceptor jwtInterceptor;
	
	@Autowired
	AuthInterceptor authInterceptor;
	
	/**
	 * Interceptor들을 등록하는 곳
	 */
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		// csrf
		registry.addInterceptor(csrfInterceptor)
				.addPathPatterns("/**")
				.excludePathPatterns(
					// favicon
					"/favicon.ico",
						
					// swagger
					"/v2/api-docs",
					"/swagger-resources/**",
					"/swagger-ui/**",
					"/webjars/**",
					
					// error
					"/**/error",
					
					// file
					Path.FILE + Path.DOWNLOAD,
					Path.FILE + Path.PATH_DOWNLOAD
				);
		
		// jwt
		registry.addInterceptor(jwtInterceptor)
				.addPathPatterns("/**")
				.excludePathPatterns(
					// error
					"/**/error",
					
					// login
					Path.LOGIN + Path.SSO_LOGIN,
					Path.LOGIN + Path.MOBILE_LOGIN,
					
					// commonCode
					Path.COMMON_CODE + "/**",
					
					// lang
					Path.LANG + "/**",
					
					// file
					Path.FILE + Path.DOWNLOAD,
					Path.FILE + Path.PATH_DOWNLOAD
				);
		
		// auth
		registry.addInterceptor(authInterceptor)
				.addPathPatterns("/**")
				.excludePathPatterns(
					// error
					"/**/error",
					
					// login
					Path.LOGIN + "/**",
					
					// commonCode
					Path.COMMON_CODE + "/**",
					
					// lang
					Path.LANG + "/**",
					
					// menu
					Path.MENU + "/**",
					
					// file
					Path.FILE + Path.DOWNLOAD,
					Path.FILE + Path.PATH_DOWNLOAD
				);
	}

}
