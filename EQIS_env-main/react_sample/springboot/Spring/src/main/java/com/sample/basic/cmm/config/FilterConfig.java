package com.sample.basic.cmm.config;

import java.util.Arrays;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.HiddenHttpMethodFilter;

import com.sample.basic.cmm.filter.HTMLTagFilter;
import com.sample.basic.cmm.filter.MethodFilter;


/**
 * <pre>
 * &#64;Configuration을 설정한 클래스에 FilterRegistrationBean을 설정하는 함수를 생성한다.
 * 적용할 url(setUrlPatterns)과 예외처리할 url(addInitParameter)을 설정한다.
 * </pre>
 * 
 * @author user
 * @since 2023.01.01
 * @see
 *
 */
@Configuration
public class FilterConfig {

	/**
	 * hidden http method 를 가능하게 한다.
	 * 
	 * @return 
	 */
	@Bean
	public FilterRegistrationBean<HiddenHttpMethodFilter> hiddenHttpMethodFilter() {
		FilterRegistrationBean<HiddenHttpMethodFilter> filterRegBean = new FilterRegistrationBean<>(new HiddenHttpMethodFilter());
		filterRegBean.setUrlPatterns(Arrays.asList("/*"));
		return filterRegBean;
	}
	
	/**
	 * 허용 가능한 method 만 접근가능하게 한다.
	 * 
	 * @return
	 */
	@Bean
	public FilterRegistrationBean<MethodFilter> methodFilter() {
		FilterRegistrationBean<MethodFilter> filterRegBean = new FilterRegistrationBean<>(new MethodFilter());
		filterRegBean.setUrlPatterns(Arrays.asList("/*"));
		return filterRegBean;
	}
	
	/**
	 * html tag filter (표준 취약점 제거 필터)를 추가한다.
	 * 
	 * @return
	 */
	@Bean
	public FilterRegistrationBean<HTMLTagFilter> htmlTagFilter() {
		FilterRegistrationBean<HTMLTagFilter> filterRegBean = new FilterRegistrationBean<>(new HTMLTagFilter());
		filterRegBean.setUrlPatterns(Arrays.asList("*.do"));
		return filterRegBean;
	}
	
}
