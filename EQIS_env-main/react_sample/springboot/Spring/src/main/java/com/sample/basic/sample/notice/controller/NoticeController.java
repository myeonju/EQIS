package com.sample.basic.sample.notice.controller;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
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
import com.sample.basic.cmm.util.Path;
import com.sample.basic.cmm.util.ResponseHandler;
import com.sample.basic.sample.notice.model.NoticeHome;
import com.sample.basic.sample.notice.model.NoticeListGrid;
import com.sample.basic.sample.notice.model.NoticeListSearch;
import com.sample.basic.sample.notice.model.NoticeModal;
import com.sample.basic.sample.notice.model.NoticeModalSearch;
import com.sample.basic.sample.notice.model.PwiImtrB;
import com.sample.basic.sample.notice.service.NoticeService;

/**
 * <pre>
 * 언어공통코드 상세
 * </pre>
 * 
 * @author user
 *
 */

@RestController
@RequestMapping(Path.NOTICE)
public class NoticeController {

	@Autowired
	private ResponseHandler responseHandler;
	
	@Autowired
	private NoticeService noticeService;

	@GetMapping(Path.LIST_GRID_SEARCH)
	public ResponseEntity<Response> listGridSearch(NoticeListSearch noticeListSearch) {
		System.out.println("@@데이터 조회: " + noticeListSearch);
		// 데이터 조회
		Page<NoticeListGrid> resNoticeListGridPage = noticeService.listGridSearch(noticeListSearch);
		
		
		// 결과 반환
		return responseHandler.response(resNoticeListGridPage, Constant.RESPONSE_SEARCH, HttpStatus.OK);
	}
	
	@GetMapping(Path.HOME_LIST_SEARCH)
	public ResponseEntity<Response> homeListSearch(int limit) {
		// 데이터 조회
		List<NoticeHome> resNoticeHomeList = noticeService.homeListSearch(limit);
		
		// 결과 반환
		return responseHandler.response(resNoticeHomeList, null, HttpStatus.OK);
	}
	
	@GetMapping(Path.MODAL_LIST_SEARCH)
	public ResponseEntity<Response> modalListSearch(NoticeModalSearch noticeModalSearch) {
		
		// 데이터 조회
		Page<NoticeModal> resNoticeModalPage = noticeService.modalListSearch(noticeModalSearch);
		
		// 결과 반환
		return responseHandler.response(resNoticeModalPage, null, HttpStatus.OK);
	}
	
	@GetMapping(Path.DETAIL_SEARCH)
	public ResponseEntity<Response> detailSearch(int pwiImtrNo) {
		// 데이터 조회
		PwiImtrB resPwiImtrB = noticeService.detailSearch(pwiImtrNo);
		
		// 결과 반환
		return responseHandler.response(resPwiImtrB, null, HttpStatus.OK);
	}
	
	@GetMapping(Path.LOGIN_DETAIL_SEARCH)
	public ResponseEntity<Response> loginDetailSearch() {
		// 데이터 조회
		PwiImtrB resPwiImtrB = noticeService.loginDetailSearch();
		
		// 결과 반환
		return responseHandler.response(noticeService, null, HttpStatus.OK);
	}
	
	@PostMapping(Path.REGISTER)
	public ResponseEntity<Response> register(@RequestBody PwiImtrB pwiImtrB) throws Exception {
		// 등록
		
		System.out.println("@@등록");
		noticeService.register(pwiImtrB);
		
		// 결과 반환
		return responseHandler.response(null, Constant.RESPONSE_REGISTER, HttpStatus.OK);
	}
	
	@PostMapping(Path.UPDATE)
	public ResponseEntity<Response> update(@RequestBody PwiImtrB pwiImtrB) throws Exception {
		// 수정
		noticeService.update(pwiImtrB);
		
		// 결과 반환
		return responseHandler.response(null, Constant.RESPONSE_REGISTER, HttpStatus.OK);
	}
	
	@PostMapping(Path.DELETE)
	public ResponseEntity<Response> delete(@RequestBody PwiImtrB pwiImtrB) throws Exception {
		// 삭제
		noticeService.delete(pwiImtrB);
		
		// 결과 반환
		return responseHandler.response(null, Constant.RESPONSE_REGISTER, HttpStatus.OK);
	}
	
	@PostMapping(Path.DOWNLOAD_EXCEL)
	public void downloadExcel(NoticeListSearch noticeListSearch, HttpServletResponse response) {
		System.out.println("@@데이터 조회: " + noticeListSearch);
		// 데이터 조회
		noticeService.excelListSearch(noticeListSearch, response);
	}
	
}
