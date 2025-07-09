package com.sample.basic.cmm.model;

import com.sample.basic.cmm.util.Dateformat;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Builder
@Getter
@ToString
//@ApiModel(value = "Response 객체", description = "Client에 Response할 데이터를 담는다.")		// swagger 사용시		// [Temp comment]
public class Response {
	
	// [Temp comment]
//	@ApiModelProperty(value = "Client에 전달할 데이터")	// swagger 사용시
	private final Object data;
	
	// [Temp comment]
//	@ApiModelProperty(value = "Client에 전달할 메시지")	// swagger 사용시
	private final String message;
	
	// [Temp comment]
//	@ApiModelProperty(value = "응답시간")	// swagger 사용시
	private final String time = Dateformat.toyyyyMMddHHmmss();
	
}
