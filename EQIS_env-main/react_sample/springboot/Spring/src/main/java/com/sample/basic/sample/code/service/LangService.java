package com.sample.basic.sample.code.service;

import java.util.List;

import com.sample.basic.cmm.model.Page;
import com.sample.basic.sample.code.model.LangListGrid;
import com.sample.basic.sample.code.model.LangListSearch;
import com.sample.basic.sample.code.model.MlgMsgB;

/**
 * <pre>
 * Lang Service interface
 * </pre>
 * 
 * @author hansik
 *
 */

public interface LangService {

	// 다국어 코드를 배열로 조회
	public List<MlgMsgB> mappingCodeListSearch(List<String> mlgCdList);
	
	// grid 목록 조회
	public Page<LangListGrid> listGridSearch(LangListSearch langListSearch);
	
	// 상세 조회
	public MlgMsgB detailSearch(MlgMsgB mlgMsgB);
	
	// 등록
	public void register(MlgMsgB mlgMsgB) throws Exception;
	
	// 수정
	public void update(MlgMsgB mlgMsgB) throws Exception;
	
	// 삭제
	public void delete(MlgMsgB mlgMsgB) throws Exception;
}
