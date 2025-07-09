package com.sample.basic.sample.code.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Description;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sample.basic.cmm.model.Page;
import com.sample.basic.cmm.model.Response;
import com.sample.basic.cmm.util.Constant;
import com.sample.basic.cmm.util.Function;
import com.sample.basic.cmm.util.Path;
import com.sample.basic.cmm.util.ResponseHandler;
import com.sample.basic.sample.code.model.CommonCodeDetailSearch;
import com.sample.basic.sample.code.model.CommonCodeListGrid;
import com.sample.basic.sample.code.model.CommonCodeListSearch;
import com.sample.basic.sample.code.model.LangComCdP;
import com.sample.basic.sample.code.service.CommonCodeService;

/**
 * <pre>
 * 언어공통코드 상세
 * </pre>
 * 
 * @author user
 *
 */

@RestController
@RequestMapping(Path.COMMON_CODE)
public class CommonCodeController {

	@Autowired
	private CommonCodeService commonCodeService;
	
	@Autowired
	private ResponseHandler responseHandler;
	
	@Description("ip조회 (추후 삭제")
	@GetMapping("/ip_search.do")
	public ResponseEntity<Response> getIp(HttpServletRequest req) throws Exception {
		String ip = Function.getClientIp();
		
		return responseHandler.response(ip, null, HttpStatus.OK);
	}
	
	@PostMapping(Path.MAPPING_CODE_LIST_SEARCH)
	public ResponseEntity<Response> mappongCodeListSearch(@RequestBody List<String> comCdGrpCdList) {
		// 데이터 조회
		List<LangComCdP> resLangComCdPList = commonCodeService.mappingCodeListSearch(comCdGrpCdList);
		
		// 결과 반환
		return responseHandler.response(resLangComCdPList,  null, HttpStatus.OK);
	}
	
	@GetMapping(Path.LIST_GRID_SEARCH)
	public ResponseEntity<Response> listGridSearch(CommonCodeListSearch commonCodeListSearch) {
		// 데이터 조회
		Page<CommonCodeListGrid> resCommonCodeListGridPage = commonCodeService.listGridSearch(commonCodeListSearch);
		
		// 결과 반환
		return responseHandler.response(resCommonCodeListGridPage, Constant.RESPONSE_SEARCH, HttpStatus.OK);
	}
	
	@GetMapping(Path.DETAIL_SEARCH)
	public ResponseEntity<Response> detailSearch(CommonCodeDetailSearch commonCodeDetailSearch) {
		// 데이터 조회
		LangComCdP resLangComCdP = commonCodeService.detailSearch(commonCodeDetailSearch);
		
		// 결과 반환
		return responseHandler.response(resLangComCdP, null, HttpStatus.OK);
	}
	
	@PostMapping(Path.REGISTER)
	public ResponseEntity<Response> register(@RequestBody LangComCdP langComCdP) throws Exception {
		
		System.out.println("@@register");
		// 등록
		commonCodeService.register(langComCdP);
		
		// 결과 반환
		return responseHandler.response(null, Constant.RESPONSE_REGISTER, HttpStatus.OK);
	}
	
	@PostMapping(Path.UPDATE)
	public ResponseEntity<Response> update(@RequestBody LangComCdP langComCdP) throws Exception {
		// 수정
		commonCodeService.update(langComCdP);
		
		// 결과 반환
		return responseHandler.response(null, Constant.RESPONSE_REGISTER, HttpStatus.OK);
	}
	
	@PostMapping(Path.DELETE)
	public ResponseEntity<Response> delete(@RequestBody LangComCdP langComCdP) throws Exception {
		// 삭제
		commonCodeService.delete(langComCdP);
		
		// 결과 반환
		return responseHandler.response(null, Constant.RESPONSE_REGISTER, HttpStatus.OK);
	}
	
}
