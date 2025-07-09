package com.sample.basic.sample.notice.repository;

import static com.sample.basic.sample.notice.entity.QPwiImtrBEntity.pwiImtrBEntity;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sample.basic.cmm.model.Page;
import com.sample.basic.cmm.util.Dateformat;
import com.sample.basic.cmm.util.Lang;
import com.sample.basic.sample.notice.entity.PwiImtrBEntity;
import com.sample.basic.sample.notice.model.NoticeHome;
import com.sample.basic.sample.notice.model.NoticeListGrid;
import com.sample.basic.sample.notice.model.NoticeListSearch;
import com.sample.basic.sample.notice.model.NoticeModal;
import com.sample.basic.sample.notice.model.NoticeModalSearch;

/**
 * <pre>
 * 언어공통코드상세 Repository
 * </pre>
 * 
 * @author hansik
 *
 */

@Repository
public class PwiImtrBQueryRepository {

	@Autowired
	@Qualifier("sampleJpaQueryFactory")
	private JPAQueryFactory jpaQueryFactory;
	
	@Autowired
	private Lang lang;
	
	public Page<NoticeListGrid> findPageOfListGrid(NoticeListSearch noticeListSearch) {
		System.out.println("@@조회1");
		List<NoticeListGrid> resNoticeListGridList = jpaQueryFactory.select(Projections.fields(
			    NoticeListGrid.class,
			    pwiImtrBEntity.pwiImtrNo,
			    pwiImtrBEntity.titlNm,
			    pwiImtrBEntity.pwiImtrSbc,
			    Expressions.stringTemplate("function('GET_LANG_COM_CD_NM', {0}, {1}, {2})",
			        "USE_YN", pwiImtrBEntity.pwiYn, lang.getLangCd()).as("pwiNm"),
			    Expressions.stringTemplate("function('GET_LANG_COM_CD_NM', {0}, {1}, {2})",
			        "USE_YN", pwiImtrBEntity.supiFxgYn, lang.getLangCd()).as("supiFxgNm"),
			    Expressions.stringTemplate("function('GET_LANG_COM_CD_NM', {0}, {1}, {2})",
			        "USE_YN", pwiImtrBEntity.popuYn, lang.getLangCd()).as("popuNm"),
			    pwiImtrBEntity.popuStrDtm,
			    pwiImtrBEntity.popuFnhDtm
			))
			.from(pwiImtrBEntity)
			.where(containsIgnoreCaseTitlNm(noticeListSearch.getTitlNm()))
			.where(containsIgnoreCasePwiImtrSbc(noticeListSearch.getPwiImtrSbc()))
			.where(eqPwiYn(noticeListSearch.getPwiYn()))
			.where(eqSupiFxgYn(noticeListSearch.getSupiFxgYn()))
			.where(eqPopuYn(noticeListSearch.getPopuYn()))
			.where(pwiImtrBEntity.useYn.eq("Y"))
			.orderBy(pwiImtrBEntity.pwiImtrNo.desc())
			.offset((noticeListSearch.getPage() - 1) * noticeListSearch.getLimit())  
			.limit(noticeListSearch.getLimit())
			.fetch();
																	
		long totalCount = jpaQueryFactory.select(pwiImtrBEntity.count())
										 .from(pwiImtrBEntity)
										 .where(containsIgnoreCaseTitlNm(noticeListSearch.getTitlNm()))
										 .where(containsIgnoreCasePwiImtrSbc(noticeListSearch.getPwiImtrSbc()))
										 .where(eqPwiYn(noticeListSearch.getPwiYn()))
										 .where(eqSupiFxgYn(noticeListSearch.getSupiFxgYn()))
										 .where(eqPopuYn(noticeListSearch.getPopuYn()))
										 .where(pwiImtrBEntity.useYn.eq("Y"))
										 .fetchOne();
		
		return new Page<>(resNoticeListGridList, totalCount, noticeListSearch.getPage(), noticeListSearch.getLimit());
	}
	
	public List<NoticeHome> findOfHomeList(int limit) {
		System.out.println("findOfHomeList");
		return jpaQueryFactory.select(Projections.fields(NoticeHome.class, 
														 pwiImtrBEntity.pwiImtrNo,
														 pwiImtrBEntity.titlNm,
														 pwiImtrBEntity.vbgRgstTismp))
							  .from(pwiImtrBEntity)
							  .where(pwiImtrBEntity.pwiYn.eq("Y"))
							  .where(pwiImtrBEntity.useYn.eq("Y"))
							  .orderBy(pwiImtrBEntity.supiFxgYn.desc())
							  .orderBy(pwiImtrBEntity.vbgRgstTismp.desc())
							  .limit(limit)
							  .fetch();
	}
	
