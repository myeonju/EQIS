package com.sample.basic.cmm.exception;

import com.sample.basic.cmm.exception.model.ExceptionCode;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * <pre>
 * ExceptionCode 값을 이용한 CustomException 정의
 * </pre>
 * 
 * @author user
 * @since 2023.01.01
 * @see
 *
 */

@Getter
@AllArgsConstructor
public class CustomException extends RuntimeException {
	
//	public CustomException(ExceptionCode duplicateResource) {
//		// TODO Auto-generated constructor stub
//	}

	public CustomException(ExceptionCode duplicateResource) {
		// TODO Auto-generated constructor stub
	}

	private static final long serialVersionUID = 1L;
	
	private final ExceptionCode exceptionCode = null;

}