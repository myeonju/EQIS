package com.sample.basic.sample.code.service;

import java.util.List;

import com.sample.basic.cmm.model.Page;
import com.sample.basic.sample.code.model.CommonCodeDetailSearch;
import com.sample.basic.sample.code.model.CommonCodeListGrid;
import com.sample.basic.sample.code.model.CommonCodeListSearch;
import com.sample.basic.sample.code.model.LangComCdP;

public interface CommonCodeService {

	// 매핑공통코드 조회
	public List<LangComCdP> mappingCodeListSearch(List<String> comCdGrpCdList);
	
	// Grid 목록 조회
	public Page<CommonCodeListGrid> listGridSearch(CommonCodeListSearch commonCodeListSearch);
	
	// 상세 조회
	public LangComCdP detailSearch(CommonCodeDetailSearch commonCodeDetailSearch);
	
	// 코드 이름 조회
	public String codeNameSearch(String grpCd, String comCd, String langCd);
	
	// 등록
	public void register(LangComCdP langComCdP) throws Exception;
	
	// 수정
	public void update(LangComCdP langComCdP) throws Exception;
	
	// 삭제 
	public void delete(LangComCdP langComCdP) throws Exception;
	
}