	public Page<NoticeModal> findPageOfModalList(NoticeModalSearch noticeModalSearch) {
		List<NoticeModal> resNoticeModalList = jpaQueryFactory.select(Projections.fields(NoticeModal.class,
																	  pwiImtrBEntity.pwiImtrNo,
																	  pwiImtrBEntity.titlNm,
																	  pwiImtrBEntity.vbgRgstTismp))
															  .from(pwiImtrBEntity)
															  .where(pwiImtrBEntity.pwiYn.eq("Y"))
															  .where(pwiImtrBEntity.useYn.eq("Y"))
															  .orderBy(pwiImtrBEntity.supiFxgYn.desc())
															  .orderBy(pwiImtrBEntity.vbgRgstTismp.desc())
															  .offset(noticeModalSearch.getPage() -1 * noticeModalSearch.getLimit())
															  .limit(noticeModalSearch.getLimit())
															  .fetch();
		
		long totalCount = jpaQueryFactory.select(pwiImtrBEntity.count())
										 .from(pwiImtrBEntity)
										 .where(pwiImtrBEntity.popuYn.eq("Y"))
										 .where(pwiImtrBEntity.useYn.eq("Y"))
										 .fetchOne();
		
		return new Page<>(resNoticeModalList, totalCount, noticeModalSearch.getPage(), noticeModalSearch.getLimit());
	}
	
	public PwiImtrBEntity findOneOfDetail(int pwiImtrNo) {
		return jpaQueryFactory.selectFrom(pwiImtrBEntity)
							  .where(pwiImtrBEntity.pwiImtrNo.eq(pwiImtrNo))
							  .where(pwiImtrBEntity.useYn.eq("Y"))
							  .fetchOne();
	}
	
	public PwiImtrBEntity findFirstOfLoginDetail() {
		// 현재 일자
		String currentDate = Dateformat.currentDate();
		
		// 데이터 조회
		return jpaQueryFactory.selectFrom(pwiImtrBEntity)
							  .where(pwiImtrBEntity.pwiYn.eq("Y"))
							  .where(pwiImtrBEntity.popuYn.eq("Y"))
							  .where(pwiImtrBEntity.popuStrDtm.loe(currentDate))
							  .where(pwiImtrBEntity.popuFnhDtm.goe(currentDate))
							  .where(pwiImtrBEntity.useYn.eq("Y"))
							  .orderBy(pwiImtrBEntity.pwiImtrNo.desc())
							  .fetchFirst();
	}
	
	// 다음 공지사항 번호 가져오기
	public int findOfNextPwiImtrNo() {
		Integer maxPwiImtrNo = jpaQueryFactory.select(pwiImtrBEntity.pwiImtrNo.max())
											  .from(pwiImtrBEntity)
											  .fetchOne();
		return maxPwiImtrNo == null ? 1:(maxPwiImtrNo + 1);
	}
	
	public BooleanExpression containsIgnoreCaseTitlNm(String titlNm) {
		if(!StringUtils.hasText(titlNm)) {
			return null;
		}
		
		return pwiImtrBEntity.titlNm.containsIgnoreCase(titlNm);
	}
	
	public BooleanExpression containsIgnoreCasePwiImtrSbc(String pwiImtrSbc) {
		if(!StringUtils.hasText(pwiImtrSbc)) {
			return null;
		}
		
		return pwiImtrBEntity.pwiImtrSbc.containsIgnoreCase(pwiImtrSbc);
	}
	
	public BooleanExpression eqPwiYn(String pwiYn) {
		if(!StringUtils.hasText(pwiYn)) {
			return null;
		}
		
		return pwiImtrBEntity.pwiYn.eq(pwiYn);
	}
	
	public BooleanExpression eqSupiFxgYn(String supiFxgYn) {
		if(!StringUtils.hasText(supiFxgYn)) {
			return null;
		}
		
		return pwiImtrBEntity.supiFxgYn.eq(supiFxgYn);
	}
	
	public BooleanExpression eqPopuYn(String popuYn) {
		if(!StringUtils.hasText(popuYn)) {
			return null;
		}
		
		return pwiImtrBEntity.popuYn.eq(popuYn);
	}
}
