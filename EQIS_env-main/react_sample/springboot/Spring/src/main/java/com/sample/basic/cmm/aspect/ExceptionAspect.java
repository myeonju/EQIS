package com.sample.basic.cmm.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import com.sample.basic.cmm.exception.CustomException;
import com.sample.basic.cmm.util.Constant;
import com.sample.basic.cmm.util.ResponseHandler;

import lombok.extern.slf4j.Slf4j;

/**
 * <pre>
 * Exception 발생 시 AOP 를 이용해 발생 구간을 확인
 * </pre>
 * 
 * @author user
 * @since 2023.01.01
 * @see
 *
 */

@Aspect
@Component
@Slf4j
@Order(2)
public class ExceptionAspect {
	
	@Autowired
	ResponseHandler responseHandler;
	
	@Around("execution(* *..controller.*.*(..))")
	public Object ControllerException(ProceedingJoinPoint joinPoint) throws Throwable {
		try {
			return joinPoint.proceed();
		} catch(Throwable e) {
			String className = joinPoint.getTarget().getClass().getName();
			String methodName = joinPoint.getSignature().getName();
			
			if (e.getMessage() != null) {
			}
			if (e.getCause() != null) {
			}
			
			if(e.getClass().equals(CustomException.class)) {	// CustomException 일 경우 제외
				throw e;
			} else {	// 그 외
				return responseHandler.response(null, Constant.EXCEPTION_BAD_PROCESS, HttpStatus.CONFLICT);
			}
		}
	}
	
	@Around("execution(* *..service.*.*(..))")
	public Object ServiceException(ProceedingJoinPoint joinPoint) throws Throwable {
		try {
			return joinPoint.proceed();
		} catch(Throwable e) {
			String className = joinPoint.getTarget().getClass().getName();
			String methodName = joinPoint.getSignature().getName();
			
			if (e.getMessage() != null) {
			}
			if (e.getCause() != null) {
			}
			
			throw e;
		}
	}
	
	@Around("execution(* *..repository.*.*(..))")
	public Object RepositoryException(ProceedingJoinPoint joinPoint) throws Throwable {
		try {
			return joinPoint.proceed();
		} catch(Throwable e) {
			String className = joinPoint.getTarget().getClass().getName();
			String methodName = joinPoint.getSignature().getName();
			if (e.getMessage() != null) {
			}
			if (e.getCause() != null) {
			}
			
			throw e;
		}
	}
	
}
