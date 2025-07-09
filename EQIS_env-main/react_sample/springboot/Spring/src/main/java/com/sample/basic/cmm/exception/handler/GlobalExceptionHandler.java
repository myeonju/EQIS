package com.sample.basic.cmm.exception.handler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.sample.basic.cmm.exception.CustomException;
import com.sample.basic.cmm.model.Response;
import com.sample.basic.cmm.util.ResponseHandler;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@Autowired
	ResponseHandler responseHandler;
	
	/**
	 * 개발자가 강제로 발생시키는 CustomException
	 */
	@ExceptionHandler(CustomException.class)
	protected ResponseEntity<Response> customException(CustomException e) {
	    HttpStatus httpStatus = e.getExceptionCode().getHttpStatus();
	    String mlgCd = "DEFAULT";

	    return responseHandler.response(null, mlgCd, httpStatus);
	}
	
}
