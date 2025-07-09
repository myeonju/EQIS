package com.sample.basic.sample.notice.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sample.basic.cmm.exception.CustomException;
import com.sample.basic.cmm.exception.model.ExceptionCode;
import com.sample.basic.cmm.model.Page;
import com.sample.basic.cmm.provider.JwtProvider;
import com.sample.basic.sample.code.entity.MlgMsgBEntity;
import com.sample.basic.sample.code.mapper.MlgMsgBMapper;
import com.sample.basic.sample.code.model.MlgMsgB;
import com.sample.basic.sample.notice.entity.PwiImtrBEntity;
import com.sample.basic.sample.notice.mapper.PwiImtrBMapper;
import com.sample.basic.sample.notice.model.NoticeHome;
import com.sample.basic.sample.notice.model.NoticeListGrid;
import com.sample.basic.sample.notice.model.NoticeListSearch;
import com.sample.basic.sample.notice.model.NoticeModal;
import com.sample.basic.sample.notice.model.NoticeModalSearch;
import com.sample.basic.sample.notice.model.PwiImtrB;
import com.sample.basic.sample.notice.repository.PwiImtrBJpaRepository;
import com.sample.basic.sample.notice.repository.PwiImtrBQueryRepository;
import com.sample.basic.sample.notice.service.NoticeService;

/**
 * <pre>
 * Statement 
 * </pre>
 *  
 * @author user
 *
 */

@Service
public class NoticeServiceImpl implements NoticeService {
	
	@Autowired
	private PwiImtrBJpaRepository pwiImtrBJpaRepository;
	
	@Autowired
	private PwiImtrBQueryRepository pwiImtrBQueryRepository;	
		
	@Autowired
	private JwtProvider jwtProvider;

	@Override
	public Page<NoticeListGrid> listGridSearch(NoticeListSearch noticeListSearch) {
		// 데이터 조회
		Page<NoticeListGrid> resNoticeListGridPage = pwiImtrBQueryRepository.findPageOfListGrid(noticeListSearch);
		
		// 결과 반환
		return resNoticeListGridPage;
	}
	
	@Override
	public List<NoticeHome> homeListSearch(int limit) {
		// 데이터 조회
		List<NoticeHome> resNoticeHomeList = pwiImtrBQueryRepository.findOfHomeList(limit);
		
		// 결과 반환
		return resNoticeHomeList;
	}

	@Override
	public Page<NoticeModal> modalListSearch(NoticeModalSearch noticeModalSearch) {
		// 데이터 조회
		Page<NoticeModal> resNoticeModalPage = pwiImtrBQueryRepository.findPageOfModalList(noticeModalSearch);
		
		// 결과 반환		
		return resNoticeModalPage;
	}

	@Override
	public PwiImtrB detailSearch(int pwiImtrNo) {
		// 데이터 조회
		PwiImtrBEntity resPwiImtrBEntity = pwiImtrBQueryRepository.findOneOfDetail(pwiImtrNo);
		
		// 변환
		PwiImtrB resPwiImtrB = PwiImtrBMapper.Instance.toDto(resPwiImtrBEntity);
		
		// 결과 반환
		return resPwiImtrB;
	}

	@Override
	public PwiImtrB loginDetailSearch() {
		// 데이터 조회
		PwiImtrBEntity resPwiImtrBEntity = pwiImtrBQueryRepository.findFirstOfLoginDetail();
		
		// 변환
		PwiImtrB resPwiImtrB = PwiImtrBMapper.Instance.toDto(resPwiImtrBEntity);
		
		// 결과 반환
		return resPwiImtrB;
	}
	
	// 등록
	@Override
	public void register(PwiImtrB pwiImtrB) throws Exception {
		// token으로 정보 조회
		//EeB eeB = jwtProvider.getEeB();
		
		System.out.println("@@등록2");
		
		// 저장되어 있는 데이터인지 확인
		PwiImtrBEntity resPwiImtrBEntity = pwiImtrBQueryRepository.findOneOfDetail(pwiImtrB.getPwiImtrNo());
		if (resPwiImtrBEntity != null) {
			System.out.println("@@등록3");
			throw new CustomException(ExceptionCode.DUPLICATE_RESOURCE);
		}
		
		// 다음 공지사항번호 가져오기
		int nextPwiImtrNo = pwiImtrBQueryRepository.findOfNextPwiImtrNo();
		
		// 데이터 적재
		PwiImtrBEntity pwiImtrBEntity = PwiImtrBMapper.Instance.toEntity(pwiImtrB);
		pwiImtrBEntity.setUseYn("Y");
		pwiImtrBEntity.setVbgRgnId("SYSTEM");
		pwiImtrBEntity.setFinUpdrId("SYSTEM");
				
		// 데이터 저장
		pwiImtrBJpaRepository.save(pwiImtrBEntity);
	}
	
	// 수정
	@Override
	public void update(PwiImtrB pwiImtrB) throws Exception {
		// token으로 정보 조회
		//EeB eeB = jwtProvider.getEeB();
		
		// 저장되어 있는 데이터인지 확인
		PwiImtrBEntity resPwiImtrBEntity = pwiImtrBQueryRepository.findOneOfDetail(pwiImtrB.getPwiImtrNo());
		if (resPwiImtrBEntity != null) {
			throw new CustomException(ExceptionCode.DUPLICATE_RESOURCE);
		}	
		
		// 데이터 적재
		PwiImtrBEntity pwiImtrBEntity = PwiImtrBMapper.Instance.toEntity(pwiImtrB);
		pwiImtrBEntity.setFinUpdrId("SYSTEM");
		
		// 데이터 저장
		pwiImtrBJpaRepository.save(pwiImtrBEntity);
	}
	
	// 삭제
	@Override
	public void delete(PwiImtrB pwiImtrB) throws Exception {
		// token으로 정보 조회
		//EeB eeB = jwtProvider.getEeB();
		
		// 데이터 적재
		PwiImtrBEntity pwiImtrBEntity = PwiImtrBMapper.Instance.toEntity(pwiImtrB);
		pwiImtrBEntity.setUseYn("N");
		pwiImtrBEntity.setFinUpdrId("SYSTEM");
		
		// 데이터 저장
		pwiImtrBJpaRepository.save(pwiImtrBEntity);
	}
}
