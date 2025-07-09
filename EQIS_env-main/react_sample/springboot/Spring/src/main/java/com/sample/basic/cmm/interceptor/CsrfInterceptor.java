package com.sample.basic.cmm.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.sample.basic.cmm.exception.CustomException;
import com.sample.basic.cmm.exception.model.ExceptionCode;

/**
 * <pre>
 * Csrf 방지하는 Interceptor
 * </pre>
 * 
 * @author user
 * @since 2023.01.01
 * @see
 *
 */

@Component
public class CsrfInterceptor implements HandlerInterceptor {
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		return true;
		
//		String referer = request.getHeader("Referer");		// ex) http://test.com/asd/123
//		
//		if(referer == null) {			
//			throw new CustomException(ExceptionCode.BAD_PROCESS);
//		}
//		
//		referer = referer.split("//")[1].split("/")[0];		// ex) test.com
//		
//		// 오토패스 확인
//		String autopassRefers[] = referer.split(":");
//		
//		// 그외
//		if((referer != null && referer.equals(request.getServerName())) || 
//			(autopassRefers.length > 1 && "7443".equals(autopassRefers[1]))) {
//			return true;
//		} else {
//			throw new CustomException(ExceptionCode.BAD_PROCESS);
//		}
	}

}
