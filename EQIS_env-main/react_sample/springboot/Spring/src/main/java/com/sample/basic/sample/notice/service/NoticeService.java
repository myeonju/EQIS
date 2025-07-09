package com.sample.basic.sample.notice.service;

import java.util.List;

import com.sample.basic.cmm.model.Page;
import com.sample.basic.sample.notice.model.NoticeHome;
import com.sample.basic.sample.notice.model.NoticeListGrid;
import com.sample.basic.sample.notice.model.NoticeListSearch;
import com.sample.basic.sample.notice.model.NoticeModal;
import com.sample.basic.sample.notice.model.NoticeModalSearch;
import com.sample.basic.sample.notice.model.PwiImtrB;

/**
 * <pre>
 * Lang Service interface
 * </pre>
 * 
 * @author hansik
 *
 */

public interface NoticeService {

	// grid 목록 조회
	public Page<NoticeListGrid> listGridSearch(NoticeListSearch noticeListSearch);
	
	// home 목록 조회
	public List<NoticeHome> homeListSearch(int limit);
	
	// modal 목록 조회
	public Page<NoticeModal> modalListSearch(NoticeModalSearch noticeModalSearch);
	
	// 상세 조회
	public PwiImtrB detailSearch(int pwiImtrNo);
	
	// 로그인 상세 조회
	public PwiImtrB loginDetailSearch();
	
	// 등록
	public void register(PwiImtrB pwiImtrB) throws Exception;
	
	// 수정
	public void update(PwiImtrB pwiImtrB) throws Exception;
	
	// 삭제
	public void delete(PwiImtrB pwiImtrB) throws Exception;
}
