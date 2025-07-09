package com.sample.basic.sample.code.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sample.basic.cmm.exception.CustomException;
import com.sample.basic.cmm.exception.model.ExceptionCode;
import com.sample.basic.cmm.model.Page;
import com.sample.basic.cmm.provider.JwtProvider;
import com.sample.basic.sample.code.entity.LangComCdPEntity;
import com.sample.basic.sample.code.mapper.LangComCdPMapper;
import com.sample.basic.sample.code.model.CommonCodeDetailSearch;
import com.sample.basic.sample.code.model.CommonCodeListGrid;
import com.sample.basic.sample.code.model.CommonCodeListSearch;
import com.sample.basic.sample.code.model.LangComCdP;
import com.sample.basic.sample.code.repository.LangComCdPJpaRepository;
import com.sample.basic.sample.code.repository.LangComCdPQueryRepository;
import com.sample.basic.sample.code.service.CommonCodeService;

/**
 * <pre>
 * Statement
 * </pre>
 * 
 * @author service
 *
 */
@Service
public class CommonCodeServiceImpl implements CommonCodeService {
	
	@Autowired
	private LangComCdPQueryRepository langComCdPQueryRepository;
	
	@Autowired
	private LangComCdPJpaRepository langComdCdPJpaRepository;
	
	@Autowired
	private JwtProvider jwtProvider;

	// 매핑공통코드 조회
	@Override
	public List<LangComCdP> mappingCodeListSearch(List<String> comCdGrpCdList) {
		// 데이터 조회
		List<LangComCdPEntity> resLangComCdPEntityList = langComCdPQueryRepository.findOfMappingCode(comCdGrpCdList);
		
		// 결과 반환
		List<LangComCdP> resLangComCdPList = LangComCdPMapper.Instance.toDtoList(resLangComCdPEntityList);
		
		return resLangComCdPList;
	}

	// grid목록 조회
	@Override
	public Page<CommonCodeListGrid> listGridSearch(CommonCodeListSearch commonCodeListSearch) {
		// 데이터 조회
		Page<CommonCodeListGrid> resCommonCodeListGridPage = langComCdPQueryRepository.findPageOfListGrid(commonCodeListSearch);
		System.out.println("@@@@@ grid목록 조회");
		
		// 결과 반환
		return resCommonCodeListGridPage;
	}

	// 상세 조회
	@Override
	public LangComCdP detailSearch(CommonCodeDetailSearch commonCodeDetailSearch) {
		// 데이터 조회
		LangComCdPEntity resLangComCdPEntity = langComCdPQueryRepository.findOneOfDetail(commonCodeDetailSearch.getComCdGrpCd(), 
																							   commonCodeDetailSearch.getComCd(), 
																							   commonCodeDetailSearch.getLangCd());
		// 결과 반환
		LangComCdP resLangComCdP = LangComCdPMapper.Instance.toDto(resLangComCdPEntity);
		
		return resLangComCdP;
	}

	// 코드 이름 조회
	@Override
	public String codeNameSearch(String comCdGrpCd, String comCd, String langCd) {
		// 데이터 조회
		String langComCdNm = langComCdPQueryRepository.findOneOfLangComCdNm(comCdGrpCd, comCd, langCd);
		
		// 결과 반환
		return langComCdNm;
	}

	// 등록
	@Override
	public void register(LangComCdP langComCdP) throws Exception {
		// token으로 정보 조회
//		EeB eeB = jwtProvider.getEeB();
		
		System.out.println("@@register2");
		
		// 저장되어 있는 데이터인지 확인
		LangComCdPEntity resLangComCdPEntity = langComCdPQueryRepository.findOneOfDetail(langComCdP.getComCdGrpCd(), 
																						 langComCdP.getComCd(), 
																						 langComCdP.getLangCd());	
		
		System.out.println("@@register3");
		
		if (resLangComCdPEntity != null) {
			System.out.println("@@@resLangComCdPEntity");
			throw new CustomException(ExceptionCode.DUPLICATE_RESOURCE);
		}
		
		// 데이터 적재
		LangComCdPEntity langComCdPEntity = LangComCdPMapper.Instance.toEntity(langComCdP);
		langComCdPEntity.setUseYn("Y");
		langComCdPEntity.setVbgRgnId("SYSTEM");		// 등록자 Id (eeB.getItgEeNo())
		langComCdPEntity.setFinUpdrId("SYSTEM");	// 마지막 수정자 Id (eeB.getItgEeNo())
		
		System.out.println("langComCdPEntity: " + langComCdPEntity);
		
		// 데이터 저장
		langComdCdPJpaRepository.save(langComCdPEntity);
	}

	// 수정
	@Override
	public void update(LangComCdP langComCdP) throws Exception {
		// token으로 정보 조회
//		EeB eeB = jwtProvider.getEeB();
		
		// 저장되어 있는 데이터인지 확인
		LangComCdPEntity resLangComCdPEntity = langComCdPQueryRepository.findOneOfDetail(langComCdP.getComCdGrpCd(), 
																						 langComCdP.getComCd(), 
																						 langComCdP.getLangCd());	
		if (resLangComCdPEntity != null) {
			throw new CustomException(ExceptionCode.INVALID_RESOURCE);
		}
		
		// 데이터 적재
		LangComCdPEntity langComCdPEntity = LangComCdPMapper.Instance.toEntity(langComCdP);
		langComCdPEntity.setFinUpdrId("SYSTEM");	// 마지막 수정자 Id (eeB.getItgEeNo())
		
		// 데이터 저장
		langComdCdPJpaRepository.save(langComCdPEntity);
	}

	// 삭제
	@Override
	public void delete(LangComCdP langComCdP) throws Exception {
		// token으로 정보 조회
//		EeB eeB = jwtProvider.getEeB();
		
		// 데이터 적재
		LangComCdPEntity langComCdPEntity = LangComCdPMapper.Instance.toEntity(langComCdP);
		langComCdPEntity.setUseYn("N");
		langComCdPEntity.setFinUpdrId("SYSTEM");	// 마지막 수정자 Id (eeB.getItgEeNo())
		
		// 데이터 저장
		langComdCdPJpaRepository.save(langComCdPEntity);
	}
	
}
