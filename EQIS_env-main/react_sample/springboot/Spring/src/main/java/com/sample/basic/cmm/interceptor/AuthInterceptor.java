package com.sample.basic.cmm.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.sample.basic.cmm.exception.CustomException;
import com.sample.basic.cmm.exception.model.ExceptionCode;
import com.sample.basic.cmm.provider.JwtProvider;

@Component
public class AuthInterceptor implements HandlerInterceptor {
	
	@Autowired
	private JwtProvider jwtProvider;
	
	// [Temp comment]
//	@Autowired
//	private LogService logService;

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object object) throws Exception {
		
		// 요청보낸 화면 정보 확인
		String referer = request.getHeader("Referer");		// ex) https://test.com/asd/123 
		referer = referer.split("//")[1];					// ex) test.com/asd/123 
		referer = referer.substring(referer.indexOf("/"));	// ex) /asd/123 
		
		// 처리하고자 하는 API 권한 확인
		String servletPath = request.getServletPath();		// code/detail_search.do
		String endpointPath = servletPath.substring(servletPath.lastIndexOf("/") + 1);	// ex) detail_search.do 
		String splitEndpointPath[] = endpointPath.split("_");	// ex) [detail, search.do] 
		String apiClotFcltUrlNm = splitEndpointPath[splitEndpointPath.length - 1];	// search.do
		
		// [Temp comment]
		// 처리할 수 있는 권한인지 확인
//		List<AuthInfo> authInfoList = jwtProvider.getAuthInfoList();
//		for(AuthInfo authInfo : authInfoList) {
//			if(referer.contains(authInfo.getPathId()) && apiClotFcltUrlNm.equals(authInfo.getApiClotFcltUrlNm())) {
//				logService.processLogSave(authInfo.getFcltCd(), "Y", null);
//				return true;
//			}
//		}
		return true;
		
		// [Temp comment]
//		throw new CustomException(ExceptionCode.INVALID_ACCESS_AUTH);

	}
	
}
