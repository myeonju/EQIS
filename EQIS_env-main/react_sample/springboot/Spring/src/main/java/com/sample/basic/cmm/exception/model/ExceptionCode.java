package com.sample.basic.cmm.exception.model;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * <pre>
 * Custom Exception 처리 시 처리 가능한 코드 목록
 * </pre>
 * 
 * @author user
 * @since 2023.01.01
 * @see
 */

@Getter
@AllArgsConstructor
public enum ExceptionCode {

	// 400 BAD_REQUEST : 잘못된 요청
	BAD_PROCESS(HttpStatus.BAD_REQUEST, "EXCEPTION_BAD_PROCESS"), 	// 처리중 문제가 발생했습니다.
	
	// 401 UNAUTHORIZED : 인증되지 않은 사용자
	INVALID_AUTH_TOKEN(HttpStatus.UNAUTHORIZED, "EXCEPTION_INVALID_AUTH_TOKEN"), 	// 권한 토큰이 만료되었습니다.
	INVALID_TIME(HttpStatus.UNAUTHORIZED, "EXCEPTION_INVALID_TIME"), 		// 유효시간이 만료되었습니다.
	INVALID_ACCESS_AUTH(HttpStatus.UNAUTHORIZED, "EXCEPTION_INVALID_ACCESS_AUTH"), 	// 접근 권한이 없습니다.
	INVALID_ACCESS_PAGE(HttpStatus.UNAUTHORIZED, "EXCEPTION_INVALID_ACCESS_PAGE"), 	// 페이지에 접근할 수 없습니다.
	
	// 409 CONFLICT : Resource으 현재 상태와 충돌 (중복 데이터)
	DUPLICATE_RESOURCE(HttpStatus.CONFLICT, "EXCEPTION_DUPLICATE_RESOURCE"), 	// 중복된 데이터입니다.
	INVALID_RESOURCE(HttpStatus.CONFLICT, "EXCEPTION_INVALID_RESOURCE"), 	// 유효하지 않은 데이터입니다.
	INVALID_FILE_EXTENSION(HttpStatus.CONFLICT, "EXCEPTION_INVALID_FILE_EXTENSION"), 	// 유효하지 않은 파일 확장자입니다.
	NONE_RESOURCE(HttpStatus.CONFLICT, "EXCEPTION_NONE_RESOURCE"), 	// 데이터가 존재하지 않습니다.
	ALREADY_ISSUED_NO(HttpStatus.CONFLICT, "EXCEPTION_ALREADY_ISSUED_NO"), // 이미 제기된 번호입니다.
	;

	private final HttpStatus httpStatus;
	private final String mlgCd;
	
}
