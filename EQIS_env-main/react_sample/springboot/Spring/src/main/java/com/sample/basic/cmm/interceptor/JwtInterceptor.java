package com.sample.basic.cmm.interceptor;

import java.text.SimpleDateFormat;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.sample.basic.cmm.exception.CustomException;
import com.sample.basic.cmm.exception.model.ExceptionCode;
import com.sample.basic.cmm.provider.JwtProvider;

/**
 * <pre>
 * JwtInterceptor
 * </pre>
 * 
 * @author user
 * @since 2023.01.01
 * @see
 *
 */

@Component
public class JwtInterceptor implements HandlerInterceptor {

	@Autowired
	private JwtProvider jwtProvider;
	
	// [Temp comment]
//	@Autowired
//	EePsnInfoBJpaRepository eePsnInfoBJpaRepository;
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object object) throws Exception {
		if ("OPTIONS".equals(request.getMethod())) {
			return true;
		} else {
			// [Temp comment]
//			EeB eeB = jwtProvider.getEeB();
//			
//			EePsnInfoBEntity resEePsnInfoBEntity = eePsnInfoBJpaRepository.findById(eeB.getItgEeno()).orElse(null);
//			
//			if(resEePsnInfoBEntity == null) {
//				throw new CustomException(ExceptionCode.INVALID_RESOURCE);
//			}
//			
//			String tokenDatetime = jwtProvider.getDatetime();
//			String dbDatetime = new SimpleDateFormat("yyyyMMddHHmmss").format(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(resEePsnInfoBEntity.getCnncTokenPblcDtm()));
//			
//			// 발행 시간이 같지 않을 경우 새로운 접속이 이루어진것이기 때문에 연결 끊기
//			if(!tokenDatetime.equals(dbDatetime)) {
//				throw new CustomeException(ExceptionCode.INVALID_AUTH_TOKEN);
//			}
			
			return true;
		}
	}
	
}
