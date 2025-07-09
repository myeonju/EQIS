package com.sample.basic.sample.code.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sample.basic.cmm.exception.CustomException;
import com.sample.basic.cmm.exception.model.ExceptionCode;
import com.sample.basic.cmm.model.Page;
import com.sample.basic.cmm.provider.JwtProvider;
import com.sample.basic.sample.code.entity.MlgMsgBEntity;
import com.sample.basic.sample.code.mapper.MlgMsgBMapper;
import com.sample.basic.sample.code.model.LangListGrid;
import com.sample.basic.sample.code.model.LangListSearch;
import com.sample.basic.sample.code.model.MlgMsgB;
import com.sample.basic.sample.code.repository.MlgMsgBJpaRepository;
import com.sample.basic.sample.code.repository.MlgMsgBQueryRepository;
import com.sample.basic.sample.code.service.LangService;

/**
 * <pre>
 * Statement 
 * </pre>
 *  
 * @author user
 *
 */

@Service
public class langServiceImpl implements LangService {
	
	@Autowired
	private MlgMsgBQueryRepository mlgMsgBQueryRepository;
	
	@Autowired
	private MlgMsgBJpaRepository mlgMsgBJpaRepository;
	
	@Autowired
	private JwtProvider jwtProvider;

	@Override
	public List<MlgMsgB> mappingCodeListSearch(List<String> mlgCdList) {
		// 매핑되는 다국어 가져오기
		List<MlgMsgBEntity> resMlgCEntityList = mlgMsgBQueryRepository.findOfMappingCode(mlgCdList);
		
		// 결과 반환
		List<MlgMsgB> realMlgCList = MlgMsgBMapper.Instance.toDtoList(resMlgCEntityList);
		return realMlgCList;
	}

	// grid 목록 조회
	@Override
	public Page<LangListGrid> listGridSearch(LangListSearch langListSearch) {
		// 데이터 조회
		Page<LangListGrid> resLangListGridPage = mlgMsgBQueryRepository.findPageOfListGrid(langListSearch);
		
		// 결과 반환		
		return resLangListGridPage;
	}

	// 상세 조회
	@Override
	public MlgMsgB detailSearch(MlgMsgB mlgMsgB) {
		// 데이터 조회
		MlgMsgBEntity resMlgMsgBEntity = mlgMsgBQueryRepository.findOneOfDetail(mlgMsgB.getMlgCd(), 
																				mlgMsgB.getLangCd());
		
		// 결과 반환
		MlgMsgB resMlgMsgB = MlgMsgBMapper.Instance.toDto(resMlgMsgBEntity);
		return resMlgMsgB;
	}

	// 등록
	@Override
	public void register(MlgMsgB mlgMsgB) throws Exception {
		// token으로 정보 조회
//		EeB eeB = jwtProvider.getEeB():
		
		// 저장되어 있는 데이터인지 확인
		MlgMsgBEntity resMlgMsgBEntity = mlgMsgBQueryRepository.findOneOfDetail(mlgMsgB.getMlgCd(), 
																				mlgMsgB.getLangCd());
		
//		if (resMlgMsgBEntity != null) {
//			throw new CustomException(ExceptionCode.DUPLICATE_RESOURCE);
//		}
		
		// 데이터 적재
		MlgMsgBEntity mlgMsgBEntity = MlgMsgBMapper.Instance.toEntity(mlgMsgB);
		mlgMsgBEntity.setUseYn("Y");
		mlgMsgBEntity.setVbgRgnId("SYSTEM");
		mlgMsgBEntity.setFinUpdrId("SYSTEM");
				
		// 데이터 저장
		mlgMsgBJpaRepository.save(mlgMsgBEntity);
	}

	// 수정
	@Override
	public void update(MlgMsgB mlgMsgB) throws Exception {
		// token으로 정보 조회
//		EeB eeB = jwtProvider.getEeB():
		
		// 저장되어 있는 데이터인지 확인
		MlgMsgBEntity resMlgMsgBEntity =  mlgMsgBQueryRepository.findOneOfDetail(mlgMsgB.getMlgCd(), 
																			mlgMsgB.getLangCd());
		
//		if (resMlgMsgBEntity != null) {
//			throw new CustomException(ExceptionCode.INVALID_RESOURCE);
//		}
		
		// 데이터 적재
		MlgMsgBEntity mlgMsgBEntity = MlgMsgBMapper.Instance.toEntity(mlgMsgB);
		mlgMsgBEntity.setFinUpdrId("SYSTEM");
				
		// 데이터 저장
		mlgMsgBJpaRepository.save(mlgMsgBEntity);
	}

	// 삭제
	@Override
	public void delete(MlgMsgB mlgMsgB) throws Exception {
		// token으로 정보 조회
//		EeB eeB = jwtProvider.getEeB():
		
		// 데이터 적재
		MlgMsgBEntity mlgMsgBEntity = MlgMsgBMapper.Instance.toEntity(mlgMsgB);
		mlgMsgBEntity.setUseYn("Y");
		mlgMsgBEntity.setFinUpdrId("SYSTEM");
				
		// 데이터 저장
		mlgMsgBJpaRepository.save(mlgMsgBEntity);
	}

}
