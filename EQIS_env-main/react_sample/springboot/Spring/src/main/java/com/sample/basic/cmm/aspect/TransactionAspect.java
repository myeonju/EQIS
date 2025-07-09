package com.sample.basic.cmm.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import com.sample.basic.cmm.exception.CustomException;
import com.sample.basic.cmm.exception.model.ExceptionCode;

import lombok.extern.slf4j.Slf4j;

/**
 * <pre>
 * Exception 발생 시 AOP를 이용하여 Transaction 처리
 * </pre>
 * @author user
 * @since 2023.01.01
 * @see
 *
 */
@Aspect
@Component
@Order(1)
public class TransactionAspect {
	
	@Autowired
	PlatformTransactionManager transactionManager;
	
	@Around("execution(* *..service.*.*(..))")
	public Object ServiceTransaction(ProceedingJoinPoint joinPoint) throws Throwable {
		TransactionStatus transaction = transactionManager.getTransaction(new DefaultTransactionDefinition());
		
		try {
			Object object = joinPoint.proceed();
			transactionManager.commit(transaction);
			
			return object;
		} catch (RuntimeException e) {
			transactionManager.rollback(transaction);
			
			if(e.getClass().equals(CustomException.class)) {
				throw e;
			} else {
				throw new CustomException();
			}
		}
	}
	

}
