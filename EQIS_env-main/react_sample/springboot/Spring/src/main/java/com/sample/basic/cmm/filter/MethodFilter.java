package com.sample.basic.cmm.filter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

/**
 * <pre>
 * 
 * </pre>
 * 
 * @author user
 * @since 2023.01.01
 * @see
 *
 */
public class MethodFilter implements Filter {
	
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		List<String> methodList = Arrays.asList(new String[] {
				"OPTIONS",
				"GET",
				"POST"
		});
		HttpServletRequest req = (HttpServletRequest) request;
		
		String method = req.getMethod();
		if (methodList.contains(method)) {
			chain.doFilter(request, response);
		} else {
			throw new ServletException("Method Not Allowed");
		}
	}

}
