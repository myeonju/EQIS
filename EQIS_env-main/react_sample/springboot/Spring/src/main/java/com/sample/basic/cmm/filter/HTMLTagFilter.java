package com.sample.basic.cmm.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;

/**
 * <pre>
 * 전자정부에서 제공해주는 HTMLTagFilter, XSS 방지를 위해서 사용된다.
 * </pre>
 * 
 * @author user
 * @since 2023.01.01
 * @see
 *
 */

public class HTMLTagFilter implements Filter {
	
	@Override
	public void init(FilterConfig config) throws ServletException { }
	
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		chain.doFilter(new HTMLTagFilterRequestWrapper((HttpServletRequest) request), response);
	}
	
	private static class HTMLTagFilterRequestWrapper extends HttpServletRequestWrapper {
		
		public HTMLTagFilterRequestWrapper(HttpServletRequest request) {
			super(request);
		}
		
		public String[] getParameterValues(String parameter) {
			
			String[] values = super.getParameterValues(parameter);
			
			if (values == null) {
				return null;
			}
			
			for (int i = 0; i < values.length; i++) {
				if (values[i] != null) {
					StringBuffer strBuff = new StringBuffer();
					for (int j = 0; j < values[i].length(); j++) {
						char c = values[i].charAt(j);
						switch (c) {
							case '<':
								strBuff.append("&lt;");
								break;
							case '>':
								strBuff.append("&gt;");
								break;
//							case '&':
//								strBuff.append("&amp");
//								break;
//							case '"':
//								strBuff.append("&quot;");
//								break;
//							case '\'':
//								strBuff.append("&apos;");
//								break;
							default:
								strBuff.append(c);
								break;
						}
					}
					values[i] = strBuff.toString();
				} else {
					values[i] = null;
				}
			}
			
			return values;
		}
		
		public String getParameter(String parameter) {
			String value = super.getParameter(parameter);
			
			if (value == null) {
				return null;
			}
			
			StringBuffer strBuff = new StringBuffer();
			
			for (int i = 0; i < value.length(); i++) {
				char c = value.charAt(i);
				switch (c) {
					case '<':
						strBuff.append("&lt");
						break;
					case '>':
						strBuff.append("&gt;");
						break;
//					case '&':
//						strBuff.append("&amp");
//						break;
//					case '"':
//						strBuff.append("&quot;");
//						break;
//					case '\'':
//						strBuff.append("&apos;");
//						break;
					default:
						strBuff.append(c);
						break;
				}
			}
			
			value = strBuff.toString();
			
			return value;
		}
	}

}
