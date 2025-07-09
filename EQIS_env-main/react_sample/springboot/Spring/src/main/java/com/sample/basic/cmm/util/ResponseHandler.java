package com.sample.basic.cmm.util;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.sample.basic.cmm.model.Response;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class ResponseHandler {

	@Autowired Lang lang;
	// [Temp comment]
//	@Autowired LangService langService;
//	@Autowired LogService logService;
	public ResponseEntity<Response> response(Object data, String mlgCd, HttpStatus httpStatus) {
		HttpServletRequest request = Function.getRequest();

		String message = null;
		// 메시지 조회 로직이 주석 처리되어 있어 message는 null로 설정됨

		// Response 객체 생성
		Response response = Response.builder()
				.data(data)
				.message(message)
				.build();

		// 로그 저장 등 필요 시 여기에 작성

		return new ResponseEntity<>(response, httpStatus);
	}
}
