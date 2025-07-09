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
import com.sample.basic.sample.code.model.LangListGrid;
import com.sample.basic.sample.code.model.LangListSearch;
import com.sample.basic.sample.code.model.MlgMsgB;
import com.sample.basic.sample.code.service.CommonCodeService;
import com.sample.basic.sample.code.service.LangService;

/**
 * <pre>
 * 언어공통코드 상세
 * </pre>
 * 
 * @author user
 *
 */

@RestController
@RequestMapping(Path.LANG)
public class LangController {

	@Autowired
	private LangService langService;
	
	@Autowired
	private ResponseHandler responseHandler;
	
	@PostMapping(Path.MAPPING_CODE_LIST_SEARCH)
	public ResponseEntity<Response> mappongCodeListSearch(@RequestBody List<String> mlgCdList) {
		// 데이터 조회
		List<MlgMsgB> resMlgcList = langService.mappingCodeListSearch(mlgCdList);
		
		// 결과 반환
		return responseHandler.response(resMlgcList,  null, HttpStatus.OK);
	}
	
	@GetMapping(Path.LIST_GRID_SEARCH)
	public ResponseEntity<Response> listGridSearch(LangListSearch langListSearch) {
		// 데이터 조회
		Page<LangListGrid> resLangListGridPage = langService.listGridSearch(langListSearch);
		
		// 결과 반환
		return responseHandler.response(resLangListGridPage, Constant.RESPONSE_SEARCH, HttpStatus.OK);
	}
	
	@GetMapping(Path.DETAIL_SEARCH)
	public ResponseEntity<Response> detailSearch(MlgMsgB mlgMsgB) {
		// 데이터 조회
		MlgMsgB resMlgMsgB = langService.detailSearch(mlgMsgB);
		
		// 결과 반환
		return responseHandler.response(resMlgMsgB, null, HttpStatus.OK);
	}
	
	@PostMapping(Path.REGISTER)
	public ResponseEntity<Response> register(@RequestBody MlgMsgB mlgMsgB) throws Exception {
		// 등록
		langService.register(mlgMsgB);
		
		// 결과 반환
		return responseHandler.response(null, Constant.RESPONSE_REGISTER, HttpStatus.OK);
	}
	
	@PostMapping(Path.UPDATE)
	public ResponseEntity<Response> update(@RequestBody MlgMsgB mlgMsgB) throws Exception {
		// 수정
		langService.update(mlgMsgB);
		
		// 결과 반환
		return responseHandler.response(null, Constant.RESPONSE_REGISTER, HttpStatus.OK);
	}
	
	@PostMapping(Path.DELETE)
	public ResponseEntity<Response> delete(@RequestBody MlgMsgB mlgMsgB) throws Exception {
		// 삭제
		langService.delete(mlgMsgB);
		
		// 결과 반환
		return responseHandler.response(null, Constant.RESPONSE_REGISTER, HttpStatus.OK);
	}
	
}
